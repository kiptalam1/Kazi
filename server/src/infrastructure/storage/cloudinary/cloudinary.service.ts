import { Inject, Injectable } from '@nestjs/common';
import {
  v2 as Cloudinary,
  type UploadApiResponse,
  type DeleteApiResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  uploadFile(
    file: Express.Multer.File,
    folder: string,
    resourceType: 'image' | 'raw' | 'auto',
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('Resource upload failed'));
          }
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(publicId: string): Promise<DeleteApiResponse> {
    return await this.cloudinary.uploader.destroy(publicId);
  }
}
