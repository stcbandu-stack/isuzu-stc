import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';
import { GoogleGenAI } from '@google/genai';

const SPREADSHEET_ID = '1NKkgsSKRqNBN4BNLcS2Rabwp-QaZI6ybNRSGqJadD1c';

const MONTH_TABS: Record<string, string> = {
  '01': 'jan_table',
  '02': 'feb_table',
  '03': 'mar_table',
  '04': 'apr_table',
  '05': 'may_table',
  '06': 'jun_table',
  '07': 'jul_table',
  '08': 'aug_table',
  '09': 'sep_table',
  '10': 'oct_table',
  '11': 'nov_table',
  '12': 'dec_table',
};

interface StatusBucket {
  count: number;
  notes: string[];
}

interface StatusMap {
  [status: string]: StatusBucket;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month] || MONTH_TABS['01'];

    const apiKey = import.meta.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'GEMINI_API_KEY is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sheets = getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:AD`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, summaryText: '', data: {}, month }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const headers = rows[0].map(h => String(h).trim());
    const idxStatus = headers.findIndex(h => h === 'case_status');
    const idxNote = headers.findIndex(h => h === 'case_note');

    if (idxStatus === -1) {
      return new Response(
        JSON.stringify({ success: false, error: 'ไม่พบคอลัมน์ case_status ในชีท' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const statusMap: StatusMap = {};

    rows.slice(1).forEach(row => {
      const status = (row[idxStatus] || '').toString().trim() || 'อื่นๆ';
      const note = idxNote >= 0 ? (row[idxNote] || '').toString().trim() : '';

      if (!statusMap[status]) {
        statusMap[status] = { count: 0, notes: [] };
      }
      statusMap[status].count += 1;

      if (note) {
        if (statusMap[status].notes.length < 100) {
          statusMap[status].notes.push(note);
        }
      }
    });

    const ai = new GoogleGenAI({ apiKey });

    const statusArray = Object.entries(statusMap).map(([status, bucket]) => ({
      status,
      count: bucket.count,
      exampleNotes: bucket.notes,
    }));

    const systemPrompt = `
คุณเป็นผู้เชี่ยวชาญด้านการวิเคราะห์ปัญหาของเคสรถมือสอง
ด้านล่างคือข้อมูลสรุปจาก Google Sheet usedcar-tracking: แต่ละสถานะ (case_status) มีจำนวนเคสและตัวอย่าง case_note (โน้ตปัญหา) หลายรายการ

งานของคุณ:
- สรุปว่า "แต่ละสถานะ" มักติดปัญหาอะไรย่อยบ้าง
- อธิบายเป็นภาษาไทยแบบอ่านง่าย เหมาะให้หัวหน้าทีมเอาไปวางแผนแก้ปัญหา
- เน้นกลุ่มสถานะที่มีจำนวนเคสเยอะก่อน

รูปแบบผลลัพธ์ที่ต้องการ:
- เรียงเป็นหัวข้อย่อยตามสถานะ
- ในแต่ละสถานะให้ระบุ: ปัญหาหลัก, ประเด็นที่เจอบ่อย, แนวทางที่ควรโฟกัส

ให้ตอบกลับเป็น "ข้อความสรุป" อย่างเดียว ไม่ต้องแทรก JSON หรือโค้ด
    `.trim();

    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: JSON.stringify(statusArray, null, 2) }] },
      ],
    });

    const summaryText = (result as any).text || '';

    return new Response(
      JSON.stringify({
        success: true,
        month,
        data: statusArray,
        summaryText,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('usedcar-status-summary error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'เกิดข้อผิดพลาดในการสรุปสถานะเคส',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

