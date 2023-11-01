import Link from "next/link";
import { IVendorCard } from "../../page";
import styles from "./VendorCard.module.css";
import Price from "../Price/Price";

export default function VendorCard({ vendor }: { vendor: IVendorCard }): JSX.Element {
    const { name, description, specialty, slug, price } = vendor;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.mainInfo}>
                <div className={styles.vendorChars}>
                    <h2 className={styles.name}>{name}</h2>
                    <Price price={price} />
                </div>
                <h6 className={styles.companySpecialty}>{specialty.name}</h6>
            </div>
            <p className={styles.companyDescription}>{description}</p>
            <Link href={slug}>
                <button className={styles.companyBtn}>Visualizar fornecedor</button>
            </Link>
        </div>
    )
};