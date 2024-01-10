import Products from "@/components/products";
import SearchProducts from "@/components/searchProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector((state) => state.cart.items).length;
  const products = useAppSelector((state) => state.products.items);
  const [filterProducts, setFilterProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          mr: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link href={"/cart"} style={{ textDecoration: "none" }}>
          <ShoppingCartIcon sx={{ pt: 1, fontSize: 50, color: "purple" }} />
        </Link>
        {cartItemCount > 0 && (
          <Typography variant="h5">{cartItemCount}</Typography>
        )}
      </Box>

      <SearchProducts
        setFilterProducts={setFilterProducts}
        products={products}
      />
      <Products product={filterProducts} />
    </Box>
  );
}
