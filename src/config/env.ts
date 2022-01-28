export const port = Number(process.env.API_PORT) || 3006;
export const sessionSecret = process.env.SESSION_SECRET || 'supersecretsession';
export const bucketName = process.env.AWS_BUCKET_NAME || 'bucket';
export const region = process.env.AWS_BUCKET_REGION || 'region';
export const accessKeyId = process.env.AWS_ACCESS_KEY || 'access_key';
export const secretAccessKey = process.env.AWS_SECRET_KEY || 'secret_key';
