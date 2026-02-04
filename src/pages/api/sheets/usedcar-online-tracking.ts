import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

// Spreadsheet ID for Used Car Online Tracking 2569
const SPREADSHEET_ID = '1_7ansYnRw_CFK0XJy8g1n4FK45iU_rmbOcgXoe8gvf4';

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

export interface UsedCarOnlineRecord {
  row_num: number;
  send_case_date: string;
  customer_name: string;
  customer_tel: string;
  customer_grade: string;
  case_status: string;
  case_update: string;
  customer_province: string;
  customer_district: string;
  customer_job: string;
  customer_where: string;
  car_interest: string;
  sales: string;
  cas_transfer_date: string;
  case_recieve_date: string;
  case_duration: string;
  case_note: string;
}

interface Summary {
  totalCustomers: number;
  gradeCount: Record<string, number>;
  statusCount: Record<string, number>;
  updateCount: Record<string, number>;
  provinceCount: Record<string, number>;
  districtByProvince: Record<string, Record<string, number>>;
  jobCount: Record<string, number>;
  sourceCount: Record<string, number>;
  carInterestCount: Record<string, number>;
  salesResponseTime: Record<string, { totalMinutes: number; count: number; avgMinutes: number; totalCases: number }>;
}

function parseThaiDateTime(dateStr: string): Date | null {
  if (!dateStr || dateStr.trim() === '') return null;
  
  // Format: "31/1/2569 13:30:00" or "31/1/2569"
  const parts = dateStr.trim().split(' ');
  const dateParts = parts[0].split('/');
  
  if (dateParts.length !== 3) return null;
  
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  let year = parseInt(dateParts[2], 10);
  
  // Convert Buddhist year to Gregorian
  if (year > 2500) year -= 543;
  
  let hours = 0, minutes = 0, seconds = 0;
  if (parts[1]) {
    const timeParts = parts[1].split(':');
    hours = parseInt(timeParts[0], 10) || 0;
    minutes = parseInt(timeParts[1], 10) || 0;
    seconds = parseInt(timeParts[2], 10) || 0;
  }
  
  return new Date(year, month, day, hours, minutes, seconds);
}

function calculateResponseTime(transferDate: string, receiveDate: string): number | null {
  const transfer = parseThaiDateTime(transferDate);
  const receive = parseThaiDateTime(receiveDate);
  
  if (!transfer || !receive) return null;
  
  const diffMs = receive.getTime() - transfer.getTime();
  if (diffMs < 0) return null;
  
  return Math.round(diffMs / (1000 * 60)); // Return minutes
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month] || 'jan_table';
    
    const sheets = getGoogleSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:T`,
    });
    
    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ 
        success: true,
        records: [], 
        summary: createEmptySummary()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // ✨ Header as Key: แปลง Array เป็น Object โดยใช้ Header เป็น Key
    const headers = rows[0].map((h: string) => String(h).trim());
    
    const records: UsedCarOnlineRecord[] = [];
    const summary: Summary = createEmptySummary();
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      
      // สร้าง object จาก header
      const obj: Record<string, string> = {};
      headers.forEach((header: string, idx: number) => {
        obj[header] = row[idx] || '';
      });
      
      // Skip empty rows (check if customer name exists)
      const customerName = (obj['customer_name'] || '').trim();
      if (!customerName) continue;
      
      const record: UsedCarOnlineRecord = {
        row_num: i + 1,
        send_case_date: (obj['send_case_date'] || '').trim(),
        customer_name: customerName,
        customer_tel: (obj['customer_tel'] || '').trim(),
        customer_grade: (obj['customer_grade'] || '').trim(),
        case_status: (obj['case_status'] || '').trim(),
        case_update: (obj['case_update'] || '').trim(),
        customer_province: (obj['customer_province'] || '').trim(),
        customer_district: (obj['customer_district'] || '').trim(),
        customer_job: (obj['customer_job'] || '').trim(),
        customer_where: (obj['customer_where'] || '').trim(),
        car_interest: (obj['car_interest'] || '').trim(),
        sales: (obj['sales'] || '').trim(),
        cas_transfer_date: (obj['cas_transfer_date'] || '').trim(),
        case_recieve_date: (obj['case_recieve_date'] || '').trim(),
        case_duration: (obj['case_duration'] || '').trim(),
        case_note: (obj['case_note'] || '').trim(),
      };
      
      records.push(record);
      
      // Aggregate summary
      summary.totalCustomers++;
      
      // Grade count - นับทุกกรณี รวมถึงที่ยังไม่ได้ประเมิน
      const grade = record.customer_grade || 'ยังไม่ได้ประเมิน';
      summary.gradeCount[grade] = (summary.gradeCount[grade] || 0) + 1;
      
      // Status count
      if (record.case_status) {
        summary.statusCount[record.case_status] = (summary.statusCount[record.case_status] || 0) + 1;
      }
      
      // Update status count
      if (record.case_update) {
        summary.updateCount[record.case_update] = (summary.updateCount[record.case_update] || 0) + 1;
      }
      
      // Province count - นับทุกกรณี
      const province = record.customer_province || 'ยังไม่ระบุจังหวัด';
      summary.provinceCount[province] = (summary.provinceCount[province] || 0) + 1;
      
      // District by province
      if (!summary.districtByProvince[province]) {
        summary.districtByProvince[province] = {};
      }
      
      const district = record.customer_district || 'ยังไม่ระบุอำเภอ';
      summary.districtByProvince[province][district] = 
        (summary.districtByProvince[province][district] || 0) + 1;
      
      // Job count - กรณีไม่ระบุให้นับด้วย
      const job = record.customer_job || 'ยังไม่ระบุ';
      summary.jobCount[job] = (summary.jobCount[job] || 0) + 1;
      
      // Source count (customer_where)
      if (record.customer_where) {
        summary.sourceCount[record.customer_where] = (summary.sourceCount[record.customer_where] || 0) + 1;
      }
      
      // Car interest count
      if (record.car_interest) {
        summary.carInterestCount[record.car_interest] = (summary.carInterestCount[record.car_interest] || 0) + 1;
      }
      
      // Sales response time calculation - นับทุก sales
      if (record.sales) {
        if (!summary.salesResponseTime[record.sales]) {
          summary.salesResponseTime[record.sales] = { totalMinutes: 0, count: 0, avgMinutes: 0, totalCases: 0 };
        }
        summary.salesResponseTime[record.sales].totalCases += 1;
        
        // ใช้ case_duration จาก Sheet โดยตรง (เฉพาะค่าบวก = มีข้อมูลจริง)
        if (record.case_duration) {
          // Parse duration: "39 นาที" -> 39
          const durationMatch = record.case_duration.match(/^(-?\d+)/);
          if (durationMatch) {
            const durationMinutes = parseInt(durationMatch[1], 10);
            // เอาเฉพาะค่าบวก (เซลล์รับเคสแล้ว)
            if (durationMinutes > 0) {
              summary.salesResponseTime[record.sales].totalMinutes += durationMinutes;
              summary.salesResponseTime[record.sales].count += 1;
            }
          }
        }
      }
    }
    
    // Calculate averages for sales response time
    for (const sales of Object.keys(summary.salesResponseTime)) {
      const data = summary.salesResponseTime[sales];
      if (data.count > 0) {
        data.avgMinutes = Math.round(data.totalMinutes / data.count);
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true,
      records,
      summary
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error fetching Used Car Online Tracking data:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      records: [],
      summary: createEmptySummary()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function createEmptySummary(): Summary {
  return {
    totalCustomers: 0,
    gradeCount: {},
    statusCount: {},
    updateCount: {},
    provinceCount: {},
    districtByProvince: {},
    jobCount: {},
    sourceCount: {},
    carInterestCount: {},
    salesResponseTime: {},
  };
}
