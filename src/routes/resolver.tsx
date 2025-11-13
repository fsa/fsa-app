import { DomainResolver } from "@/features/resolver";
import type { Route } from "./+types/store";
import { PrivateRoute } from "@/providers";
import type { ResolveResult } from "@/features/resolver";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Резольвер" },
    { name: "description", content: "Поиск A записей" },
  ];
}

const onResolve = (data: ResolveResult)=> {
  console.log(data);
}

export default function Component() {
  return (
    <PrivateRoute>
      <DomainResolver title="Добавить заблокированный домен" onResolve={onResolve} />
    </PrivateRoute>
  );
}
