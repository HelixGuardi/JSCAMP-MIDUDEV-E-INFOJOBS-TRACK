import cors from "cors";

const ACCEPTED_ORIGINS = [
  "localhost:5173",
  "http://localhost:5173",
  "https://localhost:5173",
  "https://localhost:5173/search",
  "https://localhost:5173/jobs",
  "http://localhost:3000",
  "http://localhost:8888",
  "https://midu.dev",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido"));
    },
  });
};
