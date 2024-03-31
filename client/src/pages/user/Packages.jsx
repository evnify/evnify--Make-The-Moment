import React from "react";
import SideMenuItems from "../../components/users/SideMenuItems";
import { DatePicker, Space, Input } from "antd";
import{ShoppingCartOutlined } from '@ant-design/icons';
import BigImageView from "../../components/users/BigImageView";
const { Search } = Input;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const onSearch = (value, _e, info) => console.log(info?.source, value);
function Packages() {
  return (
    <div style={{ backgroundColor: "#E3E7EC" }}> 
      <Space direction="vertical">
        <DatePicker onChange={onChange} />     
      </Space>
      <Search
          placeholder="input search text"
          allowClear
          //onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <ShoppingCartOutlined />
        <SideMenuItems />
      <button className="createPackageBtn_72 ">CONTINUE TO CHECKOUT </button>
      <div>
     <BigImageView/>
     </div>
    </div>
  );
}

export default Packages;
