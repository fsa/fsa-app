import { FnsChecksList } from "~/components/FnsChecksList";
import type { Route } from "./+types/checks";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Чеки" },
    { name: "description", content: "Список чеков" },
  ];
}

export default function goods() {
  return (
    <FnsChecksList />
  );
}
