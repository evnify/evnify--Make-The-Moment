import React, { useEffect, useState } from "react";
import { Table, Modal, Tag, Space, Button } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";

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

  const handlePaidBooking = async (record) => {
    try {
      await axios.get(`/api/bookings/updateBookingStatus/${record._id}`);
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  }

  const showPaidConform = (record) => {
    confirm({
      title: "Are you sure you want to mark this booking as conform?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        handlePaidBooking(record);
      },
      onCancel() {
        console.log("Paid operation cancelled");
      },
    });
  }


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
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
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
        if (status === "Cancelled") {
          color = "red";
        } else if (status === "Pending") {
          color = "orange";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Amount Paid",
      dataIndex: "amount",
      key: "amountPaid",
      render: (amount) => {
        return `${amount} LKR`;
      },
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
                        onClick={() => handleDeleteConfirmation(record._id)}
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
                        <Icon icon="material-symbols:delete-outline" />
                    </button>
                </>
            )}
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
