global.userSessions = global.userSessions || {};

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('OK');

  const message = req.body.message?.text || "";
  const textArray = message.toLowerCase().trim().split(" ");

  if (textArray.length === 2) {
    const command = textArray[0]; // "kirim" atau "stop"
    const session = textArray[1].toUpperCase(); // "X1Y2Z3"

    if (command === "kirim" || command === "stop") {
      global.userSessions[session] = command;
    }
  }

  res.status(200).send("OK");
}

