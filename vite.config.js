import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/Clone-Shopee/", // 👈 Thêm dòng này
    plugins: [react()],
});
