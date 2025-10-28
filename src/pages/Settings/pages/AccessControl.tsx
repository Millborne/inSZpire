import { useState } from "react";
import { CardContainer, Tabs } from "enterprisze-global-components";
import PagesAndFeatures from "../components/PagesAndFeatures";
import ProfileField from "../components/ProfileField";

const AccessControl = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <CardContainer
        content={
          <div className="flex flex-col gap-[12px] h-full">
            <section className="flex gap-[8px] items-center">
              <h6 className="text-h6 text-szPrimary700">Access Control</h6>
              <Tabs
                options={[
                  {
                    label: "Pages and Features",
                    value: "pages-and-features",
                    number: 0,
                  },
                  {
                    label: "Profile Fields",
                    value: "profile-fields",
                    number: 1,
                  },
                ]}
                activeIndex={activeTabIndex}
                onTabChange={setActiveTabIndex}
              />
            </section>
            <div className="flex flex-col gap-[8px] p-[8px] rounded-lg bg-szGrey150 h-full">
              <div className="flex flex-col gap-[8px] rounded-md bg-white h-full">
                {activeTabIndex === 0 ? <PagesAndFeatures /> : <ProfileField />}
              </div>
            </div>
          </div>
        }
      ></CardContainer>
    </>
  );
};

export default AccessControl;
