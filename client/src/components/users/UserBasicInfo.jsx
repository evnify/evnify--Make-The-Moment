import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input, Space, message } from "antd";

const UserProfileForm = () => {
    const [user, setUser] = useState({});
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchUserByID = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            const userID = { userID: user.userID };

            try {
                const res = await axios.post("/api/users/getUserById", userID);
                const userData = res.data;
                console.log(userData);

                // Set user details to state variables
                setUserId(userData.userID);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setUsername(userData.username);
                setAddress(userData.address1);
                setCity(userData.city);
                setProvince(userData.province);
                setZipCode(userData.zipcode);

                // Set profile picture if available
                setFileList([
                    {
                        uid: "1",
                        name: "image.png",
                        status: "done",
                        url: userData.profilePic,
                    },
                ]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserByID();
    }, []);

    // Add user model use states
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zipCode, setZipCode] = useState("");

    const saveChanges = async () => {
        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            address1: address,
            city: city,
            province: province,
            zipcode: zipCode,
        };

        try {
            const res = await axios.post(`/api/users/updateUser/${userId}`, updatedUser);
            console.log("User details updated successfully:", res.data);
            message.success("User details updated successfully");
            
        } catch (error) {
            console.error("Error updating user details:", error);
            message.error("Error updating user details");
        }
    };

    return (
        <>
            <Space direction="vertical">
                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        Full Name
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "260px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <Input
                        style={{
                            flex: "auto",
                            width: "260px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        User name
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "260px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        Email Address
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        Contact Number{" "}
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        City
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        province
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        Address
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                    <label style={{ width: "200px", marginTop: "10px" }}>
                        Zip code
                    </label>
                    <Input
                        style={{
                            flex: "auto",
                            width: "360px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Space>
            </Space>

            <button className="btn btn-primary" onClick={saveChanges}
            style={{margin : "80px", marginLeft : "210px" }}>
                Save Changes
            </button>
        </>
    );
};

export default UserProfileForm;
