import Image from "next/image";
import styles from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <Image
                    src="/assets/bag-buy.svg"
                    alt="Bag Icon"
                    width={48}
                    height={48}
                />
            </Link>
            <p className={styles.crud}># CRUD</p>
        </header>
    )
}