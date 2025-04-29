import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FSA" },
    { name: "description", content: "Добро пожаловать в приложение FSA!" },
  ];
}

export default function About() {
  return <main><div>About!</div></main>;
}
