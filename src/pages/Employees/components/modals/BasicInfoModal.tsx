import { useState, useEffect } from "react";

// icons

// components
import {
    Checkbox,
    Dropdown,
    Inputs,
    Modal,
    SnackbarAlert,
} from "enterprisze-global-components";
import {
    useBasicInfoService,
    UpdateBasicInfoRequest,
    BasicInfoData,
    useReligionService,
} from "../../../../services/employee-profile/personal/basic-info/use-basic-info";
import { useLocationsService } from "../../../../services/locations-options/use-locations";
// import BasicInfoConfirmationModal from "./BasicInfoConfirmationModal";
//   import DeleteConfirmation from "../../../../components/DeleteConfirmation";

export interface basicInfoData {
    fullName: {
        lastName: string;
        firstName: string;
        middleName: string;
        nickname: string;
        extension: string;
    };
    birthday: {
        dateOfBirth: string;
        age: string;
        placeOfBirth: string;
    };
    education: {
        highSchool: string;
        attainment: string;
        lastSchool: string;
        yearsAttended: string;
        collegeCourse: string;
    };
    others: {
        religion: string;
        sex: string;
        civilStatus: string;
        gender: string;
        pronouns: string;
        bloodType: string;
    };
    addresses: {
        present: string;
        permanent: string;
    };
}

interface BasicInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    employeeId?: string;
    currentData?: BasicInfoData | null;
}

const BasicInfoModal: React.FC<BasicInfoModalProps> = ({
    isOpen,
    onClose,
    onSubmitSuccess,
    employeeId,
    currentData,
}) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<"success" | "error">(
        "success"
    );
    const {
        updateBasicInfo,
        getById,
        getByIdView,
        actionIsLoading,
        actionIsError,
        actionIsSuccess,
        actionError,
        actionReset,
    } = useBasicInfoService();

    const { getReligionData } = useReligionService();

    const { getRegionStates, getProvinces, getMunicipalities, getBarangays } =
        useLocationsService();

    // Location data state
    const [locationData, setLocationData] = useState({
        regions: [] as Array<{ value: string; label: string }>,
        provinces: [] as Array<{ value: string; label: string }>,
        municipalities: [] as Array<{ value: string; label: string }>,
        barangays: [] as Array<{ value: string; label: string }>,
        presentProvinces: [] as Array<{ value: string; label: string }>,
        presentMunicipalities: [] as Array<{ value: string; label: string }>,
        presentBarangays: [] as Array<{ value: string; label: string }>,
    });

    // Religion data state
    const [religionData, setReligionData] = useState<
        Array<{ value: string; label: string }>
    >([]);
    const [religionLoading, setReligionLoading] = useState(false);

    // Loading states for location data
    const [locationLoading, setLocationLoading] = useState({
        regions: false,
        provinces: false,
        municipalities: false,
        barangays: false,
        presentProvinces: false,
        presentMunicipalities: false,
        presentBarangays: false,
    });

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        extension: "",
        contactNumber: "",
        placeOfBirth: "",
        religion: "",
        religion_ID: "",
        sex: "",
        civilStatus: "",
        gender: "",
        pronouns: "",
        bloodType: "",
        permanentRegion: "",
        permanentProvince: "",
        permanentCity: "",
        permanentBarangay: "",
        permanentStreet: "",
        permanentPostalCode: "",
        presentRegion: "",
        presentProvince: "",
        presentCity: "",
        presentBarangay: "",
        presentStreet: "",
        presentPostalCode: "",
        setAsPresentAddress: false,
    });

    // State for fetched data
    const [fetchedData, setFetchedData] = useState<{
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
    const [isLoadingData, setIsLoadingData] = useState(false);

    // Helper function to find option by value
    const findOptionByValue = (
        options: Array<{ value: string; label: string }>,
        value: string
    ) => {
        return options.find((option) => option.value === value);
    };

    // Fetch religion data
    const fetchReligionData = async () => {
        setReligionLoading(true);
        try {
            setReligionData(
                getReligionData.religions.map((religion: any) => ({
                    value: religion.religion_ID,
                    label: religion.name,
                }))
            );
        } catch (error) {
            console.error("Error fetching religion data:", error);
        } finally {
            setReligionLoading(false);
        }
    };

    // Fetch current data when modal opens
    useEffect(() => {
        const fetchCurrentData = async () => {
            if (isOpen && employeeId) {
                setIsLoadingData(true);
                try {
                    const result = await getById({ employeeId });
                    const result2 = await getByIdView({ employeeId });
                    if (result.data && result2.data) {
                        setFetchedData({
                            ...result.data.data,
                            getByIdView: result2.data.data,
                        });
                        // Initialize form data with fetched data
                        const data = result.data.data;
                        const profile = data.profile || {};
                        const addresses = data.addresses || [];

                        // Find permanent and present addresses
                        const permanentAddress =
                            addresses.find(
                                (addr: any) => addr.address_type_ID === 1
                            ) || {};
                        const presentAddress =
                            addresses.find(
                                (addr: any) => addr.address_type_ID !== 1
                            ) || {};

                        setFormData({
                            firstName: profile.first_name || "",
                            lastName: profile.last_name || "",
                            middleName: profile.middle_name || "",
                            extension: profile.name_ext || "",
                            contactNumber: profile.mobile_number || "",
                            placeOfBirth: profile.birth_address || "",
                            religion: result2.data.data.religion || "",
                            religion_ID: profile.religion_ID || "",
                            sex: profile.gender || "",
                            civilStatus: profile.marital_status || "",
                            gender: profile.gender || "",
                            pronouns: profile.pronoun || "",
                            bloodType: profile.blood_type || "",
                            permanentRegion:
                                permanentAddress.region_state_ID?.toString() ||
                                "",
                            permanentProvince:
                                permanentAddress.province_ID?.toString() || "",
                            permanentCity:
                                permanentAddress.city_municipality_ID?.toString() ||
                                "",
                            permanentBarangay:
                                permanentAddress.barangay_ID?.toString() || "",
                            permanentStreet:
                                permanentAddress.address_line_1 || "",
                            permanentPostalCode:
                                permanentAddress.postal_code || "",
                            presentRegion:
                                presentAddress.region_state_ID?.toString() ||
                                "",
                            presentProvince:
                                presentAddress.province_ID?.toString() || "",
                            presentCity:
                                presentAddress.city_municipality_ID?.toString() ||
                                "",
                            presentBarangay:
                                presentAddress.barangay_ID?.toString() || "",
                            presentStreet: presentAddress.address_line_1 || "",
                            presentPostalCode: presentAddress.postal_code || "",
                            setAsPresentAddress: false,
                        });

                        // Fetch location data for the addresses if they exist
                        if (permanentAddress.region_state_ID) {
                            await fetchProvinces(
                                permanentAddress.region_state_ID.toString(),
                                false
                            );
                        }
                        if (permanentAddress.province_ID) {
                            await fetchMunicipalities(
                                permanentAddress.province_ID.toString(),
                                false
                            );
                        }
                        if (permanentAddress.city_municipality_ID) {
                            await fetchBarangays(
                                permanentAddress.city_municipality_ID.toString(),
                                false
                            );
                        }
                        if (presentAddress.region_state_ID) {
                            await fetchProvinces(
                                presentAddress.region_state_ID.toString(),
                                true
                            );
                        }
                        if (presentAddress.province_ID) {
                            await fetchMunicipalities(
                                presentAddress.province_ID.toString(),
                                true
                            );
                        }
                        if (presentAddress.city_municipality_ID) {
                            await fetchBarangays(
                                presentAddress.city_municipality_ID.toString(),
                                true
                            );
                        }
                    }
                } catch (error) {
                    console.error("Error fetching basic info data:", error);
                } finally {
                    setIsLoadingData(false);
                }
            }
        };

        fetchCurrentData();
        fetchReligionData();
    }, [isOpen, employeeId, getReligionData]);

    // Initialize form data when modal opens or currentData changes (fallback)
    useEffect(() => {
        if (currentData && isOpen && !fetchedData) {
            setFormData({
                firstName: currentData.first_name || "",
                lastName: currentData.last_name || "",
                middleName: currentData.middle_name || "",
                extension: currentData.name_ext || "",
                contactNumber: currentData.mobile_number || "",
                placeOfBirth: currentData.birth_address || "",
                religion: currentData.religion || "",
                religion_ID: currentData.religion_ID || "",
                sex: currentData.gender || "",
                civilStatus: currentData.marital_status || "",
                gender: currentData.gender || "",
                pronouns: currentData.pronoun || "",
                bloodType: currentData.blood_type || "",
                permanentRegion: "",
                permanentProvince: "",
                permanentCity: "",
                permanentBarangay: "",
                permanentStreet: currentData.permanent_address || "",
                permanentPostalCode: "",
                presentRegion: "",
                presentProvince: "",
                presentCity: "",
                presentBarangay: "",
                presentStreet: currentData.present_address || "",
                presentPostalCode: "",
                setAsPresentAddress: false,
            });
        }
    }, [currentData, isOpen, fetchedData]);

    // Reset form and action state when modal closes
    useEffect(() => {
        if (!isOpen) {
            actionReset();
            setFetchedData(null);
        }
    }, [isOpen, actionReset]);

    // Handle form field changes
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Location data fetching functions
    const fetchRegions = async () => {
        setLocationLoading((prev) => ({ ...prev, regions: true }));
        try {
            const result = await getRegionStates({
                page: 1,
                limit: 100,
                sortBy: "region_name",
                sortOrder: "ASC",
            });

            if (result.data?.data) {
                const regions = result.data.data.map((region: any) => ({
                    value: region.region_state_ID.toString(),
                    label: region.region_name,
                }));
                setLocationData((prev) => ({ ...prev, regions }));
            }
        } catch (error) {
            console.error("Error fetching regions:", error);
        } finally {
            setLocationLoading((prev) => ({ ...prev, regions: false }));
        }
    };

    const fetchProvinces = async (regionId: string, isPresent = false) => {
        const loadingKey = isPresent ? "presentProvinces" : "provinces";
        setLocationLoading((prev) => ({ ...prev, [loadingKey]: true }));

        try {
            const result = await getProvinces({
                region_ID: parseInt(regionId),
                limit: 100,
            });

            if (result.data?.data) {
                const provinces = result.data.data.map((province: any) => ({
                    value: province.province_ID.toString(),
                    label: province.province_name,
                }));

                if (isPresent) {
                    setLocationData((prev) => ({
                        ...prev,
                        presentProvinces: provinces,
                    }));
                } else {
                    setLocationData((prev) => ({ ...prev, provinces }));
                }
            }
        } catch (error) {
            console.error("Error fetching provinces:", error);
        } finally {
            setLocationLoading((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    const fetchMunicipalities = async (
        provinceId: string,
        isPresent = false
    ) => {
        const loadingKey = isPresent
            ? "presentMunicipalities"
            : "municipalities";
        setLocationLoading((prev) => ({ ...prev, [loadingKey]: true }));

        try {
            const result = await getMunicipalities({
                province_ID: parseInt(provinceId),
                limit: 2000,
            });

            if (result.data?.data) {
                const municipalities = result.data.data.map(
                    (municipality: any) => ({
                        value: municipality.city_municipality_ID.toString(),
                        label: municipality.city_name,
                    })
                );

                if (isPresent) {
                    setLocationData((prev) => ({
                        ...prev,
                        presentMunicipalities: municipalities,
                    }));
                } else {
                    setLocationData((prev) => ({ ...prev, municipalities }));
                }
            }
        } catch (error) {
            console.error("Error fetching municipalities:", error);
        } finally {
            setLocationLoading((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    const fetchBarangays = async (
        municipalityId: string,
        isPresent = false
    ) => {
        const loadingKey = isPresent ? "presentBarangays" : "barangays";
        setLocationLoading((prev) => ({ ...prev, [loadingKey]: true }));

        try {
            const result = await getBarangays({
                city_municipality_ID: parseInt(municipalityId),
                limit: 45000,
            });

            if (result.data?.data) {
                const barangays = result.data.data.map((barangay: any) => ({
                    value: barangay.barangay_ID.toString(),
                    label: barangay.barangay_name,
                }));

                if (isPresent) {
                    setLocationData((prev) => ({
                        ...prev,
                        presentBarangays: barangays,
                    }));
                } else {
                    setLocationData((prev) => ({ ...prev, barangays }));
                }
            }
        } catch (error) {
            console.error("Error fetching barangays:", error);
        } finally {
            setLocationLoading((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    // Load regions when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchRegions();
        }
    }, [isOpen]);

    // Handle "Set as present address" checkbox effect
    useEffect(() => {
        if (formData.setAsPresentAddress) {
            // Copy permanent address data to present address
            setFormData((prev) => ({
                ...prev,
                presentRegion: prev.permanentRegion,
                presentProvince: prev.permanentProvince,
                presentCity: prev.permanentCity,
                presentBarangay: prev.permanentBarangay,
                presentStreet: prev.permanentStreet,
                presentPostalCode: prev.permanentPostalCode,
            }));

            // Fetch location data for present address if permanent address is selected
            if (formData.permanentRegion) {
                fetchProvinces(formData.permanentRegion, true);
            }
            if (formData.permanentProvince) {
                fetchMunicipalities(formData.permanentProvince, true);
            }
            if (formData.permanentCity) {
                fetchBarangays(formData.permanentCity, true);
            }
        }
    }, [formData.setAsPresentAddress]);

    const handleDropdownChange = (field: string, value: any) => {
        const stringValue =
            typeof value === "string" ? value : value?.value || "";
        setFormData((prev) => ({
            ...prev,
            [field]: stringValue,
        }));

        // Handle cascading dropdown logic
        if (field === "permanentRegion" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                permanentProvince: "",
                permanentCity: "",
                permanentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                provinces: [],
                municipalities: [],
                barangays: [],
            }));
            // Fetch provinces for permanent address
            fetchProvinces(stringValue, false);
        } else if (field === "permanentProvince" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                permanentCity: "",
                permanentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                municipalities: [],
                barangays: [],
            }));
            // Fetch municipalities for permanent address
            fetchMunicipalities(stringValue, false);
        } else if (field === "permanentCity" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                permanentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                barangays: [],
            }));
            // Fetch barangays for permanent address
            fetchBarangays(stringValue, false);
        } else if (field === "presentRegion" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                presentProvince: "",
                presentCity: "",
                presentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                presentProvinces: [],
                presentMunicipalities: [],
                presentBarangays: [],
            }));
            // Fetch provinces for present address
            fetchProvinces(stringValue, true);
        } else if (field === "presentProvince" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                presentCity: "",
                presentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                presentMunicipalities: [],
                presentBarangays: [],
            }));
            // Fetch municipalities for present address
            fetchMunicipalities(stringValue, true);
        } else if (field === "presentCity" && stringValue) {
            // Reset dependent fields
            setFormData((prev) => ({
                ...prev,
                presentBarangay: "",
            }));
            // Clear dependent dropdowns
            setLocationData((prev) => ({
                ...prev,
                presentBarangays: [],
            }));
            // Fetch barangays for present address
            fetchBarangays(stringValue, true);
        }
    };

    const handleCheckboxChange = (field: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: checked,
        }));

        // Handle "Set as present address" functionality
        if (field === "setAsPresentAddress" && checked) {
            // Copy permanent address data to present address
            setFormData((prev) => ({
                ...prev,
                presentRegion: prev.permanentRegion,
                presentProvince: prev.permanentProvince,
                presentCity: prev.permanentCity,
                presentBarangay: prev.permanentBarangay,
                presentStreet: prev.permanentStreet,
                presentPostalCode: prev.permanentPostalCode,
            }));

            // If permanent region is selected, fetch provinces for present address
            if (formData.permanentRegion) {
                fetchProvinces(formData.permanentRegion, true);
            }
            // If permanent province is selected, fetch municipalities for present address
            if (formData.permanentProvince) {
                fetchMunicipalities(formData.permanentProvince, true);
            }
            // If permanent city is selected, fetch barangays for present address
            if (formData.permanentCity) {
                fetchBarangays(formData.permanentCity, true);
            }
        }
    };

    const handleSubmit = async () => {
        if (!employeeId) {
            console.error("Employee ID is required");
            return;
        }

        try {
            // Find permanent and present addresses from fetched data
            const permanentAddress = fetchedData?.addresses?.find(
                (addr) => addr.address_type_ID === 1
            );
            const presentAddress = fetchedData?.addresses?.find(
                (addr) => addr.address_type_ID !== 1
            );

            const updateData: any = {
                employee_ID: employeeId,
                profile: {
                    // ...fetchedData?.profile,
                    // Update profile fields
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    middle_name: formData.middleName,
                    name_ext: formData.extension,
                    preferred_name: formData.extension, // Using extension as preferred name
                    gender: formData.sex as "male" | "female" | "other",
                    pronoun: formData.pronouns,
                    birth_address: formData.placeOfBirth,
                    marital_status: formData.civilStatus,
                    blood_type: formData.bloodType,
                    mobile_number: formData.contactNumber,
                    religion_ID: formData.religion_ID,
                },
                permanent_address: permanentAddress
                    ? {
                          address_ID: permanentAddress.address_ID,
                          address_line_1: formData.permanentStreet,
                          address_line_2:
                              permanentAddress.address_line_2 || null,
                          country_ID: permanentAddress.country_ID,
                          region_state_ID: formData.permanentRegion
                              ? parseInt(formData.permanentRegion)
                              : null,
                          province_ID: formData.permanentProvince
                              ? parseInt(formData.permanentProvince)
                              : null,
                          city_municipality_ID: formData.permanentCity
                              ? parseInt(formData.permanentCity)
                              : null,
                          barangay_ID: formData.permanentBarangay
                              ? parseInt(formData.permanentBarangay)
                              : null,
                          postal_code: formData.permanentPostalCode,
                          service_identifier:
                              permanentAddress.service_identifier,
                          address_type_ID: permanentAddress.address_type_ID,
                          record_ID: permanentAddress.record_ID,
                          entity: permanentAddress.entity,
                          is_archived: permanentAddress.is_archived as 0 | 1,
                      }
                    : null,
                present_address: presentAddress
                    ? {
                          address_ID: presentAddress.address_ID,
                          address_line_1: formData.presentStreet,
                          address_line_2: presentAddress.address_line_2 || null,
                          country_ID: presentAddress.country_ID,
                          region_state_ID: formData.presentRegion
                              ? parseInt(formData.presentRegion)
                              : null,
                          province_ID: formData.presentProvince
                              ? parseInt(formData.presentProvince)
                              : null,
                          city_municipality_ID: formData.presentCity
                              ? parseInt(formData.presentCity)
                              : null,
                          barangay_ID: formData.presentBarangay
                              ? parseInt(formData.presentBarangay)
                              : null,
                          postal_code: formData.presentPostalCode,
                          service_identifier: presentAddress.service_identifier,
                          address_type_ID: presentAddress.address_type_ID,
                          record_ID: presentAddress.record_ID,
                          entity: presentAddress.entity,
                          is_archived: presentAddress.is_archived as 0 | 1,
                      }
                    : null,
            };

            const result = await updateBasicInfo({
                employee_ID: employeeId,
                ...updateData,
            });

            if (result.data) {
                setShowSnackbar(true);
                onClose();

                // Call success callback if provided
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }

                // Hide snackbar after 3 seconds
                setTimeout(() => {
                    setShowSnackbar(false);
                }, 3000);
            } else {
                setSnackbarMessage(
                    "error" in result
                        ? (result.error as any).data?.error ||
                              "An error occurred"
                        : "An error occurred"
                );
                setShowSnackbar(true);
                setSnackbarType("error");
                // Hide snackbar after 3 seconds
                setTimeout(() => {
                    setShowSnackbar(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error updating basic info:", error);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                showHeaderDivider={false}
                title="Edit Basic Info"
                modalWidth="w-[920px]"
                contentHeight="h-[65vh]"
                showButton={false}
                footerOptions="stacked-left"
                footerButtons={[
                    {
                        label: "Cancel",
                        variant: "ghost",
                        onClick: () => onClose(),
                        size: "medium",
                        disabled: actionIsLoading || isLoadingData,
                    },
                    {
                        label: actionIsLoading ? "Updating..." : "Submit",
                        variant: "primary",
                        onClick: handleSubmit,
                        size: "medium",
                        disabled: actionIsLoading || isLoadingData,
                    },
                ]}
                content={
                    <div className="flex flex-col w-full gap-[16px]">
                        {isLoadingData && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                                <p className="text-blue-800 text-sm">
                                    Loading current data...
                                </p>
                            </div>
                        )}

                        {actionIsError && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                                <p className="text-red-800 text-sm">
                                    Error:{" "}
                                    {actionError && "message" in actionError
                                        ? actionError.message
                                        : "Failed to update basic info"}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Full Name
                                </h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <Inputs
                                    label="LAST NAME"
                                    placeholder="Lee"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "lastName",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="FIRST NAME"
                                    placeholder="Frederick"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "firstName",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="MIDDLE NAME"
                                    placeholder="Hill"
                                    value={formData.middleName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "middleName",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="EXTENSION"
                                    placeholder="Fred"
                                    value={formData.extension}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "extension",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="CONTACT NUMBER"
                                    placeholder="0955-021-1889"
                                    value={formData.contactNumber}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "contactNumber",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Birthday
                                </h6>
                            </div>
                            <Inputs
                                label="PLACE OF BIRTH"
                                placeholder="1905 Apple Lane, Chicago, Illinois(IL)"
                                value={formData.placeOfBirth}
                                onChange={(e) =>
                                    handleInputChange(
                                        "placeOfBirth",
                                        e.target.value
                                    )
                                }
                                disabled={isLoadingData}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Others
                                </h6>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <Dropdown
                                    label="RELIGION"
                                    placeholder={
                                        religionLoading
                                            ? "Loading..."
                                            : "Select Religion"
                                    }
                                    options={religionData}
                                    value={findOptionByValue(
                                        religionData,
                                        formData.religion_ID
                                    )}
                                    onSelectionChange={(value) =>
                                        handleDropdownChange(
                                            "religion_ID",
                                            value
                                        )
                                    }
                                    disabled={isLoadingData || religionLoading}
                                />
                                <Inputs
                                    label="SEX"
                                    placeholder="Male"
                                    value={formData.sex}
                                    onChange={(e) =>
                                        handleInputChange("sex", e.target.value)
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="CIVIL STATUS"
                                    placeholder="Married"
                                    value={formData.civilStatus}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "civilStatus",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                {/* <Inputs
                                    label="GENDER / GENDER IDENTITY"
                                    placeholder="Cisgender"
                                    value={formData.gender}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "gender",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                /> */}
                                <Inputs
                                    label="PRONOUNS"
                                    placeholder="His"
                                    value={formData.pronouns}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "pronouns",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                                <Inputs
                                    label="BLOOD TYPE"
                                    placeholder="AB"
                                    value={formData.bloodType}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "bloodType",
                                            e.target.value
                                        )
                                    }
                                    disabled={isLoadingData}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-[8px]">
                            <div className="flex justify-between">
                                <h6 className="text-h6 text-szPrimary700">
                                    Addresses
                                </h6>
                            </div>
                            <div className="grid gap-4 items-start">
                                <p className="text-body-base-strong text-szBlack700">
                                    Permanent Address
                                </p>
                                {/* Address Row 1: 4 dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] relative z-50">
                                    <Dropdown
                                        label="REGION"
                                        placeholder={
                                            locationLoading.regions
                                                ? "Loading..."
                                                : "Select Region"
                                        }
                                        options={locationData.regions}
                                        value={findOptionByValue(
                                            locationData.regions,
                                            formData.permanentRegion
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "permanentRegion",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.regions
                                        }
                                    />
                                    <Dropdown
                                        label="PROVINCE"
                                        placeholder={
                                            locationLoading.provinces
                                                ? "Loading..."
                                                : "Select Province"
                                        }
                                        options={locationData.provinces}
                                        value={findOptionByValue(
                                            locationData.provinces,
                                            formData.permanentProvince
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "permanentProvince",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.provinces ||
                                            !formData.permanentRegion
                                        }
                                    />
                                    <Dropdown
                                        label="CITY / MUNICIPALITY"
                                        placeholder={
                                            locationLoading.municipalities
                                                ? "Loading..."
                                                : "Select City/Municipality"
                                        }
                                        options={locationData.municipalities}
                                        value={findOptionByValue(
                                            locationData.municipalities,
                                            formData.permanentCity
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "permanentCity",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.municipalities ||
                                            !formData.permanentProvince
                                        }
                                    />
                                    <Dropdown
                                        label="BARANGAY"
                                        placeholder={
                                            locationLoading.barangays
                                                ? "Loading..."
                                                : "Select Barangay"
                                        }
                                        options={locationData.barangays}
                                        value={findOptionByValue(
                                            locationData.barangays,
                                            formData.permanentBarangay
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "permanentBarangay",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.barangays ||
                                            !formData.permanentCity
                                        }
                                    />
                                </div>
                                {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs
                                            label="STREET / HOUSE NUMBER / LOT"
                                            placeholder="Blk 5 Lot 3, Villa Luz Subdivision"
                                            value={formData.permanentStreet}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "permanentStreet",
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoadingData}
                                        />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs
                                            label="POSTAL CODE"
                                            placeholder="9000"
                                            value={formData.permanentPostalCode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "permanentPostalCode",
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoadingData}
                                        />
                                    </div>
                                </div>
                                <Checkbox
                                    label="Set as present address"
                                    onChange={() =>
                                        handleCheckboxChange(
                                            "setAsPresentAddress",
                                            !formData.setAsPresentAddress
                                        )
                                    }
                                    checked={formData.setAsPresentAddress}
                                    disabled={isLoadingData}
                                />
                            </div>
                            <div className="grid gap-4 items-start">
                                <p className="text-body-base-strong text-szBlack700">
                                    Present Address
                                </p>
                                {/* Address Row 1: 4 dropdowns */}
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-[16px] relative z-50">
                                    <Dropdown
                                        label="REGION"
                                        placeholder={
                                            locationLoading.regions
                                                ? "Loading..."
                                                : "Select Region"
                                        }
                                        options={locationData.regions}
                                        value={findOptionByValue(
                                            locationData.regions,
                                            formData.presentRegion
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "presentRegion",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.regions
                                        }
                                    />
                                    <Dropdown
                                        label="PROVINCE"
                                        placeholder={
                                            locationLoading.presentProvinces
                                                ? "Loading..."
                                                : "Select Province"
                                        }
                                        options={locationData.presentProvinces}
                                        value={findOptionByValue(
                                            locationData.presentProvinces,
                                            formData.presentProvince
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "presentProvince",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.presentProvinces ||
                                            !formData.presentRegion
                                        }
                                    />
                                    <Dropdown
                                        label="CITY / MUNICIPALITY"
                                        placeholder={
                                            locationLoading.presentMunicipalities
                                                ? "Loading..."
                                                : "Select City/Municipality"
                                        }
                                        options={
                                            locationData.presentMunicipalities
                                        }
                                        value={findOptionByValue(
                                            locationData.presentMunicipalities,
                                            formData.presentCity
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "presentCity",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.presentMunicipalities ||
                                            !formData.presentProvince
                                        }
                                    />
                                    <Dropdown
                                        label="BARANGAY"
                                        placeholder={
                                            locationLoading.presentBarangays
                                                ? "Loading..."
                                                : "Select Barangay"
                                        }
                                        options={locationData.presentBarangays}
                                        value={findOptionByValue(
                                            locationData.presentBarangays,
                                            formData.presentBarangay
                                        )}
                                        onSelectionChange={(value) =>
                                            handleDropdownChange(
                                                "presentBarangay",
                                                value
                                            )
                                        }
                                        disabled={
                                            isLoadingData ||
                                            locationLoading.presentBarangays ||
                                            !formData.presentCity
                                        }
                                    />
                                </div>
                                {/* Address Row 2: Street (wide) and Postal Code (narrow) */}
                                <div className="grid grid-cols-1 sm:grid-cols-6 gap-[16px]">
                                    <div className="sm:col-span-4 col-span-1">
                                        <Inputs
                                            label="STREET / HOUSE NUMBER / LOT"
                                            placeholder="Blk 5 Lot 3, Villa Luz Subdivision"
                                            value={formData.presentStreet}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "presentStreet",
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoadingData}
                                        />
                                    </div>
                                    <div className="sm:col-span-1 col-span-2">
                                        <Inputs
                                            label="POSTAL CODE"
                                            placeholder="9000"
                                            value={formData.presentPostalCode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "presentPostalCode",
                                                    e.target.value
                                                )
                                            }
                                            disabled={isLoadingData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

            <SnackbarAlert
                isOpen={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
                type={snackbarType}
            />
        </>
    );
};

export default BasicInfoModal;
