import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// สร้าง Resend instance ด้วย API Key
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// อีเมลล์ที่จะรับ Lead (ใช้ Environment Variable เพื่อเปลี่ยนได้ง่าย)
const COMPANY_EMAIL = import.meta.env.LEAD_NOTIFY_EMAIL || 'mkt.bu@isuzu-stc.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    const {
      fullName,
      phone,
      branch,
      lineId,
      email,
      promotionTitle,
      promotionDetail,
      sourceUrl
    } = body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!fullName || !phone || !branch) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // สร้าง HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 10px 0 0; opacity: 0.9; }
    .content { padding: 30px; }
    .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
    .field:last-child { border-bottom: none; }
    .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
    .value { font-size: 16px; color: #333; font-weight: 500; }
    .promotion-box { background: #fff5f5; border-left: 4px solid #c41e3a; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .promotion-title { color: #c41e3a; font-weight: bold; font-size: 18px; margin-bottom: 8px; }
    .promotion-detail { color: #666; font-size: 14px; line-height: 1.6; }
    .footer { background: #f9f9f9; padding: 20px 30px; text-align: center; color: #888; font-size: 12px; }
    .cta-button { display: inline-block; background: #c41e3a; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Lead ใหม่จากเว็บไซต์!</h1>
      <p>มีลูกค้าสนใจโปรโมชั่น</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">ชื่อ-นามสกุล</div>
        <div class="value">${fullName}</div>
      </div>
      
      <div class="field">
        <div class="label">เบอร์โทรติดต่อ</div>
        <div class="value"><a href="tel:${phone}" style="color: #c41e3a; text-decoration: none;">${phone}</a></div>
      </div>
      
      <div class="field">
        <div class="label">สาขาที่สะดวก</div>
        <div class="value">${branch}</div>
      </div>
      
      ${lineId ? `
      <div class="field">
        <div class="label">LINE ID</div>
        <div class="value">${lineId}</div>
      </div>
      ` : ''}
      
      ${email ? `
      <div class="field">
        <div class="label">อีเมล</div>
        <div class="value"><a href="mailto:${email}" style="color: #c41e3a; text-decoration: none;">${email}</a></div>
      </div>
      ` : ''}
      
      <div class="promotion-box">
        <div class="promotion-title">${promotionTitle || 'ไม่ระบุ'}</div>
        <div class="promotion-detail">${promotionDetail || '-'}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>แหล่งที่มาลูกค้า มาจาก: ${sourceUrl || 'เว็บไซต์'}</p>
      <p>วันที่: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</p>
      <p style="margin-top: 15px;">© ${new Date().getFullYear()} ISUZU STC - ระบบ Lead Management</p>
    </div>
  </div>
</body>
</html>
    `;

    // ส่งอีเมลล์ผ่าน Resend
    const { data, error } = await resend.emails.send({
      from: 'info <noreply@isuzu-stc.com>', // ใช้โดเมนที่ verify แล้ว
      to: [COMPANY_EMAIL],
      subject: `ลูกค้า ${fullName} สนใจ ${promotionTitle || 'โปรโมชั่น'}`,
      html: htmlContent,
      // สามารถเพิ่ม CC ได้ถ้าต้องการ
      cc: ['mkt.cr@isuzu-stc.com'],
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err: any) {
    console.error('API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
