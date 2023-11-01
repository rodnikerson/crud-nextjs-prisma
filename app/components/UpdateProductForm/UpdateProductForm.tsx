"use client";
import { useState } from "react";

interface IProductData {
    name: string;
    description: string;
    price: string;
    vendor_id: number;
}

export default function UpdateProductForm({ vendor_id }: { vendor_id: number }) {
    const [updateProduct, setUpdateProduct] = useState({
        name: "",
        description: "",
        price: "",
        vendor_id
    });

    const handleProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUpdateProduct(prevUpdateProduct => ({
            ...prevUpdateProduct,
            [name]: value
        }));
    };

    async function create(data: IProductData) {
        try {
            fetch("http://localhost:3000/api/create", {
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT"
            }).then(() => setUpdateProduct({ name: "", description: "", price: "", vendor_id }))
        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmit = async (data: IProductData) => {
        try {
            create(data)
        } catch (error) {
            console.log(error)
        };
    }

    return (
        <form onSubmit={() => handleSubmit(updateProduct)}>
            <label> Nome:
                <input type="text" name="name" value={updateProduct.name} onChange={handleProduct} />
            </label>
            <label> Descrição:
                <input type="text" name="description" value={updateProduct.description} onChange={handleProduct} />
            </label>
            <label> Preço:
                <input type="text" name="price" value={updateProduct.price} onChange={handleProduct} />
            </label>
            <button type="submit">Atualizar produto</button>
        </form>
    )
};