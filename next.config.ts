import { withPayload } from '@payloadcms/next/next-config'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/_variables.scss" as *; @use "@/styles/_mixins.scss" as *;`,
  },
};

export default withPayload(nextConfig);
