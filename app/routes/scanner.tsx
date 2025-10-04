import QrCodeScanner from "~/components/QrCodeScanner";
import type { Route } from "./+types/scanner";
import { Card, CardContent, CardHeader } from "@mui/material";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сканер" },
    { name: "description", content: "Сканер QR-кодов" },
  ];
}

function Scanner() {
  return (
    <Card>
      <CardHeader
        title="Сканер"
      />
      <CardContent>
        <QrCodeScanner />
      </CardContent>
    </Card>
  );
}

export default Scanner;
