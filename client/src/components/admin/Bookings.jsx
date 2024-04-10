import React, { useEffect, useState } from "react";
import { Table, Modal, Tag, Space, Button } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import BookingSteps from "../users/BookingSteps";

import axios from "axios";

const { confirm } = Modal;

function Booking() {
  const [bookingList, setBookingList] = useState([]);

  const handleDeleteConfirmation = (id) => {
    confirm({
      title: "Are you sure you want to delete this booking?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBooking(id);
      },
      onCancel() {
        console.log("Delete operation cancelled");
      },
    });
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`/api/bookings/deleteBooking/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    position: ["bottomCenter"],
  });

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/api/bookings/getAllBookings`);
      setBookingList(response.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
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
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="admin_leave_request_container">
        <div className="admin_leave_request_top_menu"></div>
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
  );
}

export default Booking;
