import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components";
import { useNavigate } from "react-router-dom";

function Packages() {
    const [selectedType, setSelectedType] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState([]);

    const { category } = useParams();
    const navigate = useNavigate();

    const customPackage = {
        _id: "custom",
        packageType: "Customize",
        eventType: "Wedding",
        description:
            "We offer an hourly rate and are adaptable to your needs. We truly value the importance of creating a warm atmosphere, especially for intimate cozy weddings!",
        baseImage:
            "https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__",
        contentImages: [
            "https://s3-alpha-sig.figma.com/img/76ff/20ac/4abab9d3b61d242f293a8a00a8953989?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CnffcvBZF1nhH16~x7A-diNBjDLLgT7KA0JRGHqeRgpUdE45FqdZzeDkCbJ0Loco~2bHX~x5k2BIFqiizXwQJYGguJ~8QlCQ94zOzcaoyznChhBpbQxQgO0tx4dxvq4EKYPs9-2datgu8O4UjKTASrgZnkFSM97821sJXlYhIP-m8Yl4zkASUp5Mlls8Fz3BrDQmak1ahq1GbAmNfSH~MMnp9KVLEQTVfa9-j4uWI-BtubPyPuaIdZ8KtaCCdCV4AP5v1i2jRsAuMTgxFdFduhxaLgI6~6qHBDwDP~lLnOMokeAYK2E5h3r7KGSeKb4h-saBYPMCFSAo13v5Hc0qFQ__",
            "https://s3-alpha-sig.figma.com/img/9df6/0a48/a0bb21fcb14f30827004e370a637100b?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y8jcR4E6MkmAumn3N0JPxIozP154lDYCyv6dA4dTV0HTx6BDc3hlJvbScdIjYbzXLq2bTgKFC0CrJdxiV-rCmoivnZ8QJp3ZwyoTZrtN6hlXhpRhSG63Ccn8oi2ZFV-czXXTkdVBgxDL4m5sMbNOo7GSlurauZMZ82hxIv-YAFRotd9AzT7g5u3JQx4YU3wrQ69xfw4J7LXlx2PLzMuZVglWQi61y-NGCF7aecs0lGutODGEn3ecVua6joQqYGdCEdIZ~bvqVVMCObCVd36XAtytxth8hR3WWowpM-zI5swSsKMjQT2zbD5xaagUAqseBlcDFkPeeVyU4M3IXs0qVA__",
            "https://s3-alpha-sig.figma.com/img/d942/3b06/3b0ca327d3bda0d8c5b020a2bcdd91f6?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jSVgUf1RvvkiQA0mF7RsP5BE4NrQwDxJU3Hm2S1lYCYjoV1VsfXT~O2wbPvTh8ETDURDLOIpA6KZ-jAOTUnYmkboLPXjfk1WGZ3MgSx1WWA-9xK6k~3UxPjrFDu-zr0qhdXXLoSwVsX-3cyVD3iPWKCDIMB661Wq91J8fI-LkTpj7PUWOxESy-fxXeEbdTtO~B2iwdPaUz2vebaHNqXnuh6e71W1r~O2PfpeffzwJnqKAR1AcSxfCUnUZiCGsbaaqMXcUVBhm4jfAN5Oy3VMZEM4gGnR2vfifDibcmfMtXV0MeeFcUUIm~52cj5KCo6NZLV8tUnxpz09bDkRxpx5Kg__",
            "https://s3-alpha-sig.figma.com/img/f6e6/24c4/4c6e31462bc9c165244090787b380eb7?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D~azLvwPig4HbfCtG3uCWZXh7AUDKOTBvNSYkS6XmqHFdlgsLkwaeuLDsMzGBeuU8yuDyx7aDhtaV3lNGf-SfSMGXqQIfFgBqBNcfoaGTYYTJE4WfyqLhelsPhIdi4735aiIbRZ9BF31qVc~U3rn2FZMsgGF3n9V7g3PWk1~hIYjUcO0DKl9nfVTkVPABMuHFd3jgn4gWPwAk7zlWTyAZBRTfkBGCBD7DO3f3tfVOAd9f8VwTqCTfUu9qDTvTZut4vtDU6CJhRSP08H9IcmrJUTj9wSkIl7hwqQFErKL1q3INCph5VDfdFj1ZTjvFCAiKW0ZQ850tC8W0pdUobHOuw__",
        ],
    };

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
                const selectedPackages = response.data.find(
                    (packages) => packages.packageType.toLowerCase() === "basic"
                );
                setSelectedPackage(selectedPackages);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        }
        getPackageData();
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
    return (
        <>
            <Navbar />
            <div className="user_bookings_page_container">
                <div className="packageTypeContainer_72">
                    {selectedType
                        .filter((packages) => packages.eventType === category)
                        .map(
                            (packages) => (
                                (
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
                                )
                            )
                        )}
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
                    )) || (
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
                                                src="https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__"
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
                                                src="https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__"
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
                                                src="https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__"
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
                                                src="https://s3-alpha-sig.figma.com/img/3ecd/1c36/311c9cdc92ca3d607e43420782f09e9e?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nhfmNAczjuKxUZPqwKhBK8PhcSqwFzYJ5-lr~o3gGHR81MVH~EMCrZgZCy0N5gkHcLPKBuYZZznhZMfGBUNqXBe7lFF9~9KB~GR1Dl3vvVI0s2Q~gpMuz3NyMonA0WTxbCXhTsGaNGnug1VYoj54A0--lrSE2K2zhtKU4UEthaAwLkMkdcMxKjg7SHzdWbb9FW8nLBqV51yZFYW9f8S7Z0Uk6LM8e-MtsHJVCWOidwU-F0pK0vlnBA-92cDxHdg1f-V4i2Lsw1gV4sjctyZfIZZMu~dUofCb7ZXMLQQ7NPW5Li02oHvNd4GnFNPUQ4dRk8V4Up7Rb5fJQTpOVuJkLA__"
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
                                                <div>
                                                    <p>hi</p>
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
                                            <div>
                                                <p>hi</p>
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
        </>
    );
}

export default Packages;
