import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from "../../serverconfig";
import { useNavigate } from 'react-router-dom';
import TopBar from '../sub component/navbar';
import Sidebar from '../sub component/sidebar';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';

const TaskAssignment = () => {
  // const [projects, setProjects] = useState([]);
  // const [sprints, setSprints] = useState([]);
  // const [tasks, setTasks] = useState([]);
  // const [developers, setDevelopers] = useState([]);

  // const [selectedProject, setSelectedProject] = useState('');
  // const [selectedSprint, setSelectedSprint] = useState('');
  // const [selectedTask, setSelectedTask] = useState('');
  // const [selectedDeveloper, setSelectedDeveloper] = useState('');
  // const navigate = useNavigate();



  const [projects, setProjects] = useState([]); // Holds the list of projects
  const [sprints, setSprints] = useState([]); // Holds the list of sprints
  const [tasks, setTasks] = useState([
    "Build Login Page",
    "Setup Backend API",
    "Design Dashboard UI"
  ]); // List of task names
  const [developers, setDevelopers] = useState([
    "Sarah Khan",
    "Ali Rehman",
    "Usman Tariq"
  ]); // List of developer names

  // Selected items
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedSprint, setSelectedSprint] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedTaskid, setSelectedTaskid] = useState('');

  const [selectedDeveloper, setSelectedDeveloper] = useState('');

  const navigate = useNavigate(); // for navigation
    var {id} = useParams();

  // Task and Developer Assignment states
  const [taskAssignments, setTaskAssignments] = useState({});
  const [devAssignments, setDevAssignments] = useState({});

  const selectTask = (taskId,id) => {
    setSelectedTask(taskId);
    setSelectedTaskid(id);
  };

   const  assignToDev = async(devId,developer_id) => {
    if (selectedTask === null || selectedTask === '') {
      alert("Select a task first!");
      return;
    } 

    setTaskAssignments((prev) => {
      const newAssignments = { ...prev };
      if (!newAssignments[selectedTask]) newAssignments[selectedTask] = [];
      if (!newAssignments[selectedTask].includes(devId)) {
        newAssignments[selectedTask].push(devId);
      }
      return newAssignments;
    });

    setDevAssignments((prev) => {
      const newAssignments = { ...prev };
      if (!newAssignments[devId]) newAssignments[devId] = [];
      if (!newAssignments[devId].includes(selectedTask)) {
        newAssignments[devId].push(selectedTask);
      }
      return newAssignments;
    });
    await axios.post(`${server}/api/project/${id}/assigntask`, {inputs:selectedTaskid,developer:developer_id});

    toast.success("Task Assigned successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const unassign = async(taskId, devId,inputid,devid) => {
    setTaskAssignments((prev) => {
      const newAssignments = { ...prev };
      newAssignments[taskId] = newAssignments[taskId].filter(id => id !== devId);
      return newAssignments;
    });

    setDevAssignments((prev) => {
      const newAssignments = { ...prev }; 
      newAssignments[devId] = newAssignments[devId].filter(id => id !== taskId);
      return newAssignments;
    }); 
    await axios.post(`${server}/api/project/${id}/unassigntask`, {inputs:inputid,developer:devid});
    toast.warning("Task Unassigned successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  // const estimatesprint = async () => {
  //   try {
  //     console.log("enter");
  //     await axios.get(`${server}/api/project/${id}/agilestatus`);
  //     console.log("done");
 
  //     toast.success("Sprint Estimated successfully!", {
  //       position: "top-right",
  //       autoClose: 2000,  
  //       hideProgressBar: false,
  //       closeOnClick: true, 
  //       pauseOnHover: true,
  //       draggable: true,
  //     });
  //   } catch (error) { 
  //     console.error(error);
  //     toast.error("Failed to estimate sprint!", {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   }
  // };
  
  const renderAssignedTasks = (taskId) => {
    return (taskAssignments[taskId] || []).map(devId => (
      <span
        key={devId}
        className="tag"
        onClick={() => unassign(taskId, devId,tasks[taskId]?.input_id,developers[devId]?.developer_id)}
      >
        {developers[devId]?.name}
        
      </span>
      
    ));
  };
  
  const renderAssignedDevs = (devId) => {
    return (devAssignments[devId] || []).map(taskId => (
      <span
        key={taskId}
        className="tag"
        onClick={() => unassign(taskId, devId,tasks[taskId]?.input_id,developers[devId]?.developer_id)}
      >
        {tasks[taskId]?.name}
      </span>
    ));
  };
  ///////
  var userdetail = sessionStorage.getItem("userdetail");
  if (userdetail) {
      // Parse the JSON string into a JavaScript object
      var parsedUserDetail = JSON.parse(userdetail);
    
      // Access the user_role property
      var userrole = parsedUserDetail.user_role;
      var userid = parsedUserDetail.userid;

  }
  const fetchprojects = async () => {
    try {
        // Run both API calls in parallel using Promise.all
        const response = await axios.get(`${server}/api/project/allprojects`);

        setProjects(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
      const fetchDevelopers = async () => { 
          try {
            const response = await axios.get(`${server}/api/project/${selectedProject}/team`);
            const developerArray = Object.values(response.data.Team).map(dev => ({
              name: dev.name,
              developer_id: dev.userid
            }));
            
            setDevelopers(developerArray); // Populate developers
           
          } catch (error) {
            console.error('Error fetching developers:', error);
          } 
        };

  // Fetch all projects on mount
  useEffect(() => {
 fetchprojects();
  }, []);

  // Fetch sprints when project changes
  const handleProjectChange = async (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);
    setSelectedSprint('');
    setSelectedTask('');
    setSprints([]);
    setTasks([]);

    try {
      const response = await axios.get(`${server}/api/project/${projectId}/getsprints`);
      setSprints(response.data.data);
      fetchDevelopers();
    } catch (err) {
      console.error('Error fetching sprints:', err);
    }
  };

  // Fetch tasks when sprint changes
  const handleSprintChange = async (e) => {
    const sprintId = e.target.value;
    setSelectedSprint(sprintId);
    setSelectedTask('');
    setTasks([]);
///
    try {
          const response = await axios.get(`${server}/api/project/${selectedProject}/allinputs`);
          const taskArray = Object.values(response.data.data).map(task => ({
            name: task.input_name.replace(/\(.*?\)/, "").trim(),
            input_id: task.input_id
          }));
            console.log(taskArray);
          // Now you can safely set it as an array
          setTasks(taskArray);
           fetchDevelopers();
    
        } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

const estimatesprint = async () => {
  try {
    console.log("Calling API...");
    const res = await axios.get(`${server}/api/project/${id}/agilestatus`);
    console.log("API response:", res.data);

    toast.success("Sprint Estimated successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    return true;
  } catch (error) {
    console.error("Error in estimatesprint:", error.response?.data || error.message);
    toast.error("Failed to estimate sprint!", {
      position: "top-right",
      autoClose: 2000,
    });
    return false;
  }
};


  return (

<>
<style>

        {`
          * {
            box-sizing: border-box;
            font-family: 'Segoe UI', sans-serif;
          }
         
          h2 {
            margin-bottom: 15px;
            font-size: 28px;
            color: #333;
            text-align: center;
            font-weight: 600;
            text-transform: uppercase;
          }
          .container {
            display: flex;
            gap: 40px;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .column {
            flex: 1;
            background: #fff;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
            height: 80vh;
            overflow-y: auto;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .column:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          .task, .developer {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            background: #f9fafb;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .task:hover, .developer:hover {
            background: linear-gradient(145deg, #e1f5fe, #bbdefb);
            border-color: #1e88e5;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          .task h4, .developer h4 {
            margin: 0 0 10px;
            font-size: 18px;
            color: #444;
            font-weight: 600;
          }
          .tag {
            display: inline-block;
            background: #dbeafe;
            color: #1d4ed8;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 20px;
            margin-right: 8px;
            transition: background 0.3s ease;
          }
          .tag:hover {
            background: #1d4ed8;
            color: white;
          }
          .assigned {
            margin-top: 12px;
            font-size: 13px;
            color: #374151;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .highlight {
            background-color: #e0f7fa !important;
            border: 2px solid #00acc1;
          }
          .assign-btn {
            background: #00acc1;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .assign-btn:hover {
            background: #00796b;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          @media screen and (max-width: 768px) {
            .container {
              flex-direction: column;
              gap: 20px;
            }
            .column {
              flex: none;
              width: 100%;
              height: auto;
            }
          }
        `}
      </style>
     <div class="wrapper">
      <ToastContainer/>
        <Sidebar/>
        <TopBar/>      
        <div class="content-page">
         <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
                           
                                {/* Project Dropdown */}
      <div>
        <label>Select Project:</label>
        <select class="form-control" value={selectedProject} onChange={handleProjectChange}>
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj.project_id} value={proj.project_id}>{proj.project_name}</option>
          ))}
        </select>
      </div>

      {/* Sprint Dropdown */}
      {sprints.length > 0 && (
        <div>
          <label>Select Sprint:</label>
          <select className="form-control" value={selectedSprint} onChange={handleSprintChange}>
            <option value="">Select Sprint</option>
            {sprints.map((sprint) => (
              <option key={sprint.sprint_id} value={sprint.sprint_id}>Sprint {sprint.sprint_no}</option>
            ))}
          </select>
        </div>
      )}
                            </div>
                            <button className="btn btn-success" onClick={estimatesprint}>
  Estimate Sprint
</button>
                            </div>
                            <div class='card-body' style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
                            <div className="container">
        

                            <div class="column" id="taskColumn">
                            <h3>Tasks</h3>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task ${index === selectedTask ? 'highlight' : ''}`}
            onClick={() => selectTask(index,task.input_id)}
          >
            <h4>{task.name}</h4>
            <p>{task.complexity}</p>
            <div className='assigned' id={`assigned-task-${index}`}>
              {renderAssignedTasks(index,task.input_id)}
            </div>
          </div>
        ))}
      </div>

      <div class="column" id="developerColumn">
      <h3>Developers</h3>
      {developers.map((dev, index) => (
          <div key={dev.developer_id} className="developer" onClick={() => assignToDev(index,dev.developer_id)}>
            <h4>{dev.name}</h4>
            <div class="assigned" id={`assigned-dev-${dev.developer_id}`}>
              {renderAssignedDevs(index,dev.developer_id)}
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
</>
      
  );
};

export default TaskAssignment;
