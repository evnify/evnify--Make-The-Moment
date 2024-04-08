import React, { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: "150px" }}>
            <center>
                <div className="sweet-loading">
                    <BeatLoader
                        color="#000"
                        loading={loading}
                        cssOverride=""
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </center>
        </div>
    );
};

export default Loader;
