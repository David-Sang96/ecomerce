import { prisma } from "@/utils/db/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany();
    return res.send(products);
  }
  res.status(405).send("Invalid method");
}
