import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL');
  } catch (error) {
    console.error('❌ Could not connect to PostgreSQL:', error);
  }
}

testConnection();


app.get("/", (_req, res) => {
  res.send("Server is up and running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});






