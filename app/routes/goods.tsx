import GoodsTree from "~/components/GoodsTree";
import type { Route } from "./+types/goods";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Товары" },
    { name: "description", content: "Список товаров" },
  ];
}

export default function goods() {
  return (
    <GoodsTree />
  );
}
