import { React, useState } from "react";
import axios from "axios";
import {
  ConfigProvider,
  Modal,
  Select,
  DatePicker,
  Checkbox,
  Input,
  Button,
  Radio,
  Divider,
  Space,
  message,
  Upload,
} from "antd";

const { Search } = Input;
function AddBillingAddress() {
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

  const saveEmployee = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !address ||
      !dob ||
      !type ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !username
    ) {
      return message.error("Please fill all the fields");
    } else if (!emailRegex.test(email)) {
      return message.error("Please enter a valid email address");
    }

    if (!profileImage || profileImage.trim() === "") {
      // Set default profile image
      setProfileImage(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
      );
      console.log(profileImage);
    } else {
      console.log("Profile image already set:", profileImage);
    }

    const empData = {
      address,
      dob,
      type,
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      profileImage,
    };

    try {
      await axios.post("/api/employees/addEmployee", empData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>hi</h1>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        centered
        open={isModalOpen}
        onOk={() => setAddEmployeeModelOpen(false)}
        onCancel={handleCancel}
        footer={null}
        width={550}
      >
        <div className="request_leave_model_body_container">
          <div className="add_employee_top_container">
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  marginRight: "60px",
                  marginBottom: "3px",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Billing Address
              </span>
              <span>
                Please provide the billing address with the credit card you’ve
                provided.
              </span>
            </div>
          </div>

          <div className="add_employee_popup_details_container">
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
                  Country
                </span>
                <Input
                  size="large"
                  onChange={(e) => setFirstName(e.target.value)}
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
                    fontWeight: 900,
                  }}
                >
                  Address Line1
                </span>
                <Input
                  type="email"
                  size="large"
                  onChange={(e) => setEmail(e.target.value)}
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
                    fontWeight: 900,
                  }}
                >
                  Address Line2
                </span>
                <Input
                  size="large"
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                    fontWeight: 900,
                  }}
                >
                  Disctrict
                </span>
                <Search
                    placeholder="input search text"
                    allowClear
                    //onSearch={onSearch}
                    style={{
                      width: 200,
                    }}
                  />
              </div>
            
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
                   City
                   <Input
                  size="large"
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                  Postal Code
                </span>
                <Input
                  size="large"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
            </div>
          </div>

          <div className="add_emp_address_container">
            
           <span style={{
            marginTop: "3px",
           }}>
           <Checkbox>Make this as my default payment method</Checkbox>
           </span>
          </div>
        </div>
        <div className=" center">
          <button className="saveAddressBtn_72">Save Address</button>
        </div>
      </Modal>
    </div>
  );
}

export default AddBillingAddress;
