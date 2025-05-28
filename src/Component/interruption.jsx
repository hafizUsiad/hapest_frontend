import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {server} from "../serverconfig";
import TopBar from '../Component/sub component/navbar';
import Sidebar from '../Component/sub component/sidebar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employees()
{     
   

    const [interruptions, setinterruptions] = useState([]); // Initialize developers first
    const navigate = useNavigate();
    var userdetail = sessionStorage.getItem("userdetail");
    if (userdetail) {
        // Parse the JSON string into a JavaScript object
        var parsedUserDetail = JSON.parse(userdetail);
      
        // Access the user_role property
        var userrole = parsedUserDetail.user_role;
        var userid = parsedUserDetail.userid;

    }
    const [user, setUser] = useState({
        name: "",
        time: "",
        interrupt_type:"",
        user_id: userid,
      });
      const fetchinterruption = async () => {
        try {
          console.log(userid);
          const response = await axios.get(`${server}/api/getinterruption`, {
              params: { userid }  // ✅ Send userid as a query parameter
            });
          setinterruptions(response.data); 
        } catch (error) {
          console.error('Error fetching developers:', error);
        }
      };
      const addinterruption = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${server}/api/addinterruption`, user);

            if (res.status === 201) {
                fetchinterruption();
                toast.success("Interruption Added successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
           }      
        } catch (error) {
            toast.error("Error in Saving Record..!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
            }
    };
    
      // Function to handle editing a row
const handleEdit = async (index, field, value) => {
    const updatedInterruptions = [...interruptions];
    updatedInterruptions[index][field] = value;
    setinterruptions(updatedInterruptions);
    try {
      await axios.post(`${server}/api/updateinterruption`, {
        id: interruptions[index].interruption_id,
        value: value,
        field:field,
      });
      fetchinterruption();
      toast.success("Interruption Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });

    } catch (error) {
        toast.error("Something is Wrong!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
        }
  };
  
  // Function to handle deleting a row
  const handleDelete = async (id) => {

    try {
      await axios.post(`${server}/api/deleteinterruption`, {
         id ,
      });
      setinterruptions(interruptions.filter((interruption) => interruption.id !== id));
      fetchinterruption();
      toast.success("Interruption Deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    } catch (error) {
        toast.error("Something is Wrong!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
         }
  };

    useEffect(() => {
   
        if (!sessionStorage.getItem("userdetail")) {
          navigate("/sign-in");
        }
        fetchinterruption();
      
      }, [navigate]);
    return (
        <>
    <div class="wrapper">
    <Sidebar/>
    <TopBar/>   
    <ToastContainer/>   
    <div class="content-page">
     <div class="container-fluid">
        
        <div id="grid" class="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
            <div class="row">
           
                <div class="col-sm-12">
                   <div class="card">
                      <div class="card-header d-flex justify-content-between">
                         <div class="header-title">
                            <h4 class="card-title">Your Interruptions</h4>
                         </div>
                      </div>
                      <div class="card-body">
                         <div id="table" class="table-editable">
                            <span class="table-add float-right mb-3 mr-2">
                            <button data-target="#new-user-modal" data-toggle="modal" class="btn btn-sm bg-primary"><i class="ri-add-fill"><span class="pl-1">Add New</span></i>
                            </button>
                            </span>
                            <table class="table table-bordered table-responsive-md table-striped text-center">
                               <thead>
                                  <tr>
                                     <th>S.No</th>
                                     <th>Name</th>
                                     <th><p><b>Duration</b>(in Hours)</p></th>
                                     <th>Interruption Type</th>
                                     <th>Remove</th>
                                  </tr>
                               </thead>
                               <tbody>
                                    {interruptions.map((employ, index) => (
                                        <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td
                                            contentEditable="true"
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) =>
                                            handleEdit(index, "interruption_name", e.target.innerText)
                                            }
                                        >
                                            {employ.interruption_name}
                                        </td>
                                        <td
                                            contentEditable="true"
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) =>
                                            handleEdit(index, "interruption_time", e.target.innerText)
                                            }
                                        >
                                            {employ.interruption_time}
                                        </td>
                                        <td>{employ.interruption_type}</td>
                                        <td>
                                            <span className="table-remove">
                                            <button
                                                type="button"
                                                className="btn bg-danger-light btn-rounded btn-sm my-0"
                                                onClick={() => handleDelete(employ.interruption_id)}
                                            >
                                                Remove
                                            </button>
                                            </span>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                         </div>
                      </div>
                   </div>
                </div>
           
            </div>
        </div>
      
   
    </div>
      </div>
    </div>
 
   
    <div class="modal fade bd-example-modal-lg" role="dialog" aria-modal="true" id="new-user-modal">
        <div class="modal-dialog  modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header d-block text-center pb-3 border-bttom">
                    <h3 class="modal-title" id="exampleModalCenterTitle02">New Interruption</h3>
                </div>
                <div class="modal-body">
                <form onSubmit={addinterruption} enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText2" class="h5">Interruption Name</label>
                                <input type="text" class="form-control" id="exampleInputText2" placeholder="Enter Interruption Name"
                                 value={user.name} 
                                 onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText04" class="h5">Interruption Time</label>
                                <input type="text" class="form-control" id="exampleInputText04" placeholder="Enter Interruption Time(in Hours)"
                                 value={user.time} 
                                 onChange={(e) => setUser({ ...user, time: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group mb-3">
                                <label for="exampleInputText04" class="h5">Interruption Type</label>
                                <select type="text" class="form-control" id="exampleInputText04"
                                 value={user.interrupt_type} 
                                 onChange={(e) => setUser({ ...user, interrupt_type: e.target.value })}
                                >
                                    <option selected disabled>Select Type</option>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="sprint">Sprint</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
                                <button type="submit" class="btn btn-primary mr-3" >Save</button>
                                <div class="btn btn-primary" data-dismiss="modal">Cancel</div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>   
   
    <footer class="iq-footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a href="../backend/privacy-policy.html">Privacy Policy</a></li>
                        <li class="list-inline-item"><a href="../backend/terms-of-service.html">Terms of Use</a></li>
                    </ul>
                </div>
                <div class="col-lg-6 text-right">
                    <span class="mr-1"><script>document.write(new Date().getFullYear())</script>©</span> <a href="https://www.hapests.com" class="">Hapest</a>.
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Employees;