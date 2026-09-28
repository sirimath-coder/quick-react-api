export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only GET / POST
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      status: false,
      message: "Method not allowed"
    });
  }

  try {
    let data = {};

    if (req.method === "GET") {
      data = req.query || {};
    }

    if (req.method === "POST") {
      data =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};
    }

    return res.status(200).json({
      status: true,
      message: "Quick React API is working 🚀",
      data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
    }
