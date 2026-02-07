import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

const SPREADSHEET_ID = '1DHIWHJFwkGEJcERyV16jxkK36rDe-Tf7xh7InIQUXWA';

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
  const parts = dateStr.trim().split(' ');
  const dateParts = parts[0].split('/');
  if (dateParts.length !== 3) return null;
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  let year = parseInt(dateParts[2], 10);
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
  return Math.round(diffMs / (1000 * 60));
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
    const headers = rows[0].map((h: string) => String(h).trim());
    const records: UsedCarOnlineRecord[] = [];
    const summary: Summary = createEmptySummary();
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;
      const obj: Record<string, string> = {};
      headers.forEach((header: string, idx: number) => {
        obj[header] = row[idx] || '';
      });
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
      summary.totalCustomers++;
      const grade = record.customer_grade || 'ยังไม่ได้ประเมิน';
      summary.gradeCount[grade] = (summary.gradeCount[grade] || 0) + 1;
      if (record.case_status) {
        summary.statusCount[record.case_status] = (summary.statusCount[record.case_status] || 0) + 1;
      }
      if (record.case_update) {
        summary.updateCount[record.case_update] = (summary.updateCount[record.case_update] || 0) + 1;
      }
      const province = record.customer_province || 'ยังไม่ระบุจังหวัด';
      summary.provinceCount[province] = (summary.provinceCount[province] || 0) + 1;
      if (!summary.districtByProvince[province]) {
        summary.districtByProvince[province] = {};
      }
      const district = record.customer_district || 'ยังไม่ระบุอำเภอ';
      summary.districtByProvince[province][district] =
        (summary.districtByProvince[province][district] || 0) + 1;
      const job = record.customer_job || 'ยังไม่ระบุ';
      summary.jobCount[job] = (summary.jobCount[job] || 0) + 1;
      if (record.customer_where) {
        summary.sourceCount[record.customer_where] = (summary.sourceCount[record.customer_where] || 0) + 1;
      }
      if (record.car_interest) {
        summary.carInterestCount[record.car_interest] = (summary.carInterestCount[record.car_interest] || 0) + 1;
      }
      if (record.sales) {
        if (!summary.salesResponseTime[record.sales]) {
          summary.salesResponseTime[record.sales] = { totalMinutes: 0, count: 0, avgMinutes: 0, totalCases: 0 };
        }
        summary.salesResponseTime[record.sales].totalCases += 1;
        if (record.case_duration) {
          const durationMatch = record.case_duration.match(/^(-?\d+)/);
          if (durationMatch) {
            const durationMinutes = parseInt(durationMatch[1], 10);
            if (durationMinutes > 0) {
              summary.salesResponseTime[record.sales].totalMinutes += durationMinutes;
              summary.salesResponseTime[record.sales].count += 1;
            }
          }
        }
      }
    }
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
    console.error('Error fetching Used Car Online Tracking Karrent data:', error);
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
