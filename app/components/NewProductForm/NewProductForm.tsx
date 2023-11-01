"use client";
import { useState } from "react";
import styles from "./NewProductForm.module.css"
import Image from "next/image";

interface IVendorProduct {
    name: string;
    description: string;
    price: string;
    vendor_id: number;
}

export default function NewProductForm({ vendor_id }: { vendor_id: number }) {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        vendor_id
    });

    const handleProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewProduct(prevNewProduct => ({
            ...prevNewProduct,
            [name]: value
        }));
    };

    async function create(data: IVendorProduct) {
        try {
            fetch("http://localhost:3000/api/create", {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }).then(() => window.location.reload());
        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmit = async (data: IVendorProduct) => {
        try {
            create(data)
        } catch (error) {
            console.log(error)
        };
    }

    return (
        <form className={styles.container} onSubmit={() => handleSubmit(newProduct)}>
            <h2>Adicionar um novo produto:</h2>
            <label className={styles.labels}> Nome:
                <input className={styles.inputs} type="text" name="name" value={newProduct.name} onChange={handleProduct} />
            </label>
            <label className={styles.labels}> Descrição:
                <input className={styles.inputs} type="text" name="description" value={newProduct.description} onChange={handleProduct} />
            </label>
            <label className={styles.labels}> Preço:
                <input className={styles.inputs} type="text" name="price" value={newProduct.price} onChange={handleProduct} />
            </label>
            <button className={styles.registerBtn} type="submit">
                Cadastrar produto
                <Image
                    src="assets/plus.svg"
                    alt="Plus Icon"
                    width={16}
                    height={16}
                />
            </button>
        </form>
    )
};