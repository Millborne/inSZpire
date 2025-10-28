import React from "react";

const PagesAndFeatures = () => {
  return (
    <div className="flex flex-row gap-[8px] h-full">
      <div className="flex flex-col gap-[8px] bg-white rounded-md ">
        <h6 className="text-h6 text-szPrimary700">sidebar</h6>
      </div>
      <div className="flex flex-col gap-[8px] bg-white rounded-md w-full">
        <h6 className="text-h6 text-szPrimary700">Pages and Features</h6>
      </div>
    </div>
  );
};

export default PagesAndFeatures;
