import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { href, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Link to={href("/about")}>About</Link>
      {/* <Welcome /> */}
    </div>
  );
}
