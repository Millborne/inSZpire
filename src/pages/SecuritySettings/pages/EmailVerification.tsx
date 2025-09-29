import { useContext, useState } from "react";
import { Sms, HamburgerMenu, SearchNormal, TickCircle, Personalcard, Send } from "iconsax-reactjs";
import { CardContainer, Inputs, Pagination, Dropdown, Option, Button, SnackbarAlert } from "enterprisze-global-components";
import { SidebarContext } from "..";
import UpdateEmailModal, { UpdateEmailDataType } from "../modals/UpdateEmailModal";

//icons

const EmailVerification = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"error" | "success">("error");
    const [totalCount, setTotalCount] = useState(0);
    const [emailList, setEmailList] = useState<typeof emailEntries>([]);
    const [selectedEmail, setSelectedEmail] = useState<UpdateEmailDataType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const navigate = useNavigate();
    const options = [
        { label: "Unverified Emails", value: "1" },
        { label: "Verified Emails", value: "2" },
    ];

    const handleSelectionChange = (selected: Option | Option[]) => {
        console.log("Selected Options:", selected);
    };

    const setSearchTerm: (arg0: string) => void = (string) => {
        throw new Error("Function not implemented.");
    };

    const setCurrentPage: (arg0: number) => void = (number) => {
        throw new Error("Function not implemented.");
    };

    const handlePageChange = (page: number, _meta?: { source?: string }) => {
        setCurrentPage(page);
    };

    const emailEntries = [
        {
            id: 1,
            fullName: "Sanchez, Michael",
            department: "Business Solutions & Innovations",
            supportZebraEmail: "sanchez.michael@supportzebra.com",
            personalEmail: "sanchez.mariah@gmail.com",
            isZebraEmailVerified: true,
            showUpdate: false,
            showVerify: true,
        },
        {
            id: 2,
            fullName: "Garcia, Andrea",
            department: "Client Success",
            supportZebraEmail: "andrea.garcia@supportzebra.com",
            personalEmail: "andrea.garcia@gmail.com",
            isZebraEmailVerified: false,
            showUpdate: true,
            showVerify: true,
        },
        {
            id: 3,
            fullName: "Lopez, Carlos",
            department: "Workforce",
            supportZebraEmail: "carlos.lopez@supportzebra.com",
            personalEmail: "carlo.lopez@gmail.com",
            isZebraEmailVerified: true,
            showUpdate: true,
            showVerify: false,
        },
        {
            id: 4,
            fullName: "Reyes, Julia",
            department: "Recruitment",
            supportZebraEmail: "julia.reyes@supportzebra.com",
            personalEmail: "julia.r@gmail.com",
            isZebraEmailVerified: false,
            showUpdate: false,
            showVerify: true,
        },
        {
            id: 5,
            fullName: "Dela Cruz, Mark",
            department: "Finance",
            supportZebraEmail: "mark.dc@supportzebra.com",
            personalEmail: "mark.dc@gmail.com",
            isZebraEmailVerified: true,
            showUpdate: true,
            showVerify: true,
        },
    ];

    return (
        <>
            <CardContainer
                content={
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-[8px]">
                                <HamburgerMenu className="text-szPrimary700 cursor-pointer block md:hidden" onClick={toggleSidebar} />
                                <Sms className="text-szSecondary500" />
                                <h6 className="text-h6 text-szPrimary700 font-montserrat">Work Email Management </h6>
                            </div>
                            <p className="text-body-base-reg text-szDarkGrey600">
                                Ensure email verification and allow users to add/update work emails securely.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-[16px]">
                            <div className="flex-1">
                                <Inputs
                                    placeholder="Search by Name or Team"
                                    icon={SearchNormal}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                            <div className="w-[234px]">
                                <Dropdown
                                    label="FILTER BY"
                                    placeholder={options[0].label}
                                    options={options}
                                    onSelectionChange={handleSelectionChange}
                                    size="small"
                                    usePortal={true}
                                />
                            </div>
                        </div>

                        {emailEntries.map((entry, index) => {
                            const zebraEmailColor = entry.isZebraEmailVerified ? "text-greenText" : "text-error700";

                            return (
                                <div key={index} className="flex flex-wrap border border-szGrey300 rounded-[6px] p-[8px] justify-between">
                                    <div className="flex flex-col gap-[4px]">
                                        <div className="flex flex-col">
                                            <p className="text-body-small-reg">{entry.fullName}</p>
                                            <p className="text-caption-reg text-szGrey500 uppercase">{entry.department}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-[20px]">
                                            <div className="flex flex-row items-center gap-[8px]">
                                                <TickCircle className={`size-[16px] ${zebraEmailColor}`} />
                                                <p className={`text-caption-reg ${zebraEmailColor}`}>{entry.supportZebraEmail}</p>{" "}
                                            </div>
                                            <div className="flex flex-row items-center gap-[8px]">
                                                <Personalcard className="size-[16px]" />
                                                <p className="text-caption-reg">{entry.personalEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-[20px]">
                                        {entry.showUpdate && (
                                            <span
                                                className="text-body-small-strong text-szPrimary700 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedEmail(entry); // set selected item
                                                    setIsModalOpen(true); // open modal
                                                }}
                                            >
                                                Update Email
                                            </span>
                                        )}
                                        {entry.showVerify && (
                                            <Button
                                                variant="secondary"
                                                size="small"
                                                label="Verify"
                                                leftIcon={<Send />}
                                                onClick={() => {
                                                    setSnackbarMessage(`Email Verification sent to ${entry.fullName}.`);
                                                    setSnackbarType("success");
                                                    setSnackbarOpen(true);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <section className="flex justify-end">
                            <Pagination
                                currentPage={1}
                                totalPages={Math.ceil(totalCount / 10)}
                                visiblePages={3}
                                onChange={handlePageChange}
                            />
                        </section>

                        {selectedEmail && (
                            <UpdateEmailModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                email={selectedEmail}
                                setEmail={(updated) => {
                                    // Update the email entry in the list
                                    setEmailList((prev) => prev.map((item) => (item.id === updated.id ? { ...item, ...updated } : item)));
                                    setSelectedEmail(updated); // keep modal in sync
                                }}
                            />
                        )}

                        <SnackbarAlert
                            isOpen={snackbarOpen}
                            onClose={() => {
                                setSnackbarOpen(false);
                            }}
                            title={snackbarMessage}
                            type={snackbarType}
                        />
                    </div>
                }
            />
        </>
    );
};

export default EmailVerification;
