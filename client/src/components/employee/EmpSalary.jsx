import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Radio, Table, Tag, Space } from "antd";
import { Icon } from "@iconify/react";
import { Loader } from "../admin";

const { Search } = Input;

function EmpSalary() {
    const [salaryList, setSalaryList] = useState([]);
    const [filteredSalaryList, setFilteredSalaryList] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [empID, setEmpID] = useState("");

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const fetchSalary = async () => {
        try {
            const response = await axios.post(`/api/salary/getPayrollByEmpID`, {
                empID: "E40332924",
            });
            const filteredList = response.data.filter(
                (salary) => salary.status.toLowerCase() === "paid"
            );
            setSalaryList(filteredList);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSalary();
    }, []);

    const FetchEmployeeByUserID = async (userID) => {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/getEmployeeByUserID`,
                {
                    userID: userID,
                }
            );
            setEmpID(response.data.employeeID);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const emp = JSON.parse(localStorage.getItem("currentUser"));
        FetchEmployeeByUserID(emp.userID);
    }, []);

    useEffect(() => {
        let tempList = salaryList;

        if (selectedType !== "all") {
            tempList = tempList.filter((item) => item.status === selectedType);
        }

        setFilteredSalaryList(tempList);
    }, [selectedType, salaryList]);

    const columns = [
        {
            title: "Salary ID",
            dataIndex: "salaryID",
            key: "salaryID",
        },
        {
            title: "From Date",
            dataIndex: "fromDate",
            key: "fromDate",
        },
        {
            title: "To Date",
            dataIndex: "toDate",
            key: "toDate",
        },
        {
            title: "Total Salary",
            dataIndex: "netSalary",
            key: "netSalary",
            render: (netSalary) => `${netSalary} LKR`,
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => {
                const date = new Date(createdAt);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            },
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status) => {
                let color = "green";
                if (status === "Pending") {
                    color = "orange";
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <>
                        <button
                            disabled
                            style={{
                                fontSize: "20px",
                                color: "#9D9D9D",
                                border: "none",
                                background: "transparent",
                            }}
                        >
                            <Icon icon="mdi:download" />
                        </button>
                    </>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="emp_salary_list_container">
                <div className="admin_emp_list_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>Recent Salaries</h5>
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
                            <Radio.Button value="Paid">Paid</Radio.Button>
                            <Radio.Button value="Pending">Pending</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        {salaryList.length !== 0 ? (
                            <Table
                                columns={columns}
                                dataSource={filteredSalaryList}
                                pagination={pagination}
                                onChange={handleTableChange}
                            />
                        ) : (
                            <div
                                style={{
                                    marginTop: "150px",
                                }}
                            >
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpSalary;
