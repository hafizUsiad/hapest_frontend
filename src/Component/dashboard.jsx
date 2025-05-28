import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from "react";
import TopBar from './sub component/navbar';
import Sidebar from './sub component/sidebar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {server} from "../serverconfig";

function Dashboard()
{
    const [projects, setProjects] = useState([]);
 const [number, setNumber] = useState([28,78,98,100,50,60,40,34,56,67,43,23,10]);
 const [project_type, setproject_type] = useState(['Design','Mobile App','UI/UX','web development','SEO']);

  const userdetail = useMemo(() => {
          const storedUser = sessionStorage.getItem("userdetail");
          return storedUser ? JSON.parse(storedUser) : null;
      }, []);
      
      console.log(userdetail?.user_role);  // ✅ Correct way to log user_role
      

  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.PUBLIC_URL}/assets/js/app.js`;
    script.async = true;
    document.body.appendChild(script);
    
    // Check if userdetail exists in session storage
    if (!sessionStorage.getItem("userdetail")) {
      // Redirect to sign-in page if user is not logged in
      navigate("/sign-in");
    }
  }, [navigate]);
      useEffect(() => {
        const fetchData = async () => {
            try {
                // Run both API calls in parallel using Promise.all
                const [projectsRes] = await Promise.all([
                    axios.get(`${server}/api/project/allprojects`, {
                        params: {
                            userrole: userdetail.user_role,
                            userid: userdetail.userid,
                        },
                    }),
                    axios.get(`${server}/api/getowner`),
                ]);

                setProjects(projectsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [navigate, userdetail]);

    return(
                <div>

                  {/* loader Start */}
                  {/* <div id="loading">
                    <div id="loading-center">
                    </div>
                  </div> */}
                  {/* loader END */}
                  {/* Wrapper Start */}
                  <div className="wrapper">
                    <Sidebar/>   
                    <TopBar/>
                    <div className="content-page">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Investment</h5>
                                  <span className="badge badge-primary">Monthly</span>
                                </div>
                                <h3>$<span className="counter">35000</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-primary">65%</span>
                                </div>
                                <div className="iq-progress-bar bg-primary-light mt-2">
                                  <span className="bg-primary iq-progress progress-1" data-percent={65} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Sales</h5>
                                  <span className="badge badge-warning">Anual</span>
                                </div>
                                <h3>$<span className="counter">25100</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-warning">35%</span>
                                </div>
                                <div className="iq-progress-bar bg-warning-light mt-2">
                                  <span className="bg-warning iq-progress progress-1" data-percent={35} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Cost</h5>
                                  <span className="badge badge-success">Today</span>
                                </div>
                                <h3>$<span className="counter">33000</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-success">85%</span>
                                </div>
                                <div className="iq-progress-bar bg-success-light mt-2">
                                  <span className="bg-success iq-progress progress-1" data-percent={85} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="card card-block card-stretch card-height">
                              <div className="card-body">
                                <div className="top-block d-flex align-items-center justify-content-between">
                                  <h5>Profit</h5>
                                  <span className="badge badge-info">Weekly</span>
                                </div>
                                <h3>$<span className="counter">2500</span></h3>
                                <div className="d-flex align-items-center justify-content-between mt-1">
                                  <p className="mb-0">Total Revenue</p>
                                  <span className="text-info">55%</span>
                                </div>
                                <div className="iq-progress-bar bg-info-light mt-2">
                                  <span className="bg-info iq-progress progress-1" data-percent={55} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="card-transparent mb-0">
                              <div className="card-header d-flex align-items-center justify-content-between p-0 pb-3">
                                <div className="header-title">
                                  <h4 className="card-title">Latest Projects</h4>
                                </div>
                                <div className="card-header-toolbar d-flex align-items-center">
                                  <div id="top-project-slick-arrow" className="slick-aerrow-block">
                                  </div>
                                </div>
                              </div>
                              <div className="card-body p-0">
                                <ul className="list-unstyled row top-projects mb-0">
                                    {projects.length > 0 ? (
    projects.map((project, index) => (
                                  <li className="col-lg-4">                                    
                                    <div className="card">
                                      <div className="card-body"> 
                                        <h5 className="mb-3">{project.project_name}</h5>
                                        <p className="mb-3"><i className="las la-calendar-check mr-2" />{project.project_createdat}</p>
                                        <p className="mb-3"><i className="" />{project.project_description}</p>
                                        <div className="iq-progress-bar bg-gray-light mb-4">
                                            <span
                                              className="bg-primary iq-progress progress-1"
                                              data-percent={number[index]}
                                              style={{
                                                transition: 'width 2s ease 0s',
                                                width: `${number[index]}%`
                                              }}
                                            />
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="iq-media-group">
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/01.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/02.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/03.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                            <a href="/" className="iq-media">
                                              <img src="../assets/images/user/04.jpg" className="img-fluid avatar-40 rounded-circle" alt="" />
                                            </a>
                                          </div>
                                          <div>
                                            <a href="/" className="btn bg-primary-light">{project_type[index]}</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
))
  ) : (
    <p>No projects found.</p>
  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Page end  */}
                      </div>
                    </div>
                  </div>
                  {/* Wrapper End*/}
                  {/* Modal list start */}
                  <div className="modal fade" role="dialog" aria-modal="true" id="new-project-modal">
                    <div className="modal-dialog  modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle01">New Project</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText01" className="h5">Project Name*</label>
                                <input type="text" className="form-control" id="exampleInputText01" placeholder="Project Name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Categories *</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Category</option>
                                  <option>Android</option>
                                  <option>IOS</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Development</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText004" className="h5">Due Dates*</label>
                                <input type="date" className="form-control" id="exampleInputText004" defaultValue />
                              </div>                        
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText07" className="h5">Assign Members*</label>
                                <input type="text" className="form-control" id="exampleInputText07" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-task-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle">New Task</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText02" className="h5">Task Name</label>
                                <input type="text" className="form-control" id="exampleInputText02" placeholder="Enter task Name" />
                                <a href="/" className="task-edit text-body"><i className="ri-edit-box-line" /></a>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Memebers</option>
                                  <option>Kianna Septimus</option>
                                  <option>Jaxson Herwitz</option>
                                  <option>Ryan Schleifer</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText05" className="h5">Due Dates*</label>
                                <input type="date" className="form-control" id="exampleInputText05" defaultValue />
                              </div>                        
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Category</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Design</option>
                                  <option>Android</option>
                                  <option>IOS</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Development</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText040" className="h5">Description</label>
                                <textarea className="form-control" id="exampleInputText040" rows={2} defaultValue={""} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText005" className="h5">Checklist</label>
                                <input type="text" className="form-control" id="exampleInputText005" placeholder="Add List" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-0">
                                <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile003" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile003">Upload media</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-user-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle02">New User</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group mb-3 custom-file-small">
                                <label htmlFor="exampleInputText01" className="h5">Upload Profile Picture</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile02" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Full Name</label>
                                <input type="text" className="form-control" id="exampleInputText2" placeholder="Enter your full name" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText04" className="h5">Phone Number</label>
                                <input type="text" className="form-control" id="exampleInputText04" placeholder="Enter phone number" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText006" className="h5">Email</label>
                                <input type="text" className="form-control" id="exampleInputText006" placeholder="Enter your Email" />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Type</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Type</option>
                                  <option>Trainee</option>
                                  <option>Employee</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Role</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Role</option>
                                  <option>Designer</option>
                                  <option>Developer</option>
                                  <option>Manager</option>
                                  <option>BDE</option>
                                  <option>SEO</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    <div className="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-create-modal">
                    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header d-block text-center pb-3 border-bttom">
                          <h3 className="modal-title" id="exampleModalCenterTitle03">New Task</h3>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText03" className="h5">Task Name</label>
                                <input type="text" className="form-control" id="exampleInputText03" placeholder="Enter task Name" />
                                <a href="/" className="task-edit text-body"><i className="ri-edit-box-line" /></a>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Memebers</option>
                                  <option>Kianna Septimus</option>
                                  <option>Jaxson Herwitz</option>
                                  <option>Ryan Schleifer</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText2" className="h5">Project Name</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Enter your project Name</option>
                                  <option>Ui/Ux Design</option>
                                  <option>Dashboard Templates</option>
                                  <option>Wordpress Themes</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText40" className="h5">Description</label>
                                <textarea className="form-control" id="exampleInputText40" rows={2} placeholder="Textarea" defaultValue={""} />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-3">
                                <label htmlFor="exampleInputText8" className="h5">Checklist</label>
                                <input type="text" className="form-control" id="exampleInputText8" placeholder="Add List" />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group mb-0">
                                <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                  <label className="custom-file-label" htmlFor="inputGroupFile01">Upload media</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                                <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="iq-footer">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-lg-6">
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item"><a href="../backend/privacy-policy.html">Privacy Policy</a></li>
                            <li className="list-inline-item"><a href="../backend/terms-of-service.html">Terms of Use</a></li>
                          </ul>
                        </div>
                        <div className="col-lg-6 text-right">
                          <span className="mr-1">©</span> <a href="www.hapests.com" className>Hapest</a>.
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
            
    )
}

export default Dashboard;