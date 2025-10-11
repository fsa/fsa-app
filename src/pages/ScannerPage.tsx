import { QrScanner } from "~/widgets/QrScanner";
import type { Route } from "./+types/ScannerPage";

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
