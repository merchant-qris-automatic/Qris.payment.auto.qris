global.activeSessions = global.activeSessions || [];
global.userSessions = global.userSessions || {};

export default async function handler(req, res) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  // 1. Ubah status SEMUA session yang sedang loading menjadi "kirim"
  if (global.activeSessions.length > 0) {
    global.activeSessions.forEach(session => {
      global.userSessions[session] = "kirim"; // Otomatis redirect ke Edgeone
    });
    
    // Bersihkan daftar antrean setelah dieksekusi
    const approvedCount = global.activeSessions.length;
    global.activeSessions = [];

    // 2. Kirim notifikasi sukses otomatis ke Telegram
    const text = `✅ *PEMBAYARAN DANA TERDETEKSI!*\n\nMacroDroid telah memicu webhook. Sistem otomatis mengarahkan ${approvedCount} user yang sedang loading ke link download EdgeOne.`;
    
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" })
      });
    } catch (err) {}

    return res.status(200).json({ success: true, message: "Auto-approve berhasil dikirim ke frontend" });
  } else {
    // Jika ada notif DANA tapi tidak ada user yang sedang loading
    return res.status(200).json({ success: false, message: "Notif diterima, tapi tidak ada user di antrean loading" });
  }
}
