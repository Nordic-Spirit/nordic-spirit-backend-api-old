import multer, { Multer } from 'multer';
import { createReadStream } from 'fs';
import s3 from '../../config/s3';
import { bucketName } from '../../config';

export const upload: Multer = multer({ dest: '../../../uploads/' });

export const uploadFile = (file: any): any => {
  const fileStream = createReadStream(file.path);

  return s3
    .upload({
      Bucket: bucketName,
      Body: fileStream,
      Key: `product-images/${file.fileName}`
    })
    .promise();
};

export const downloadFile = (fileKey: string): any => {};
