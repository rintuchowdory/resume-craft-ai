import { localClient } from '@/api/localBackend';

export const Core = localClient.integrations.Core;
export const InvokeLLM = (...args) => localClient.integrations.Core.InvokeLLM(...args);
export const UploadFile = (...args) => localClient.integrations.Core.UploadFile(...args);
export const SendEmail = (...args) => localClient.integrations.Core.SendEmail(...args);
export const SendSMS = (...args) => localClient.integrations.Core.SendSMS(...args);
export const GenerateImage = (...args) => localClient.integrations.Core.GenerateImage(...args);
export const ExtractDataFromUploadedFile = (...args) =>
  localClient.integrations.Core.ExtractDataFromUploadedFile(...args);
export default Core;
