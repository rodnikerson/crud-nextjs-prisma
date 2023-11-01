import { PrismaClient, PRICE } from "@prisma/client";
import styles from '../page.module.css';
import NewProductForm from "../components/NewProductForm/NewProductForm";
import ProductCard from "../components/ProductCard/ProductCard";
import VendorIntro from "../components/VendorIntro/VendorIntro";

const prisma = new PrismaClient();

interface Vendor {
    id: number;
    name: string;
    description: string;
    price: PRICE;
    location: {
        name: string;
    };
    specialty: {
        name: string;
    };
    products: {
        id: number;
        name: string;
        description: string;
        price: string;
    }[];
};

const fetchVendorBySlug = async (slug: string): Promise<Vendor> => {
    const vendor = await prisma.vendor.findFirst({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            location: {
                select: {
                    name: true
                }
            },
            specialty: {
                select: {
                    name: true
                }
            },
            products: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true
                }
            }
        }
    });

    if (!vendor) {
        throw new Error(`Loja não encontrada com o 'slug' ${slug}`);
    };

    return vendor;
};

export default async function VendorDetails({ params }: { params: { slug: string } }) {
    const vendor = await fetchVendorBySlug(params.slug);

    const { name, description, price, location, specialty } = vendor;

    return (
        <main className={styles.main}>
            <h1>Fornecedor:</h1>
            <div className={styles.storeAndNewProduct}>
                <VendorIntro name={name} description={description} price={price} location={location} specialty={specialty} />
                <NewProductForm vendor_id={vendor.id} />
            
            <div className={styles.products}>
                {
                    vendor?.products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
            </div>
        </main>
    )
};