import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, newName, newDescription, newPrice } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: newName,
        description: newDescription,
        price: newPrice,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error while updating product." });
  }
}
