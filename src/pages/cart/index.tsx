import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confirmOrder, updateQuantity } from "@/store/slices/cartSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const totalPrice = () => {
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  };

  const onSuccess = (data: any) => {
    const { orderId, status } = data;
    router.push(`/confirmation?orderId=${orderId}&status=${status}`);
  };
  const onError = () => {};

  const handleConfirmOrder = () => {
    dispatch(confirmOrder({ onSuccess, onError, payload: cartItems }));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <Box
      sx={{
        width: "75%",
        margin: "auto",
      }}
    >
      <Box>
        {cartItems.length ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 7,
              mt: 5,
            }}
          >
            {cartItems.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                key={item.id}
              >
                <Box sx={{ width: 500 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <img src={item.imageUrl || ""} height={230} />
                    <Box>
                      <Typography variant="h5">{item.title}</Typography>
                      <Typography variant="h5">${item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: 30, cursor: "pointer" }}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    />
                    <Typography sx={{ alignSelf: "center", fontSize: 30 }}>
                      {item.quantity}
                    </Typography>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 30, cursor: "pointer" }}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="h1"> Empty Cart</Typography>
        )}
      </Box>
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            flexDirection: "column",
            mr: 5,
          }}
        >
          <Typography variant="h4" sx={{ my: 2 }}>
            Total Price : ${totalPrice()}
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "lightblue" }}
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default Cart;
