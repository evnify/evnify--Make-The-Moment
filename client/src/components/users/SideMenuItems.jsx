import React from "react";
import { Checkbox, Button, Menu } from "antd";

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

function SideMenuItems() {
    return (
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
    );
}

export default SideMenuItems;
