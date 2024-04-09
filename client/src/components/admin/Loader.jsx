import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = () => {
    let [loading] = useState(true);

    return (
        <div>
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
