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

                setSelectedType(response.data);
                const selectedPackages = response.data.find(
                    (packages) => packages.packageType.toLowerCase() === "basic"
                );
                setSelectedPackage(selectedPackages);
                console.log(selectedPackages);
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
        if (selectedPackage) {
            window.location.href = `/packages/${selectedPackage._id}`;
        }
    };
    return (
        <>
            <Navbar />
            <div className="user_bookings_page_container">
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
                                    onClick={() =>
                                        handleImageClick(packages._id)
                                    }
                                >
                                    <h2>
                                        {packages.packageType.toUpperCase()}
                                    </h2>
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
                <hr style={{ width: "80%" }} />
                {selectedPackage &&
                    selectedPackage.inventories &&
                    selectedPackage.extras &&
                    selectedPackage.contentImages && (
                        <div>
                            <div className="user_package_content_container">
                                <h2>{selectedPackage.packageType} Plan</h2>
                            </div>
                            <div className="user_packages_main_section_container">
                                <div className="user_packages_main_section">
                                    <div className="user_packages_left_content">
                                        <div className="user_package_main_container1">
                                            <div className="user_package_basic_plan_image1">
                                                <img
                                                    key={1}
                                                    alt={
                                                        selectedPackage.packageType
                                                    }
                                                    src={
                                                        selectedPackage
                                                            .contentImages[3]
                                                    }
                                                    style={{
                                                        width: 140.105,
                                                        height: 137.499,
                                                        objectFit: "cover",
                                                        objectPosition: "top",
                                                    }}
                                                />
                                            </div>
                                            <div className="user_package_basic_plan_image2">
                                                <img
                                                    key={2}
                                                    alt={
                                                        selectedPackage.packageType
                                                    }
                                                    src={
                                                        selectedPackage
                                                            .contentImages[1]
                                                    }
                                                    style={{
                                                        width: 102.31,
                                                        height: 153.79,
                                                        objectFit: "cover",
                                                        objectPosition: "top",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="user_package_main_container2">
                                            <div className="user_package_basic_plan_image3">
                                                <img
                                                    key={3}
                                                    alt={
                                                        selectedPackage.packageType
                                                    }
                                                    src={
                                                        selectedPackage
                                                            .contentImages[2]
                                                    }
                                                    style={{
                                                        width: 173.991,
                                                        height: 278.256,
                                                        objectFit: "cover",
                                                        objectPosition: "top",
                                                    }}
                                                />
                                            </div>
                                            <div className="user_package_basic_plan_image4">
                                                <img
                                                    key={4}
                                                    alt={
                                                        selectedPackage.packageType
                                                    }
                                                    src={
                                                        selectedPackage
                                                            .contentImages[0]
                                                    }
                                                    style={{
                                                        width: 187.676,
                                                        height: 260.661,
                                                        objectFit: "cover",
                                                        objectPosition: "top",
                                                    }}
                                                />
                                                <p
                                                    className="user_package_basic_plan_txt_section"
                                                    style={{
                                                        width: 220,
                                                        textAlign: "justify",
                                                    }}
                                                >
                                                    {
                                                        selectedPackage.description
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="user_packages_right_content">
                                            <div className="user_packages_right_content_card_1">
                                                <div>
                                                    <h3>What You'll Get!</h3>
                                                    {selectedPackage.inventories.map(
                                                        (item) => (
                                                            <div>
                                                                <ul>
                                                                    <li>
                                                                        {
                                                                            item.count
                                                                        }{" "}
                                                                        {
                                                                            item.name
                                                                        }
                                                                        s
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <p
                                                    style={{
                                                        textAlign: "center",
                                                        fontSize: 25,
                                                    }}
                                                >
                                                    <b>
                                                        {selectedPackage.price}{" "}
                                                        LKR
                                                    </b>
                                                </p>
                                            </div>
                                            <div
                                                className="user_packages_right_content_card_2"
                                                style={{
                                                    backgroundColor: "#CEBEC9",
                                                }}
                                            >
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
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "flex-end",
                                                marginRight: 30,
                                                marginBottom: 30,
                                            }}
                                        >
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
                        </div>
                    )}
            </div>
        </>
    );
}

export default Packages;
