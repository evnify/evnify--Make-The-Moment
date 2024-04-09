
import { React, useState } from "react";
import { Modal, Button, ConfigProvider, Steps, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AddBillingAddress from "./AddBillingAddress";
import { Input, Radio, Space } from "antd";
function BookingSteps() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmployeeModelOpen, setAddEmployeeModelOpen] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [valueAddress, setValueAddress] = useState(1);
  //states for steps
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  const onChangeQuantity = (value) => {};
  const handelAddress = () => {
    setShowBillingAddress(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleContinue = () => {
    // Perform actions when continuing to the next step
    setCurrent(current + 1); // Move to the next step
  };

  const onChangeAddress = (e) => {
    console.log("radio checked", e.target.value);
    setValueAddress(e.target.value);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Booking
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
          width={1000}
        >
          <Steps
            current={current}
            onChange={onChange}
            style={{
              marginBottom: 24,
              marginTop: 10,
              textAlign: "center",
              width: 800,
            }}
            items={[
              {
                title: "Step 1",
              },
              {
                title: "Step 2",
              },
              {
                title: "Step 3",
              },
            ]}
          />
          {current === 0 && (
            <div id="step1">
              <div className="center">
                <div className="Book_Package_container_72">
                  <div>
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: "18px",
                      }}
                    >
                      Your Package
                    </span>
                    <div>
                      {/* item name and the color shoul be display here */}

                      {/*  */}
                      <InputNumber
                        min={1}
                        max={1000}
                        defaultValue={1}
                        onChange={onChangeQuantity}
                      />
                      <DeleteOutlined />
                    </div>
                  </div>
                  <div className="center">
                    <button
                      className="saveAddressBtn_72"
                      onClick={handleContinue}
                    >
                      CONTINUE TO CHECKOUT
                    </button>
                  </div>
                  <span
                    style={{ marginTop: "8px", flexDirection: "column" }}
                    className="center"
                  >
                    Please, get it now before it sells out.
                  </span>
                </div>
              </div>
            </div>
          )}
          {current === 1 && (
            <div id="step2">
              <div className="center">
                <div className="Book_Package_container_72">
                  <div style={{ textAlign: "right" }}>
                    <button
                      className="saveAddressBtn_72"
                      onClick={handelAddress}
                    >
                      Add New Address
                    </button>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <span
                      style={{
                        marginTop: "8px",
                        marginBottom: "8px",
                        fontSize: "19px",
                        fontWeight: 700,
                      }}
                    >
                      Billing Address
                    </span>
                  </div>
                  <hr />
                  <div className="Add_Address_popup_container">
                    <div className="add_employee_popup_details_container_right">
                      <Radio.Group
                        onChange={onChangeAddress}
                        value={valueAddress}
                      >
                        <div style={{ marginBottom: "8px" }}>
                          <Radio value={1} style={{ marginBottom: "8px" }}>
                            <b>Shipping Billing Address</b>
                            <DeleteOutlined />
                          </Radio>
                        </div>

                        <Radio value={2} style={{ marginBottom: "8px" }}>
                          <b>Default Billing Address</b>

                          <DeleteOutlined />
                        </Radio>
                        <span style={{ marginBottom: "8px" }}>
                          <h1>hi</h1>
                        </span>
                      </Radio.Group>
                    </div>
                    <div className="add_employee_popup_details_container_left">
                      <span>
                        <p>Email:{}</p>
                        <p>Phone:{}</p>
                      </span>
                      <span style={{ flexDirection: "column" }}>
                        <p>Email:{}</p>
                        <p>Phone:{}</p>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="center">
                    <button
                      className="saveAddressBtn_72"
                      onClick={handleContinue}
                    >
                      CONTINUE TO CHECKOUT
                    </button>
                  </div>
                  <span
                    style={{ marginTop: "8px", flexDirection: "column" }}
                    className="center"
                  >
                    Please, get it now before it sells out.
                  </span>
                </div>
              </div>
            </div>
          )}
          {current === 2 && (
            <div id="step3">
              <div className="center">
                <div className="Book_Package_container_72">
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </div>
  );
}




export default BookingSteps
