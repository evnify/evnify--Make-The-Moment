import React, { useState } from "react";

const UpdatePackage = () => {
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
    <h3>Update Package Details</h3>
    <img src={""} alt="" className="img-fluid" />
    <div className="row mt-3">
    <form onSubmit={handleSubmit}>
      <div className="col-lg-6">
        
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Package Type
            </label>
            <select
                id="packageType"
                className="form-select"
                aria-label="Default select example"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
              >
              <option selected>Select Package</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="PEvent Type" class="form-label">
              Event Type
            </label>
            <select
                id="eventType"
                className="form-select"
                aria-label="Default select example"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
            
              <option selected>Select event</option>
              <option value="1">Wedding</option>
              <option value="2">Get Together</option>
              <option value="3">Birthday</option>
              <option value="1">Bride to be</option>
              <option value="2">Farewell Party</option>
              <option value="3">Anniversary Party</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Price</label>
            <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
          </div>
          <div class="mb-3">
            <label class="form-label">Inventories</label>
            <input
                type="text"
                className="form-control"
                id="inventories"
                value={inventories}
                onChange={(e) => setInventories(e.target.value)}
              />
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
          </div>
          <div class="mb-3">
            <label class="form-label">Extras</label>
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
        <div class="mb-3">
          <h6>Package Image</h6>
          <label class="form-label">Upload package image here</label>

          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">
              Upload
            </label>
            <input type="file" class="form-control" id="inputGroupFile01" />
          </div>
        </div>
        <div class="mb-3">
          <h6>Content Image</h6>
          <label class="form-label">Upload content image here</label>

          <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">
              Upload
            </label>
            <input type="file" class="form-control" id="inputGroupFile01" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
            Save
          </button>
        </form>
    </div>
  </>
);
};
export default UpdatePackage;
