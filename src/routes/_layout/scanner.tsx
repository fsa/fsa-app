import { createFileRoute } from "@tanstack/react-router"
import { QrScanner } from "@/widgets/QrScanner";
import { PrivateRoute } from "@/providers";

export const Route = createFileRoute('/_layout/scanner')({
  component: Component,
  head: () => ({
    meta: [
      {
        title: 'Сканер',
      },
      {
        name: 'description',
        content: 'Сканер QR-кодов',
      },
    ],
  }),
});

export default function Component() {
  return (
    <PrivateRoute>
      <QrScanner />
    </PrivateRoute>
  );
}
