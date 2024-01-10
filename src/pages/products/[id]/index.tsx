import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const id = Number(router.query.id);
  const products = useAppSelector((state) => state.products.items);
  const product = products.find((item) => item.id === id);

  if (!product) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Box sx={{ maxWidth: 800 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box>
            <img src={product.imageUrl || ""} style={{ width: 400 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {product.title}
            </Typography>
            <Typography sx={{ my: 3 }} gutterBottom>
              {product.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <PaidIcon fontSize={"large"} color="secondary" />
              <Typography sx={{ fontSize: 25 }}>{product.price}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(addToCart({ ...product, quantity: 1 }));
              router.push("/");
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
