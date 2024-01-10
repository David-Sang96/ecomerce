import { Box } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import ProductCard from "../productCards";

interface Props {
  product: Product[];
}

const Products = ({ product }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
        mt: 2,
      }}
    >
      {product.map((item) => (
        <Link
          key={item.id}
          href={`products/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <ProductCard
            title={item.title}
            description={item.description}
            imgUrl={item.imageUrl}
            price={item.price}
          />
        </Link>
      ))}
    </Box>
  );
};

export default Products;
