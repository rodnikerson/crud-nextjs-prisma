import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Deleted Product." });
  } catch (error) {
    console.error("Erro: ", error);
    res.status(500).json({ error: "Error while excluding product." });
  }
}
