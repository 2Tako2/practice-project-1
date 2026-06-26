import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function About() {
  return (
    <div>
      <h1>about</h1>
    </div>
  );
}
