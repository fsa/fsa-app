import { Typography } from "@mui/material";
import type { Route } from "./+types/_index";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

//export async function loader({ params }: Route.LoaderArgs) {
//  let team = await fetchTeam(params.teamId);
//  return { name: team.name };
//}

//export default function Component({
//  loaderData,
//}: Route.ComponentProps) {
//  return <h1>{loaderData.name}</h1>;
//}

export default function HomePage() {
  return (
    <Typography>Добро пожаловать на fsa.su</Typography>
  );
}
