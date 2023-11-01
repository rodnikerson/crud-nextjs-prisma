import Image from "next/image";
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.techs}>
                <div className={styles.icons}>
                    <Image
                        src="/assets/nextjs.svg"
                        alt="NextJS Icon"
                        width={32}
                        height={32}
                    />
                    <Image
                        src="/assets/postgresql.svg"
                        alt="Postgresql Icon"
                        width={32}
                        height={32}
                    />
                    <Image
                        src="/assets/prisma.svg"
                        alt="Prisma Icon"
                        width={32}
                        height={32}
                    />
                    <Image
                        src="/assets/supabase.svg"
                        alt="Supabase Icon"
                        width={32}
                        height={32}
                    />
                </div>
            </div>
            <h6>Rodolpho Nikerson :)</h6>
        </footer>
    )
}