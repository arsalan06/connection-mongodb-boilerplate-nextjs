// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "@/util/mongodb"
export default async function handler(req, res) {
  const { db } = await connectToDatabase()
  const data = await db.collection("user").find({}).limit(1).toArray()
  res.status(200).json(data)
}
