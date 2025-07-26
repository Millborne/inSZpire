import { useState, useEffect } from "react";
import {
    TextContent,
    Divider,
    ButtonsIcon,
    SnackbarAlert,
} from "enterprisze-global-components";

//icons
import { Edit2 } from "iconsax-reactjs";

//components
import BasicInfoModal from "./modals/BasicInfoModal";
import {
    UpdateBasicInfoRequest,
    useBasicInfoService,
} from "../../../services/employee-profile/personal/basic-info/use-basic-info";
import { BasicInfoData } from "../../../services/employee-profile/personal/basic-info/use-basic-info";
import { useLocationsService } from "../../../services/locations-options/use-locations";
import { RootState } from "../../../reducers/store";
import { useSelector } from "react-redux";
import { parseDateFromBackend } from "../../../utils";

const BasicInfo = () => {
    // Employee RTK State
    const selectedEmployee = useSelector(
        (state: RootState) => state.employeeState.selectedEmployee
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const {
        getByIdView,
        actionIsLoading,
        actionIsError,
        actionError,
        getById,
    } = useBasicInfoService();

    const { getRegionStates, getProvinces, getMunicipalities, getBarangays } =
        useLocationsService();

    const [basicInfoData, setBasicInfoData] = useState<{
        employee: any;
        profile: any;
        addresses: Array<{
            address_ID: string;
            address_line_1: string;
            address_line_2?: string;
            country_ID: number;
            region_state_ID: number;
            province_ID: number;
            city_municipality_ID: number;
            barangay_ID: number;
            postal_code: string;
            service_identifier: string;
            address_type_ID: number;
            record_ID: string;
            entity: string;
            is_archived: number;
            created_at: string;
            updated_at: string;
        }>;
        getByIdView?: any;
    } | null>(null);

    // Location data state for enhanced address display
    const [locationData, setLocationData] = useState({
        regions: [] as Array<{ value: string; label: string }>,
        provinces: [] as Array<{ value: string; label: string }>,
        municipalities: [] as Array<{ value: string; label: string }>,
        barangays: [] as Array<{ value: string; label: string }>,
    });

    // Get employee ID from URL params or props - you may need to adjust this based on your routing setup
    // const employeeId = "6dd74bcf8f9946739abaaed997aaef71"; // This should come from your route params or props

    const fetchBasicInfoData = async () => {
        try {
            const result = await getById({
                employeeId: selectedEmployee?.employee_ID || "",
            });
            const result2 = await getByIdView({
                employeeId: selectedEmployee?.employee_ID || "",
            });
            if (result.data && result2.data) {
                setBasicInfoData({
                    ...result.data.data,
                    getByIdView: result2.data.data,
                });
            }
        } catch (error) {
            console.error("Error fetching basic info data:", error);
        }
    };

    // Function to fetch location data for address enhancement
    const fetchLocationData = async () => {
        try {
            // Fetch regions/states
            const regionsResult = await getRegionStates({
                limit: 100,
            });
            if (regionsResult.data?.data) {
                setLocationData((prev) => ({
                    ...prev,
                    regions: regionsResult.data.data.map((region: any) => ({
                        value: region.region_state_ID.toString(),
                        label: region.region_name,
                    })),
                }));
            }

            // Fetch provinces (you might want to filter by specific region if needed)
            const provincesResult = await getProvinces({
                limit: 100,
            });
            if (provincesResult.data?.data) {
                setLocationData((prev) => ({
                    ...prev,
                    provinces: provincesResult.data.data.map(
                        (province: any) => ({
                            value: province.province_ID.toString(),
                            label: province.province_name,
                        })
                    ),
                }));
            }

            // Fetch municipalities
            const municipalitiesResult = await getMunicipalities({
                limit: 2000,
            });

            if (municipalitiesResult.data?.data) {
                setLocationData((prev) => ({
                    ...prev,
                    municipalities: municipalitiesResult.data.data.map(
                        (municipality: any) => ({
                            value: municipality.city_municipality_ID.toString(),
                            label: municipality.city_name,
                        })
                    ),
                }));
            }

            // Fetch barangays
            const barangaysResult = await getBarangays({
                limit: 45000,
            });
            if (barangaysResult.data?.data) {
                setLocationData((prev) => ({
                    ...prev,
                    barangays: barangaysResult.data.data.map(
                        (barangay: any) => ({
                            value: barangay.barangay_ID.toString(),
                            label: barangay.barangay_name,
                        })
                    ),
                }));
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };

    useEffect(() => {
        if (selectedEmployee) {
            fetchBasicInfoData();
            fetchLocationData();
        }
    }, [selectedEmployee]);

    // Helper function to get location name by ID
    const getLocationName = (
        id: number,
        locationArray: Array<{ value: string; label: string }>
    ) => {
        const location = locationArray.find(
            (loc) => loc.value === id.toString()
        );
        return location ? location.label : "N/A";
    };

    // Helper function to format complete address
    const formatCompleteAddress = (address: any) => {
        if (!address) return "N/A";

        const parts = [];
        if (address.address_line_1) parts.push(address.address_line_1);
        if (address.address_line_2) parts.push(address.address_line_2);

        // Add location names if available
        const barangay = getLocationName(
            address.barangay_ID,
            locationData.barangays
        );
        const municipality = getLocationName(
            address.city_municipality_ID,
            locationData.municipalities
        );
        const province = getLocationName(
            address.province_ID,
            locationData.provinces
        );
        const region = getLocationName(
            address.region_state_ID,
            locationData.regions
        );

        // console.log(barangay, municipality, province, region);

        if (barangay !== "N/A") parts.push(barangay);
        if (municipality !== "N/A") parts.push(municipality);
        if (province !== "N/A") parts.push(province);
        if (region !== "N/A") parts.push(region);

        if (address.postal_code) parts.push(address.postal_code);

        return parts.length > 0 ? parts.join(", ") : "N/A";
    };

    const handleSubmitSuccess = () => {
        setIsSnackbarOpen(true);
        // Refresh the data after successful update
        fetchBasicInfoData();
    };

    if (actionIsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading basic info data...</div>
            </div>
        );
    }

    if (actionIsError) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-red-600">
                    Error loading basic info data:{" "}
                    {actionError && "message" in actionError
                        ? actionError.message
                        : "Unknown error"}
                </div>
            </div>
        );
    }

    if (!basicInfoData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">No basic info data found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Full Name</h6>
                    <ButtonsIcon
                        icon={<Edit2 variant="Linear" />}
                        variant="secondary"
                        size="small"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="last name"
                        text={basicInfoData.profile.last_name || "N/A"}
                    />
                    <TextContent
                        header="first name"
                        text={basicInfoData.profile.first_name || "N/A"}
                    />
                    <TextContent
                        header="middle name"
                        text={basicInfoData.profile.middle_name || "N/A"}
                    />
                    <TextContent
                        header="nickname"
                        text={basicInfoData.profile.preferred_name || "N/A"}
                    />
                    <TextContent
                        header="extensions"
                        text={basicInfoData.profile.name_ext || "N/A"}
                    />
                </div>
            </div>
            <Divider />
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Birthday</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="date of birth"
                        text={
                            basicInfoData.profile.date_of_birth
                                ? parseDateFromBackend(
                                      basicInfoData.profile.date_of_birth
                                  ).toLocaleDateString()
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="age"
                        text={
                            basicInfoData.profile.date_of_birth
                                ? Math.floor(
                                      (new Date().getTime() -
                                          parseDateFromBackend(
                                              basicInfoData.profile.date_of_birth
                                          ).getTime()) /
                                          (1000 * 60 * 60 * 24 * 365.25)
                                  ).toString()
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="place of birth"
                        text={basicInfoData.profile.birth_address || "N/A"}
                    />
                </div>
            </div>
            <Divider />
            {/* <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Educational Details</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent header="highschool attended" text="Amundsen High School" />
                    <TextContent header="educational attainment" text="College" />
                    <TextContent header="last attended school" text="Illinois Institute of Technology" />
                    <TextContent header="years attended (date range)" text="2015 - 2019" />
                    <TextContent header="college course taken (if applicable)" text="Bachelor of Science in Information Technology" />
                </div>
            </div>
            <Divider /> */}
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Others</h6>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                    <TextContent
                        header="religion"
                        text={basicInfoData.getByIdView.religion || "N/A"}
                    />
                    <TextContent
                        header="sex"
                        text={
                            basicInfoData.profile.gender
                                ? basicInfoData.profile.gender
                                      .charAt(0)
                                      .toUpperCase() +
                                  basicInfoData.profile.gender.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="civil status"
                        text={
                            basicInfoData.profile.marital_status
                                ? basicInfoData.profile.marital_status
                                      .charAt(0)
                                      .toUpperCase() +
                                  basicInfoData.profile.marital_status.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent
                        header="gender / gender identity"
                        text={
                            basicInfoData.profile.gender
                                ? basicInfoData.profile.gender
                                      .charAt(0)
                                      .toUpperCase() +
                                  basicInfoData.profile.gender.slice(1)
                                : "N/A"
                        }
                    />
                    <TextContent header="pronouns" text="His" />
                    <TextContent
                        header="blood type"
                        text={
                            basicInfoData.profile.blood_type?.toUpperCase() ||
                            "N/A"
                        }
                    />
                </div>
            </div>
            <Divider />
            <div className="flex flex-col w-full gap-[8px]">
                <div className="flex justify-between">
                    <h6 className="text-h6 text-szPrimary700">Addresses</h6>
                </div>
                <div className="grid gap-4 items-start">
                    <TextContent
                        header="present addresses"
                        text={formatCompleteAddress(
                            basicInfoData.addresses?.find(
                                (address) => address.address_type_ID !== 1
                            )
                        )}
                    />
                    <TextContent
                        header="permanent addresses"
                        text={formatCompleteAddress(
                            basicInfoData.addresses?.find(
                                (address) => address.address_type_ID === 1
                            )
                        )}
                    />
                </div>
            </div>

            {/* Modal component */}
            <BasicInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmitSuccess={handleSubmitSuccess}
                employeeId={selectedEmployee?.employee_ID || ""}
                currentData={basicInfoData?.profile || null}
            />

            <SnackbarAlert
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
                showCloseButton={true}
                type="success"
                title="Successfully updated Basic Info"
                animation="slide-up"
            />
        </div>
    );
};

export default BasicInfo;
