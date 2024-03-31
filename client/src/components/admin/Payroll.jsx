import React,{useState} from "react";
import { Space, Table, Tag } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "3",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "4",
    Name: "John",
    EmpID: "Brown",
    Type: 32,
    Amount: "New York No. 1 Lake Park",
    Date: "2024/05/10",
    tags: ["nice", "developer"],
  },
];

function Payroll() {
  const [size, setSize] = useState('large');
  return (
      <div>
        <h1 classname="payroll_002"> Recent Salaries </h1>
        <div className="container">
      <Radio.Group className="right-align" value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large" className="align-right-button">Paid</Radio.Button>
        <Radio.Button value="default" className="align-right-button">Pending</Radio.Button>
      </Radio.Group>
    </div>
      <Table dataSource={data}>
        <Column title="Name" dataIndex="Name" key="Name" />
        <Column title="EmpID" dataIndex="EmpID" key="EmpID" />
        <Column title="Type" dataIndex="Type" key="Type" />
        <Column title="Amount" dataIndex="Amount" key="Amount" />
        <Column title="Date" dataIndex="Date" key="Date" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
      
    </div>
  );
}

export default Payroll;
