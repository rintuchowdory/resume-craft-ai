import { localClient } from '@/api/localBackend';

const me = () => localClient.auth.me();
const logout = () => localClient.auth.logout();
const updateMyUserData = (data) => localClient.auth.updateMe(data);

export const User = { me, logout, updateMyUserData };
export default User;
