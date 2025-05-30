import React, { useState,useEffect,useCallback} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from "../../serverconfig";
import { useNavigate } from 'react-router-dom';
import ChatBox from './chat';
import TopBar from '../sub component/navbar';
import Sidebar from '../sub component/sidebar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Startproject({ projectId })
{
  const [showSprintList, setShowSprintList] = useState(true); // true by default
  const [sprints, setSprints] = useState([
  ]);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [sprintoutput, setsprintoutput] = useState([]);
  const [sprintinput, setsprintinput] = useState([]);
  const [single_sprint_input, setsingle_sprint_input] = useState([]);

  const selectSprint = async (index) => {
    setSelectedSprint(index);
    setShowSprintList(false);
  };
  
  
  const createNewSprint = () => {
    setShowSprintList(false);
    setSelectedSprint(0);
  };
    

  ////
  const [developers, setDevelopers] = useState([]);
  const [assignedDevs, setAssignedDevs] = useState(new Set());
  const [Team, setTeam] = useState([]);

    const navigate = useNavigate();
    var {id} = useParams();

 // Initialize the state for the switches
 const [switchState, setSwitchState] = useState({
    1: false,  // Fibonacci 1
    2: false,  // Fibonacci 2
    3: false,  // Fibonacci 3
    5: false,  // Fibonacci 5
    8: false,  // Fibonacci 8
    13: false, // Fibonacci 13
  });
  const [assigned_weights, setAssignedWeights] = useState([]); // Default to empty array

    var userdetail = sessionStorage.getItem("userdetail");
    if (userdetail) {
        // Parse the JSON string into a JavaScript object
        var parsedUserDetail = JSON.parse(userdetail);
      
        // Access the user_role property
        var userrole = parsedUserDetail.user_role;
        var userid = parsedUserDetail.userid;

    }
    const [project, setProject] = useState();
    const [owners, setOwners] = useState([]);  // State to store owners list
    const [projects, setProjects] = useState([]);
    const [inputss, setInputss] = useState([]);
    const [output, setoutput] = useState([]);
    const [allinputss, setallInputss] = useState([]);
    const [sprintdays, setsprintdays] = useState(0);
    const [teamvelocity, setteamvelocity] = useState(0);

    const [interruptions, setinterruptions] = useState([]); // Initialize developers first

    const getTechniqueName = (id) => {
      switch (id) {
        case "fp":
          return "Functional Point";
        case "FP":
          return "Functional Point";
        case "uc" || "UC":
          return "Use Case";
        case "c1b":
          return "COCOMO 1 Basic";
        case "c1i":
          return "COCOMO 1 Intermediate";
        case "c1a":
          return "COCOMO 1 Advanced";
        case "c2":
          return "COCOMO 2";
        case "PP":
          return "Poker Planning";
        case "FC":
          return "Fibbonaci Series";
        default:
          return "Agile";  // Default case if ID doesn't match
      }
    };
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const styles = {
        tableHeader: {
          padding: '5px',
          textAlign: 'left',
          border: '1px solid #ddd',
        },
        tableCell: {
          padding: '5px',
          textAlign: 'left',
        },
        editButton: {
          padding: '5px 10px',
          backgroundColor: '#ffa500',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '5px',
        },
        removeButton: {
          padding: '5px 10px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
      };
    const [inputs, setInputs] = useState({
        EI: [],
        EO: [],
        EQ: [],
        ILF: [],
        EIF: [],
      });
      const [currentInput, setCurrentInput] = useState('');
      const [currentCategory, setCurrentCategory] = useState('EI'); // Default category
      const [editing, setEditing] = useState({ type: '', index: -1 });
      const [selectedOption, setSelectedOption] = useState('');
      const [selectedOption2, setSelectedOption2] = useState('');
      const [selectedOptionforcocomo, setselectedOptionforcocomo] = useState('');

      var inputidd = 0;
      const selectedSwitches = Object.keys(switchState)
      .filter(key => switchState[key])  // Filter out unchecked switches
      .map(Number);  // Convert the keys back to numbers
    
      const handleInput = useCallback(() => {
        if (currentInput.trim() !== '') {
          setInputs((prevInputs) => {
            const updated = { ...prevInputs };
      
            if (editing.type && editing.index > -1) {
              // Update the existing entry for editing
              updated[editing.type][editing.index] = currentInput.trim();
            } else {
              // Add only if the input doesn't already exist in the current category
              if (!updated[currentCategory].includes(currentInput.trim())) {
                updated[currentCategory].push(currentInput.trim());
              }
            }
      
            return updated;
          });
      
          // Clear input and editing state
          setCurrentInput('');
          setEditing({ type: '', index: -1 });
        }
      }, [currentInput, currentCategory, editing]);
      
      const RefreshButton = () => {
        
          window.location.reload();
        };
      const handleEdit = (type, index, value) => {
        setCurrentInput(value);
        setEditing({ type, index });
        setCurrentCategory(type);
      };
      const fetchInputs = async () => {
        try {
            const response = await axios.get(`${server}/api/project/${id}/getinputs?developer_id=${userid}`);

            setInputss(response.data.data);  // Assuming response.data.data contains the inputs
            setProject(response.data.projectdetail[0]);
            console.log(response.data.weights);
            if(response.data.weights)
            {
                setAssignedWeights(response.data.weights);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to load inputs');
            setLoading(false);
        }
    };
    const fetchallInputs = async () => {
      try {
          const response = await axios.get(`${server}/api/project/${id}/allinputs`);
          setallInputss(response.data.data);  // Assuming response.data.data contains the inputs
          setLoading(false);
      } catch (err) {
          setError('Failed to load inputs');
          setLoading(false);
      }
  };
  const fetchsprints = async () => {
    try {
        const response = await axios.get(`${server}/api/project/${id}/getsprints`);
        setSprints(response.data.data);  // Assuming response.data.data contains the inputs
        setsprintinput(response.data.data2);
        setLoading(false);
    } catch (err) {
        setError('Failed to load inputs');
        setLoading(false);
    }
};


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
    const handleoutput = async () => {
      try {
        const output = await axios.get(`${server}/api/project/${id}/fpoutput?project_id=${id}`);
        setoutput(output.data.data);
        setsprintoutput(output.data.sprint);
        console.log(sprintoutput);
      } catch (err) {
          setError('Failed to load inputs');
          setLoading(false);
      }
  };

      const handleupdatestatus = async () => {
        try {
            var currentinputid = document.getElementById("inputid").value;
            await axios.post(`${server}/api/project/${id}/updateinputstatus`, { developer_id:userid ,input_id:currentinputid });
            const final = await axios.get(`${server}/api/project/${id}/checkstatus?id=${currentinputid}`); 
            var comp = final.data.input_info;
            document.getElementById("finalvalue").value = comp;
            toast.success("Complexity Recorded successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            fetchInputs();
            fetchallInputs();
        } 
        catch (error) {
            var currentinputid = document.getElementById("inputid").value;
            toast.error("FP Complexity Not Recorded Successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          console.error("All Good...!"+error);
        }
      };
    
      const handleRemove = (type, index) => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          [type]: prevInputs[type].filter((_, i) => i !== index),
        }));
      };
    

   
  
    // Track if the data has been successfully saved
    const [isSaved, setIsSaved] = useState(false);
  
    // Handle the switch state change
    const handleSwitchChange = (e, number) => {
      setSwitchState({
        ...switchState,
        [number]: e.target.checked,
      });
    };
  
    // Send the data to the backend
    const handleSaveChanges = async () => {
      
      if (selectedSwitches.length === 0) {
        // If no switches are selected, do not proceed
        toast.error("Please select at least one Fibonacci number to proceed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
  
      try {
        if(selectedOption === "FP")
        {
            await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
            setIsSaved(true); // Mark as saved
            toast.success("Data Recorded successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            document.getElementById("next_btn").style.display = "block";

          }
        else if(selectedOption === "UC")
        {
            await axios.post(`${server}/api/project/${id}/insertinput`, {inputs:useCases,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
            setIsSaved(true); // Mark as saved
            toast.success("Data Recorded successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
             document.getElementById("next_btn").style.display = "block";

        }
        else if(selectedOption === "c1b")
        {
          await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
          setIsSaved(true); // Mark as saved
          toast.success("Data Recorded successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });          
          document.getElementById("next_btn").style.display = "block";

        }
        else if(selectedOption === "c1i")
          {
            await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
            setIsSaved(true); // Mark as saved
            toast.success("Data Recorded successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });            
            document.getElementById("next_btn").style.display = "block";
  
          }
        else if(selectedOption === "c1a")
          {
              await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
              setIsSaved(true); // Mark as saved
              toast.success("Data Recorded successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });              
              document.getElementById("next_btn").style.display = "block";
    
          }
          else if(selectedOption === "agile")
            {
                await axios.post(`${server}/api/project/${id}/insertinput`, {inputs:useCases,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo,sprintdays:sprintdays,teamvelocity:teamvelocity});
                
                console.log(useCases,selectedOption,selectedSwitches,selectedOptionforcocomo,sprintdays,teamvelocity);
                setIsSaved(true); // Mark as saved
                toast.success("Data Recorded successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });              
                fetchsprints();
                document.getElementById("next_btn").style.display = "block";
            }
   
      } catch (error) {
        console.error("Error sending data:", error);
        // toast.error("Failed to Save Data!", {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });      
      }
    };
  
    // Check if at least one switch is selected to enable "Save changes"
    const isFormValid = Object.values(switchState).some(isChecked => isChecked);

      const handleSaveInputs = async () => {
        try {
            if(selectedOption === "FP")
                {
                    await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
                    toast.success("Data Recorded successfully!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                    document.getElementById("next_btn").style.display = "block";

                }
            else if(selectedOption === "UC")
            {
                await axios.post(`${server}/api/project/${id}/insertinput`, {inputs:useCases,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
                toast.success("Data Recorded successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });                
                document.getElementById("next_btn").style.display = "block";


            }        
            else if(selectedOption === "c1b")
              {
                await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
                toast.success("Data Recorded successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });                
                document.getElementById("next_btn").style.display = "block";
              }   
            else if(selectedOption === "c1i")
              {
                  await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
                  toast.success("Data Recorded successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });                  
                  document.getElementById("next_btn").style.display = "block";
              }
            else if(selectedOption === "c1a")
              {
                    await axios.post(`${server}/api/project/${id}/insertinput`, {inputs,selectedOption2,selectedOption,selectedSwitches,primary_technique:selectedOptionforcocomo});
                    toast.success("Data Recorded successfully!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });                    
                    document.getElementById("next_btn").style.display = "block";
              }    
                
       
        } catch (error) {
          // toast.error("Data Saving Failed!", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          // });  
                  console.error(error);
        }
      };
    
      const renderHistoryTable = () => {
        const combinedHistory = Object.entries(inputs)
          .flatMap(([type, values]) =>
            values.map((value) => ({ type, value }))
          );
    
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Input Name</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {combinedHistory.map((entry, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={styles.tableCell}>{entry.type}</td>
                  <td style={styles.tableCell}>{entry.value}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEdit(entry.type, inputs[entry.type].indexOf(entry.value), entry.value)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(entry.type, inputs[entry.type].indexOf(entry.value))}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
        const [checkedItems, setCheckedItems] = useState({});
      
        const handleCheckboxChange = (interruptId) => {
          setCheckedItems((prev) => {
            const newCheckedItems = { ...prev, [interruptId]: !prev[interruptId] };
      
            // Call the API to insert or delete the record based on the checkbox state
            if (newCheckedItems[interruptId]) {
              
              // Insert record into the database
              insertRecord(interruptId);
            } else {
              // Delete record from the database
              deleteRecord(interruptId);
            }
      
            return newCheckedItems;
          });
        }
        const insertRecord = async (interruptId) => {
          try {
            // Replace with your API endpoint and method
            await axios.post(`${server}/api/project/${id}/addprojectinterrupt`,
               interruptId);
            toast.success("Interrupt Added successfully!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });     
          } catch (error) {
            console.error('Error inserting record:', error);
          }
        };
      
        const deleteRecord = async (interruptId) => {
          try {
            alert("test");
            await axios.post(`${server}/api/project/${id}/removeprojectinterrupt`,
              interruptId);
           toast.success("Interrupt removed successfully!", {
             position: "top-right",
             autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
           });     
          } catch (error) {
            console.error('Error deleting record:', error);
          }
        };
        
  useEffect(() => {
    fetchallInputs();
    fetchsprints();
      handleoutput();
    }, []);  // Empty Dependency = Run once (componentDidMount)
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
        const fetchProjects = async () => {
            try {
              const response = await axios.get(`${server}/api/project/allprojects`);
              setProjects(response.data); // Set the response data to state
            } catch (error) {
              console.error('Error fetching projects:', error);
            }
          };
      
          fetchProjects();
          fetchinterruption();
        const fetchOwners = async () => {
            try {
              const response = await axios.get(`${server}/api/getowner`); // Update the URL as per your API
              setOwners(response.data); // Assuming the response is an array of owners
            } catch (error) {
              toast.error("Fetching Error!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });            }
          };
         

        fetchInputs();
        const fetchDevelopers = async () => {
          try {
            const response = await axios.get(`${server}/api/getdeveloper`);
            setDevelopers(response.data); // Populate developers
           
          } catch (error) {
            console.error('Error fetching developers:', error);
          }
        };
        
      
          fetchDevelopers();
      
          fetchOwners();
      }, [navigate,projectId]);
     
      // Handle checkbox change
  // const handleCheckboxChange = (developerId) => {
  //   setSelectedDevelopers((prevSelected) => {
  //     if (prevSelected.includes(developerId)) {
  //       // If already selected, remove the developer from the selected list
  //       return prevSelected.filter(id => id !== developerId);
  //     } else {
  //       // Otherwise, add the developer to the selected list
  //       return [...prevSelected, developerId];
  //     }
  //   });
  // };
  const assigned_members = async () => {
    try{
      let res = await axios.get(`${server}/api/project/${id}/team`, {
        
      });
      setTeam(res.data.Team);
      console.log(Team[1].developer_id);
    }catch (error) {
      console.error("Error updating assignment:", error);
    }
  }
  useEffect(() => {
    assigned_members();
  }, []); // Runs only once on component mount
  
  const assignteam = async (devId) => {
    try {
      const newAssignedDevs = new Set(assignedDevs);
      let res;
  
      if (newAssignedDevs.has(devId)) {
        // Unassign Developer
        newAssignedDevs.delete(devId);
        res = await axios.post(`${server}/api/project/${id}/unassignteam`, {
          id,
          developerIds: devId
        });
        console.log("if");

      } 
      else if (Team.some(member => member.developer_id === devId)) {
        // ✅ Unassign if `devId` exists in `Team`
        console.log(devId);
        res = await axios.post(`${server}/api/project/${id}/unassignteam`, {
          developerIds: devId
        });
        assigned_members();
        toast.info(res.data.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } 
      else {
        // Assign Developer
        newAssignedDevs.add(devId);
        res = await axios.post(`${server}/api/project/assignteam`, {
          id,
          developerIds: devId
        });
      }
  
      toast.info(res.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });      
      assigned_members();
      setAssignedDevs(newAssignedDevs); // Update state only after successful API call
  
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error("Failed to Assign a Member!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });    }
  };
  
  const maxRowsPerPage = 10;
  const [useCases, setUseCases] = useState([{ name: [] }]);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to add a new row
  const addRow = () => {
    setUseCases([...useCases, { name: '' }]);
    const totalRows = useCases.length + 1;
    const totalPages = Math.ceil(totalRows / maxRowsPerPage);
    if (totalRows > currentPage * maxRowsPerPage) {
      setCurrentPage(totalPages);
    }
  };

  // Function to delete a row
  const deleteRow = (index) => {
    const updatedRows = useCases.filter((_, i) => i !== index);
    setUseCases(updatedRows);

    const totalRows = updatedRows.length;
    const totalPages = Math.ceil(totalRows / maxRowsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } 
  };

  // Function to update the name of a use case
  const handleChange = (index, value) => {
    const updatedRows = [...useCases];
    updatedRows[index].name = value;
    setUseCases(updatedRows);
  };

  // Function to update pagination
  const updatePagination = () => {
    const totalRows = useCases.length;
    const totalPages = Math.ceil(totalRows / maxRowsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Function to change page
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to render the rows for the current page
  const renderPage = () => {
    const startIndex = (currentPage - 1) * maxRowsPerPage;
    const endIndex = startIndex + maxRowsPerPage;
    return useCases.slice(startIndex, endIndex);
  };

  // Function to save the table data
  const saveTable = () => {
    const savedUseCases = useCases.filter(useCase => useCase.name.trim());
    console.log("Saved Use Cases:", savedUseCases);
    handleSaveInputs();
  };

  const pagination = updatePagination();
  return (
    <>
    <ChatBox />
    <div class="wrapper">
      <ToastContainer/>
      <Sidebar/>
      <TopBar/>   
         <div class="content-page">
     <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
            <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                  <div class="header-title">
                      <h4 class="card-title">Project Id is : 00{id}</h4>
                  </div>
                  <div>
                    <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#exampleModalCenteredScrollable2"><i class="fas fa-exclamation-triangle"></i>Interruption</button>|
                  <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalCenteredScrollable"><i class="fas fa-eye"></i>All Inputs</button>

                  </div>
                  </div>

                  <div class="card-body">
                     <ul class="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                        <li class="nav-item">
                           <a class="nav-link" id="pills-home-tab-fill" data-toggle="pill" href="#pills-home-fill" role="tab" aria-controls="pills-home" aria-selected="false">Team Assign</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="pills-profile-tab-fill" data-toggle="pill" href="#pills-profile-fill" role="tab" aria-controls="pills-profile" aria-selected="false">Project Estimation</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" id="pills-contact-tab-fill" data-toggle="pill" href="#pills-contact-fill" role="tab" aria-controls="pills-contact" aria-selected="false">Output</a>
                        </li>
                     </ul>
                     <div class="tab-content" id="pills-tabContent-1">
                        <div class="tab-pane fade" id="pills-home-fill" role="tabpanel" aria-labelledby="pills-home-tab-fill">
                        <div className="container">
                        <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header d-flex justify-content-between">
                     <div class="header-title">
                        <h4 class="card-title">Team Selection</h4>
                     </div>
                  </div>
                 <div className="card-body">
  <p>Assign the project to developers by checking them:</p>
  <div className="table-responsive">
    <table className="table table-bordered table-hover">
      <thead className="table-primary text-center">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Expertise</th>
          <th>Assigned</th>
        </tr>
      </thead>
      <tbody>
        {developers.length > 0 ? (
          developers.map((developer) => (
            <tr key={developer.userid}>
              <td>{developer.name}</td>
              <td>{developer.email}</td>
              <td>{developer.expertise}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={
                    Team.some((member) => member.developer_id === developer.userid) ||
                    assignedDevs.has(developer.userid)
                  }
                  onChange={() => assignteam(developer.userid)}
                  disabled={userrole !== 1}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-muted">
              No developers available
            </td>
          </tr>
        )}
      </tbody>
      <tfoot className="table-light text-center">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Expertise</th>
          <th>Assigned</th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
 
               </div>
            </div>
         </div>

</div>

           
                        </div>
                        <div class="tab-pane fade" id="pills-profile-fill" role="tabpanel" aria-labelledby="pills-profile-tab-fill">
                      
               
                     {/* <p>Stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility.</p> */}
                        {/* <div class="col-sm-3">
                           <div class="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                              <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                              <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                              <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                              <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                           </div>
                        </div> */}
                        <div class="col-sm-12">
                           <div class="tab-content mt-0" id="v-pills-tabContent">
                           <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            {userrole === 1?(
                <div
  className="profile-tab-container"
 
>
  <h4
    style={{
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '20px',
    }}
  >
    Select Estimation Technique and Method
  </h4>
  <div className="selection-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <label
      htmlFor="technique-select"
      style={{ fontSize: '16px', fontWeight: '500', color: '#555' }}
    >
      Technique:
    </label>
    <select
      id="technique-select"
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="form-control"
      style={{
        width: selectedOption === 'agile' ? '180px' : '250px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        padding: '5px 10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <option value="" selected>Select The Technique</option>
      <option value="FP">Function Points (FP)</option>
      <option value="UC">Usecase (UC)</option>
      <option value="c1b">Cocomo 1 (Basic)</option>
      <option value="c1i">Cocomo 1 (Intermediate)</option>
      <option value="c1a">Cocomo 1 (Advanced)</option>
      {/* <option value="c2">Cocomo 2 (Coco 2)</option> */}
      <option value="agile">Agile (Ag)</option>
    </select>
    {selectedOption !== 'agile' ? (
      <>
      <label
      htmlFor="method-select"
      style={{ fontSize: '16px', fontWeight: '500', color: '#555' }}
    >
      Method:
    </label>
    <select
      id="method-select"
      value={selectedOption2}
      onChange={(e) => setSelectedOption2(e.target.value)}
      className="form-control"
      style={{
        width: '250px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        padding: '5px 10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <option value="not selected">Select The Method</option>
      {/* {selectedOption === 'FP' ? (

<option value="FP">Function Points (FP)</option>

      ):selectedOption === "UC" ?(
        <option value="UC">Usecase (UC)</option>

      ):selectedOption === "c1b"?(
        <option value="c1b">Cocomo 1 (Basic)</option>
      ):selectedOption === "c1i"?(
        <option value="c1i">Cocomo 1 (Intermediate)</option>
    ):selectedOption === "c1a"?(
        <option value="c1a">Cocomo 1 (Advanced)</option>
    ):selectedOption === "c2"?(
        <option value="c2">Cocomo 2 (Coco 2)</option>
    ):selectedOption === "agile"?(
        <option value="agile">Agile (Ag)</option>
    ):null} */}
      <option value="PP">Poker Planning (PP)</option>
      <option value="FC">Fibonacci Series (FC)</option>
    </select>
      </>
    
    ):null}
    {selectedOption === 'c1b' || selectedOption === 'c1i' ||selectedOption === 'c1a' || selectedOption === 'c2' ? (
    <select
      id="method-select"
      value={selectedOptionforcocomo}
      onChange={(e) => setselectedOptionforcocomo(e.target.value)}
      className="form-control"
      style={{
        width: '250px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        padding: '5px 10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
{/* <option value="kloc">Using KLOC</option> */}
<option value="fp">Using Functional Point</option>

    </select>
    ):null}
    {selectedOption === 'agile' ? (
      <>
       <label
        htmlFor="technique-select"
        style={{ fontSize: "16px", fontWeight: "500", color: "#555" }}
      >
        Working days per Sprint:
      </label>
      <input
        type="number"
        onChange={(e) => setsprintdays(Number(e.target.value))} // Convert to number
        placeholder="Enter the Sprint days" required
        className="form-control col-2" // Changed `class` to `className`
      />
         <label
        htmlFor="technique-select"
        style={{ fontSize: "16px", fontWeight: "500", color: "#555" }}
      >
        Team Velocity:
      </label>
      <input
        type="number"
        onChange={(e) => setteamvelocity(Number(e.target.value))} // Convert to number
        placeholder="Enter the Team Velocity" required
        className="form-control col-2" // Changed `class` to `className`
      />
      </>
     
    ):null}
  </div>
  {/* <button
    onClick={() => console.log('Save Selection')}
    className="btn btn-primary"
    style={{
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#2196F3',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
  >
    Save Selection
  </button> */}
</div>

//                 <div className="input-group-prepend">
//                 <select
// value={selectedOption}
// class="form-control col-3"
// onChange={(e) => setSelectedOption(e.target.value)}
// style = {{
//     marginLeft:"20px",
//     borderRadius:"5px"
// }}
// >
// <option value="">Select The Technique</option>
// <option value="FP">Function Points (FP)</option>
// <option value="UC">Usecase (UC)</option>
// <option value="c1b">Cocomo 1 (Basic)</option>
// <option value="c1i">Cocomo 1 (Intermediate)</option>
// <option value="c1a">Cocomo 1 (Advanced)</option>
// <option value="c2">Cocomo 2 (Coco 2)</option>
// <option value="agile">Agile (Ag)</option>

// </select>
// <p
// style = {{
//     marginTop:"10px",
//     marginLeft:"10px"
// }}
// >To</p>
// <select
// value={selectedOption2}
// class="form-control col-3"
// onChange={(e) => setSelectedOption2(e.target.value)}
// style = {{
//     marginLeft:"10px",
//     borderRadius:"5px"
// }}
// >
// <option value="">Select The Method</option>
// <option value="PP">Poker Planning (PP)</option>
// <option value="FC">Fibonaci Series (FC)</option>
// </select>
//                 </div>
            ):userrole === 3 ?(
 <>
               
                <div></div>
                <table class="table table-hover ">
                <thead>
                   <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Complexity</th>
              
                   </tr>
                </thead>
                <tbody>
                    {inputss.map((input) => (
                        <>
                        <p>Spell Number:{input.spell}</p>
                           <tr key={input.input_id}>
                            <td scope='row'>{input.input_id}</td>
                               <input hidden id="inputid" value={input.input_id}/>
                            <td>{input.input_name +" ("+input.input_category+")"}</td>
                            <td>
                                {/* Priority Dropdown */}
                                <select 
                                    value={input.complexity} 
                                    class="form-control"
                                    onChange={(e) => handleSelectChange(e, input.input_id, 'complexity')}
                                >
                                    <option disabled selected>Select Complexity</option>
                                    {project.estimation_method === "PP" && input.input_category.includes("Question") && (project.primary_technique_id === "clb" || project.primary_technique_id === "cli" || project.primary_technique_id === "cla") ?(
                                        <> 
                                        <option value="VeryLow">Very Low</option>
                                        <option value="Low">Low</option>
                                        <option value="Nominal">Nominal</option>
                                        <option value="High">High</option>
                                        <option value="VeryHigh">Very High</option>
                                        <option value="ExtraHigh">Extra High</option>
                                        </>

                                    ):project.estimation_method === "PP" && input.input_category.includes("Question") ?(
                                        <> 
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        </>
                                 
                                    ):project.estimation_method === "FC" && project.primary_technique_id === "FP"?(
                                        <> 
                                        {assigned_weights.map((item) => (
                                                <option key={item.weight_id} value={item.weight}>
                                                    {item.weight} 
                                                </option>
                                                ))}
                                        </>
                                    ):project.estimation_method === "FC" && project.primary_technique_id === "UC"?(
                                        <> 
                                        {assigned_weights.map((item) => (
                                                <option key={item.weight_id} value={item.weight}>
                                                    {item.weight} 
                                                </option>
                                                ))}
                                        </>
                                    ):project.estimation_method === "PP" && project.primary_technique_id === "FP" ?(
                                      <> 
                                      <option value="Low">Low</option>
                                      <option value="Medium">Medium</option>
                                      <option value="High">High</option>
                                      </>
                               
                                  ):project.estimation_method === "PP" && project.primary_technique_id === "UC"?(
                                    <> 
                                    < option value="Simple">Simple</option>
                                    <option value="Average">Average</option>
                                    <option value="Complex">Complex</option>
                                    </>

                                ):project.estimation_method === "PP" && (project.primary_technique_id === "c1b" || project.primary_technique_id === "c1i" || project.primary_technique_id === "c1a") && project.secondary_technique_id === "fp" ?(
                                  <> 
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                  </>
                           
                              ):project.estimation_method === "FC" && (project.primary_technique_id === "c1b" || project.primary_technique_id === "c1i" || project.primary_technique_id === "c1a") && project.secondary_technique_id === "fp" ?(
                                <> 
                                  {assigned_weights.map((item) => (
                                        <option key={item.weight_id} value={item.weight}>
                                            {item.weight} 
                                        </option>
                                        ))}
                                </>
                         
                            ):project.primary_technique_id === "agile" ?(
                              <> 
                                {assigned_weights.map((item) => (
                                      <option key={item.weight_id} value={item.weight}>
                                          {item.weight} 
                                      </option>
                                      ))}
                              </>
                       
                          ): <> 
                                  {assigned_weights.map((item) => (
                                        <option key={item.weight_id} value={item.weight}>
                                            {item.weight} 
                                        </option>
                                        ))}
                                </>}
                                    
                                </select>
                            </td>
                            <td hidden>
                                {/* Status Dropdown */}
                                <select  
                                    value={input.det} 
                                    class="form-control"
                                    onChange={(e) => handleSelectChange(e, input.input_id, 'det')}
                                >
                                    <option disabled selected>Select DETS's</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </td>
                            <td hidden>
                                {/* Type Dropdown */}
                                <select hidden
                                    value={input.frt}      
                                    class="form-control"

                                    onChange={(e) => handleSelectChange(e, input.input_id, 'frt')}
                                >
                                    <option disabled selected>Select FRT's</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </td>
                        </tr>
                        </>
                     
                    ))}
                </tbody>
                
               
             </table>  
             <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures input is left, button is right
  }}
>
  <input id = "finalvalue" disabled className="form-control col-2" />
  <button onClick={handleupdatestatus} className="btn btn-success">
    Mark as Done
  </button>
  <button id="next_btn" onClick={RefreshButton} className="btn btn-info" style={{display:'none'}}>
    Next
  </button>
</div>
  
                      </>
            ):null }
            
           
            {selectedOption === 'FP' ? (
  // If "FP" is selected, show the Function Point Input Manager
  <div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
    <h4
    style= 
    { {
         marginBottom:"10px",
     }}
    >Function Point Input Manager</h4>
    <div className="input-group-prepend">
      <select
        id="category"
        value={currentCategory}
        className="form-control col-3"
        style= 
       { {
            height:"45px",
            borderRadius:"5px"
        }}
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="EI">External Inputs (EI)</option>
        <option value="EO">External Outputs (EO)</option>
        <option value="EQ">External Inquiries (EQ)</option>
        <option value="ILF">Internal Logical Files (ILF)</option>
        <option value="EIF">External Interface Files (EIF)</option>
      </select>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter input value"
        style= 
        { {
            marginLeft:"10px",

             height:"45px",
             borderRadius:"5px"
         }}
        className="form-control col-3"
      />
      <button
        onClick={handleInput}
        style={{
            marginLeft:"10px",
          height:"43x",
          padding: '0px 20px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add Input
      </button>
    </div>
    {renderHistoryTable()}
   <button
  data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
  data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
  onClick={selectedOption2 === "FC" ? undefined : handleSaveInputs}
  style={{
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
  }}
>
  Save
</button>




  </div>

) : selectedOption === 'UC' ? (
  // Else if: specific UI for "OtherOption1"
  <div className='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
  
      <h2 className="text-center mb-4">Usecase Input Manager</h2>
      
        
          <table className="table table-bordered table-hover" id="usecaseTable">
            
            <thead className="table-primary">
              <tr>
                <th scope="col">Use Case Name</th>
                <th scope="col" className="text-center">Action
                <button className="add-row-btn" onClick={addRow} style={{  top: '12px' , color: '#007bff', backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
          <i className="bi bi-plus"></i>
        </button>
                </th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {renderPage().map((useCase, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={useCase.name}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder="Enter use case name"
                    />
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-trash text-danger delete-row-btn"
                      onClick={() => deleteRow(index)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-success save-btn" 
              data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
              data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
              onClick={selectedOption2 === "FC" ? undefined :saveTable}>Save</button>
            <nav>
              <ul className="pagination" id="pagination">
                {pagination.map(page => (
                  <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <a className="page-link" href="#" onClick={() => changePage(page)}>{page}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
       
   
  </div>
) : selectedOption === 'c1b' ? (
  // Else if: specific UI for "OtherOption2"
//   <div className='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
  
//   <h2 className="text-center mb-4">Cocomo I(Basic) Input Manager</h2>
  
//   {selectedOptionforcocomo === 'fp' ? (
//   <>
//     <table className="table table-bordered table-hover" id="usecaseTable">
//       <thead className="table-primary">
//         <tr>
//           <th scope="col">Use Case Name</th>
//           <th scope="col" className="text-center">
//             Action
//             <button
//               className="add-row-btn"
//               onClick={addRow}
//               style={{
//                 top: '12px',
//                 color: '#007bff',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 fontSize: '1.5rem',
//                 cursor: 'pointer'
//               }}
//             >
//               <i className="bi bi-plus"></i>
//             </button>
//           </th>
//         </tr>
//       </thead>
//       <tbody id="tableBody">
//         {renderPage().map((useCase, index) => (
//           <tr key={index}>
//             <td>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={useCase.name}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 placeholder="Enter use case name"
//               />
//             </td>
//             <td className="text-center">
//               <i
//                 className="bi bi-trash text-danger delete-row-btn"
//                 onClick={() => deleteRow(index)}
//                 style={{ cursor: 'pointer' }}
//               ></i>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <div className="d-flex justify-content-between align-items-center mt-3">
//     <button className="btn btn-success save-btn" 
//       data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
//       data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
//       onClick={selectedOption2 === "FC" ? undefined :saveTable}>Save</button>
//       <nav>
//         <ul className="pagination" id="pagination">
//           {pagination.map((page) => (
//             <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
//               <a className="page-link" href="#" onClick={() => changePage(page)}>
//                 {page}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   </>
// ) : (
//   <input type="number" placeholder="Enter the KLOC" />
// )}


// </div>

<div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
<h3 style={{textAlign:"center"}}>Cocomo 1 Basic</h3>

<h5
style= 
{ {
     marginBottom:"10px",
 }}
>Function Point Input Manager</h5>
<div className="input-group-prepend">
  <select
    id="category"
    value={currentCategory}
    className="form-control col-3"
    style= 
   { {
        height:"45px",
        borderRadius:"5px"
    }}
    onChange={(e) => setCurrentCategory(e.target.value)}
  >
    <option value="EI">External Inputs (EI)</option>
    <option value="EO">External Outputs (EO)</option>
    <option value="EQ">External Inquiries (EQ)</option>
    <option value="ILF">Internal Logical Files (ILF)</option>
    <option value="EIF">External Interface Files (EIF)</option>
  </select>
  <input
    type="text"
    value={currentInput}
    onChange={(e) => setCurrentInput(e.target.value)}
    placeholder="Enter input value"
    style= 
    { {
        marginLeft:"10px",

         height:"45px",
         borderRadius:"5px"
     }}
    className="form-control col-3"
  />
  <button
    onClick={handleInput}
    style={{
        marginLeft:"10px",
      height:"43x",
      padding: '0px 20px',
      fontSize: '12px',
      cursor: 'pointer',
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    }}
  >
    Add Input
  </button>
</div>
{renderHistoryTable()}
<button
data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
onClick={selectedOption2 === "FC" ? undefined : handleSaveInputs}
style={{
padding: "10px 20px",
fontSize: "16px",
cursor: "pointer",
backgroundColor: "#2196F3",
color: "white",
border: "none",
borderRadius: "4px",
marginTop: "20px",
}}
>
Save
</button>




</div>
) : selectedOption === 'c1i' ? (
    // Else if: specific UI for "OtherOption2"
    <div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h3 style={{textAlign:"center"}}>Cocomo 1 Intermediate</h3>
    <h5
    style= 
    { {
         marginBottom:"10px",
     }}
    >Function Point Input Manager</h5>
    <div className="input-group-prepend">
      <select
        id="category"
        value={currentCategory}
        className="form-control col-3"
        style= 
       { {
            height:"45px",
            borderRadius:"5px"
        }}
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="EI">External Inputs (EI)</option>
        <option value="EO">External Outputs (EO)</option>
        <option value="EQ">External Inquiries (EQ)</option>
        <option value="ILF">Internal Logical Files (ILF)</option>
        <option value="EIF">External Interface Files (EIF)</option>
      </select>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter input value"
        style= 
        { {
            marginLeft:"10px",
    
             height:"45px",
             borderRadius:"5px"
         }}
        className="form-control col-3"
      />
      <button
        onClick={handleInput}
        style={{
            marginLeft:"10px",
          height:"43x",
          padding: '0px 20px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add Input
      </button>
    </div>
    {renderHistoryTable()}
    <button
    data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
    data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
    onClick={selectedOption2 === "FC" ? undefined : handleSaveInputs}
    style={{
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
    }}
    >
    Save
    </button>
    
    
    
    
    </div>
  ) : selectedOption === 'c1a' ? (
    // Else if: specific UI for "OtherOption2"
    <div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h3 style={{textAlign:"center"}}>Cocomo 1 Advance</h3>
    <h5
    style= 
    { {
         marginBottom:"10px",
     }}
    >Function Point Input Manager</h5>
    <div className="input-group-prepend">
      <select
        id="category"
        value={currentCategory}
        className="form-control col-3"
        style= 
       { {
            height:"45px",
            borderRadius:"5px"
        }}
        onChange={(e) => setCurrentCategory(e.target.value)}
      >
        <option value="EI">External Inputs (EI)</option>
        <option value="EO">External Outputs (EO)</option>
        <option value="EQ">External Inquiries (EQ)</option>
        <option value="ILF">Internal Logical Files (ILF)</option>
        <option value="EIF">External Interface Files (EIF)</option>
      </select>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter input value"
        style= 
        { {
            marginLeft:"10px",
    
             height:"45px",
             borderRadius:"5px"
         }}
        className="form-control col-3"
      />
      <button
        onClick={handleInput}
        style={{
            marginLeft:"10px",
          height:"43x",
          padding: '0px 20px',
          fontSize: '12px',
          cursor: 'pointer',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add Input
      </button>
    </div>
    {renderHistoryTable()}
    <button
    data-toggle={selectedOption2 === "FC" ? "modal" : undefined}
    data-target={selectedOption2 === "FC" ? "#exampleModalCenter" : undefined}
    onClick={selectedOption2 === "FC" ? undefined : handleSaveInputs}
    style={{
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
    }}
    >
    Save
    </button>
    
    
    
    
    </div>
  ) : selectedOption === 'c2' ? (
    // Else if: specific UI for "OtherOption2"
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h3>Cocomo 2 Selected</h3>
      <p>This is the UI for "Cocomo2". Customize as needed.</p>
    </div>
  ) : selectedOption === 'agile' ? (
    // Else if: specific UI for "OtherOption2"
    <>
      {showSprintList ? (
      
      <div className='sprint-list'>
        <h2 className='text-center mb-4'>All Sprints</h2>
        <ul className='list-group'>
          {sprints.map((sprint, index) => (
            <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
              Sprint {index+1} - 
              ({sprint.status})
              <button className='btn btn-primary btn-sm' onClick={() => selectSprint(sprint.sprint_id)}>View / Edit</button>
            </li>
          ))}
        </ul>
        <button className='btn btn-outline-success mt-3' onClick={createNewSprint}>
          + Start New Sprint
        </button>
      </div>
    ) : (
      <>

      <div className='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
  <button className="btn btn-secondary" onClick={() => setShowSprintList(true)}>← Back</button>
  <h2 className="flex-grow-1 text-center m-0">Sprint Planner</h2>
  <div style={{ width: '80px' }}></div> {/* Invisible spacer to balance layout */}
</div>

        </div>

        {/* Your existing Agile Input Manager code here */}
        <div className='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
  
  <h4 className="text-center mb-4">UserStory Input Manager - <b>(Sprint 0{selectedSprint})</b></h4>
  
    
      <table className="table table-bordered table-hover" id="usecaseTable">
        
        <thead className="table-primary">
          <tr>
            <th scope="col">User Story</th>
            <th scope="col" className="text-center">Action
            <button className="add-row-btn" onClick={addRow} style={{  top: '12px' , color: '#007bff', backgroundColor: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
      <i className="bi bi-plus"></i>
    </button>
            </th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {renderPage().map((useCase, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={useCase.name}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter the user story"
                />
              </td>
              <td className="text-center">
                <i
                  className="bi bi-trash text-danger delete-row-btn"
                  onClick={() => deleteRow(index)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </td>
            </tr>
          ))}
          {  
          sprintinput
            .filter((input) => {
              // Extract number inside brackets at the end of the input name
              const match = input.input_name.match(/\((\d+)\)$/);
              const sprintIdInBrackets = match ? parseInt(match[1], 10) : null;
              return sprintIdInBrackets === selectedSprint; // Adjust variable as needed
            }).map((input, index) => (
              <tr key={input.input_id}>
                <td>
                  {input.input_name.replace(/\(\d+\)$/, '')}
                </td>
                <td className="text-center">
                  <i
                    className="bi bi-trash text-danger delete-row-btn"
                    style={{ cursor: 'pointer' }}
                  ></i>
                </td>
              </tr>
            ))
        }


        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-success save-btn" 
          data-toggle={selectedOption === "agile" ? "modal" : undefined}
          data-target={selectedOption === "agile" ? "#exampleModalCenter" : undefined}
          onClick={selectedOption === "agile" ? undefined :saveTable}>Save</button>
        <nav>
          <ul className="pagination" id="pagination">
            {pagination.map(page => (
              <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => changePage(page)}>{page}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
   

</div>
      </div>

      </>
     
    )}
    </>
  
    
  ) :selectedOption === 'not selected' ? ( <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}><br></br>
    <h4 style={{ marginBottom: '10px' }}>Welcome to the Estimation Tool</h4>
    <p>
      Please select a technique from the dropdown menu to start the estimation process. 
      Each technique provides a unique approach for project estimation:
    </p>
    <ul>
      <li><b>Function Points (FP):</b> Analyze inputs, outputs, and files to estimate project size.</li>
      <li><b>Usecase (UC):</b> Calculate complexity based on use cases.</li>
      <li><b>Cocomo Models:</b> Estimate time and effort using various COCOMO techniques.</li>
      <li><b>Agile:</b> Use planning techniques like Poker Planning or Fibonacci Series.</li>
    </ul>
    <p>Choose a technique to proceed!</p>
  </div>
):null}
</div>
                            
                           </div>
                        </div>
                     </div>
                     <div class="tab-pane fade" id="pills-contact-fill" role="tabpanel" aria-labelledby="pills-contact-tab-fill">
                     <div className="container mt-5">
  <h1 className="text-center mb-4">📊 Estimation Results</h1>

  {output.map((item, index) => (
    <div key={index} className="card mx-auto shadow-lg border-0 rounded-3 mb-4" style={{ maxWidth: "500px" }}>
      <div className="card-header bg-primary text-white text-center">
        <h5 className="mb-0">🛠️ Calculated Values</h5>
      </div>

    <div className="card-body">
  {/* Primary Technique */}
  {item.primary_technique_id && item.primary_technique_id !== "no selected" && (
    <p className="mb-1">
      <strong>🎯 Primary Technique:</strong>{" "}
      {getTechniqueName(item.primary_technique_id) +
        `(Sprint -0${sprintoutput?.[index]?.sprint_no ?? ""})`}
    </p>
  )}

  {/* Secondary Technique */}
  {item.secondary_technique_id && item.secondary_technique_id !== "no selected" && (
    <p className="mb-1">
      <strong>🔄 Secondary Technique:</strong> {getTechniqueName(item.secondary_technique_id)}
    </p>
  )}

  {/* Estimation Method */}
  {item.estimation_method && (
    <p className="mb-3">
      <strong>📌 Estimation Method:</strong> {item.estimation_method || ""}
    </p>
  )}

  {item.primary_technique === "agile" ? (
    <ul className="list-group list-group-flush">
      <li className="list-group-item d-flex justify-content-between">
        <span>⏳ Effort (Person-Months):</span>
        <span className="fw-bold">{sprintoutput?.[index]?.effort ?? ""}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>📅 Time (Months):</span>
        <span className="fw-bold">{sprintoutput?.[index]?.time ?? ""}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>💰 Cost (USD):</span>
        <span className="fw-bold text-success">
          {sprintoutput?.[index]?.cost ? `$${sprintoutput[index].cost}` : ""}
        </span>
      </li>
    </ul>
  ) : (
    <ul className="list-group list-group-flush">
      <li className="list-group-item d-flex justify-content-between">
        <span>⏳ Effort (Person-Months):</span>
        <span className="fw-bold">{item.effort || ""}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>📅 Time (Months):</span>
        <span className="fw-bold">{item.time || ""}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>💰 Cost (USD):</span>
        <span className="fw-bold text-success">{item.cost ? `$${item.cost}` : ""}</span>
      </li>
    </ul>
  )}
</div>

    </div>
  ))}
</div>

                     </div>
                  </div>
                                  
                     
                     </div>
                  </div>
               </div>
            </div>
        </div>

    </div>
      </div>
      <div id="exampleModalCenteredScrollable" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">All Inputs</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                  </button>
              </div>
              <div class="modal-body">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Input Name</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allinputss.map((input, index) => (
                      <tr key={index}>
                        <td>{input.input_name}</td>
                        <td>{input.complexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
        </div>
      </div>
      <div id="exampleModalCenteredScrollable2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Interrupts List</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                  </button>
              </div>
              <div class="modal-body">
              <p>Check on those interrupts that you need in this project</p>

                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Interruption Name</th>
                      <th>Interruption Time</th>
                      <th>Need</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interruptions.map((interrupt, index) => (
                      <tr key={index+1}>
                        <td>{index+1}</td>
                        <td>{interrupt.interruption_name}</td>
                        <td>{interrupt.interruption_time}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={!!checkedItems[interrupt.interruption_id]} // Assuming each interrupt has a unique id
                            onChange={() => handleCheckboxChange(interrupt.interruption_id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Select Fibonacci Numbers for Weight Assignment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                      {Object.keys(switchState).map(number => (
                        <div className="custom-control custom-switch custom-switch-color custom-control-inline" key={number}>
                          <input 
                            type="checkbox"
                            className="custom-control-input bg-success"
                            id={`customSwitch${number}`}
                            checked={switchState[number]}
                            onChange={(e) => handleSwitchChange(e, number)}
                          />
                          <label className="custom-control-label" htmlFor={`customSwitch${number}`}>{number}</label>
                        </div>
                      ))}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" disabled={isSaved}>Close</button>
                      <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleSaveChanges} 
                        disabled={!isFormValid} // Disable the button until at least one switch is selected
                      >
                        Save changes
                      </button>
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
  async function handleSelectChange(e, inputId, field) {
    const updatedValue = e.target.value;
  
    // Optimistically update the UI
    const updatedInputs = inputss.map(input => 
        input.input_id === inputId ? { ...input, [field]: updatedValue } : input
    );
    setInputs(updatedInputs);

    try {
        // Send the updated field to the server
        await axios.post(`${server}/api/project/${id}/updateinput`, { id: inputId, field, value: updatedValue,developer_id:userid  });
        const response =  await axios.get(`${server}/api/project/${id}/checkstatus?id=${inputId}`);   
        console.log(`${field} updated successfully!`);
    } catch (err) {
        console.error('Error updating field:', err);
        toast.error(`Failed to save ${field}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
    }
}
}

export default Startproject;