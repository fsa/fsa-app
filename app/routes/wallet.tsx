import type { Route } from "./+types/movie";
import { Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import WalletAccountList from "~/components/WalletAccountList";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Кошелёк" },
    { name: "description", content: "Список счетов" },
  ];
}

export default function Movie() {
  return (
    <Container maxWidth="lg">
      <Card>
        <CardHeader
          title="Счета"
        />
        <CardContent>
          <WalletAccountList />
        </CardContent>
      </Card>
    </Container>
  )
}
