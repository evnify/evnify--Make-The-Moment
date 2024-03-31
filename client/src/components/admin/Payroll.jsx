import React, { useState } from "react";
import { Space, Table, Tag, Button, Radio, Input, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
const { Column } = Table;
const { Search } = Input;

const data = [
  {
    key: "1",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "200000",
    Date: "2024/05/10",
    Status: "pending",
    Action: true,
  },
  {
    key: "2",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "200000",
    Date: "2024/05/10",
    Status: "pending",
    Action: true,
  },
  {
    key: "3",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "200000",
    Date: "2024/05/10",
    Status: "paid",
    Action: true,
  },
  {
    key: "4",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "200000",
    Date: "2024/05/10",
    Status: "paid",
    Action: true,
  },
];

function Payroll() {
  const [size, setSize] = useState("large");

  const [isModalOpen, setIsModalOpen] = useState(false); // IS model open use state
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="payroll_002"> Recent Salaries </h1>
      <Search
        placeholder="Search "
        style={{
          width: 300,
          padding: "0px 0px 0px 30px",
        }}
      />
      <div className="container_002">
        <Radio.Group
          className="right-align"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <Radio.Button value="large" className="">
            Paid
          </Radio.Button>
          <Radio.Button value="default" className="align-right-button_002">
            Pending
          </Radio.Button>
        </Radio.Group>
        <button className="payroll_create_btn_002" onClick={showModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8.5 2.75C8.5 2.55109 8.42098 2.36032 8.28033 2.21967C8.13968 2.07902 7.94891 2 7.75 2C7.55109 2 7.36032 2.07902 7.21967 2.21967C7.07902 2.36032 7 2.55109 7 2.75V7H2.75C2.55109 7 2.36032 7.07902 2.21967 7.21967C2.07902 7.36032 2 7.55109 2 7.75C2 7.94891 2.07902 8.13968 2.21967 8.28033C2.36032 8.42098 2.55109 8.5 2.75 8.5H7V12.75C7 12.9489 7.07902 13.1397 7.21967 13.2803C7.36032 13.421 7.55109 13.5 7.75 13.5C7.94891 13.5 8.13968 13.421 8.28033 13.2803C8.42098 13.1397 8.5 12.9489 8.5 12.75V8.5H12.75C12.9489 8.5 13.1397 8.42098 13.2803 8.28033C13.421 8.13968 13.5 7.94891 13.5 7.75C13.5 7.55109 13.421 7.36032 13.2803 7.21967C13.1397 7.07902 12.9489 7 12.75 7H8.5V2.75Z"
              fill="white"
            />
          </svg>{" "}
          &nbsp; Create{" "}
        </button>
      </div>
      {/* payrool_table */}
      <div className="admin_payroll_table_002">
        <Table dataSource={data}>
          <Column title="Name" dataIndex="Name" key="Name" />
          <Column title="EmpID" dataIndex="EmpID" key="EmpID" />
          <Column title="Type" dataIndex="Type" key="Type" />
          <Column title="Amount" dataIndex="Amount" key="Amount" />
          <Column title="Date" dataIndex="Date" key="Date" />
          <Column
            title="Status"
            dataIndex="Status"
            key="Status"
            render={(status) => (
              <Tag color={status === "pending" ? "green" : "red"}>
                {status.toLowerCase()}
              </Tag>
            )}
          />
          <Column
            title="Action"
            dataIndex="Action"
            key="Action"
            render={(text, record) => (
              <Space size="middle">
                {record.Action ? (
                  <>
                    <Icon icon="mdi:download" />
                    <Icon icon="material-symbols-light:delete-outline" />
                    <Icon icon="mage:edit" />
                    <Icon icon="subway:tick" />
                  </>
                ) : (
                  <Button icon={<DownloadOutlined />} />
                )}
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title="Create New Paysheet"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="create_paysheet_002">
          <div>
               <div className="Create-paysheet-input">
               <p>Select an Employee</p>
              <Input placeholder="Basic usage" style={{margin:"0"}} />;
               </div>
          </div>
          <div>
            <Input placeholder="Basic usage" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Payroll;
