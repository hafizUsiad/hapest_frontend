import React from "react";
import { frontend_url } from "../../serverconfig";

function sidebar()
{
    return(
        <div className="iq-sidebar  sidebar-default ">
        <div className="iq-sidebar-logo d-flex align-items-center">
          <a href="http://localhost:3000/" className="header-logo">
            <img src={`${frontend_url}/assets/images/logo2.png`} alt="logo" />
            <h3 className="logo-title light-logo">HAPEst</h3>
          </a>
          <div className="iq-menu-bt-sidebar ml-0">
            <i className="las la-bars wrapper-menu" />
          </div>
        </div>
        <div className="data-scrollbar" data-scroll={1}>
          <nav className="iq-sidebar-menu">
            <ul id="iq-sidebar-toggle" className="iq-menu">
              <li className="active">
                <a href="http://localhost:3000/" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className="ml-4">Dashboards</span>
                </a>
              </li>
              <li className>
                <a href="/project" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x={6} y={14} width={12} height={8} />
                  </svg>
                  <span className="ml-4">Projects</span>
                </a>
              </li>
              <li className>
                <a href="./project/task/1" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
                  </svg>
                  <span className="ml-4">Task</span>
                </a>
              </li>
              <li className>
                <a href="/employees" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
                  </svg>
                  <span className="ml-4">Employees</span>
                </a>
              </li>
              <li className>
                <a href="/interruption" className="svg-icon">                        
                <svg className="svg-icon" id="p-dash17" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1={12} y1={9} x2={12} y2={13} /><line x1={12} y1={17} x2="12.01" y2={17} />
                 </svg>
                  <span className="ml-4">Interruptions</span>
                </a>
              </li>
              {/* <li className>
                <a href="../backend/page-desk.html" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1={12} y1="22.08" x2={12} y2={12} />
                  </svg>
                  <span className="ml-4">Desk</span>
                </a>
              </li>
              <li className>
                <a href="../backend/page-calender.html" className="svg-icon">                        
                  <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} />
                  </svg>
                  <span className="ml-4">Calender</span>
                </a>
              </li> */}
              <li className=" ">
                    <a href="#user" className="collapsed" data-toggle="collapse" aria-expanded="false">
                      <svg className="svg-icon" id="p-dash10" width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy={7} r={4} /><polyline points="17 11 19 13 23 9" />
                      </svg>
                      <span className="ml-4">Other Operations</span>
                      <i className="las la-angle-right iq-arrow-right arrow-active" />
                      <i className="las la-angle-down iq-arrow-right arrow-hover" />
                    </a>
                    <ul id="user" className="iq-submenu collapse" data-parent="#otherpage">
                      <li className>
                        <a href="/sign-up">
                          <i className="las la-minus" /><span>Client Add</span>
                        </a>
                      </li>
                    </ul>
                  </li>
              <li className=" ">
                <a href="#otherpage" className="collapsed" data-toggle="collapse" aria-expanded="false">
                  {/* <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg> */}
                  {/* <span className="ml-4">Other Options</span>                         */}
                  {/* <i className="las la-angle-right iq-arrow-right arrow-active" />
                  <i className="las la-angle-down iq-arrow-right arrow-hover" /> */}
                </a>
                <ul id="otherpage" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                  

                </ul>
              </li>
            </ul>
          </nav>
          <div id="sidebar-bottom" className="position-relative sidebar-bottom">
            <div className="card border-none mb-0 shadow-none">
              <div className="card-body p-0">
                <div className="sidebarbottom-content">
                  <h5 className="mb-3">Task Performed</h5>
                  <div id="circle-progress-6" className="sidebar-circle circle-progress circle-progress-primary mb-4" data-min-value={0} data-max-value={100} data-value={55} data-type="percent" />
                  <div className="custom-control custom-radio mb-1">
                    <input type="radio" id="customRadio6" name="customRadio-1" className="custom-control-input" defaultChecked />
                    <label className="custom-control-label" htmlFor="customRadio6">Performed task</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio7" name="customRadio-1" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="customRadio7">Incomplete Task</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5 pb-2" />
        </div>
      </div> 
    )
}

export default sidebar;