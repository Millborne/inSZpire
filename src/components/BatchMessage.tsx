import React from "react";

interface BatchMessageProps {
  title?: string;
  message: string;
  count: number;
  icon?: React.ReactNode;
}

const BatchMessage: React.FC<BatchMessageProps> = ({
  icon,
  title = "Attention",
  message,
  count,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[8px] bg-szSecondary100 p-4 rounded-lg h-full">
      <div className="flex flex-row gap-[8px] justify-center items-center">
        <div className="text-szSecondary500">{icon}</div>
        <h6 className="text-szSecondary500 text-h6">{title}</h6>
      </div>
      <p className="text-caption-reg text-szBlack800 max-w-[260px] text-center">
        {message}
      </p>
    </div>
  );
};

export default BatchMessage;
