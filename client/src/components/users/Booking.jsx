import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import PackageIncludesView from "./PackageIncludesView";

function Booking() {
  const [bookingList, setBookingList] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showPackageIncludes, setShowPackageIncludes] = useState(false);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/getAllBookings`);
        setBookingList(response.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);
  
  const handleViewClick = (bookingId) => {
    setShowPackageIncludes(true);
    setSelectedBookingId(bookingId); // Set the selected booking ID
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Invoice",
      dataIndex: "transcationID",
      key: "transcationID",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status === "rejected") {
          color = "red";
          return <Tag color={color}> {"Cancelled"}</Tag>;
        } else if (status === "pending") {
          color = "orange";
          return <Tag color={color}> {"Pending"}</Tag>;
        }

        return <Tag color={color}>{"Confirmed"}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            style={{
              fontSize: "14px",
              border: "solid 1px #C4CDD5",
              backgroundColor: "#ffff",
              width: "90px",
              height: "35px",
              color: "#000868E96",
              fontWeight: 500,
              borderRadius: "5px",
            }}
            onClick={() => handleViewClick(record.id)}
          >
            View
          </button>
          <button
            style={{
              fontSize: "14px",
              border: "none",
              backgroundColor: "#4094F7",
              width: "100px",
              height: "35px",
              color: "#fff",
              borderRadius: "5px",
            }}
            // onClick={() => showDeclineConfirm(record.leaveID)}
          >
            <PrinterOutlined style={{ gap: "10" }} />
            Export pdf
          </button>
        </Space>
      ),
    },
  ];

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
            <h5>Billing History</h5>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            <Table columns={columns} dataSource={bookingList} />
          </div>
        </div>
        {showPackageIncludes && <PackageIncludesView isVisible={showPackageIncludes} onClose={() => setShowPackageIncludes(false)} />}
      </div>
    </div>
  );
}

export default Booking;
