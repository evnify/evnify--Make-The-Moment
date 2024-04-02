import React, { useState } from "react";
import { Radio, Input } from "antd";

const { Search } = Input;

function LeaveRequests() {
    const [selectedType, setSelectedType] = useState("all");
    const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);

    const onSearch = (value) => {
        console.log(value);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="admin_leave_request_container">
                <div className="admin_leave_request_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>All Employees</h5>
                        <Search
                            placeholder="Search "
                            size="large"
                            onSearch={onSearch}
                            style={{
                                width: 265,
                                height: 40,
                            }}
                        />
                    </div>
                    <div style={{ marginLeft: "auto", alignItems: "center" }}>
                        <Radio.Group
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                            }}
                            size="large"
                            style={{
                                width: 250,
                            }}
                        >
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="active">Active</Radio.Button>
                            <Radio.Button value="suspended">
                                Suspended
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaveRequests;
