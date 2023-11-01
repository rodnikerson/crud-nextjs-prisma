import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, price, vendor_id } = req.body;

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        vendor: {
          connect: {
            id: vendor_id,
          },
        },
      },
    });

    res.status(200).json({ message: "Created Product." });
  } catch (error) {
    console.log("Error: ", error);
  }
}
