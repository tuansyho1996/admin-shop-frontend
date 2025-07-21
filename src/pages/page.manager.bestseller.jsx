'use client'

import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/service.product";
import { removeProductFromBestSeller } from "../services/service.media";
import { Button } from "@mui/material";

const PageManagerBestseller = () => {
    const [bestsellerProducts, setBestsellerProducts] = useState([]);
    ;
    const fetchBestsellerProducts = async () => {
        const res = await getProductsByCategory('best-seller');
        console.log("Bestseller products:", res.products);
        setBestsellerProducts(res.products || []);
    }
    const removeProductInBestSeller = async (productId) => {
        const confirm = window.confirm("Are you sure you want to remove this product from the bestseller list?")
        if (!confirm) return;
        const res = await removeProductFromBestSeller(productId);
        if (res?.status === 200) {
            setBestsellerProducts(bestsellerProducts.filter(product => product._id !== productId));
        } else {
            console.error("Failed to remove product from bestseller:", res);
        }
    }
    useEffect(() => {
        // Fetch bestseller products or any initial data if needed
        fetchBestsellerProducts();
    }, []);
    return (
        <div className="bestseller-page p-10">

            <div className="bestseller-content mt-5">
                {/* Content for the bestseller page */}
                <h1>Bestseller Products</h1>
                {/* Add more content here as needed */}
                <ul className="flex gap-4 flex-wrap">
                    {bestsellerProducts?.map((product) => (
                        <li key={product._id} className="flex flex-col items-center gap-2">
                            <img width={100} height={100} src={product.product_images[0]} alt={product.product_name} className="product-image" />
                            <Button variant="contained" color="primary" onClick={() => removeProductInBestSeller(product._id)} >
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
export default PageManagerBestseller;