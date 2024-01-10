import { useAppDispatch } from "@/store/hooks";
import { orderCancel } from "@/store/slices/cartSlice";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderConfirmation = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const orderId = router.query.orderId as string;
  const status = router.query.status as string;
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleCancellation = () => {
    dispatch(orderCancel({ orderId, onSuccess }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Order Id : {orderId}</Typography>
      <Typography sx={{ fontSize: 20, mb: 2 }}>
        Order Status : {status}
      </Typography>
      <Button variant="contained" onClick={handleCancellation}>
        Cancel Order
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Order has been cancelled
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderConfirmation;
