import type { APIRoute } from 'astro';
import { getGoogleSheets } from '../../../lib/google-auth';

// Spreadsheet ID from environment or hardcoded
const SPREADSHEET_ID = import.meta.env.GOOGLE_SPREADSHEET_ID || '1QsvzDl1iCZMhChmhDxKUL32hPdKLTZgEDw4Qiw0sEHU';

// Set to true to use mock data for testing
const USE_MOCK_DATA = false;

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

// Branch names mapping
const BRANCHES = ['Ban DU', 'Mae Chan', 'Mae Sai', 'Phan'];

interface BookingRecord {
  bk_date: string;
  month_date: string;
  customer_name: string;
  license_plate: string;
  car_brand: string;
  car_model: string;
  car_year: string;
  car_color: string;
  car_owner: string;
  fin: string;
  car_price: number;
  fin_amount: number;
  down_payment: number;
  fin_interest: number;
  installment_period: number;
  branch_sales: string;
  branch_name: string;
  fin_status: string;
  fin_note: string;
}

interface BranchSummary {
  totalCases: number;
  cashPurchase: number;
  finance: Record<string, number>;
  status: Record<string, number>;
  source: Record<string, number>;
  brands: Record<string, number>;
  models: Array<{brand: string, model: string, count: number}>;
  totalPrice: number;
}

// Mock data for testing
function getMockData(): BookingRecord[] {
  return [
    { bk_date: '2025-01-02', month_date: 'jan', customer_name: 'นายสมชาย ใจดี', license_plate: 'กข 1234', car_brand: 'TOYOTA', car_model: 'VIOS', car_year: '2022', car_color: 'ขาว', car_owner: 'เจ้าของเดิม', fin: 'WIN', car_price: 450000, fin_amount: 400000, down_payment: 50000, fin_interest: 3.5, installment_period: 60, branch_sales: '팀 A', branch_name: 'Ban DU', fin_status: 'อนุมัติ', fin_note: '' },
    { bk_date: '2025-01-03', month_date: 'jan', customer_name: 'นางสาวสมหญิง รักดี', license_plate: 'ขค 5678', car_brand: 'HONDA', car_model: 'CITY', car_year: '2021', car_color: 'ดำ', car_owner: 'เจ้าของเดิม', fin: 'TB', car_price: 520000, fin_amount: 450000, down_payment: 70000, fin_interest: 3.2, installment_period: 72, branch_sales: '팀 B', branch_name: 'Mae Chan', fin_status: 'ส่งมอบแล้ว', fin_note: '' },
    { bk_date: '2025-01-05', month_date: 'jan', customer_name: 'นายสุขใจ มีทรัพย์', license_plate: 'คง 9012', car_brand: 'ISUZU', car_model: 'D-MAX', car_year: '2023', car_color: 'เงิน', car_owner: 'บริษัท', fin: 'KK', car_price: 680000, fin_amount: 600000, down_payment: 80000, fin_interest: 2.99, installment_period: 84, branch_sales: '팀 C', branch_name: 'Mae Sai', fin_status: 'รออนุมัติ', fin_note: 'รอเอกสาร' },
  ];
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const month = url.searchParams.get('month') || '01';
    const tabName = MONTH_TABS[month] || 'jan_table';
    
    let records: BookingRecord[];
    
    if (USE_MOCK_DATA) {
      console.log('Using mock data - set GOOGLE_SPREADSHEET_ID in .env to use real data');
      records = getMockData();
    } else {
      // Use centralized Google Auth
      const sheets = getGoogleSheets();
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${tabName}!A:S`,
      });
      
      const rows = response.data.values || [];
      
      if (rows.length === 0) {
        return new Response(JSON.stringify({ 
          success: true, 
          data: [], 
          summary: getEmptySummary() 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // ✨ Header as Key: แปลง Array เป็น Object โดยใช้ Header เป็น Key
      const headers = rows[0].map(h => String(h).trim());
      
      const parseNum = (val: string) => parseFloat(val?.replace(/[,฿]/g, '')) || 0;
      
      records = rows.slice(1)
        .filter(row => row.some(cell => cell && cell.trim() !== '')) // Filter empty rows
        .map(row => {
          // สร้าง object จาก header
          const obj: Record<string, string> = {};
          headers.forEach((header, i) => {
            obj[header] = row[i] || '';
          });
          
          // Map to BookingRecord interface
          return {
            bk_date: obj['bk_date'] || '',
            month_date: obj['month_date'] || '',
            customer_name: obj['customer_name'] || '',
            license_plate: obj['license_plate'] || '',
            car_brand: obj['car_brand'] || '',
            car_model: obj['car_model'] || '',
            car_year: obj['car_year'] || '',
            car_color: obj['car_color'] || '',
            car_owner: obj['car_owner'] || '',
            fin: obj['fin'] || '',
            car_price: parseNum(obj['car_price']),
            fin_amount: parseNum(obj['fin_amount']),
            down_payment: parseNum(obj['down_payment']),
            fin_interest: parseNum(obj['fin_interest']),
            installment_period: parseInt(obj['installment_period']) || 0,
            branch_sales: obj['branch_sales'] || '',
            branch_name: obj['branch_name'] || '',
            fin_status: obj['fin_status'] || '',
            fin_note: obj['fin_note'] || '',
          } as BookingRecord;
        });
    }
    
    const summary = calculateSummary(records);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: records, 
      summary,
      month: tabName.replace('_table', ''),
      usingMockData: USE_MOCK_DATA,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error fetching booking summary:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function calculateSummary(records: BookingRecord[]) {
  const summary = {
    total: createBranchSummary(),
    byBranch: {} as Record<string, BranchSummary>,
  };
  
  BRANCHES.forEach(branch => {
    summary.byBranch[branch] = createBranchSummary();
  });
  
  records.forEach(record => {
    const branch = record.branch_name;
    updateBranchSummary(summary.total, record);
    if (summary.byBranch[branch]) {
      updateBranchSummary(summary.byBranch[branch], record);
    }
  });

  // Sort models
  summary.total.models.sort((a, b) => b.count - a.count);
  Object.values(summary.byBranch).forEach(b => b.models.sort((a, b) => b.count - a.count));
  
  return summary;
}

function createBranchSummary(): BranchSummary {
  return {
    totalCases: 0,
    cashPurchase: 0,
    finance: {},
    status: {},
    source: {},
    brands: {},
    models: [],
    totalPrice: 0,
  };
}

function updateBranchSummary(stats: BranchSummary, record: BookingRecord) {
  stats.totalCases++;
  stats.totalPrice += record.car_price;
  
  const fin = record.fin || "Other";
  const status = record.fin_status || "อื่นๆ";
  const source = record.car_owner || "ไม่ระบุ";
  const brand = record.car_brand;
  const model = record.car_model;
  
  if (fin.includes("สด") || fin.includes("Cash") || fin.includes("ซื้อสด")) stats.cashPurchase++;
  
  let financeKey = "Other";
  const finUpper = fin.toUpperCase();
  if (finUpper.includes("WIN")) financeKey = "WIN";
  else if (finUpper.includes("TTB") || finUpper.includes("TB")) financeKey = "TB";
  else if (finUpper.includes("SCB")) financeKey = "SCB";
  else if (finUpper.includes("KLEASING") || finUpper.includes("KB")) financeKey = "KB";
  else if (finUpper.includes("KKP") || finUpper.includes("KK")) financeKey = "KK";
  else if (finUpper.includes("NISSAN")) financeKey = "NISSAN";
  else if (finUpper.includes("NL")) financeKey = "NL";
  else if (finUpper.includes("TIL") || finUpper.includes("TISCO")) financeKey = "TIL";
  else if (finUpper.includes("KRUNGSRI")) financeKey = "Krungsri";
  else if (finUpper.includes("สด") || finUpper.includes("CASH")) financeKey = "ซื้อสด";
  
  stats.finance[financeKey] = (stats.finance[financeKey] || 0) + 1;
  
  let statusKey = "อื่นๆ";
  if (status.includes("ส่งมอบแล้ว")) statusKey = "ส่งมอบแล้ว";
  else if (status.includes("อนุมัติ") && (status.includes("รอส่งมอบ") || status.includes("ผ่าน"))) statusKey = "อนุมัติ-รอส่งมอบ";
  else if (status.includes("รออนุมัติ") || status.includes("รอผล")) statusKey = "รออนุมัติ";
  else if (status.includes("รอเซน")) statusKey = "รอเซนสัญญา";
  else if (status.includes("เอกสาร")) statusKey = "รอเอกสาร";
  else if (status.includes("จอง")) statusKey = "จอง";
  else if (status.includes("ยกเลิก")) statusKey = "ยกเลิกเคส";
  else if (status.includes("รีเจค") || status.includes("REJECT") || status.includes("ไม่ผ่านเงื่อนไข")) statusKey = "รีเจค";
  else if (status.includes("ไม่ผ่าน")) statusKey = "ไม่ผ่านเงื่อนไข / คุณสมบัติไม่ครบ";
  else if (status.includes("สด")) statusKey = "ซื้อสด-รอส่งมอบ";
  
  stats.status[statusKey] = (stats.status[statusKey] || 0) + 1;
  stats.source[source] = (stats.source[source] || 0) + 1;
  
  if (brand) {
    stats.brands[brand] = (stats.brands[brand] || 0) + 1;
    const existingModel = stats.models.find(m => m.brand === brand && m.model === model);
    if (existingModel) existingModel.count++;
    else stats.models.push({ brand, model: model || "-", count: 1 });
  }
}

function getEmptySummary() {
  const summary = {
    total: createBranchSummary(),
    byBranch: {} as Record<string, BranchSummary>,
  };
  
  BRANCHES.forEach(branch => {
    summary.byBranch[branch] = createBranchSummary();
  });
  
  return summary;
}
