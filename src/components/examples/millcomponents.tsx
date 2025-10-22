import React from "react";
import AccessControlSidebar from "../AccessControlSidebar";

const millcomponents = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Access control sidebar</h1>
            <h3 className="text-lg font-bold">Pages & Features -----------------------</h3>
            <AccessControlSidebar page="pages-features" />
            <br />
            <h3 className="text-lg font-bold">Profile Fields -----------------------</h3>
            <AccessControlSidebar page="profile-fields" />
        </div>
    );
};

export default millcomponents;
