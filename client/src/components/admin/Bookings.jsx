import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Modal, Button } from "antd";
import axios from "axios";
import { DeleteOutlined,ExclamationCircleOutlined  } from "@ant-design/icons";


function Bookings() {
  const [bookingList, setBookingList] = useState([]);

  // my code start
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    position: ["bottomCenter"],
  });
  const { confirm } = Modal;
useEffect(() => {
    fetchBookings();
  }, [pagination.current, pagination.pageSize]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `/api/bookings/getbookings?page=${pagination.current}&limit=${pagination.pageSize}`
      );
      setBookingList(response.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleDeleteConfirmation = (bookingId) => {
    confirm({
      title: "Are you sure you want to delete this booking?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBooking(bookingId);
      },
      onCancel() {
        console.log("Delete operation cancelled");
      },
    });
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/deleteBooking/${bookingId}`);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerID",
      key: "customerID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
    },
    {
      title: "Event Location",
      dataIndex: "eventLocation",
      key: "eventLocation",
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      render: (eventDate) => {
        const date = new Date(eventDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    },

    },
    {
      title: "Booking Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status === "rejected") {
          color = "red";
        } else if (status === "pending") {
          color = "orange";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Amount Paid",
      dataIndex: "amount",
      key: "amountPaid",
    },
    {
      title: "Booked Date",
      dataIndex: "createdAt",
      key: "bookedDate",
      render: (createdAt) => {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    },
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteConfirmation(record._id)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="admin_leave_request_container">
        <div className="admin_leave_request_top_menu">
        <div className="admin_leave_request_container">
          <div
            style={{
              marginRight: "auto",
              display: "flex",
              alignItems: "center",
            }}
          ></div>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            <Table
              columns={columns}
              dataSource={bookingList}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
export default Bookings;
