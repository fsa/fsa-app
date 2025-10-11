import { FnsChecksList } from "~/widgets/FnsChecksList";
import type { Route } from "./+types/ChecksPage";
import { Container } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Чеки" },
    { name: "description", content: "Список чеков" },
  ];
}

export default function CheckPage() {
  return (
    <FnsChecksList />
  )
}
