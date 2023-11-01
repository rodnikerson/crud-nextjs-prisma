import Image from "next/image";
import Price from "../Price/Price";
import styles from "./VendorIntro.module.css";

export default function VendorIntro({name, description, price, location, specialty}: {name: string, description: string, price: string, location: any, specialty: any}) {

    return (
        <div className={styles.container}>
            <div className={styles.nameAndPrice}>
                <h2>{name}</h2>
                <Price price={price} />
            </div>
            <div className={styles.locationAndSpecialty}>
                <h6 className={styles.specialtyTxt}>{specialty.name}</h6>
                <Image 
                    src={`/assets/${location.name.toLowerCase()}.svg`}
                    alt={`${location.name} Flag`}
                    width={24}
                    height={24}
                />
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    )
}