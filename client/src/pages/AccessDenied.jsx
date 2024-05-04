import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function AccessDenied() {
    const navigate = useNavigate();
    return (
        <div className="center" style={{height : "100vh"}}>
            <Result
                status="403"
                title="Access Denied"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}

export default AccessDenied;
