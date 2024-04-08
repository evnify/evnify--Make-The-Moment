import React, { useEffect, useState } from "react";
import { Table, Tag, Space, ConfigProvider, Modal } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import AddBillingAddress from "./AddBillingAddress";

function Booking() {
  const [bookingList, setBookingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

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

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBookingData(null);
  };
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    position: ["bottomCenter"],
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleViewClick = async (record) => {
    setSelectedBookingData(record);
    setIsModalOpen(true);
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
      render: (text, record) => (
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
            onClick={() => handleViewClick(record)}
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
     
      <ConfigProvider
        theme={{
          components: {
            Modal: { contentBg: "#E6E6E6", boxShadow: "none" },
          },
        }}
      >
        <Modal
          centered
          onCancel={handleCancel}
          open={isModalOpen}
          // onOk={() => setBookingList(false)}

          footer={null}
          width={715}
        >
          {selectedBookingData && (
            <>
              <span>Package Includes</span>
              <hr />
              <div className="Package_includes_main_section_72">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="package_includes_left_container">
                    <span>Event Type</span>
                    <span>Package Type</span>
                    <span>Event Date</span>
                    <span>Trasaction Completed On</span>
                  </div>
                  <div className="package_includes_right_container">
                    <span>{selectedBookingData.eventType}</span>
                    <span>{selectedBookingData.packageType}</span>
                    <span>{selectedBookingData.eventDate}</span>
                    <span>{selectedBookingData.createdAt}</span>
                  </div>
                </div>
                <hr style={{ borderWidth: "2px", borderColor: "#000" }} />
                <span className="package_includes_txt_section">Package Includes</span>
                <div className="Add_Address_popup_quntity_container">
                  <div className="add_employee_popup_container_left">
                    <span>Item Name</span>
                    <span>
                      I-RFAQK Melamine Cake Stand 9 I-Black-Versatile Cake
                      Stand 
                    </span>
                    <span>
                      I-RFAQK Melamine Cake Stand 9 I-Black-Versatile Cake
                      Stand 
                    </span>
                    <span>
                      I-RFAQK Melamine Cake Stand 9 I-Black-Versatile Cake
                      Stand 
                    </span>
                  </div>
                  <div className="add_employee_popup_container_right">
                    <span>Quantity</span>
                    <span>2</span>
                    <span>2</span>
                    <span>2</span>
                  </div>
                </div>
                <hr style={{ borderWidth: "2px", borderColor: "#000" }} />
                <div className="Add_Address_popup_container">
                  <div className="add_employee_popup_details_container_right">
                    <div className="add_quntity_price_section">
                      <span>Total Amount</span>
                      <span>LKR 25000</span>
                    </div>
                    <div className="add_quntity_price_btn_section">
                      <button className="cancel_Package_72 " >
                        Cancel Booking
                      </button>
                      <button className="saveAddressBtn_72 ">
                        Update Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </ConfigProvider>
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
      </div>
    </div>
  );
}

export default Booking;
