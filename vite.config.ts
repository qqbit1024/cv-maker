import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: {
  env: Record<string, string | undefined>;
};

function getGithubPagesBase() {
  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return "/";
  }

  const [owner, repo] = repository.split("/");

  if (!owner || !repo) {
    return "/";
  }

  return repo === `${owner}.github.io` ? "/" : `/${repo}/`;
}

export default defineConfig({
  base: getGithubPagesBase(),
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
