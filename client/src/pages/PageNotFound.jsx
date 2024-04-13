import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="center" style={{ height: "100vh" }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}

export default PageNotFound;
