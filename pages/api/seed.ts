// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await prisma.product.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.location.deleteMany();
  await prisma.specialty.deleteMany();

  await prisma.location.createMany({
    data: [
      { name: "Brazil" },
      { name: "Argentina" },
      { name: "Colombia" },
      { name: "Chile" },
      { name: "Peru" },
    ],
  });

  await prisma.specialty.createMany({
    data: [
      { name: "home appliances" },
      { name: "small appliances" },
      { name: "services" },
    ],
  });

  const locations = await prisma.location.findMany();
  const specialties = await prisma.specialty.findMany();

  const brLocationId =
    locations.find((location) => location.name === "Brazil")?.id || 1;
  const arLocationId =
    locations.find((location) => location.name === "Argentina")?.id || 1;
  const coLocationId =
    locations.find((location) => location.name === "Colombia")?.id || 1;
  const clLocationId =
    locations.find((location) => location.name === "Chile")?.id || 1;
  const peLocationId =
    locations.find((location) => location.name === "Peru")?.id || 1;

  const homeAppliancesId =
    specialties.find((specialty) => specialty.name === "home appliances")?.id ||
    1;
  const smallAppliancesId =
    specialties.find((specialty) => specialty.name === "small appliances")
      ?.id || 1;
  const servicesId =
    specialties.find((specialty) => specialty.name === "services")?.id || 1;

  await prisma.vendor.createMany({
    data: [
      {
        name: "Electrolux",
        price: PRICE.REGULAR,
        description:
          "Encontre eletrodomésticos e eletroportáteis da Electrolux, a melhor tecnologia em uma linha completa. Compre online com segurança.",
        slug: "electrolux",
        location_id: brLocationId,
        specialty_id: homeAppliancesId,
      },
      {
        name: "Shopclub",
        price: PRICE.CHEAP,
        description:
          "Shopclub é o Outlet da Electrolux e Continental. Aqui você encontra eletrodomésticos, eletroportáteis e mais com Descontos Especiais.",
        slug: "shopclub",
        location_id: arLocationId,
        specialty_id: smallAppliancesId,
      },
      {
        name: "Fensa",
        price: PRICE.EXPENSIVE,
        description:
          "La Revancha Fensa | Hasta 70% Off + 12 cuotas sin interés.",
        slug: "tiendafensa",
        location_id: coLocationId,
        specialty_id: servicesId,
      },
      {
        name: "Continental",
        price: PRICE.CHEAP,
        description:
          "Loja Oficial da Continental. Os lançamentos estão aqui! Encontre seu produto ideal!",
        slug: "continental",
        location_id: clLocationId,
        specialty_id: homeAppliancesId,
      },
      {
        name: "Gafa",
        price: PRICE.REGULAR,
        description:
          "Comprá electrodomésticos Electrolux, estufas, cocinas, heladeras, cavas y más productos Electrolux.",
        slug: "tiendagafa",
        location_id: peLocationId,
        specialty_id: smallAppliancesId,
      },
    ],
  });

  const vendors = await prisma.vendor.findMany();

  const electroluxId =
    vendors.find((vendor) => vendor.name === "Electrolux")?.id || 1;
  const shopclubId =
    vendors.find((vendor) => vendor.name === "Shopclub")?.id || 1;
  const fensaId = vendors.find((vendor) => vendor.name === "Fensa")?.id || 1;
  const continentalId =
    vendors.find((vendor) => vendor.name === "Continental")?.id || 1;
  const gafaId = vendors.find((vendor) => vendor.name === "Gafa")?.id || 1;

  await prisma.product.createMany({
    data: [
      {
        name: "Geladeira (AB123)",
        description: "Geladeira básica de uma porta.",
        price: "$500.00",
        vendor_id: electroluxId,
      },
      {
        name: "Geladeira (XY321)",
        description: "Geladeira básica de duas portas.",
        price: "$750.00",
        vendor_id: electroluxId,
      },
      {
        name: "Fogão (WZ456)",
        description: "Fogão tradicional de 5 bocas.",
        price: "$200.00",
        vendor_id: electroluxId,
      },
      {
        name: "Fogão (KL654)",
        description: "Fogão elétrico de 3 bocas.",
        price: "$250.00",
        vendor_id: electroluxId,
      },
      {
        name: "Adega (AZ789)",
        description: "Adega de uma porta.",
        price: "$300.00",
        vendor_id: electroluxId,
      },
      {
        name: "Aspirador de Pó (AR567)",
        description: "Aspirador de pó portátil.",
        price: "$100.00",
        vendor_id: shopclubId,
      },
      {
        name: "Cafeteira (CF963)",
        description: "Cafeteira básica de 1L.",
        price: "$75.00",
        vendor_id: shopclubId,
      },
      {
        name: "Batedeira (VA205)",
        description: "Batedeira comum.",
        price: "$275.00",
        vendor_id: shopclubId,
      },
      {
        name: "Ar-condicionado - Serviço (SV001)",
        description: "Instalação e manutenção de qualquer ar-condicionado.",
        price: "$50.00",
        vendor_id: fensaId,
      },
      {
        name: "Geladeira - Serviço (SV002)",
        description: "Instalação e manutenção de qualquer geladeira.",
        price: "$50.00",
        vendor_id: fensaId,
      },
      {
        name: "Geladeira (AU300)",
        description: "Geladeira básica de 3 portas.",
        price: "$1000.00",
        vendor_id: continentalId,
      },
      {
        name: "Congelador (UY025)",
        description: "Congelador básico de 1 porta.",
        price: "$325.00",
        vendor_id: continentalId,
      },
      {
        name: "Umidificador (HO002)",
        description: "Umidificador de ar.",
        price: "$100.00",
        vendor_id: continentalId,
      },
      {
        name: "Televisão (LE270)",
        description: "Televisão de 42 polegadas.",
        price: "$1250.00",
        vendor_id: gafaId,
      },
      {
        name: "Telefone (RA007)",
        description: "Telefone fixo.",
        price: "$75.00",
        vendor_id: gafaId,
      },
    ],
  });

  res.status(200).json({ name: "Database succesfully seeded!" });
}
