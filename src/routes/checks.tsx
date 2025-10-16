import { FnsChecksList } from "~/widgets/FnsChecksList";
import type { Route } from "./+types/checks";
import { PrivateRoute } from "~/providers";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Чеки" },
    { name: "description", content: "Список чеков" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <FnsChecksList />
    </PrivateRoute>
  )
}
