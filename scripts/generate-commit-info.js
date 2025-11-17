import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const commitInfo = execSync('git log -1 --pretty=format:"%ci|%s"', {
    encoding: "utf-8",
  }).trim();

  const [dateTime, message] = commitInfo.split("|");
  const date = dateTime.split(" ")[0];

  const content = `export const lastCommit = {
  date: "${date}",
  message: "${message}"
};
`;

  const filePath = path.join(__dirname, "../src/utils/getLastCommit.ts");
  fs.writeFileSync(filePath, content);
  console.log("✓ Generated commit info");
} catch {
  console.warn("⚠ Could not get git info, using fallback");
  const content = `export const lastCommit = {
  date: "N/A",
  message: "No git history"
};
`;
  const filePath = path.join(__dirname, "../src/utils/getLastCommit.ts");
  fs.writeFileSync(filePath, content);
}
