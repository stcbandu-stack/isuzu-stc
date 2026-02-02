import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

// Spreadsheet ID for WIN Finance
const SPREADSHEET_ID = '1uWaGdKSkiIIsq9YOFsiF3xEJ0pF2wb0h9_eJkVnkp_A';

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

export interface WinFinanceRecord {
  case_send_date: string;
  case_send_month: string;
  case_aprroved_date: string;
  case_process_time: string;
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
  contact_note: string;
  contact_date: string;
  customer_choose: string;
  choose_date: string;
  customer_meet_date: string;
  appointment_date: string;
  doc_gather: string;
  doc_gather_date: string;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month] || 'jan_table';
    
    // Use centralized Google Auth
    const sheets = getGoogleSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:AD`, // A to AD (30 columns)
    });
    
    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ records: [], summary: { totalCases: 0, statusCounts: {}, branchCounts: {} } }), {
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
    
    const records: WinFinanceRecord[] = rows.slice(1)
      .filter(row => row.some(cell => cell && cell.trim() !== '')) // Filter empty rows
      .map(row => {
        // สร้าง object จาก header
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        
        // Map to WinFinanceRecord interface
        return {
          case_send_date: obj['case_send_date'] || '',
          case_send_month: obj['case_send_month'] || '',
          case_aprroved_date: obj['case_aprroved_date'] || '',
          case_process_time: obj['case_process_time'] || '',
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
          contact_note: obj['contact_note'] || '',
          contact_date: obj['contact_date'] || '',
          customer_choose: obj['customer_choose'] || '',
          choose_date: obj['choose_date'] || '',
          customer_meet_date: obj['customer_meet_date'] || '',
          appointment_date: obj['appointment_date'] || '',
          doc_gather: obj['doc_gather'] || '',
          doc_gather_date: obj['doc_gather_date'] || ''
        } as WinFinanceRecord;
      })
      .filter(r => r.customer_name && r.customer_name.trim() !== ''); // Filter records without customer name

    // Calculate summaries
    const statusCounts: Record<string, number> = {};
    const branchCounts: Record<string, number> = {};
    let totalCases = 0;
    
    records.forEach(record => {
      const status = record.case_status || 'Unspecified';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
      const branch = record.dealer_branch || 'Unspecified';
      branchCounts[branch] = (branchCounts[branch] || 0) + 1;
      
      totalCases++;
    });

    return new Response(JSON.stringify({
      records,
      summary: {
        totalCases,
        statusCounts,
        branchCounts
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate'
      }
    });
    
  } catch (error) {
    console.error('Error fetching WIN finance records:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
