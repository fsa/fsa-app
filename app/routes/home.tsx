import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function Home() {
  console.log(import.meta.env);
  return <main><div>Welcome!</div></main>;
}
