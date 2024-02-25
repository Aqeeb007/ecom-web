import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            onClick={() => navigateTo("/")}
            className="bg-blue-500"
            type="primary"
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default PageNotFound;