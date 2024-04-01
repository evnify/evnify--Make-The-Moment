import React from "react";
import { DatePicker, Space, Input } from "antd";
import{ShoppingCartOutlined } from '@ant-design/icons';
import {AddBillingAddress, BigImageView,SideMenuItems} from "../../components"
import { Booking } from "../../components/users";
import PackageIncludesView from "../../components/users/PackageIncludesView";
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
     <AddBillingAddress/>
     <Booking/>
     <PackageIncludesView/>
     </div>
    </div>
  );
}

export default Packages;
