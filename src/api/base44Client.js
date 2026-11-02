import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, serverUrl, token, functionsVersion } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  serverUrl,
  token,
  functionsVersion,
  requiresAuth: false,
  // Auth pages live on the Base44 web app host; the API host (serverUrl)
  // answers /login with "App not found".
  appBaseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL || "https://app.base44.com"
});
