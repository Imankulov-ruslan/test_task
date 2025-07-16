import { test as setup } from "../lib/api/fixtures/api";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ AuthService }) => {
  await AuthService.login(process.env.USERNAME!, process.env.PASSWORD!);
  await AuthService.request.storageState({ path: authFile });
});
