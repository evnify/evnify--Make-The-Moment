import React, {useState, useEffect} from "react";
import axios from "axios";


function EmpSalary() {
    const [salaryList, setSalaryList] = useState([]);
    const fetchSalary = async () => {
        try {
        const response = await axios.post(`/api/salary/getPayrollByEmpID`, { empID : "E72386182"});
        const filteredList = response.data.filter((salary) => salary.status.toLowerCase() === "paid");
        setSalaryList(filteredList);
        }
        catch (err) {
            console.error(err);
        }
        
    }

    useEffect(() => {
        fetchSalary();
    }, []);

    return <div>
        <h1>Employee Salary</h1>
    </div>;
}

export default EmpSalary;
