import { QrScanner } from "@/widgets/QrScanner";
import type { Route } from "./+types/scanner";
import { PrivateRoute } from "@/providers";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Сканер" },
    { name: "description", content: "Сканер QR-кодов" },
  ];
}

export default function Component() {
  return (
    <PrivateRoute>
      <QrScanner />
    </PrivateRoute>
  );
}
