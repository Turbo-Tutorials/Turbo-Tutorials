import { createCloudinaryEnhancer } from '@uniformdev/canvas-cloudinary';
export { CLOUDINARY_PARAMETER_TYPES } from "@uniformdev/canvas-cloudinary";
export const cloudinaryEnhancer = () => {
  return createCloudinaryEnhancer();
};
