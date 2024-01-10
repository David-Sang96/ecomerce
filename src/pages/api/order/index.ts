import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db/db";
import { OrderStatus, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartId = cartItems.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: cartId } },
    });

    //never trust client so We have to use database price and times with client products' quantities at counting total prices
    const getProductPrice = (item: CartItem) => {
      const product = products.find(
        (product) => product.id === item.id
      ) as Product;
      return product.price * item.quantity;
    };
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const price = getProductPrice(item);
      totalPrice += price;
    });
    const createdOrder = await prisma.order.create({
      data: { status: OrderStatus.ORDERED, totalPrice },
    });
    const orderId = createdOrder.id;
    cartItems.forEach(async (item) => {
      const data = {
        orderId,
        productId: item.id,
        quantity: item.quantity,
      };
      await prisma.orderLine.create({ data });
    });

    return res.status(200).send({ orderId, status: OrderStatus.ORDERED });
  }
  res.status(405).send("Request Not ALlowed");
}
