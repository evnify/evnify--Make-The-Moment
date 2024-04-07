import React from "react";

const Viewpackage = () => {
  return (
    <>
      <h3>View Package Details</h3>
      <img src={""} alt="" className="img-fluid" />
      <div className="row mt-3">
        <div className="col-lg-6">
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Package Type
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                disable
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
                class="form-select"
                aria-label="Default select example"
                disable
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
                type="disable"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Inventories</label>
              <input
                type="disable"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <input
                type="disable"
                class="form-control"
                aria-describedby="emailHelp"
              />
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <div class="mb-3">
            <label class="form-label">Extras</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewpackage;
