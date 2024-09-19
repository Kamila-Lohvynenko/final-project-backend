import path from 'node:path';

// export const FIFTEEN_MINUTES = 15 * 60 * 1000; //15 minutes in milliseconds
// export const FIFTEEN_MINUTES = 60 * 1000;
export const FIFTEEN_MINUTES = 15 * 60 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; //30 days in milliseconds

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'tmp');
export const UPLOAD_DIR = path.join(
  process.cwd(),
  'src',
  'public',
  'userAvatars',
);

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
