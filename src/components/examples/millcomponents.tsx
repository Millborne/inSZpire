import React, { useState } from "react";
import AccessControlSidebar from "../AccessControlSidebar";
import DataScopeModal from "../DataScopeModal";
import { Button } from "enterprisze-global-components";

const millcomponents = () => {
    const [isOpenDataScopeModal, setIsOpenDataScopeModal] = useState(false);
    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Access control sidebar</h1>
                <h3 className="text-lg font-bold">
                    Pages & Features -----------------------
                </h3>
                <AccessControlSidebar page="pages-features" />
                <br />
                <h3 className="text-lg font-bold">
                    Profile Fields -----------------------
                </h3>
                <AccessControlSidebar page="profile-fields" />
            </div>
            <br />
            <div className="p-4">
                <h1 className="text-2xl font-bold">Data scope modal</h1>
                <h3 className="text-lg font-bold">Default</h3>
                <Button label="Open Modal" variant="primary" onClick={() => { setIsOpenDataScopeModal(true) }} />
                <DataScopeModal
                    isOpen={isOpenDataScopeModal}
                    onClose={() => { setIsOpenDataScopeModal(false) }}
                    onSave={() => { setIsOpenDataScopeModal(false) }}
                    roleName="Super Admin"
                    children={<div>Hello</div>}
                />
            </div>
        </>
    );
};

export default millcomponents;
