import { api } from "../Api";
export const ChangePassword = async (password:string) => {
  try {
    const response = await api.post("/user/changepassword",{password} ,{
      withCredentials: true,
    });
    if (response.data.success == true) {
      return { success: true };
    }
  } catch (err:any) {
    throw new Error(err);
  }
};
