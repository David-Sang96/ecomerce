import { TextField } from "@mui/material";
import { Product } from "@prisma/client";
import { ChangeEvent } from "react";

interface Props {
  setFilterProducts: (value: Product[]) => void;
  products: Product[];
}

const SearchProducts = ({ setFilterProducts, products }: Props) => {
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = e.target.value.toLowerCase();
    const searchResult = products.filter((item) =>
      item.title.toLowerCase().includes(searchText)
    );
    setFilterProducts(searchResult);
  };
  return (
    <TextField
      sx={{ width: 700, margin: "0 auto", mb: 3 }}
      placeholder="Search Products..."
      onChange={handleSearch}
    />
  );
};

export default SearchProducts;
