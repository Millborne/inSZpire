import React from "react";
import PapaZ from "../../../../../assets/papa-z-csr.png";

//icons
import { Filter, People, User } from "iconsax-reactjs";

//components
import { Inputs, ButtonsIcon } from "enterprisze-global-components";
import SelectedFilter from "../../../../../components/SelectedFilter";

const AddEmployeesStep = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex flex-row gap-[8px] w-full items-center">
          <Inputs placeholder="Search for employees and teams" />
          <ButtonsIcon
            icon={<Filter />}
            variant="ghost"
            size="medium"
            onClick={() => {}}
          />
          <SelectedFilter
            teamCount={0}
            employeeCount={0}
            selected={false}
            onClick={() => {}}
          />
        </div>

        {/* <img src={PapaZ} alt="PapaZ" className="w-[120px] h-[120px]" />
        <p className="max-w-[343px] text-center text-body-base-strong text-szBlack800">
          I’ll search for your employees and team. You could also search the
          word{" "}
          <span className="text-body-base-strong text-szPrimary500">
            “Unaffiliated”
          </span>{" "}
          to reveal employees with no team.
        </p> */}
      </div>
    </div>
  );
};

export default AddEmployeesStep;
