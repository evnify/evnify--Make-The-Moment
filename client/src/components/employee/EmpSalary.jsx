import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Radio, Table, Tag, Space } from "antd";
import { Icon } from "@iconify/react";
import { Loader } from "../admin";

const { Search } = Input;

function EmpSalary() {
    const [salaryList, setSalaryList] = useState([]);
    const [empID, setEmpID] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const fetchSalary = async () => {
        const emp = JSON.parse(localStorage.getItem("currentUser"));

        try {
            const employee = await axios.post(
                `${process.env.PUBLIC_URL}/api/employees/getEmployeeByUserID`,
                {
                    userID: emp.userID,
                }
            );
            setEmpID(employee.data.empID);
            var id = employee.data.empID;
        } catch (error) {
            console.error(error);
        }

        try {
            const response = await axios.post(`/api/salary/getPayrollByEmpID`, {
                empID: id,
            });
            const filteredList = response.data.filter(
                (salary) => salary.status.toLowerCase() === "paid"
            );
            setSalaryList(filteredList);
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSalary();
    }, []);

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
                            style={{
                                fontSize: "20px",
                                color: "#757171",
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
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        {!isLoading ? (
                            <Table
                                columns={columns}
                                dataSource={salaryList}
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
