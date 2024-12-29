"use client";

import { useGetRecentProducts } from "@/lib/query-hooks";

export default function ProductTable() {
    const { data: recentProducts } = useGetRecentProducts();

    return (
        <div>
            <div>Product Table</div>
            columns -- name/shopName , category/tags, discount/price , inStock, published, approval
        </div>
    );
}