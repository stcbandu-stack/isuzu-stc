import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

// Spreadsheet ID for Used Car Tracking 69
// เปิด Google Sheet -> ดู URL -> copy ส่วน ID ที่อยู่ระหว่าง /d/ และ /edit
const SPREADSHEET_ID = '1NKkgsSKRqNBN4BNLcS2Rabwp-QaZI6ybNRSGqJadD1c';

// Tab names for each month
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

// Thai month names for matching
const THAI_MONTHS: Record<string, string> = {
  '01': 'มกราคม',
  '02': 'กุมภาพันธ์',
  '03': 'มีนาคม',
  '04': 'เมษายน',
  '05': 'พฤษภาคม',
  '06': 'มิถุนายน',
  '07': 'กรกฎาคม',
  '08': 'สิงหาคม',
  '09': 'กันยายน',
  '10': 'ตุลาคม',
  '11': 'พฤศจิกายน',
  '12': 'ธันวาคม',
};

export interface UsedCarRecord {
  send_case_date: string;
  send_case_month: string;
  aprrove_date: string;
  process_duration: string;
  customer_name: string;
  license_plate: string;
  car_brand: string;
  car_model: string;
  car_year: string;
  fin: string;
  fin_staff: string;
  car_price: number;
  down_payment: number;
  dealer_down: string;
  fin_interest: string;
  installment_period: string;
  sales: string;
  dealer_branch: string;
  delivery_date: string;
  case_status: string;
  case_note: string;
  fin_note: string;
  contact: string;
  contact_date: string;
  customer_choose: string;
  customer_choose_date: string;
  customer_meeting: string;
  customer_meeting_date: string;
  doc_gather: string;
  doc_gather_date: string;
  // Computed fields
  is_current_month: boolean;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month] || 'jan_table';
    const currentMonthName = THAI_MONTHS[month] || 'มกราคม';
    
    // Use centralized Google Auth
    const sheets = getGoogleSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:AD`, // A to AD (30 columns)
    });
    
    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ 
        records: [], 
        summary: { 
          totalCases: 0, 
          currentCases: 0, 
          carriedOver: 0, 
          cashPurchase: 0,
          statusCounts: {}, 
          branchCounts: {},
          financeCounts: {},
          sourceCounts: {}
        } 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // ✨ Header as Key: แปลง Array เป็น Object โดยใช้ Header เป็น Key
    const headers = rows[0].map(h => String(h).trim());
    
    // Helper to parse currency string to number
    const parseCurrency = (val: string) => {
      if (!val) return 0;
      return parseFloat(val.replace(/[฿,]/g, '').trim()) || 0;
    };
    
    // Helper to check if date/month belongs to current month
    const isCurrentMonth = (sendMonth: string, sendDate: string) => {
      // Check month name
      if (sendMonth && sendMonth.trim() === currentMonthName) return true;
      
      // Check date format (e.g., "5/1/2026" or "2026-01-05")
      if (sendDate) {
        const monthNum = month;
        // Format: D/M/YYYY or DD/MM/YYYY
        const slashMatch = sendDate.match(/\/(\d{1,2})\//);
        if (slashMatch) {
          const m = slashMatch[1].padStart(2, '0');
          if (m === monthNum) return true;
        }
        // Format: YYYY-MM-DD
        const dashMatch = sendDate.match(/-(\d{2})-/);
        if (dashMatch && dashMatch[1] === monthNum) return true;
      }
      
      return false;
    };
    
    const records: UsedCarRecord[] = rows.slice(1)
      .filter(row => row.some(cell => cell && cell.trim() !== '')) // Filter empty rows
      .map(row => {
        // สร้าง object จาก header
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        
        const sendMonth = obj['send_case_month'] || '';
        const sendDate = obj['send_case_date'] || '';
        
        return {
          send_case_date: sendDate,
          send_case_month: sendMonth,
          aprrove_date: obj['aprrove_date'] || '',
          process_duration: obj['process_duration'] || '',
          customer_name: obj['customer_name'] || '',
          license_plate: obj['license_plate'] || '',
          car_brand: obj['car_brand'] || '',
          car_model: obj['car_model'] || '',
          car_year: obj['car_year'] || '',
          fin: obj['fin'] || '',
          fin_staff: obj['fin_staff'] || '',
          car_price: parseCurrency(obj['car_price']),
          down_payment: parseCurrency(obj['down_payment']),
          dealer_down: obj['dealer_down'] || '',
          fin_interest: obj['fin_interest'] || '',
          installment_period: obj['installment_period'] || '',
          sales: obj['sales'] || '',
          dealer_branch: obj['dealer_branch'] || '',
          delivery_date: obj['delivery_date'] || '',
          case_status: obj['case_status'] || '',
          case_note: obj['case_note'] || '',
          fin_note: obj['fin_note'] || '',
          contact: obj['contact'] || '',
          contact_date: obj['contact_date'] || '',
          customer_choose: obj['customer_choose'] || '',
          customer_choose_date: obj['customer_choose_date'] || '',
          customer_meeting: obj['customer_meeting'] || '',
          customer_meeting_date: obj['customer_meeting_date'] || '',
          doc_gather: obj['doc_gather'] || '',
          doc_gather_date: obj['doc_gather_date'] || '',
          is_current_month: isCurrentMonth(sendMonth, sendDate)
        } as UsedCarRecord;
      })
      .filter(r => r.customer_name && r.customer_name.trim() !== ''); // Filter records without customer name

    // Calculate summaries
    const statusCounts: Record<string, number> = {};
    const branchCounts: Record<string, number> = {};
    const financeCounts: Record<string, { old: number; current: number; total: number }> = {};
    const sourceCounts: Record<string, number> = {};
    let totalCases = 0;
    let currentCases = 0;
    let carriedOver = 0;
    let cashPurchase = 0;
    
    records.forEach(record => {
      totalCases++;
      
      // Current vs Carried Over
      if (record.is_current_month) {
        currentCases++;
      } else {
        carriedOver++;
      }
      
      // Status
      const status = record.case_status || 'อื่นๆ';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
      // Branch
      const branch = record.dealer_branch || 'ไม่ระบุ';
      branchCounts[branch] = (branchCounts[branch] || 0) + 1;
      
      // Finance - normalize name
      let finKey = record.fin || 'Other';
      if (finKey.includes('สด') || finKey.includes('Cash')) {
        finKey = 'ซื้อสด';
        cashPurchase++;
      } else if (finKey.includes('ทหารไทย')) finKey = 'TTB';
      else if (finKey.includes('ไทยพาณิชย์')) finKey = 'SCB';
      else if (finKey.includes('กสิกร') || finKey.toLowerCase().includes('kleasing')) finKey = 'KLeasing';
      else if (finKey.includes('เกียรตินาคิน') || finKey.toLowerCase().includes('kkp')) finKey = 'KKP';
      else if (finKey.includes('นิสสัน') || finKey.toLowerCase().includes('nissan')) finKey = 'NISSAN';
      else if (finKey.includes('กรุงศรี') || finKey.toLowerCase().includes('krungsri')) finKey = 'Krungsri';
      else if (finKey.toLowerCase().includes('win')) finKey = 'WIN';
      else if (finKey.toLowerCase().includes('til')) finKey = 'TIL';
      
      if (!financeCounts[finKey]) {
        financeCounts[finKey] = { old: 0, current: 0, total: 0 };
      }
      financeCounts[finKey].total++;
      if (record.is_current_month) {
        financeCounts[finKey].current++;
      } else {
        financeCounts[finKey].old++;
      }
    });

    return new Response(JSON.stringify({
      records,
      summary: {
        totalCases,
        currentCases,
        carriedOver,
        cashPurchase,
        statusCounts,
        branchCounts,
        financeCounts,
        sourceCounts
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate'
      }
    });
    
  } catch (error) {
    console.error('Error fetching Used Car tracking records:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
