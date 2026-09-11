import { defineConfig } from "vitest/config";
import path from "path";

/** Testler saf mantık ve veri bütünlüğü üzerine; DOM'a yalnızca routeMeta
 *  (document.head senkronu) ihtiyaç duyduğu için hafif happy-dom yeterli. */
export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "happy-dom",
    include: ["src/**/*.test.{ts,tsx}"],
    reporters: "default",
  },
});
