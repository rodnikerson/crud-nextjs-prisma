"use client";

import { useState } from "react";
import styles from "./EditProductModal.module.css"
import Image from "next/image";

interface IProductData {
    id: number;
    name: string;
    description: string;
    price: string;
}

interface IEditedProductData {
    id: number;
    newName: string;
    newDescription: string;
    newPrice: string;
}

export default function EditProductModal({ product, setIsEditing }: { product: IProductData, setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { id, name, description, price } = product

    const [editProduct, setEditProduct] = useState<IEditedProductData>({
        id,
        newName: name,
        newDescription: description,
        newPrice: price
    })

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditProduct(prevEditProduct => ({
            ...prevEditProduct,
            [name]: value
        }));
    };

    async function updateProduct(data: IEditedProductData) {
        try {
            fetch("http://localhost:3000/api/update", {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT"
            }).then(() => {
                setEditProduct({ newName: "", newDescription: "", newPrice: "", id })
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <input className={styles.inputs} type="text" name="newName" placeholder="Nome" value={editProduct.newName} onChange={handleEdit} />
            <input className={styles.inputs} type="text" name="newDescription" placeholder="Descrição" value={editProduct.newDescription} onChange={handleEdit} />
            <input className={styles.inputs} type="text" name="newPrice" placeholder="Preço" value={editProduct.newPrice} onChange={handleEdit} />
            <div>
                <button className={styles.okBtn} onClick={() => updateProduct(editProduct)}>
                    <Image
                        src="assets/correct.svg"
                        alt="Correct Icon"
                        width={20}
                        height={20}
                    />
                </button>
                <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                    <Image
                        src="assets/cancel.svg"
                        alt="Cancel Icon"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </>
    )
};