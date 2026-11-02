// Account-free build: the app talks to a localStorage backend instead of the
// Base44 SDK, so nothing here requires a login.
import { localClient } from './localBackend';

export const base44 = localClient;
export default localClient;
