export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    const data =
      req.method === "GET"
        ? req.query
        : typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};

    /*
      මෙතනට quick-react service එකේ
      actual API request එක දාන්න ඕන.

      උදාහරණ:
      const response = await fetch("ACTUAL_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
    */

    return res.status(200).json({
      status: true,
      message: "API is working",
      received: data
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
}