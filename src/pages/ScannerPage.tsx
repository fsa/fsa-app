import { QrScanner } from "~/components/QrScanner";
import type { Route } from "./+types/ScannerPage";
import { Card, CardContent, CardHeader } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сканер" },
    { name: "description", content: "Сканер QR-кодов" },
  ];
}

export default function ScannerPage() {
  return (
    <Card>
      <CardHeader
        title="Сканер"
      />
      <CardContent>
        <QrScanner />
      </CardContent>
    </Card>
  );
}
