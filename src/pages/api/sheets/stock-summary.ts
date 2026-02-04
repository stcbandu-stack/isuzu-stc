import type { APIRoute } from 'astro';

// Published CSV URL - ไฟล์สต็อครถมือสอง
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6zrjonsJRrczZsDMGxtFIVOdHaVGXlyd_lD8e26kKyZxJALBix7wUqdl72vV1QQ/pub?gid=536159448&single=true&output=csv';

// Set to true to use mock data for testing
const USE_MOCK_DATA = false;

// Parse CSV string to array
function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // Skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !insideQuotes) {
      currentRow.push(currentCell);
      if (currentRow.some(cell => cell.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
      if (char === '\r') i++; // Skip \n in \r\n
    } else if (char !== '\r') {
      currentCell += char;
    }
  }
  
  // Push last cell and row
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    if (currentRow.some(cell => cell.trim() !== '')) {
      rows.push(currentRow);
    }
  }
  
  return rows;
}

interface StockRecord {
  no_id: string;
  car_count: number;
  car_supplier: string;
  car_brand: string;
  car_model: string;
  car_color: string;
  license_plate: string;
  car_year: string;
  fuel_type: string;
  engine_id: string;
  mileage: string;
  car_where: string;
  tax_year_th: string;
  tax_year_en: string;
  color_made_date: string;
  color_made_done: string;
  color_finish_date: string;
  refur_status: string;
  refur_status_update: string;
  car_status: string;
  car_price: string;
  note: string;
  move_date: string;
  second_note: string;
  car_key: string;
}

interface StockSummary {
  totalCars: number;
  byBrand: Record<string, number>;
  bySupplier: Record<string, number>;
  byLocation: Record<string, number>;
  byYear: Record<string, number>;
  byStatus: Record<string, number>;
  // Pivot tables
  pivotByLocation: {
    locations: string[];
    data: Array<{
      car_brand: string;
      car_model: string;
      [location: string]: number | string;
      total: number;
    }>;
  };
  pivotByYear: {
    years: string[];
    data: Array<{
      car_brand: string;
      car_model: string;
      [year: string]: number | string;
      total: number;
    }>;
  };
}

// Mock data for testing
function getMockData(): StockRecord[] {
  return [
    { no_id: '1', car_count: 1, car_supplier: 'SCR', car_brand: 'ISUZU', car_model: 'CAB4 1.9 Ddi S', car_color: 'เทา', license_plate: '6กง6606', car_year: '2017', fuel_type: 'ดีเซล', engine_id: 'MP1TFR87JHG061889', mileage: '182,338', car_where: 'บ้านดู่', tax_year_th: '21/9/2569', tax_year_en: '21/9/2026', color_made_date: '', color_made_done: 'ทำเสร็จแล้ว', color_finish_date: '', refur_status: 'ปรับสภาพ100%', refur_status_update: 'เพื่อโชว์รอขาย', car_status: 'ว่าง', car_price: '', note: '', move_date: '', second_note: '', car_key: '1' },
    { no_id: '2', car_count: 1, car_supplier: 'SCR', car_brand: 'TOYOTA', car_model: 'CAMRY 2.0 G', car_color: 'เทา', license_plate: '5ขส5356', car_year: '2012', fuel_type: 'เบนซิน', engine_id: 'MR053BK5104006920', mileage: '157,371', car_where: 'บ้านดู่', tax_year_th: '29/10/2569', tax_year_en: '29/10/2026', color_made_date: '', color_made_done: 'ยังไม่ได้ทำสี', color_finish_date: '', refur_status: 'ยังไม่ได้ปรับสภาพ', refur_status_update: 'เพื่อโชว์รอขาย', car_status: 'ว่าง', car_price: '', note: '', move_date: '', second_note: '', car_key: '1' },
    { no_id: '3', car_count: 1, car_supplier: 'MKT', car_brand: 'HONDA', car_model: 'CIVIC 1.8 E', car_color: 'ขาว', license_plate: '4กข1234', car_year: '2020', fuel_type: 'เบนซิน', engine_id: 'SHHFC1750KL034234', mileage: '45,000', car_where: 'แม่สาย', tax_year_th: '15/6/2569', tax_year_en: '15/6/2026', color_made_date: '', color_made_done: 'ทำเสร็จแล้ว', color_finish_date: '', refur_status: 'ปรับสภาพ100%', refur_status_update: 'เพื่อโชว์รอขาย', car_status: 'ว่าง', car_price: '650,000', note: '', move_date: '', second_note: '', car_key: '1' },
  ];
}

export const GET: APIRoute = async () => {
  try {
    let records: StockRecord[];
    
    if (USE_MOCK_DATA) {
      console.log('Using mock data - set USE_MOCK_DATA to false to use real data');
      records = getMockData();
    } else {
      // Fetch from Published CSV
      const response = await fetch(CSV_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      const rows = parseCSV(csvText);
      
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
      
      records = rows.slice(1)
        .filter(row => row.some(cell => cell && String(cell).trim() !== '')) // Filter empty rows
        .map(row => {
          // สร้าง object จาก header
          const obj: Record<string, string> = {};
          headers.forEach((header, i) => {
            obj[header] = row[i] || '';
          });
          
          // Map to StockRecord interface
          return {
            no_id: obj['no_id'] || '',
            car_count: parseInt(obj['car_count']) || 0,
            car_supplier: (obj['car_supplier'] || '').trim(),
            car_brand: (obj['car_brand'] || '').trim(),
            car_model: (obj['car_model'] || '').trim(),
            car_color: (obj['car_color'] || '').trim(),
            license_plate: (obj['license_plate'] || '').trim(),
            car_year: (obj['car_year'] || '').trim(),
            fuel_type: (obj['fuel_type'] || '').trim(),
            engine_id: (obj['engine_id'] || '').trim(),
            mileage: (obj['mileage'] || '').trim(),
            car_where: (obj['car_where'] || '').trim(),
            tax_year_th: obj['tax_year_th'] || '',
            tax_year_en: obj['tax_year_en'] || '',
            color_made_date: obj['color_made_date'] || '',
            color_made_done: (obj['color_made_done'] || '').trim(),
            color_finish_date: obj['color_finish_date'] || '',
            refur_status: (obj['refur_status'] || '').trim(),
            refur_status_update: (obj['refur_status_update'] || '').trim(),
            car_status: (obj['car_status'] || '').trim(),
            car_price: obj['car_price'] || '',
            note: obj['note'] || '',
            move_date: obj['move_date'] || '',
            second_note: obj['second_note'] || '',
            car_key: obj['car_key'] || '',
          } as StockRecord;
        });
    }
    
    const summary = calculateSummary(records);
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: records, 
      summary,
      usingMockData: USE_MOCK_DATA,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error fetching stock summary:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function calculateSummary(records: StockRecord[]): StockSummary {
  const summary: StockSummary = {
    totalCars: 0,
    byBrand: {},
    bySupplier: {},
    byLocation: {},
    byYear: {},
    byStatus: {},
    pivotByLocation: { locations: [], data: [] },
    pivotByYear: { years: [], data: [] },
  };
  
  // Collect unique locations and years
  const locationsSet = new Set<string>();
  const yearsSet = new Set<string>();
  
  records.forEach(record => {
    // Count total cars
    const count = record.car_count || 1;
    summary.totalCars += count;
    
    // By Brand
    const brand = record.car_brand || 'ไม่ระบุ';
    summary.byBrand[brand] = (summary.byBrand[brand] || 0) + count;
    
    // By Supplier
    const supplier = record.car_supplier || 'ไม่ระบุ';
    summary.bySupplier[supplier] = (summary.bySupplier[supplier] || 0) + count;
    
    // By Location
    const location = record.car_where || 'ไม่ระบุ';
    summary.byLocation[location] = (summary.byLocation[location] || 0) + count;
    locationsSet.add(location);
    
    // By Year
    const year = record.car_year || 'ไม่ระบุ';
    summary.byYear[year] = (summary.byYear[year] || 0) + count;
    yearsSet.add(year);
    
    // By Status
    const status = record.car_status || 'ไม่ระบุ';
    summary.byStatus[status] = (summary.byStatus[status] || 0) + count;
  });
  
  // Sort locations and years
  summary.pivotByLocation.locations = Array.from(locationsSet).sort();
  summary.pivotByYear.years = Array.from(yearsSet).filter(y => y !== 'ไม่ระบุ').sort((a, b) => parseInt(a) - parseInt(b));
  
  // Create pivot data by Location
  const pivotLocationMap = new Map<string, { car_brand: string; car_model: string; counts: Record<string, number> }>();
  
  records.forEach(record => {
    const brand = (record.car_brand || 'ไม่ระบุ').trim();
    const model = (record.car_model || '-').trim();
    const location = (record.car_where || 'ไม่ระบุ').trim();
    const count = record.car_count || 1;
    const key = `${brand}|||${model}`;
    
    if (!pivotLocationMap.has(key)) {
      pivotLocationMap.set(key, { car_brand: brand, car_model: model, counts: {} });
    }
    
    const entry = pivotLocationMap.get(key)!;
    entry.counts[location] = (entry.counts[location] || 0) + count;
  });
  
  // Convert to array and sort
  summary.pivotByLocation.data = Array.from(pivotLocationMap.values())
    .map(entry => {
      const row: any = { car_brand: entry.car_brand, car_model: entry.car_model };
      let total = 0;
      summary.pivotByLocation.locations.forEach(loc => {
        row[loc] = entry.counts[loc] || 0;
        total += entry.counts[loc] || 0;
      });
      row.total = total;
      return row;
    })
    .sort((a, b) => {
      const brandCompare = a.car_brand.localeCompare(b.car_brand);
      if (brandCompare !== 0) return brandCompare;
      return a.car_model.localeCompare(b.car_model);
    });
  
  // Create pivot data by Year
  const pivotYearMap = new Map<string, { car_brand: string; car_model: string; counts: Record<string, number> }>();
  
  records.forEach(record => {
    const brand = (record.car_brand || 'ไม่ระบุ').trim();
    const model = (record.car_model || '-').trim();
    const year = (record.car_year || 'ไม่ระบุ').trim();
    const count = record.car_count || 1;
    const key = `${brand}|||${model}`;
    
    if (!pivotYearMap.has(key)) {
      pivotYearMap.set(key, { car_brand: brand, car_model: model, counts: {} });
    }
    
    const entry = pivotYearMap.get(key)!;
    entry.counts[year] = (entry.counts[year] || 0) + count;
  });
  
  // Convert to array and sort
  summary.pivotByYear.data = Array.from(pivotYearMap.values())
    .map(entry => {
      const row: any = { car_brand: entry.car_brand, car_model: entry.car_model };
      let total = 0;
      summary.pivotByYear.years.forEach(yr => {
        row[yr] = entry.counts[yr] || 0;
        total += entry.counts[yr] || 0;
      });
      row.total = total;
      return row;
    })
    .sort((a, b) => {
      const brandCompare = a.car_brand.localeCompare(b.car_brand);
      if (brandCompare !== 0) return brandCompare;
      return a.car_model.localeCompare(b.car_model);
    });
  
  return summary;
}

function getEmptySummary(): StockSummary {
  return {
    totalCars: 0,
    byBrand: {},
    bySupplier: {},
    byLocation: {},
    byYear: {},
    byStatus: {},
    pivotByLocation: { locations: [], data: [] },
    pivotByYear: { years: [], data: [] },
  };
}
