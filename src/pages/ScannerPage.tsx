import { QrScanner } from "~/components/QrScanner";
import type { Route } from "./+types/ScannerPage";
import { Container } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сканер" },
    { name: "description", content: "Сканер QR-кодов" },
  ];
}

export default function ScannerPage() {
  return (
    <QrScanner />
  );
}
