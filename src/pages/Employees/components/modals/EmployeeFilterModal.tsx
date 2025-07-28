import { useState, useEffect } from "react";
import { Checkbox, Modal } from "enterprisze-global-components";
import { FrontendFilters, FILTER_OPTIONS, handleFilterChange } from "../../../../services/employee/list/filterAPI";

interface EmployeeFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FrontendFilters) => void;
    currentFilters: FrontendFilters;
}

const EmployeeFilterModal: React.FC<EmployeeFilterModalProps> = ({ 
    isOpen, 
    onClose, 
    onApply, 
    currentFilters 
}) => {
    const [filters, setFilters] = useState<FrontendFilters>(currentFilters);

    // Reset filters when modal opens with new current filters
    useEffect(() => {
        if (isOpen) {
            setFilters(currentFilters);
        }
    }, [isOpen, currentFilters]);

    const handleCheckboxChange = (category: keyof FrontendFilters, value: string, checked: boolean) => {
        setFilters(prev => handleFilterChange(prev, category, value, checked));
    };

    const handleApply = () => {
        console.log("Modal applying filters:", filters);
        onApply(filters);
        onClose();
    };

    const handleClearAll = () => {
        setFilters({
            class: [],
            type: [],
            status: []
        });
    };

    const getSelectedCount = (category: keyof FrontendFilters): number => {
        return filters[category].length;
    };

    const hasAnySelections = (): boolean => {
        return Object.values(filters).some(array => array.length > 0);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showHeaderDivider={false}
            title="Filter Employees"
            modalWidth="w-[920px]"
            showButton={false}
            footerOptions="stacked-left"
            footerButtons={[
                {
                    label: "Clear All",
                    variant: "ghost",
                    onClick: handleClearAll,
                    size: "medium",
                },
                {
                    label: "Cancel",
                    variant: "ghost",
                    onClick: onClose,
                    size: "medium",
                },
                {
                    label: `Apply ${hasAnySelections() ? `(${Object.values(filters).reduce((total, array) => total + array.length, 0)})` : ''}`,
                    variant: "primary",
                    onClick: handleApply,
                    size: "medium",
                },
            ]}
            content={
                <div className="p-[10px] w-full overflow-x-auto flex flex-col gap-5">
                    <span className="text-caption-all-caps uppercase">Filter by</span>
                    
                    <div className="flex flex-col gap-[10px]">
                        {/* CLASS Filter */}
                        <div className="md:flex flex-row items-start gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20 pt-2">
                                Class {getSelectedCount('class') > 0 && `(${getSelectedCount('class')})`}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {FILTER_OPTIONS.class.map(option => (
                                    <div key={option} className="py-1 px-2">
                                        <Checkbox
                                            label={option}
                                            checked={filters.class.includes(option)}
                                            onChange={() => handleCheckboxChange('class', option, !filters.class.includes(option))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TYPE Filter */}
                        <div className="md:flex flex-row items-start gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20 pt-2">
                                Type {getSelectedCount('type') > 0 && `(${getSelectedCount('type')})`}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {FILTER_OPTIONS.type.map(option => (
                                    <div key={option} className="py-1 px-2">
                                        <Checkbox
                                            label={option}
                                            checked={filters.type.includes(option)}
                                            onChange={() => handleCheckboxChange('type', option, !filters.type.includes(option))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* STATUS Filter */}
                        <div className="md:flex flex-row items-start gap-5">
                            <span className="text-caption-all-caps uppercase text-szPrimary500 w-20 pt-2">
                                Status {getSelectedCount('status') > 0 && `(${getSelectedCount('status')})`}
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {FILTER_OPTIONS.status.map(option => (
                                    <div key={option} className="py-1 px-2">
                                        <Checkbox
                                            label={option}
                                            checked={filters.status.includes(option)}
                                            onChange={() => handleCheckboxChange('status', option, !filters.status.includes(option))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            }
        />
    );
};

export default EmployeeFilterModal;
