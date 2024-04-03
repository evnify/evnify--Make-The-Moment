import { React, useState } from "react";
import axios from "axios";
import { Modal, Checkbox, Input, Button, message, Cascader } from "antd";

function AddBillingAddress() {
  const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);
  const [addressLine1, setAddresLine1] = useState("");
  const [addressLine2, setAddresLine2] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
 

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

   const saveAddressData = () => {
   if(!country||
    !addressLine1||
    !addressLine2||
    !district||
    !city||
    !postalCode
    ){
      message.error("Please fill all the fields");
      return;
    }
    
    }


    const addressData = {
      country,
      addressLine1,
      addressLine2,
      district,
      city,
      postalCode
    };

  
  
  return (
    <div>
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
                onChange={(e) => setCounty(e.target.value)}
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
                onChange={(e) => setAddresLine1(e.target.value)}
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
                onChange={(e) => setAddresLine2(e.target.value)}
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
                onChange={onChange}
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
                    onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setPostalCode(e.target.value)}
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
          <button className="saveAddressBtn_72">Save Address</button>
        </div>
      </Modal>
    </div>
  );
}
          

export default AddBillingAddress;
