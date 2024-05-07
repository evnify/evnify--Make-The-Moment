import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { jsPDF } from "jspdf";

import {
    Input,
    Modal,
    DatePicker,
    Select,
    Radio,
    Space,
    Divider,
    Button,
    message,
    Table,
    Tag,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const imgData = require("../../assets/backgrounds/paysheet_bg.png");

const { Search } = Input;
const { confirm } = Modal;

function Payroll() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Create model content
    const [empName, setEmpName] = useState("");
    const [type, setType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [allowances, setAllowances] = useState([]);
    const [deductions, setDeductions] = useState([]);
    const [empID, setEmpID] = useState("");
    const [totalSalary, setTotalSalary] = useState(0);
    const [email, setEmail] = useState("");
    const inputRef = useRef(null);
    const [deductionSelect, setDeductionSelect] = useState([
        "Social security deduction",
        "Income tax",
        "Health insurance deduction",
        "Loan deduction",
        "Other deduction",
    ]);
    const [allowanceSelect, setAllowanceSelect] = useState([
        "Performance Bonus",
        "Transport Allowance",
        "Medical Allowance",
        "Anual Bonus",
        "Profit Share",
    ]);
    const [deductionName, setDeductionName] = useState("");
    const [deductionLabel, setDeductionLabel] = useState("");
    const [allowanceName, setAllowanceName] = useState("");
    const [allowanceLabel, setAllowanceLabel] = useState("");
    const [deductionAmount, setDeductionAmount] = useState("");
    const [allowanceAmount, setAllowanceAmount] = useState("");

    const showPaidConform = (id) => {
        confirm({
            centered: true,
            title: "Is this salary paid?",
            icon: <ExclamationCircleFilled />,
            content: "Please confirm that this salary is paid",
            okText: "Paid",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                paidSalary(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
    };

    const showDeleteConform = (id) => {
        confirm({
            centered: true,
            title: "Are you sure?",
            icon: <ExclamationCircleFilled />,
            content: "Please confirm that you want to delete this salary",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                deleteSalaryById(id);
            },
            onCancel() {
                console.log("Cancel");
            },
            width: 350,
        });
    };

    async function deleteSalaryById(id) {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/salary/deletePayrollByID`,
                {
                    salaryID: id,
                }
            );
            if (response.status === 200) {
                message.success("Salary deleted successfully");
                fetchPayrollList();
            }
        } catch (error) {
            message.error("Something went wrong");
        }
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
        doc.text(`${record.basicSalary} LKR`, 192, 100, { align: "right" });
        doc.setFont(undefined, "bold")
            .text(`Allowances`, 22, 112)
            .setFont(undefined, "normal");
        {
            var y = 120;
            var x = 0;
            record.allowances.map((allowance, index) => {
                doc.text(`${allowance.name} :`, 22, y + x * 10);
                doc.text(`${allowance.amount} LKR`, 192, y + x * 10, {
                    align: "right",
                });
                x++;
            });
            x = x + 0.5;
        }
        doc.setFont(undefined, "bold")
            .text(`Deductions`, 22, y + x * 10)
            .setFont(undefined, "normal");
        x++;
        {
            record.deductions.map((deduction, index) => {
                doc.text(`${deduction.name} :`, 22, y + x * 10);
                doc.text(`${deduction.amount} LKR`, 192, y + x * 10, {
                    align: "right",
                });
                x++;
            });
        }

        doc.text(`Total Salary :`, 22, 220);
        doc.text(`${record.netSalary} LKR`, 192, 220, { align: "right" });

        doc.save(`pay_sheet_of_${record.salaryID}.pdf`);
    };

    function convertDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    // Edit model

    const [editModelOpen, setEditModelOpen] = useState(false);
    const [editEmpName, setEditEmpName] = useState("");
    const [editType, setEditType] = useState("");
    const [editFromDate, setEditFromDate] = useState("");
    const [editToDate, setEditToDate] = useState("");
    const [editBasicSalary, setEditBasicSalary] = useState("");
    const [editAllowances, setEditAllowances] = useState([]);
    const [editDeductions, setEditDeductions] = useState([]);
    const [editEmpID, setEditEmpID] = useState("");
    const [editTotalSalary, setEditTotalSalary] = useState(0);
    const [editEmail, setEditEmail] = useState("");
    const editInputRef = useRef(null);
    const [editDeductionSelect, setEditDeductionSelect] = useState([
        "Social security deduction",
        "Income tax",
        "Health insurance deduction",
        "Loan deduction",
        "Other deduction",
    ]);
    const [editAllowanceSelect, setEditAllowanceSelect] = useState([
        "Performance Bonus",
        "Transport Allowance",
        "Medical Allowance",
        "Anual Bonus",
        "Profit Share",
    ]);
    const [editDeductionName, setEditDeductionName] = useState("");
    const [editDeductionLabel, setEditDeductionLabel] = useState("");
    const [editAllowanceName, setEditAllowanceName] = useState("");
    const [editAllowanceLabel, setEditAllowanceLabel] = useState("");
    const [editDeductionAmount, setEditDeductionAmount] = useState("");
    const [editAllowanceAmount, setEditAllowanceAmount] = useState("");
    const [editSalaryID, setEditSalaryID] = useState("");

    const showEditSalaryModel = (record) => {
        setEditModelOpen(true);
        setEditEmpID(record.employeeID);
        setEditEmpName(record.employeeName);
        setEditType(record.type);
        setEditFromDate(record.fromDate);
        setEditToDate(record.toDate);
        setEditBasicSalary(record.basicSalary);
        setEditAllowances(record.allowances);
        setEditDeductions(record.deductions);
        setEditTotalSalary(record.netSalary);
        setEditEmail(record.email);
        setEditSalaryID(record.salaryID);
    };

    const addEditAllowance = (e) => {
        e.preventDefault();
        setEditAllowanceSelect((prevState) => [
            ...prevState,
            editAllowanceLabel || `New item ${index++}`,
        ]);
        setEditAllowanceLabel("");
        setTimeout(() => {
            editInputRef.current?.focus();
        }, 0);
    };

    const newEditAllowance = (e) => {
        e.preventDefault();
        if (editAllowanceName === "" || editAllowanceName === null)
            return message.error("Please enter allowance name");
        else if (editAllowanceAmount === "" || editAllowanceAmount === null)
            return message.error("Please enter allowance amount");
        else {
            setEditAllowances((prevState) => [
                ...prevState,
                { name: editAllowanceName, amount: editAllowanceAmount },
            ]);
            setEditAllowanceName("");
            setEditAllowanceAmount("");
        }
    };

    const deleteEditAllowances = (index) => {
        setEditAllowances((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
    };

    const addEditDeduction = (e) => {
        e.preventDefault();
        setEditDeductionSelect((prevState) => [
            ...prevState,
            editDeductionLabel || `New item ${index++}`,
        ]);
        setEditDeductionLabel("");
        setTimeout(() => {
            editInputRef.current?.focus();
        }, 0);
    };

    const newEditDeduction = (e) => {
        e.preventDefault();
        if (editDeductionName === "" || editDeductionName === null)
            return message.error("Please enter deduction name");
        else if (editDeductionAmount === "" || editDeductionAmount === null)
            return message.error("Please enter deduction amount");
        else {
            setEditDeductions((prevState) => [
                ...prevState,
                { name: editDeductionName, amount: editDeductionAmount },
            ]);
            setEditDeductionName("");
            setEditDeductionAmount("");
        }
    };

    const deleteEditDeduction = (index) => {
        setEditDeductions((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
    };

    useEffect(() => {
        let total = 0;
        if (editBasicSalary === "") {
            setEditTotalSalary(0);
        } else {
            editAllowances.forEach((allowance) => {
                total += parseInt(allowance.amount);
            });
            editDeductions.forEach((deduction) => {
                total -= parseInt(deduction.amount);
            });
            total += parseInt(editBasicSalary);
            setEditTotalSalary(total);
        }
    }, [editAllowances, editDeductions, editBasicSalary]);

    const saveEditedPayroll = async () => {
        try {
            await axios.post(
                `${process.env.PUBLIC_URL}/api/salary/updatePayroll`,
                {
                    salaryID: editSalaryID,
                    employeeName: editEmpName,
                    type: editType,
                    fromDate: editFromDate,
                    toDate: editToDate,
                    basicSalary: editBasicSalary,
                    allowances: editAllowances,
                    deductions: editDeductions,
                    email: editEmail,
                    netSalary: editTotalSalary,
                }
            );
            message.success("Payroll updated successfully");
            setEditModelOpen(false);
            fetchPayrollList();
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    async function fetchPayrollList() {
        const response = await axios.get(
            `${process.env.PUBLIC_URL}/api/salary/getAllPayroll`
        );
        setSalaryList(response.data);
    }

    const paidSalary = async (record) => {
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/salary/setPaidByID`,
                {
                    salaryID: record.salaryID,
                }
            );
            if (response.status === 200) {
                message.success("Salary paid successfully");
                fetchPayrollList();
                await axios.post(
                    `${process.env.PUBLIC_URL}/api/emails/salaryConformation`,
                    {
                        name: record.employeeName,
                        netSalary: record.netSalary,
                        salaryID: record.salaryID,
                        email: record.email,
                        fromDate: record.fromDate,
                        toDate: record.toDate,
                    }
                );
                message.success("Email sent successfully");
            }
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const [salaryList, setSalaryList] = useState([]);

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    // Salary table columns
    const columns = [
        {
            title: "Salary ID",
            dataIndex: "salaryID",
            key: "salaryID",
        },
        {
            title: "Name",
            dataIndex: "employeeName",
            key: "employeeName",
        },
        {
            title: "Emp ID",
            dataIndex: "employeeID",
            key: "employeeID",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
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
                    {record.status === "Pending" ? (
                        <>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => showPaidConform(record)}
                            >
                                <Icon icon="icon-park-outline:correct" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => showEditSalaryModel(record)}
                            >
                                <Icon icon="mage:edit" />
                            </button>
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() =>
                                    showDeleteConform(record.salaryID)
                                }
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </>
                    ) : (
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
                                <Icon icon="icon-park-outline:correct" />
                            </button>
                            <button
                                disabled
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="mage:edit" />
                            </button>
                            <button
                                disabled
                                style={{
                                    fontSize: "20px",
                                    color: "#9D9D9D",
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </>
                    )}
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
                </Space>
            ),
        },
    ];

    const savePayroll = async () => {
        console.log(
            empID,
            empName,
            type,
            fromDate,
            toDate,
            basicSalary,
            allowances,
            deductions,
            email,
            totalSalary
        );
        if (empID === "" || empID === null) {
            return message.error("Please select an employee");
        } else if (fromDate === "" || fromDate === null) {
            return message.error("Please select a from date");
        } else if (toDate === "" || toDate === null) {
            return message.error("Please select a to date");
        } else if (basicSalary === "" || basicSalary === null) {
            return message.error("Please enter basic salary");
        }
        try {
            const response = await axios.post(
                `${process.env.PUBLIC_URL}/api/salary/addPayroll`,
                {
                    employeeID: empID,
                    employeeName: empName,
                    type: type,
                    fromDate: fromDate,
                    toDate: toDate,
                    basicSalary: basicSalary,
                    allowances,
                    deductions,
                    email: email,
                    netSalary: totalSalary,
                }
            );
            if (response.status === 200) {
                message.success("Payroll added successfully");
                setIsModalOpen(false);
                setEmpID("");
                setEmpName("");
                setType("");
                setFromDate(null);
                setToDate(null);
                setBasicSalary("");
                setAllowances([]);
                setDeductions([]);
                setTotalSalary(0);
                fetchPayrollList();
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    message.error(error.response.data.message);
                } else {
                    message.error(
                        "Server error: " + error.response.data.message
                    );
                }
            } else if (error.request) {
                message.error("No response from server");
            } else {
                message.error("Error: " + error.message);
            }
        }
    };

    let index = 0;

    const addDeduction = (e) => {
        e.preventDefault();
        setDeductionSelect((prevState) => [
            ...prevState,
            deductionLabel || `New item ${index++}`,
        ]);
        setDeductionLabel("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const addAllowance = (e) => {
        e.preventDefault();
        setAllowanceSelect((prevState) => [
            ...prevState,
            allowanceLabel || `New item ${index++}`,
        ]);
        setAllowanceLabel("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const newDeduction = (e) => {
        e.preventDefault();
        if (deductionName === "" || deductionName === null)
            return message.error("Please enter deduction name");
        else if (deductionAmount === "" || deductionAmount === null)
            return message.error("Please enter deduction amount");
        else {
            setDeductions((prevState) => [
                ...prevState,
                { name: deductionName, amount: deductionAmount },
            ]);
            setDeductionName("");
            setDeductionAmount("");
        }
    };

    const deleteDeduction = (index) => {
        setDeductions((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
    };

    const newAllowance = (e) => {
        e.preventDefault();
        if (allowanceName === "" || allowanceName === null)
            return message.error("Please enter allowance name");
        else if (allowanceAmount === "" || allowanceAmount === null)
            return message.error("Please enter allowance amount");
        else {
            setAllowances((prevState) => [
                ...prevState,
                { name: allowanceName, amount: allowanceAmount },
            ]);
            setAllowanceName("");
            setAllowanceAmount("");
        }
    };

    const deleteAllowance = (index) => {
        setAllowances((prevState) => {
            const temp = [...prevState];
            temp.splice(index, 1);
            return temp;
        });
    };

    //Retrieve All Employee Details
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch all employees
        async function fetchEmployeeList() {
            const response = await axios.get(
                `${process.env.PUBLIC_URL}/api/employees/getAllEmployees`
            );
            setEmployees(response.data);
        }
        fetchEmployeeList();

        //Fetch All Payroll Details
        fetchPayrollList();
    }, []);

    // Calculate total Salary
    useEffect(() => {
        let total = 0;
        if (basicSalary === "") {
            setTotalSalary(0);
        } else {
            allowances.forEach((allowance) => {
                total += parseInt(allowance.amount);
            });
            deductions.forEach((deduction) => {
                total -= parseInt(deduction.amount);
            });
            total += parseInt(basicSalary);
            setTotalSalary(total);
        }
    }, [allowances, deductions, basicSalary]);

    // Create Employee Dropdown Data
    const empData = employees.map((employee) => ({
        value: employee.empID,
        label: `${employee.firstName} ${employee.lastName}`,
        type: employee.type,
        email: employee.email,
    }));

    const handleEmployeeSelect = (selectedValue, selectedOption) => {
        setType(selectedOption.type);
        setEmpID(selectedOption.value);
        setEmpName(selectedOption.label);
        setEmail(selectedOption.email);
    };

    //Filters
    const [searchKey, setSearchKey] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    const [filteredSalaryList, setFilteredSalaryList] = useState([]);

    useEffect(() => {
        let tempList = salaryList;

        if (searchKey && searchKey !== "") {
            tempList = tempList.filter(
                (item) =>
                    item.employeeName.toLowerCase().includes(searchKey) ||
                    item.employeeID.toLowerCase().includes(searchKey)
            );
        }

        if (selectedType !== "all") {
            tempList = tempList.filter((item) => item.status === selectedType);
        }

        setFilteredSalaryList(tempList);

        console.log("filteredSalaryList", tempList);
        console.log("salaryList", salaryList);
        console.log("searchKey", searchKey);
        console.log("selectedType", selectedType);
    }, [searchKey, selectedType, salaryList]);

    return (
        <div>
            {/* Create Pay sheet model */}
            <Modal
                footer={null}
                title="Create New Paysheet"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
            >
                <div className="create_paysheet_002">
                    <div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "14px",
                                }}
                            >
                                Select an Employee
                            </span>
                            <Select
                                showSearch
                                style={{
                                    width: 200,
                                    height: 40,
                                }}
                                placeholder="Search Employee"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                }
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? "")
                                        .toLowerCase()
                                        .localeCompare(
                                            (optionB?.label ?? "").toLowerCase()
                                        )
                                }
                                onChange={handleEmployeeSelect}
                                options={empData}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "14px",
                                }}
                            >
                                Type
                            </span>
                            <Input
                                disabled
                                type="text"
                                size="large"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                }}
                            >
                                From Date
                            </span>
                            <DatePicker
                                style={{
                                    width: 205,
                                    height: 40,
                                }}
                                value={fromDate ? moment(fromDate) : null}
                                onChange={(date, dateString) => {
                                    setFromDate(dateString);
                                }}
                            />
                        </div>
                    </div>
                    <div className="admin_payroll_table_right_side_002">
                        <div className="admin_payroll_table_right_side_002_top_div">
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Emp ID
                                </span>
                                <Input
                                    disabled
                                    type="text"
                                    size="large"
                                    value={empID}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Basic salary
                                </span>
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Enter Salary"
                                    value={basicSalary}
                                    onChange={(e) => {
                                        if (e.target.value < 0) {
                                            message.error(
                                                "Please enter a valid amount"
                                            );
                                            return;
                                        }
                                        setBasicSalary(e.target.value);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    To Date
                                </span>
                                <DatePicker
                                    style={{
                                        width: 205,
                                        height: 40,
                                    }}
                                    value={toDate ? moment(toDate) : null}
                                    onChange={(date, dateString) => {
                                        setToDate(dateString);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            marginBottom: "3px",
                            fontSize: "14px",
                        }}
                    >
                        Allowances
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Select
                            style={{
                                width: 220,
                                height: 35,
                            }}
                            value={allowanceName}
                            onChange={(value) => {
                                setAllowanceName(value);
                            }}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: "8px 0",
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: "0 8px 4px",
                                        }}
                                    >
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={allowanceLabel}
                                            onChange={(e) =>
                                                setAllowanceLabel(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        />
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addAllowance}
                                        >
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={allowanceSelect.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                        <Input
                            placeholder="Amount"
                            style={{
                                width: 120,
                                marginRight: 10,
                                height: 35,
                            }}
                            type="number"
                            value={allowanceAmount}
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    message.error(
                                        "Please enter a valid amount"
                                    );
                                    return;
                                }
                                setAllowanceAmount(e.target.value);
                            }}
                        />
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={newAllowance}
                        >
                            Add
                        </Button>
                    </div>
                    {allowances.map((allowance, index) => (
                        <div key={index}>
                            <Input
                                value={Object.values(allowance)[0]}
                                style={{
                                    width: 220,
                                    marginRight: 20,
                                    height: 35,
                                    marginTop: 10,
                                }}
                                disabled
                            />
                            <Input
                                value={Object.values(allowance)[1] + " LKR"}
                                style={{
                                    width: 120,
                                    marginRight: 10,
                                    height: 35,
                                }}
                                disabled
                            />
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => deleteAllowance(index)}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            marginBottom: "1px",
                            fontSize: "14px",
                        }}
                    >
                        Deductions
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Select
                            style={{
                                width: 220,
                                height: 35,
                            }}
                            value={deductionName}
                            onChange={(value) => {
                                setDeductionName(value);
                            }}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: "8px 0",
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: "0 8px 4px",
                                        }}
                                    >
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={deductionLabel}
                                            onChange={(e) =>
                                                setDeductionLabel(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        />
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addDeduction}
                                        >
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={deductionSelect.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                        <Input
                            placeholder="Amount"
                            style={{
                                width: 120,
                                marginRight: 10,
                                height: 35,
                            }}
                            type="number"
                            value={deductionAmount}
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    message.error(
                                        "Please enter a valid amount"
                                    );
                                    return;
                                }
                                setDeductionAmount(e.target.value);
                            }}
                        />
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={newDeduction}
                        >
                            Add
                        </Button>
                    </div>
                    {deductions.map((deduction, index) => (
                        <div key={index}>
                            <Input
                                value={Object.values(deduction)[0]}
                                style={{
                                    width: 220,
                                    marginRight: 20,
                                    height: 35,
                                    marginTop: 10,
                                }}
                                disabled
                            />
                            <Input
                                value={Object.values(deduction)[1] + " LKR"}
                                style={{
                                    width: 120,
                                    marginRight: 10,
                                    height: 35,
                                }}
                                disabled
                            />
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => deleteDeduction(index)}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </div>
                    ))}
                </div>

                <h5 className=" total_salary_002">
                    Total Salary : {totalSalary} LKR
                </h5>
                <div className="center">
                    <button
                        className="salary_save_btn_002"
                        onClick={savePayroll}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Save Salary
                    </button>
                    <button
                        className="salary_cansel_btn_002"
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>

            {/* Edit model content */}
            <Modal
                footer={null}
                title="Edit Paysheet"
                open={editModelOpen}
                onCancel={() => setEditModelOpen(false)}
                centered
            >
                <div className="create_paysheet_002">
                    <div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "14px",
                                }}
                            >
                                Select an Employee
                            </span>
                            <Select
                                showSearch
                                style={{
                                    width: 200,
                                    height: 40,
                                }}
                                value={editEmpName}
                                disabled
                                placeholder="Search Employee"
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "14px",
                                }}
                            >
                                Type
                            </span>
                            <Input
                                disabled
                                type="text"
                                size="large"
                                value={editType}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: "3px",
                                    fontSize: "12px",
                                }}
                            >
                                From Date
                            </span>
                            <DatePicker
                                style={{
                                    width: 205,
                                    height: 40,
                                }}
                                value={
                                    editFromDate ? moment(editFromDate) : null
                                }
                                onChange={(date, dateString) => {
                                    setEditFromDate(dateString);
                                }}
                            />
                        </div>
                    </div>
                    <div className="admin_payroll_table_right_side_002">
                        <div className="admin_payroll_table_right_side_002_top_div">
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Emp ID
                                </span>
                                <Input
                                    disabled
                                    type="text"
                                    size="large"
                                    value={editEmpID}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "14px",
                                    }}
                                >
                                    Basic salary
                                </span>
                                <Input
                                    type="number"
                                    size="large"
                                    placeholder="Enter Salary"
                                    value={editBasicSalary}
                                    onChange={(e) => {
                                        if (e.target.value < 0) {
                                            message.error(
                                                "Please enter a valid amount"
                                            );
                                            return;
                                        }
                                        setEditBasicSalary(e.target.value);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span
                                    style={{
                                        marginBottom: "3px",
                                        fontSize: "12px",
                                    }}
                                >
                                    To Date
                                </span>
                                <DatePicker
                                    style={{
                                        width: 205,
                                        height: 40,
                                    }}
                                    value={
                                        editToDate ? moment(editToDate) : null
                                    }
                                    onChange={(date, dateString) => {
                                        setEditToDate(dateString);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            marginBottom: "3px",
                            fontSize: "14px",
                        }}
                    >
                        Allowances
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Select
                            style={{
                                width: 220,
                                height: 35,
                            }}
                            value={editAllowanceName}
                            onChange={(value) => {
                                setEditAllowanceName(value);
                            }}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: "8px 0",
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: "0 8px 4px",
                                        }}
                                    >
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={editAllowanceLabel}
                                            onChange={(e) =>
                                                setEditAllowanceLabel(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        />
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addEditAllowance}
                                        >
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={editAllowanceSelect.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                        <Input
                            placeholder="Amount"
                            style={{
                                width: 120,
                                marginRight: 10,
                                height: 35,
                            }}
                            type="number"
                            value={editAllowanceAmount}
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    message.error(
                                        "Please enter a valid amount"
                                    );
                                    return;
                                }
                                setEditAllowanceAmount(e.target.value);
                            }}
                        />
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={newEditAllowance}
                        >
                            Add
                        </Button>
                    </div>
                    {editAllowances.map((allowance, index) => (
                        <div key={index}>
                            <Input
                                value={Object.values(allowance)[0]}
                                style={{
                                    width: 220,
                                    marginRight: 20,
                                    height: 35,
                                    marginTop: 10,
                                }}
                                disabled
                            />
                            <Input
                                value={Object.values(allowance)[1] + " LKR"}
                                style={{
                                    width: 120,
                                    marginRight: 10,
                                    height: 35,
                                }}
                                disabled
                            />
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => deleteEditAllowances(index)}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        marginTop: "8px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            marginBottom: "1px",
                            fontSize: "14px",
                        }}
                    >
                        Deductions
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Select
                            style={{
                                width: 220,
                                height: 35,
                            }}
                            value={editDeductionName}
                            onChange={(value) => {
                                setEditDeductionName(value);
                            }}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider
                                        style={{
                                            margin: "8px 0",
                                        }}
                                    />
                                    <Space
                                        style={{
                                            padding: "0 8px 4px",
                                        }}
                                    >
                                        <Input
                                            placeholder="Please enter item"
                                            ref={inputRef}
                                            value={editDeductionLabel}
                                            onChange={(e) =>
                                                setEditDeductionLabel(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                e.stopPropagation()
                                            }
                                        />
                                        <Button
                                            type="text"
                                            icon={<PlusOutlined />}
                                            onClick={addEditDeduction}
                                        >
                                            Add item
                                        </Button>
                                    </Space>
                                </>
                            )}
                            options={editDeductionSelect.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                        <Input
                            placeholder="Amount"
                            style={{
                                width: 120,
                                marginRight: 10,
                                height: 35,
                            }}
                            type="number"
                            value={editDeductionAmount}
                            onChange={(e) => {
                                if (e.target.value < 0) {
                                    message.error(
                                        "Please enter a valid amount"
                                    );
                                    return;
                                }
                                setEditDeductionAmount(e.target.value);
                            }}
                        />
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={newEditDeduction}
                        >
                            Add
                        </Button>
                    </div>
                    {editDeductions.map((deduction, index) => (
                        <div key={index}>
                            <Input
                                value={Object.values(deduction)[0]}
                                style={{
                                    width: 220,
                                    marginRight: 20,
                                    height: 35,
                                    marginTop: 10,
                                }}
                                disabled
                            />
                            <Input
                                value={Object.values(deduction)[1] + " LKR"}
                                style={{
                                    width: 120,
                                    marginRight: 10,
                                    height: 35,
                                }}
                                disabled
                            />
                            <button
                                style={{
                                    fontSize: "20px",
                                    color: "#757171",
                                    border: "none",
                                    background: "transparent",
                                }}
                                onClick={() => deleteEditDeduction(index)}
                            >
                                <Icon icon="material-symbols:delete-outline" />
                            </button>
                        </div>
                    ))}
                </div>

                <h5 className=" total_salary_002">
                    Total Salary : {editTotalSalary} LKR
                </h5>
                <div className="center">
                    <button
                        className="salary_save_btn_002"
                        onClick={saveEditedPayroll}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Save Salary
                    </button>
                    <button
                        className="salary_cansel_btn_002"
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            width: "120px",
                            height: "40px",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
            <div className="admin_salary_list_container">
                <div className="admin_emp_list_top_menu">
                    <div
                        style={{
                            marginRight: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h5>Recent Salaries</h5>
                        <Search
                            placeholder="Search by Name"
                            size="large"
                            onSearch={(value) => setSearchKey(value)}
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
                            <Radio.Button value="Paid">Paid</Radio.Button>
                            <Radio.Button value="Pending">Pending</Radio.Button>
                        </Radio.Group>
                        <button
                            className="admin_salary_list_top_menu_button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M8.5 2.75C8.5 2.55109 8.42098 2.36032 8.28033 2.21967C8.13968 2.07902 7.94891 2 7.75 2C7.55109 2 7.36032 2.07902 7.21967 2.21967C7.07902 2.36032 7 2.55109 7 2.75V7H2.75C2.55109 7 2.36032 7.07902 2.21967 7.21967C2.07902 7.36032 2 7.55109 2 7.75C2 7.94891 2.07902 8.13968 2.21967 8.28033C2.36032 8.42098 2.55109 8.5 2.75 8.5H7V12.75C7 12.9489 7.07902 13.1397 7.21967 13.2803C7.36032 13.421 7.55109 13.5 7.75 13.5C7.94891 13.5 8.13968 13.421 8.28033 13.2803C8.42098 13.1397 8.5 12.9489 8.5 12.75V8.5H12.75C12.9489 8.5 13.1397 8.42098 13.2803 8.28033C13.421 8.13968 13.5 7.94891 13.5 7.75C13.5 7.55109 13.421 7.36032 13.2803 7.21967C13.1397 7.07902 12.9489 7 12.75 7H8.5V2.75Z"
                                    fill="white"
                                />
                            </svg>{" "}
                            &nbsp; Create{" "}
                        </button>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={filteredSalaryList}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payroll;
