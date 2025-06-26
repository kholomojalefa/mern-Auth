const allowedOrigins = [
  process.env.FRONTEND_URL, // dev
  //"https://your-frontend-domain.vercel.app", // prod (optional for now)
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies to be sent
};

module.exports = corsOptions;
