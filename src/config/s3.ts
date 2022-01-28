import S3 from 'aws-sdk/clients/s3';
import { region, accessKeyId, secretAccessKey } from './env';

export default new S3({
  region,
  accessKeyId,
  secretAccessKey
});
