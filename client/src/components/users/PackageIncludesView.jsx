import { React, useState } from "react";
import {
  Modal,
  Checkbox,
  Input,
  Button,
  message,
  Cascader,
  ConfigProvider,
} from "antd";
function PackageIncludesView() {
  const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [type, setType] = useState("sick leave");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <ConfigProvider
        theme={{
          components: {
            Modal: { contentBg: "#E6E6E6", boxShadow: "none" },
          },
        }}
      >
        <Modal
          centered
          open={isModalOpen}
          onOk={() => setAddEmployeeModelOpen(false)}
          onCancel={handleCancel}
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
                <div>{/* Mapping should be here */}</div>
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
