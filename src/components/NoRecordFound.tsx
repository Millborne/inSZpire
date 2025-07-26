import React from "react";
import papaZCsr from "../assets/papa-z-csr.png";

interface NoRecordFoundProps {
  title?: string;
  text?: string;
}

const NoRecordFound: React.FC<NoRecordFoundProps> = ({
  title = "No records found.",
  text = "I tried tho.",
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] items-center w-fit">
      <img src={papaZCsr} className="w-[236px]" />
      <div className="flex flex-col">
        <p className="text-body-big-strong">{title}</p>
        <p className="text-body-small-reg text-szGrey500">{text}</p>
      </div>
    </div>
  );
};

export default NoRecordFound;
