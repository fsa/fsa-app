import StoreTree from "~/components/StoreTree";
import type { Route } from "./+types/store";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Товары" },
    { name: "description", content: "Список товаров" },
  ];
}

export default function goods() {
  return (
    <StoreTree />
  );
}
