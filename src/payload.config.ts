import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const parsedMaxUploadSizeMB = Number.parseInt(process.env.MAX_UPLOAD_SIZE_MB || '', 10);
const maxUploadSizeMB = Number.isFinite(parsedMaxUploadSizeMB) ? parsedMaxUploadSizeMB : 200;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: maxUploadSizeMB * 1024 * 1024, // Defaults to 200MB.
    },
  },
});
