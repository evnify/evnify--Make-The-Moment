import { React, useState, useEffect } from "react";
import { DatePicker, Space, Input } from "antd";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  
  SideMenuItems,
} from "../../components";
import { useParams } from "react-router-dom";
import { Tag, Carousel, Button } from "primereact";
const { Search } = Input;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const onSearch = (value, _e, info) => console.log(info?.source, value);
function Booking() {
  const { id } = useParams();

  console.log(id);
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  const [assignedItems, setAssignedItems] = useState([]);

  const getInventoryByID = async(itemID) => {
    return await axios
     .post("/api/packages/getInventoriesByIds",{ itemID } )
     .then((res) => {
        console.log(res.data);
      })
     .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function getItemsData() {
      try {
        const response = await axios.post(`/api/packages/getItemById`, {
          itemId: id,
        });
        setAssignedItems(response.data.inventories);
        console.log(response.data.inventories);
        
        const inventoryList = response.data.inventories;
  
        const productList = [];
        for (let i = 0; i < inventoryList.length; i++) {
          const item = await getInventoryByID(inventoryList[i].id);
          if(item) {
          setProducts(items => items.concat(item));
          }
        }
        console.log("Product List",productList);
        console.log("ITEM List",products);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    getItemsData();
  }, [1]);
  

  const productTemplate = (products) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        {/* <div className="mb-3">
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${products.image}`}
            alt={products.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{products.name}</h4>
          <h6 className="mt-0 mb-3">${products.count}</h6>
          <Tag
            value={products.inventoryStatus}
            severity={getSeverity(products)}
          ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#E3E7EC" }}>
      <Space direction="vertical">
        <DatePicker onChange={onChange} />
      </Space>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <ShoppingCartOutlined />
      <SideMenuItems />
      <div className="card">
        <Carousel
          value={products}
          numScroll={1}
          numVisible={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
      </div>
      <button className="createPackageBtn_72 ">CONTINUE TO CHECKOUT </button>
      <div>
      
      </div>
    </div>
  );
}

export default Booking;
