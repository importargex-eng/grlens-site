// Netlify Function: register.js
// Guarda registros en Google Sheets. Divide por ZONA creando/usa una hoja con ese nombre.
import { google } from 'googleapis';

export async function handler(event, context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const { nombre, mail, zona, optica } = JSON.parse(event.body || '{}');
    if (!nombre || !mail || !zona || !optica) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Faltan campos requeridos' }) };
    }

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '';
    key = key.replace(/\\n/g, '\n'); // reparar saltos de línea
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!email || !key || !sheetId) {
      return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Variables de entorno faltantes' }) };
    }

    const auth = new google.auth.JWT(email, null, key, ['https://www.googleapis.com/auth/spreadsheets']);
    const sheets = google.sheets({ version: 'v4', auth });

    // asegurar hoja por zona
    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const exists = (meta.data.sheets || []).find(s => s.properties.title === zona);
    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: zona } } }] }
      });
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${zona}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [["fecha_iso","nombre","mail","zona","optica","ip"]] }
      });
    }

    const now = new Date().toISOString();
    const clientIp = (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || '').split(',')[0];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${zona}!A:A`,
      valueInputOption: 'RAW',
      requestBody: { values: [[ now, nombre, mail, zona, optica, clientIp ]] }
    });

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: String(err) }) };
  }
}
