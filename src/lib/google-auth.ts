import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

/**
 * Google Sheets Authentication Helper
 * 
 * รองรับ 2 วิธี:
 * 1. Environment Variable (GOOGLE_CREDENTIALS) - แนะนำสำหรับ Vercel/Production
 * 2. ไฟล์ JSON - สำหรับ Local Development
 * 
 * วิธีตั้งค่า Vercel:
 * 1. ไปที่ Vercel Dashboard > Project > Settings > Environment Variables
 * 2. เพิ่ม GOOGLE_CREDENTIALS = (paste JSON ทั้งหมดจากไฟล์ credentials)
 * 3. Deploy ใหม่
 */

interface GoogleCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain?: string;
}

export function getGoogleAuth() {
  let credentials: GoogleCredentials;

  // วิธีที่ 1: อ่านจาก Environment Variable (Vercel)
  const envCredentials = process.env.GOOGLE_CREDENTIALS || import.meta.env.GOOGLE_CREDENTIALS;
  
  if (envCredentials) {
    try {
      credentials = JSON.parse(envCredentials);
      console.log('Using Google credentials from environment variable');
    } catch (e) {
      throw new Error('Invalid GOOGLE_CREDENTIALS JSON in environment variable');
    }
  } else {
    // วิธีที่ 2: อ่านจากไฟล์ (Local Development)
    const possiblePaths = [
      path.join(process.cwd(), 'stc-data-api-2f7c2156fe65.json'),
      path.join(process.cwd(), 'google-credentials.json'),
      '/etc/secrets/google-credentials.json',
    ];

    let credentialsPath = '';
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        credentialsPath = p;
        break;
      }
    }

    if (!credentialsPath) {
      throw new Error(
        'Google credentials not found. Either:\n' +
        '1. Set GOOGLE_CREDENTIALS environment variable (for Vercel)\n' +
        '2. Place credentials JSON file in project root (for local dev)'
      );
    }

    credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    console.log('Using Google credentials from file:', credentialsPath);
  }

  // สร้าง Google Auth instance
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return auth;
}

export function getGoogleSheets() {
  const auth = getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
}
