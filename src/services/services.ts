import axios from 'axios';

export const service = {
  upload: async (data: FormData) => {
    const cloudinaryConfig = {
      cloudName: process.env.CLOUDINARY_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
      preset: process.env.CLOUDINARY_PRESET,
    };
    data.append('upload_preset', cloudinaryConfig.preset || '');
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`,
      data
    );
    return res.data.secure_url;
  },
};
