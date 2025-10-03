import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
}

export const uploadImage = async (
  file: string | Buffer,
  options?: {
    folder?: string;
    transformation?: object;
    public_id?: string;
  }
): Promise<CloudinaryUploadResult> => {
  try {
    const uploadOptions = {
      folder: options?.folder || 'agri-hope',
      transformation: options?.transformation || [
        { quality: 'auto', fetch_format: 'auto' }
      ],
      public_id: options?.public_id,
    };

    const result = await cloudinary.uploader.upload(file as string, uploadOptions);
    
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

export const generateImageUrl = (
  publicId: string,
  transformations?: object[]
): string => {
  return cloudinary.url(publicId, {
    transformation: transformations || [
      { quality: 'auto', fetch_format: 'auto' }
    ],
  });
};

export default cloudinary;