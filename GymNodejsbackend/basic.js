import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config({ path: path.join(__dirname + "/.env") });
console.log(result);
console.log("basic js", process.env.EMAIL_PASS, process.env.PORT);

// const a = "lalali";
// const b = "ilaall";

// function l(a, b) {
//   if (a.length !== b.length) {
//     return;
//   }
//   const h = {};
//   for (let i = 0; i < a.length; i++) {
//     console.log(a[i]);
//     // h.a[i] = h.a[i] ? (h.a[i] += 1) : 1;
//   }
//   console.log(h);
// }
// l(a, b);
