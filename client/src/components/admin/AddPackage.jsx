import React, { useState } from "react";

const AddPackage = () => {
  const [packageType, setPackageType] = useState("");
  const [eventType, setEventType] = useState("");
  const [price, setPrice] = useState("");
  const [inventories, setInventories] = useState("");
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!packageType || !eventType || !price || !inventories || !extras) {
      alert("Please fill in all the fields");
    }
  };

  return (
    <>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="packageType" className="form-label">
                Package Type
              </label>
              <select
                id="packageType"
                className="form-select"
                aria-label="Default select example"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              >
                <option value="">Select Package</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="eventType" className="form-label">
                Event Type
              </label>
              <select
                id="eventType"
                className="form-select"
                aria-label="Default select example"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="">Select event</option>
                <option value="Wedding">Wedding</option>
                <option value="Get Together">Get Together</option>
                <option value="Birthday">Birthday</option>
                <option value="Bride to be">Bride to be</option>
                <option value="Farewell Party">Farewell Party</option>
                <option value="Anniversary Party">Anniversary Party</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inventories" className="form-label">
                Inventories
              </label>
              <input
                type="text"
                className="form-control"
                id="inventories"
                value={inventories}
                onChange={(e) => setInventories(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="extras" className="form-label">
                Extras
              </label>
              <input
                type="text"
                className="form-control"
                id="extras"
                value={extras}
                onChange={(e) => setExtras(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <h6>Package Image</h6>
              <label className="form-label">Upload package image here</label>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="packageImageInput">
                  Upload
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="packageImageInput"
                />
              </div>
            </div>
            <div className="mb-3">
              <h6>Content Image</h6>
              <label className="form-label">Upload content image here</label>

              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="contentImageInput">
                  Upload
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="contentImageInput"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPackage;
