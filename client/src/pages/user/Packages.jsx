import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

function Packages() {
    const [selectedType, setSelectedType] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    const { category } = useParams();
    const navigate = useNavigate();

    const customPackage = {
        _id: "custom",
        packageType: "Customize",
        eventType: `${category}`,
        description:
            "We offer an hourly rate and are adaptable to your needs. We truly value the importance of creating a warm atmosphere, especially for intimate cozy weddings!",
        baseImage:
            "https://i.ibb.co/VpHgFSn/311c9cdc92ca3d607e43420782f09e9e.png",
        contentImages: [
            "https://i.ibb.co/jyrFzKK/a0bb21fcb14f30827004e370a637100b.jpg",
            "https://i.ibb.co/jyrFzKK/a0bb21fcb14f30827004e370a637100b.jpg",
            "https://i.ibb.co/jyrFzKK/a0bb21fcb14f30827004e370a637100b.jpg",
            "https://i.ibb.co/jyrFzKK/a0bb21fcb14f30827004e370a637100b.jpg",
        ],
    };

    console.log(customPackage);

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
                setSelectedType((existing) => [...existing, customPackage]);
                const sortedPackages = response.data.sort((a, b) => {
                    const typeOrder = { basic: 1, standard: 2, premium: 3 }; // Define the order of package types

                    const typeA = a.packageType.toLowerCase();
                    const typeB = b.packageType.toLowerCase();

                    return typeOrder[typeA] - typeOrder[typeB];
                });
                if (!sortedPackages) {
                    navigate("/404");
                }
                setSelectedPackage(sortedPackages[0]); // Set selectedPackage here
            } catch (error) {
                console.log("Error fetching data", error);
            }
        }       
        getPackageData();
        setViewCount();
        
    }, []);

    const handleImageClick = (packageId) => {
        if (packageId === "custom") {
            setSelectedPackage(customPackage);
        } else {
            const clickedPackage = selectedType.find(
                (packages) => packages._id === packageId
            );
            setSelectedPackage(clickedPackage);
        }
        console.log(selectedPackage);
    };
    const handleCreatePackage = () => {
        if (selectedPackage) {
            navigate(`/booking/${category}/${selectedPackage._id}`);
        }
    };

    const setViewCount = async () => {
        axios.get(`/api/pkgViewCounts/trigger`)
        };     
    return (
        <>
            <Navbar />
            <div className="user_bookings_page_container">
                <div className="packageTypeContainer_72">
                    {selectedType.map((packages) => (
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
                </div>
                <hr style={{ width: "80%" }} />
                {(selectedPackage &&
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
                                                    <div
                                                        style={{
                                                            marginTop: "20px",
                                                        }}
                                                    >
                                                        <ul>
                                                            {selectedPackage.inventories.map(
                                                                (item) => (
                                                                    <li>
                                                                        <p>
                                                                            {
                                                                                item.category
                                                                            }
                                                                            <b>
                                                                                {
                                                                                    " x"
                                                                                }
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                            </b>
                                                                        </p>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
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
                                                <div
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <ul>
                                                        {selectedPackage.extras.map(
                                                            (item) => (
                                                                <li>
                                                                    <p>
                                                                        {item}
                                                                    </p>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
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
                    )) || (
                    //Custom package section implementation
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
                                                src="https://i.ibb.co/4YCFjMP/4c6e31462bc9c165244090787b380eb7.jpg"
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
                                                src="https://i.ibb.co/jyrFzKK/a0bb21fcb14f30827004e370a637100b.jpg"
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
                                                src="https://i.ibb.co/tZ5GXCj/4abab9d3b61d242f293a8a00a8953989.jpg"
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
                                                src="https://i.ibb.co/JRknKdY/3b0ca327d3bda0d8c5b020a2bcdd91f6.jpg"
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
                                                {selectedPackage.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="user_packages_right_content">
                                        <div className="user_packages_right_content_card_1">
                                            <div>
                                                <h3>What You'll Get!</h3>
                                                <div
                                                    style={{
                                                        marginTop: "30px",
                                                    }}
                                                >
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                You can
                                                                customize your
                                                                package with
                                                                your own
                                                                choices.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                This option
                                                                allows you to
                                                                select through
                                                                out full
                                                                inventory
                                                                seamlessly.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="user_packages_right_content_card_2"
                                            style={{
                                                backgroundColor: "#CEBEC9",
                                            }}
                                        >
                                            <h3>Extras</h3>
                                            <div style={{ marginTop: "30px" }}>
                                                <ul>
                                                    <li>
                                                        <p>
                                                            You will get full
                                                            time customer
                                                            support.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            This package costs
                                                            extra 10% than
                                                            others.
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            Click on "Create
                                                            your package" button
                                                            for continue.
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
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
            <Footer />
        </>
    );
}

export default Packages;
