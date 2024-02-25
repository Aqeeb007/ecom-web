import { toast } from "sonner";

const handleApiError = (error) => {
  if (error.response) {
    console.log(error.response);
    toast.error(error.response.data.message);
  } else if (error.request) {
    console.log(error.request);
    toast.error("Network error, please try again.");
  } else {
    console.log(error.message);
    toast.error("An error occurred, please try again later.");
  }
};

export default handleApiError;
