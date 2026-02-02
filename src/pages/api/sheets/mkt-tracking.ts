import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

// Spreadsheet ID for MKT Tracking 69
// https://docs.google.com/spreadsheets/d/1IIern4QK7O6ozXWAVaZKWgsXS0fXOg1rveruGtZUC1k/edit
const SPREADSHEET_ID = '1IIern4QK7O6ozXWAVaZKWgsXS0fXOg1rveruGtZUC1k';

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

export interface MktTrackingRecord {
  booking_date: string;
  booking_month: string;
  delivery_date: string;
  sales: string;
  dealer_branch: string;
  car_type: string;
  car_brand: string;
  car_model: string;
  car_year: string;
  license_plate: string;
  fin: string;
  fin_status: string;
  customer_name: string;
  customer_job: string;
  customer_province: string;
  customer_district: string;
  customer_subdistrict: string;
  customer_from: string;
  car_price: number;
  fin_amount: number;
  down_payment: number;
  down_percentage: string;
  installment_period: string;
  fin_interest: string;
  reject_note: string;
  case_note: string;
  // Computed fields
  is_current_month: boolean;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month];
    const thaiMonth = THAI_MONTHS[month];
    
    if (!tabName) {
      return new Response(JSON.stringify({ error: 'Invalid month parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Google Sheets API using centralized auth
    const sheets = getGoogleSheets();

    // Fetch data from sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${tabName}!A:AZ`,
    });

    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ records: [], month: thaiMonth }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Header as Key pattern - row 0 is headers
    const headers = rows[0].map((h: string) => (h || '').toString().trim());
    
    // Column mapping helper
    const findColumnIndex = (searchTerms: string[]): number => {
      return headers.findIndex((h: string) => {
        const cleanH = h.toLowerCase().replace(/\s+/g, '');
        return searchTerms.some(term => cleanH.includes(term.toLowerCase()));
      });
    };

    // Map columns
    const colMap = {
      booking_date: findColumnIndex(['booking_date', 'วันจอง']),
      booking_month: findColumnIndex(['booking_month', 'เดือนจอง']),
      delivery_date: findColumnIndex(['delivery_date', 'วันส่งมอบ']),
      sales: findColumnIndex(['sales', 'เซลล์', 'พนักงานขาย']),
      dealer_branch: findColumnIndex(['dealer_branch', 'สาขา']),
      car_type: findColumnIndex(['car_type', 'ประเภทรถ']),
      car_brand: findColumnIndex(['car_brand', 'ยี่ห้อ']),
      car_model: findColumnIndex(['car_model', 'รุ่น']),
      car_year: findColumnIndex(['car_year', 'ปี']),
      license_plate: findColumnIndex(['license_plate', 'ทะเบียน']),
      fin: findColumnIndex(['fin', 'ไฟแนนซ์']),
      fin_status: findColumnIndex(['fin_status', 'สถานะ']),
      customer_name: findColumnIndex(['customer_name', 'ชื่อลูกค้า']),
      customer_job: findColumnIndex(['customer_job', 'อาชีพ']),
      customer_province: findColumnIndex(['customer_province', 'จังหวัด']),
      customer_district: findColumnIndex(['customer_district', 'อำเภอ']),
      customer_subdistrict: findColumnIndex(['customer_subdistrict', 'ตำบล']),
      customer_from: findColumnIndex(['customer_from', 'ที่มา']),
      car_price: findColumnIndex(['car_price', 'ราคารถ']),
      fin_amount: findColumnIndex(['fin_amount', 'ยอดจัด']),
      down_payment: findColumnIndex(['down_payment', 'เงินดาวน์']),
      down_percentage: findColumnIndex(['down_percentage', 'เปอร์เซ็นต์ดาวน์']),
      installment_period: findColumnIndex(['installment_period', 'งวดผ่อน']),
      fin_interest: findColumnIndex(['fin_interest', 'ดอกเบี้ย']),
      reject_note: findColumnIndex(['reject_note', 'rejce_note', 'สาเหต']),
      case_note: findColumnIndex(['case_note', 'หมายเหตุ']),
    };

    // Process data rows (skip header)
    const records: MktTrackingRecord[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0) continue;

      // Get value helper
      const getValue = (colIdx: number): string => {
        if (colIdx < 0 || colIdx >= row.length) return '';
        return (row[colIdx] || '').toString().trim();
      };

      const parseNumber = (colIdx: number): number => {
        const val = getValue(colIdx);
        const cleaned = val.replace(/[฿,]/g, '').trim();
        return parseFloat(cleaned) || 0;
      };

      const bookingDate = getValue(colMap.booking_date);
      const bookingMonth = getValue(colMap.booking_month);
      const dealerBranch = getValue(colMap.dealer_branch);
      
      // Skip empty rows
      if (!bookingDate && !bookingMonth && !dealerBranch) continue;

      // Determine if current month
      let isCurrentMonth = false;
      if (bookingMonth) {
        isCurrentMonth = bookingMonth.includes(thaiMonth);
      } else if (bookingDate) {
        // Check date format DD/MM/YYYY or similar
        const monthPatterns = [
          `/${month}/`, `-${month}-`, `/${parseInt(month)}/`, `-${parseInt(month)}-`
        ];
        isCurrentMonth = monthPatterns.some(p => bookingDate.includes(p));
      }

      const record: MktTrackingRecord = {
        booking_date: bookingDate,
        booking_month: bookingMonth,
        delivery_date: getValue(colMap.delivery_date),
        sales: getValue(colMap.sales),
        dealer_branch: dealerBranch,
        car_type: getValue(colMap.car_type),
        car_brand: getValue(colMap.car_brand),
        car_model: getValue(colMap.car_model),
        car_year: getValue(colMap.car_year),
        license_plate: getValue(colMap.license_plate),
        fin: getValue(colMap.fin) || 'Other',
        fin_status: getValue(colMap.fin_status),
        customer_name: getValue(colMap.customer_name),
        customer_job: getValue(colMap.customer_job),
        customer_province: getValue(colMap.customer_province),
        customer_district: getValue(colMap.customer_district),
        customer_subdistrict: getValue(colMap.customer_subdistrict),
        customer_from: getValue(colMap.customer_from) || 'อื่นๆ',
        car_price: parseNumber(colMap.car_price),
        fin_amount: parseNumber(colMap.fin_amount),
        down_payment: parseNumber(colMap.down_payment),
        down_percentage: getValue(colMap.down_percentage),
        installment_period: getValue(colMap.installment_period),
        fin_interest: getValue(colMap.fin_interest),
        reject_note: getValue(colMap.reject_note),
        case_note: getValue(colMap.case_note),
        is_current_month: isCurrentMonth,
      };

      records.push(record);
    }

    return new Response(JSON.stringify({ 
      records, 
      month: thaiMonth,
      total: records.length 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('MKT Tracking API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch data', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
