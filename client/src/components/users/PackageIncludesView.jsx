import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Checkbox,
  Input,
  Button,
  message,
  Cascader,
  ConfigProvider,
} from "antd";
function PackageIncludesView({ isVisible, onClose }) {
  const [bookingList, setBookingList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect((id) => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/getBookingsById/${id}`);
        setBookingList(response.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);
  return (
    <div>
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
          onOk={() => setBookingList(false)}
          bookingId={selectedBookingId}
          footer={null}
          width={715}
        >
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
                  {bookingList.map((booking) => (
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
                          {booking.eventType}
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
                          {booking.packageType}
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
                          {booking.eventDate}
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
                          {booking.createdAt}
                        </span>
                      </div>
                    </div>
                  ))}
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
        </Modal>
      </ConfigProvider>
    </div>
  );
}

export default PackageIncludesView;
