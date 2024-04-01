import React, { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState([]);

  useEffect(() => {
    async function getPackageData() {
      try {
        const response = await axios.get("/api/packages/getpackages");

        setSelectedType(response.data);
        const basicPackage = response.data.find(
          (packages) => packages.packageType === "basic"
        );
        setSelectedPackage(basicPackage);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    getPackageData();
  }, []);

  const handleImageClick = (packageId) => {
    const clickedPackage = selectedType.find(
      (packages) => packages._id === packageId
    );
    setSelectedPackage(clickedPackage);
  };

  return (
    <div style={{ backgroundColor: "#E3E7EC" }}>
      <div className="container">
        <div className="row">
          <div className="packegTypeContainer_72">
            {selectedType
              .filter((packages) => packages.eventType === "Wedding")
              .map((packages) => (
                <div key={packages._id} className="col-md-3">
                  <div
                    style={{
                      position: "relative",
                      width: 267,
                      marginBottom: 20,
                      margin: "0 10px 20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(packages._id)}
                  >
                    <img
                      alt={packages.packageType}
                      src={`${packages.baseImage}`}
                      style={{
                        width: "100%",
                        height: 390,
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {packages.packageType}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
      {selectedPackage &&
        selectedPackage.inventories &&
        selectedPackage.extras &&
        selectedPackage.contentImages && (
          <div>
            <div>
              <h2 style={{ fontSize: 36 }}>
                {" "}
                {selectedPackage.packageType} Plan
              </h2>
            </div>
            
            <div className="container">
              <div className="row ">
                <div className="selectedpackgeContainer_72">
                  <div>
                    {selectedPackage.contentImages.map((img, index) => (
                      <img
                        key={index}
                        alt={selectedPackage.packageType}
                        src={img}
                        style={{
                          width: 100,
                          height: 100,
                          margin: 10,
                          //top: `${150 + index * 50}px`,
                          //   left: `${300 + index * 100}px`,
                          objectFit: "cover",
                          borderRadius: 10,
                          marginBottom: 20,
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ width: 238 }}>
                    Description: {selectedPackage.description}
                  </p>
                  <div className=" wrapCont_72 row ">
                    <div className="col-md-3 ">
                      <div className="packageOffer_72   ">
                        <h3>What You'll Get!</h3>

                        {selectedPackage.inventories.map((item) => (
                          <div>
                            <ul>
                              <li>
                                {item.count} {item.name}s
                              </li>
                            </ul>
                          </div>
                        ))}
                        <p>
                          <b>LKR {selectedPackage.price}</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3">
                    <div className="packageExtras_72">
                      <h3>Extras</h3>
                      {selectedPackage.extras.map((item) => (
                        <div>
                          <ul>
                            <li>{item}</li>
                          </ul>
                          <p></p>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>               
                  <button className="createPackageBtn_72 ">
                    Create Your Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Booking;
