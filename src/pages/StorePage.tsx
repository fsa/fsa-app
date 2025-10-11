import StoreTree from "~/widgets/StoreTree";
import type { Route } from "./+types/StorePage";
import { Container } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Товары" },
    { name: "description", content: "Список товаров" },
  ];
}

export default function StorePage() {
  return (
    <StoreTree />
  );
}
