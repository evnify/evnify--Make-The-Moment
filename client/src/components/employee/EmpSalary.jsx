import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Radio, Table, Tag, Space } from "antd";
import { Icon } from "@iconify/react";
import { Loader } from "../admin";
import { jsPDF } from "jspdf";

const { Search } = Input;

const imgData = require("../../assets/backgrounds/paysheet_bg.png");

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

    function convertDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    const downloadRecept = (record) => {
        const doc = new jsPDF();
        doc.addImage(imgData, "PNG", 0, 0, 215, 300);

        doc.setFont("helvetica");
        doc.setFontSize(14);
        doc.text(`${convertDate(record.updatedAt)}`, 168, 65);
        doc.text(`${record.employeeName}`, 22, 65);
        doc.text(`Employee ID : ${record.employeeID}`, 22, 74);
        doc.text(`Salary ID : ${record.salaryID}`, 22, 83);

        doc.setFontSize(14);
        doc.text(`Basic Salary :`, 22, 100);
        doc.text(`${record.basicSalary} LKR`, 192, 100, { align: 'right' });
        doc.setFont(undefined, "bold").text(`Allowances`, 22, 112).setFont(undefined, "normal");
        {
            var y = 120;
            var x = 0;
            record.allowances.map((allowance, index) => {
                doc.text(`${allowance.name} :`, 22, y + x * 10);
                doc.text(`${allowance.amount} LKR`, 192, y + x * 10, { align: 'right' });
                x++;
            });
            x = x+0.5;
        }
        doc.setFont(undefined, "bold").text(`Deductions`, 22, y + x*10 ).setFont(undefined, "normal");
        x++;
        {
            record.deductions.map((deduction, index) => {
                doc.text(`${deduction.name} :`, 22, y + x * 10);
                doc.text(`${deduction.amount} LKR`, 192, y + x * 10, { align: 'right' });
                x++;
            });
        }

        doc.text(`Total Salary :`, 22, 220);
        doc.text(`${record.netSalary} LKR`, 192, 220, { align: 'right' });

        doc.save(`pay_sheet_of_${record.salaryID}.pdf`);
    };

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
                            onClick={() => downloadRecept(record)}
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
                                pagination={salaryList.length > 10 ? pagination : false}
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
