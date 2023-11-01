import VendorCard from './components/VendorCard/VendorCard';
import styles from './page.module.css'
import { PrismaClient, Location, Specialty, PRICE } from "@prisma/client"

const prisma = new PrismaClient();

export interface IVendorCard {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: PRICE;
  location: Location;
  specialty: Specialty;
}

const fetchVendors = async (): Promise<IVendorCard[]> => {
  const vendors = await prisma.vendor.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      price: true,
      location: true,
      specialty: true
    }
  });

  return vendors;
};

export default async function Home() {
  const vendors = await fetchVendors();
  return (
    <main className={styles.main}>
      <h1>Selecione um fornecedor:</h1>
      <div className={styles.cardsContainer}>
        {vendors.map((vendor) => (
          <VendorCard vendor={vendor} key={vendor.id} />
        )
        )}
      </div>
    </main>
  )
}
