import PaidIcon from "@mui/icons-material/Paid";
import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  description: string;
  imgUrl: string | null;
  price: number;
}

const ProductCard = ({ title, description, imgUrl, price }: Props) => {
  return (
    <Card sx={{ width: 300, height: 550 }} elevation={4}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            height: 230,
            width: 200,
            p: 2,
            margin: "0 auto",
          }}
          image={imgUrl || ""}
          alt="shirts"
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          <Typography variant="h5">{title}</Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <PaidIcon color="secondary" />
            <Typography>{price}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
