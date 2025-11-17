import { Suspense } from "react";
import SearchParamsComponent from "@/components/SearchParamsComponent";

const SuccessPage = () => {
  return (
    <div>
      Payment Successful. You are being redirected to the orders page. Please do
      not close the page.
      <Suspense fallback={<div>Processing payment...</div>}>
        <SearchParamsComponent />
      </Suspense>
    </div>
  );
};

export default SuccessPage;
