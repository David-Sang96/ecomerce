import { prisma } from "@/utils/db/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const query = req.query;
    const orderId = Number(query.id);
    if (!orderId) res.status(400).send("Bad Request..");
    const isFound = await prisma.order.findFirst({ where: { id: orderId } });
    if (!isFound) res.status(400).send("Bad Request...");
    await prisma.orderLine.deleteMany({ where: { orderId } });
    await prisma.order.deleteMany({ where: { id: orderId } });
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
