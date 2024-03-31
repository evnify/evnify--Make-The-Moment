import React, { useState } from "react";
import { Button, Modal } from "antd";
import Img from "../../assets/corosal04.svg";
import AddPackage from "./AddPackage";
import UpdatePackage from "./UpdatePackage";
import Viewpackage from "./Viewpackage";

function Packages() {
  const [visibleModal1, setVisibleModal1] = useState(false);
  const [visibleModal2, setVisibleModal2] = useState(false);
  const [visibleModal3, setVisibleModal3] = useState(false);
  const [visibleModal4, setVisibleModal4] = useState(false);

  const showModal1 = () => {
    setVisibleModal1(true);
  };

  const showModal2 = () => {
    setVisibleModal2(true);
  };
  const showModal3 = () => {
    setVisibleModal3(true);
  };
  const showModal4 = () => {
    setVisibleModal4(true);
  };

  const handleOk1 = (e) => {
    console.log(e);
    setVisibleModal1(false);
  };

  const handleOk2 = (e) => {
    console.log(e);
    setVisibleModal2(false);
  };
  const handleOk3 = (e) => {
    console.log(e);
    setVisibleModal3(false);
  };

  const handleOk4 = (e) => {
    console.log(e);
    setVisibleModal4(false);
  };

  const handleCancel1 = (e) => {
    console.log(e);
    setVisibleModal1(false);
  };

  const handleCancel2 = (e) => {
    console.log(e);
    setVisibleModal2(false);
  };
  const handleCancel3 = (e) => {
    console.log(e);
    setVisibleModal3(false);
  };

  const handleCancel4 = (e) => {
    console.log(e);
    setVisibleModal4(false);
  };

  return (
    <>
      {/* Charts */}
      <div class="container">
        <div class="row">
          <div class="col"></div>
          <div class="col"></div>
        </div>
        <div className="bg-white p-5">
          <h2>Packages</h2>
        </div>
        {/* Package Table */}
        <div>
          <div className="d-flex justify-content-between">
            <form>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by ID"
                aria-label="Search"
              />
            </form>
            <div>
              <button className="btn btn-outline-secondary me-3" type="submit">
                Filter
              </button>
              <Button type="primary" onClick={showModal1}>
                +Create New
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <table className="table ">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">PackageID</th>
                  <th scope="col">PackageType</th>
                  <th scope="col">Event</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">p1</th>
                  <td>Standard</td>
                  <td>Wedding</td>
                  <td>Rs.300000</td>
                  <td>
                    <Button type="light" onClick={showModal2}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal3}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                        </g>
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal4}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="currentColor"
                          d="M512 160c320 0 512 352 512 352S832 864 512 864S0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288c52.608 79.872 211.456 288 436.8 288c225.28 0 384.128-208.064 436.8-288c-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448a224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160s-71.744-160-160-160"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">p2</th>
                  <td>Premium</td>
                  <td>Wedding</td>
                  <td>Rs.400000</td>
                  <td>
                    <Button type="light" onClick={showModal2}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal3}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                        </g>
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal4}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="currentColor"
                          d="M512 160c320 0 512 352 512 352S832 864 512 864S0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288c52.608 79.872 211.456 288 436.8 288c225.28 0 384.128-208.064 436.8-288c-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448a224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160s-71.744-160-160-160"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">p3</th>
                  <td>Basic</td>
                  <td>Birthday</td>
                  <td>Rs.200000</td>
                  <td>
                    <Button type="light" onClick={showModal2}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal3}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                        </g>
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal4}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="currentColor"
                          d="M512 160c320 0 512 352 512 352S832 864 512 864S0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288c52.608 79.872 211.456 288 436.8 288c225.28 0 384.128-208.064 436.8-288c-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448a224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160s-71.744-160-160-160"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">p4</th>
                  <td>Premium</td>
                  <td>Anniversary</td>
                  <td>Rs.150000</td>
                  <td>
                    <Button type="light" onClick={showModal2}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal3}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                        </g>
                      </svg>
                    </Button>
                    <Button type="light" onClick={showModal4}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="currentColor"
                          d="M512 160c320 0 512 352 512 352S832 864 512 864S0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288c52.608 79.872 211.456 288 436.8 288c225.28 0 384.128-208.064 436.8-288c-52.608-79.872-211.456-288-436.8-288m0 64a224 224 0 1 1 0 448a224 224 0 0 1 0-448m0 64a160.19 160.19 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160s-71.744-160-160-160"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modals */}
      <div>
        {/* Add Package Moda; */}
        <Modal
          title="Add Package"
          visible={visibleModal1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          width={1000}
        >
          <AddPackage />
        </Modal>

        <Modal
          title="Delete"
          visible={visibleModal2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          width={400}
        >
          <p>Delete</p>
        </Modal>
        <Modal
          title="Update form"
          visible={visibleModal3}
          onOk={handleOk3}
          onCancel={handleCancel3}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          width={900}
        >
          <UpdatePackage />
        </Modal>
        <Modal
          title="View form"
          visible={visibleModal4}
          onOk={handleOk4}
          onCancel={handleCancel4}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          width={900}
        >
          <Viewpackage />
        </Modal>
      </div>
    </>
  );
}

export default Packages;
