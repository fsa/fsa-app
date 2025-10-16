import StoreTree from "~/widgets/StoreTree";
import type { Route } from "./+types/store";
import { PrivateRoute } from "~/providers";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Товары" },
    { name: "description", content: "Список товаров" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <StoreTree />
    </PrivateRoute>
  );
}
