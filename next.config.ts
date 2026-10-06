import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 is used for the analytics screenshots, where small text must stay legible
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
