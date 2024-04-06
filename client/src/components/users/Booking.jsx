import React, { useEffect, useState } from "react";
import { Table, Tag, Space ,ConfigProvider,Modal} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import PackageIncludesView from "./PackageIncludesView";

function Booking() {
  const [bookingList, setBookingList] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null)

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

const handleViewClick = async (id) => {
  try {
    const response = await axios.get(`/api/getBookingsById/${id}`);
    setSelectedBookingData(response.data);
    setIsModalOpen(true);
    setSelectedBookingId(id);
  } catch (error) {
    console.log("Error fetching booking details:", error);
  }
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
            onClick={() => record && handleViewClick(record._id)}

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
         //id={selectedBookingId}
          footer={null}
          width={715}
          
        >
          {selectedBookingData && (
            <>
          <span>Package Includes</span>
          <hr />
          <div className="Package_includes_view_72">
            <div className="Add_Address_popup_container">
              <div className="add_employee_popup_details_container_right">
                <div className="right">
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
                        fontWeight: 900,
                      }}
                    >
                      Event Type
                    </span>
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
                        fontWeight: 900,
                      }}
                    >
                      Package Type
                    </span>
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
                        fontWeight: 900,
                      }}
                    >
                      Event Date
                    </span>
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
                        fontWeight: 900,
                      }}
                    >
                      Trasaction Completed On
                    </span>
                  </div>
                </div>
              </div>
              <div className="add_employee_popup_details_container_left">
                <div>
                  
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
                            fontSize: "12px",
                            fontWeight: 900,
                          }}
                        >
                         {selectedBookingData.eventType}
                        </span>
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
                            fontWeight: 900,
                          }}
                        >
                          {selectedBookingData.packageType}
                        </span>
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
                            fontWeight: 900,
                          }}
                        >
                          {selectedBookingData.eventDate}
                        </span>
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
                            fontWeight: 900,
                          }}
                        >
                         {selectedBookingData.createdAt}
                        </span>
                      </div>
                    </div>
                  
                </div>
              </div>
            </div>
            <hr />
            <span>Package Includes</span>
            <div className="Add_Address_popup_container">
              <div className="add_employee_popup_details_container_right">
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
                      fontWeight: 900,
                    }}
                  >
                    Item Name
                  </span>
                </div>
              </div>
              <div className="add_employee_popup_details_container_left">
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
                      fontWeight: 900,
                    }}
                  >
                    Quantity
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="Add_Address_popup_container">
              <div className="add_employee_popup_details_container_right">
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
                      fontWeight: 900,
                    }}
                  >
                    Total Amount
                  </span>
                </div>
                <button className="cancel_Package_72 ">Cancel Booking</button>
              </div>

              <div className="add_employee_popup_details_container_left">
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
                      fontWeight: 900,
                    }}
                  >
                    {/** Item price here */}hi
                  </span>
                  <button className="saveAddressBtn_72 ">Update Booking</button>
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
