import { React, useState } from "react";
import axios from "axios";
import { Modal, Checkbox, Input, Button, message, Cascader } from "antd";

function AddBillingAddress() {
  const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    country: "",
    addressLine1: "",
    addressLine2: "",
    district: "",
    city: "",
    postalCode: "",
  });
  const saveAddressData = async () => {
    try {
      const requiredFields = [
        "country",
        "addressLine1",
        "district",
        "city",
        "postalCode",
      ];
      const missingFields = requiredFields.filter(
        (field) => !addressData[field]
      );
      if (missingFields.length > 0) {
        message.error("Please fill all the required fields");
        return;
      }

      await axios.post("/api/bookings/saveAddress", addressData);

      setIsModalOpen(false);

      message.success("Address saved successfully");
    } catch (error) {
      console.error("Error saving address:", error);
      message.error("Failed to save address. Please try again later.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //cascader for district
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
    },
  ];
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={550}
      >
        <div className="request_leave_model_body_container">
          <div>
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
                Country
              </span>
              <Input
                placeholder="Sri Lanka"
                size="large"
                onChange={(e) =>
                  setAddressData({ ...addressData, country: e.target.value })
                }
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
                placeholder="New Kandy Road"
                size="large"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    addressLine1: e.target.value,
                  })
                }
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
                placeholder="Address Line 2"
                size="large"
                onChange={(e) =>
                  setAddressData({
                    ...addressData,
                    addressLine2: e.target.value,
                  })
                }
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

              <Cascader
                options={options}
                onChange={(value) =>
                  setAddressData({ ...addressData, district: value })
                }
                placeholder="Please select"
                showSearch={{
                  filter,
                }}
                onSearch={(value) => console.log(value)}
              />
            </div>
          </div>
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
                  City
                  <Input
                    placeholder="Malabe"
                    size="large"
                    onChange={(e) =>
                      setAddressData({ ...addressData, city: e.target.value })
                    }
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
                  placeholder="000000"
                  type="number"
                  size="large"
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <span
              style={{
                marginTop: "3px",
              }}
            >
              <Checkbox>Make this as my default payment method</Checkbox>
            </span>
          </div>
        </div>
        <div className=" center">
          <button className="saveAddressBtn_72" onClick={saveAddressData}>
            Save Address
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddBillingAddress;
