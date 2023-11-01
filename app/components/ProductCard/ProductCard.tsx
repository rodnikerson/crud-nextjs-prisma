"use client";

import { useState } from "react";
import EditProductModal from "../EditProductModal/EditProductModal";
import styles from "./ProductCard.module.css"
import Image from "next/image";

interface IProductData {
    id: number;
    name: string;
    description: string;
    price: string;
};

export default function ProductCard({ product }: { product: IProductData }) {
    const { id, name, description, price } = product;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    async function deleteProduct(data: number) {
        try {
            fetch("http://localhost:3000/api/delete", {
                body: JSON.stringify({ id: data }),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "DELETE"
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <div className={styles.container}>
            {
                !isEditing ?
                    <>
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <p>{price}</p>
                        <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                            <Image
                                src="assets/edit.svg"
                                alt="Pencil Icon"
                                width={20}
                                height={20}
                            />
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteProduct(id)}>
                            <Image
                                src="assets/delete.svg"
                                alt="Trash Icon"
                                width={20}
                                height={20}
                            />
                        </button>
                    </>
                    :
                    <EditProductModal product={product} setIsEditing={setIsEditing} />
            }
        </div>
    )
};