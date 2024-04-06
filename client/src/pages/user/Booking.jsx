import { React, useState, useEffect } from "react";
import { Input } from "antd";
import axios from "axios";
import { Navbar } from "../../components";
import { useParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Checkbox, Button, Menu, DatePicker } from "antd";
const { Search } = Input;

// Side Menu
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem("Category", "sub1", null, [
        <Menu.Item key="chairs">
            <Checkbox>Chairs</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Tables</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Cake Holders</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Plates</Checkbox>
        </Menu.Item>,
        <Menu.Item key="tables">
            <Checkbox>Wine Glasses</Checkbox>
        </Menu.Item>,
    ]),
    getItem("Color", "sub2", null, [
        <div className="itemColorBtn_72">
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn1"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Black</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn2"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Brown</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn3"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">White</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn4"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Red</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn5"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Grey</span>
            </div>
            <div className="colorBtnContainer">
                <Button
                    type="primary"
                    className="colorBtn6"
                    shape="circle"
                    style={{ marginRight: "8px" }}
                ></Button>
                <span className="colorText">Tan</span>
            </div>
        </div>,
    ]),
];

// Main Component
const onSearch = (value, _e, info) => console.log(info?.source, value);
function Booking() {
    const { category, id } = useParams();
    console.log(id);

    const [date, setDate] = useState(null);
    const [searchKey, setSearchKey] = useState("");

    return (
        <div style={{ backgroundColor: "#efefef" }}>
            <Navbar />
            <div style={{ position: "fixed" }}>
                <div>
                    <div className="sideBar_72">
                        <p>
                            <b>Products</b>
                        </p>
                        <hr />
                        <Menu
                            //onClick={onClick}
                            style={{
                                width: 256,
                            }}
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1", "sub2"]}
                            mode="inline"
                        >
                            {items.map((item) => (
                                <Menu.SubMenu key={item.key} title={item.label}>
                                    {item.children}
                                </Menu.SubMenu>
                            ))}
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="booking_page_main_container">
                <div direction="vertical">
                    <DatePicker
                        onChange={(date, dateString) => setDate(dateString)}
                    />
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={(value) => setSearchKey(value)}
                        style={{
                            width: 200,
                        }}
                    />
                    <ShoppingCartOutlined />
                </div>
                <button className="createPackageBtn_72 ">
                    CONTINUE TO CHECKOUT
                </button>
            </div>
        </div>
    );
}

export default Booking;
