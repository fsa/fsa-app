import StoreTree from "~/components/StoreTree";
import type { Route } from "./+types/StorePage";

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
