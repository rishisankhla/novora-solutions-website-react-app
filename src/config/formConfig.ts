export const formConfig = {
  web3formsAccessKey: (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim(),
  web3formsAttachmentsEnabled: import.meta.env.VITE_WEB3FORMS_ENABLE_ATTACHMENTS === 'true',
  cloudinary: {
    cloudName: (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? '').trim(),
    uploadPreset: (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? '').trim(),
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_c48vc59',
    templateId: import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE_ID || 'template_oeq3v0u',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'VvayPoq7kqtqoC4kl',
  },
  careersEmail: 'careers@novorasolutions.com',
} as const;

export function isWeb3FormsConfigured(): boolean {
  const key = formConfig.web3formsAccessKey;
  return Boolean(key && key !== 'your_access_key_here');
}

export function isCloudinaryConfigured(): boolean {
  const { cloudName, uploadPreset } = formConfig.cloudinary;
  return Boolean(cloudName && uploadPreset);
}
