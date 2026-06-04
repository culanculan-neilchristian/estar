import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const parsedMaxUploadSizeMB = Number.parseInt(process.env.MAX_UPLOAD_SIZE_MB || '', 10);
const maxUploadSizeMB = Number.isFinite(parsedMaxUploadSizeMB) ? parsedMaxUploadSizeMB : 200;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: `${maxUploadSizeMB}mb`,
    },
  },
};

export default withPayload(nextConfig);
