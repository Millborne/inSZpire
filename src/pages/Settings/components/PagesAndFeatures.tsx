import React from "react";

//icons
import { SearchNormal1 } from "iconsax-reactjs";

//components
import { Inputs } from "enterprisze-global-components";
import AccessControlSidebar from "../../../components/AccessControlSidebar";

const PagesAndFeatures = () => {
  return (
    <div className="flex flex-row gap-[8px] h-full">
      <div className="flex flex-col gap-[8px] rounded-md h-fit ">
        <AccessControlSidebar page="pages-features" />
      </div>
      <div className="flex flex-col gap-[8px] px-[8px] py-[12px] bg-white rounded-md w-full">
        <div className="flex flex-row justify-between items-center">
          <h6 className="text-h6 text-szPrimary700">Pages and Features</h6>
          <div className="w-[380px] min-w-[200px]">
            <Inputs type="text" placeholder="Search" icon={SearchNormal1} />
          </div>
        </div>

        <p>Add & Update changes for Super Admin. Your changes will autosave.</p>
      </div>
    </div>
  );
};

export default PagesAndFeatures;
