import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "chat-bot";

export interface SignupData {
  email: string;
  password: string;
}

let cachedClient: MongoClient | null = null;

async function connectToDB() {
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }
  return cachedClient.db(dbName);
}

export async function signup({ email, password }: SignupData) {
  const db = await connectToDB();
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await users.insertOne({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return {
    id: result.insertedId,
    email,
  };
}
