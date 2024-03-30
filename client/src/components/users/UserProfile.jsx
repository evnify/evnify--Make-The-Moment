import React from "react";

function UserProfile() {
    return (
        <div className="container">
            <div className="bg-image ">
                <div className="profile-card">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="profile"
                        className="rounded-circle"
                    />
                </div>

              <div className="profile-info">
                    <h2>John Doe</h2>
                    <p>
                        <strong>Email:</strong>
                        <span>
                            <a href="mailto:  [email protected]">
                                [email protected]
                            </a>
                        </span>
                    </p>
                </div>
              <button className="btn btn-primary edit">Edit Profile</button>
            </div>

            <div className="profile-details"></div>
        </div>
    );
}

export default UserProfile;
