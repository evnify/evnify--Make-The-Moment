import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";

function Packages() {
    const [selectedType, setSelectedType] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    const { category } = useParams();

    useEffect(() => {
        async function getPackageData() {
            try {
                const response = await axios.post(
                    "/api/packages/getPackagesByType",
                    {
                        eventType: category,
                    }
                );
                const selectedPackage = response.data.find(
                    (packages) => packages.packageType === "basic"
                );
                setSelectedPackage(selectedPackage);
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
    const handleCreatePackage = () => {
        // Redirect to packages page with selected package ID as URL parameter
        if (selectedPackage) {
            window.location.href = `/packages/${selectedPackage._id}`;
        }
    };
    return (
        <div style={{ backgroundColor: "#E3E7EC" }}>
            <Navbar />
            <div className="packageTypeContainer_72">
                {selectedType
                    .filter((packages) => packages.eventType === category)
                    .map((packages) => (
                        <div key={packages._id}>
                            <div
                                className="user_package_type_card_72"
                                style={{
                                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${packages.baseImage})`,
                                }}
                                onClick={() => handleImageClick(packages._id)}
                            >
                                <h2>{packages.packageType.toUpperCase()}</h2>
                                <h2>PLAN</h2>
                            </div>
                        </div>
                    ))}
                    <div key="Custom">
                            <div
                                className="user_package_type_card_72"
                                style={{
                                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__)`,
                                }}
                            >
                                <h2>CUSTOMIZE </h2>
                                <h2>PLAN</h2>
                            </div>
                        </div>
            </div>
            <hr />
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
                                        {selectedPackage.contentImages.map(
                                            (img, index) => (
                                                <img
                                                    key={index}
                                                    alt={
                                                        selectedPackage.packageType
                                                    }
                                                    src={img}
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        margin: 10,
                                                        objectFit: "cover",
                                                        borderRadius: 10,
                                                        marginBottom: 20,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <p style={{ width: 238 }}>
                                        Description:{" "}
                                        {selectedPackage.description}
                                    </p>
                                    <div className=" wrapCont_72 row ">
                                        <div className="col-md-3 ">
                                            <div className="packageOffer_72   ">
                                                <h3>What You'll Get!</h3>

                                                {selectedPackage.inventories.map(
                                                    (item) => (
                                                        <div>
                                                            <ul>
                                                                <li>
                                                                    {item.count}{" "}
                                                                    {item.name}s
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                )}
                                                <p>
                                                    <b>
                                                        LKR{" "}
                                                        {selectedPackage.price}
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="packageExtras_72">
                                                <h3>Extras</h3>
                                                {selectedPackage.extras.map(
                                                    (item) => (
                                                        <div>
                                                            <ul>
                                                                <li>{item}</li>
                                                            </ul>
                                                            <p></p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="createPackageBtn_72 "
                                        onClick={handleCreatePackage}
                                    >
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

export default Packages;
