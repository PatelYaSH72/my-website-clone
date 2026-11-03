import fs from "fs";

let content = fs.readFileSync("src/components/sites/helena-marsh/data.ts", "utf8");
content = content.replace(
  '  { label: "Insights", href: "/insights" },',
  '  { label: "Gallery", href: "/gallery" },\n  { label: "Insights", href: "/insights" },'
);
fs.writeFileSync("src/components/sites/helena-marsh/data.ts", content);
console.log("NAV_LINKS updated!");
