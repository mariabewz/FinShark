import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    const responseData = err?.data;
    if (Array.isArray(responseData)) {
      for (let val of responseData) {
        toast.warning(val.description ?? val);
      }
    } else if (Array.isArray(responseData?.errors)) {
      for (let val of responseData.errors) {
        toast.warning(val.description);
      }
    } else if (typeof responseData?.errors === "object") {
      for (let e in responseData.errors) {
        toast.warning(responseData.errors[e][0]);
      }
    } else if (responseData) {
      toast.warning(responseData);
    } else if (err?.status === 401) {
      toast.warning("Please login");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    } else {
      toast.warning(error.message);
    }
  }
};
