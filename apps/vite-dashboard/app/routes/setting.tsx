import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { href, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Setting" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Setting() {
  return (
    <div>
      <Link to={href("/about")}>About</Link>
      {/* <Welcome /> */}
      <h1>Setting</h1>
    </div>
  );
}
