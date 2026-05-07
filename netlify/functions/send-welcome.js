const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let name, email;
  try {
    ({ name, email } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (!name || !email) {
    return { statusCode: 400, body: 'Missing name or email' };
  }

  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) {
    console.error('[send-welcome] ERROR: MAILERSEND_API_KEY no configurada');
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'API key not configured' }) };
  }

  console.log(`[send-welcome] Enviando bienvenida a: ${email} (${name})`);

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Georgia',serif;">
  <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
    <div style="background:#2C1A0E;padding:36px 40px;text-align:center;">
      <div style="font-size:2.2rem;font-weight:900;color:#C9A96E;letter-spacing:.1em;">KAOS</div>
      <div style="color:rgba(255,255,255,.5);font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;margin-top:4px;">Decoración · Madrid</div>
    </div>
    <div style="padding:40px 40px 32px;">
      <h1 style="font-size:1.5rem;color:#2C1A0E;margin:0 0 12px;">¡Bienvenido/a, ${name}! 🎉</h1>
      <p style="color:#5a4a3a;line-height:1.7;margin:0 0 20px;">
        Gracias por unirte a la familia de <strong>Kaos Decoración</strong>. Estamos muy contentos de tenerte aquí.
      </p>
      <p style="color:#5a4a3a;line-height:1.7;margin:0 0 28px;">
        En nuestra tienda encontrarás piezas artesanales únicas, hechas a mano con amor en nuestro taller de Madrid. Lámparas, bolsos, cojines y mucho más.
      </p>
      <div style="text-align:center;margin:28px 0;">
        <a href="https://frabjous-marshmallow-6f925e.netlify.app/tienda.html"
           style="background:#C9A96E;color:#2C1A0E;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:.95rem;letter-spacing:.04em;display:inline-block;">
          Explorar la tienda →
        </a>
      </div>
      <div style="background:#FAF7F2;border:1.5px solid #C9A96E;border-radius:10px;padding:16px 20px;text-align:center;margin-top:24px;">
        <div style="font-size:.75rem;color:#8a7060;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Tu código de bienvenida</div>
        <div style="font-size:1.6rem;font-weight:900;color:#2C1A0E;letter-spacing:.15em;">KAOS10</div>
        <div style="font-size:.78rem;color:#8a7060;margin-top:4px;">10% de descuento en tu primer pedido</div>
      </div>
    </div>
    <div style="background:#2C1A0E;padding:20px 40px;text-align:center;">
      <p style="color:rgba(255,255,255,.35);font-size:.72rem;margin:0;">
        © 2025 Kaos Decoración · Lavapiés, Madrid · <a href="mailto:hola@kaos.es" style="color:#C9A96E;">hola@kaos.es</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `¡Bienvenido/a a Kaos Decoración, ${name}!\n\nGracias por registrarte. Usa el código KAOS10 para un 10% de descuento en tu primer pedido.\n\nVisítanos en: https://frabjous-marshmallow-6f925e.netlify.app\n\nKaos Decoración · hola@kaos.es`;

  const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'MS_kaos@trial-3z0vklo6.mlsender.net';
  const fromName  = process.env.MAILERSEND_FROM_NAME  || 'Kaos Decoración';

  const payload = JSON.stringify({
    from: { email: fromEmail, name: fromName },
    to: [{ email, name }],
    subject: `¡Bienvenido/a a Kaos Decoración, ${name}!`,
    html,
    text
  });

  console.log(`[send-welcome] From: ${fromEmail} | To: ${email} | API key starts: ${apiKey.substring(0,8)}...`);

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.mailersend.com',
      path: '/v4/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`[send-welcome] MailerSend status: ${res.statusCode}`);
        if (res.statusCode === 202) {
          console.log(`[send-welcome] ✓ Email enviado correctamente a ${email}`);
          resolve({ statusCode: 200, body: JSON.stringify({ ok: true }) });
        } else {
          console.error(`[send-welcome] ✗ MailerSend error ${res.statusCode}:`, data);
          resolve({ statusCode: 200, body: JSON.stringify({ ok: false, statusCode: res.statusCode, error: data }) });
        }
      });
    });
    req.on('error', (e) => {
      console.error('[send-welcome] Request error:', e.message);
      resolve({ statusCode: 200, body: JSON.stringify({ ok: false, error: e.message }) });
    });
    req.write(payload);
    req.end();
  });
};
