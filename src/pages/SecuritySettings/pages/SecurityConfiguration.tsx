import { useContext, useState } from "react";
import { CardContainer, Inputs } from "enterprisze-global-components";
import { Civic, HamburgerMenu } from "iconsax-reactjs";
import { SidebarContext } from "..";

//icons

const SecurityConfiguration = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [text, setText] = useState("");

    // const navigate = useNavigate();

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-[8px]">
                                <HamburgerMenu className="text-szPrimary700 cursor-pointer block md:hidden" onClick={toggleSidebar} />
                                <Civic className="text-szSecondary500" />
                                <h6 className="text-h6 text-szPrimary700 font-montserrat">Security Configuration</h6>
                            </div>
                            <p className="text-body-base-reg text-szDarkGrey600">
                                Define global policies around login attempts, lockout behavior, and password expirations
                            </p>
                        </div>

                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between">
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong">Max Failed Login Attempts</p>
                                    <p className="text-caption-reg text-szDarkGrey600">Max Login Attempts. 5 is the default.</p>
                                </div>
                                <div>
                                    <Inputs type="text" placeholder="5 (Default)" value={text} onChange={(e) => setText(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between">
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong">Account Lockout Duration (in minutes)</p>
                                    <p className="text-caption-reg text-szDarkGrey600">Time of inactivity before automatic logout.</p>
                                </div>
                                <div>
                                    <Inputs type="text" placeholder="30" value={text} onChange={(e) => setText(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong">Password Expiration Days</p>
                                </div>
                                <div>
                                    <Inputs type="text" placeholder="90" value={text} onChange={(e) => setText(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-wrap border border-szGrey300 rounded-[6px] py-[8px] px-[12px] justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="text-body-small-strong">Minimum Password Length</p>
                                </div>
                                <div>
                                    <Inputs type="text" placeholder="90" value={text} onChange={(e) => setText(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default SecurityConfiguration;
