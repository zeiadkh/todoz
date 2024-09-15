import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;


interface LoginData {
  username: string;
  password: string;
}
interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const login = async (
  formData: LoginData
): Promise<{ success: boolean; token?: string }> => {
  const response = axios.post(`${API_URL}/users/login`, formData);
  const result = await response;
  // console.log(result);
  return result
    ? { success: true, token: result.data.access_token }
    : { success: false, token: undefined };
};

export const register = async (
  formData: RegisterData
): Promise<unknown> => {
    try {
        const response = axios.post(`${API_URL}/users/register`, formData);
        const result = await response;
        return result
        // console.log(result, '5ara');
        
    } catch (error: any) {
        return {error: error?.response?.data?.message || error}
    }
//   console.log((await response).status)
//   if (response) return {error: error}
//   return result
};
