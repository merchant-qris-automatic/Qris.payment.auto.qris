global.userSessions = global.userSessions || {};

export default function handler(req, res) {
  const { session } = req.query;
  
  if (!session) return res.status(400).json({ error: "No session provided" });

  const currentStatus = global.userSessions[session] || "waiting";

  // Hapus perintah setelah dijemput frontend agar tidak loop
  if (currentStatus === "kirim" || currentStatus === "stop") {
    delete global.userSessions[session];
  }

  res.status(200).json({ status: currentStatus });
}
