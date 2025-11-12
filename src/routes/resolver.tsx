import { DomainResolver } from "@/features/resolver";
import type { Route } from "./+types/store";
import { PrivateRoute } from "@/providers";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Резольвер" },
    { name: "description", content: "Поиск A записей" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <DomainResolver />
    </PrivateRoute>
  );
}
