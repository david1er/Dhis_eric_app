import { useState } from 'react'
import React from 'react'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Entry from './components/Entry'
import OrganisationUnits from './components/OrganisationUnits'
import Programs from './components/Programs'
import DataElements from './components/DataElements'
import Users from './components/Users'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DASHBOARD = 'DASHBOARD'
const ORGANISATION_UNITS = 'ORGANISATION_UNITS'
const PROGRAMS = 'PROGRAMS'
const DATA_ELEMENTS = 'DATA_ELEMENTS'
const DATA_ENTRY = 'DATA_ENTRY'
const USERS = 'USERS'
const ABOUT = 'ABOUT'

const Layout = () => {
    const [selectedMenu, setSelectedMenu] = useState(DASHBOARD)

    return (
        <> 
            <div id="viewport">
                {/* <!-- Sidebar --> */}
                <div id="sidebar">
                    <header>
                        <a href="">Formation</a>
                    </header>
                    <br />

                    <div className={selectedMenu === DASHBOARD ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(DASHBOARD)}><i class="bi bi-speedometer2"></i> &nbsp;&nbsp;Dashboard</div>
                    <div className={selectedMenu === ORGANISATION_UNITS ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(ORGANISATION_UNITS)}><i class="bi bi-folder2"></i> &nbsp;&nbsp;Organisation Units</div>
                    <div className={selectedMenu === PROGRAMS ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(PROGRAMS)}><i class="bi bi-grid-fill"></i> &nbsp;&nbsp;Programs</div>
                    <div className={selectedMenu === DATA_ELEMENTS ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(DATA_ELEMENTS)}><i class="bi bi-columns-gap"></i> &nbsp;&nbsp;Data Elements</div>
                    <div className={selectedMenu === DATA_ENTRY ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(DATA_ENTRY)}><i class="bi bi-file-earmark-arrow-down"></i> &nbsp;&nbsp;Data Entry</div>
                    <div className={selectedMenu === USERS ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(USERS)}><i class="bi bi-people-fill"></i> &nbsp;&nbsp;Users</div>
                    <hr />
                    <div className={selectedMenu === ABOUT ? 'hover-menu-hover' : 'hover-menu'} onClick={() => setSelectedMenu(ABOUT)}><i class="bi bi-info-circle"></i> &nbsp;&nbsp;About</div>
                </div>
                <div id="content">
                    <div class="container-fluid">
                        {selectedMenu === DASHBOARD && <Dashboard />}
                        {selectedMenu === ORGANISATION_UNITS && <OrganisationUnits />}
                        {selectedMenu === PROGRAMS && <Programs />}
                        {selectedMenu === DATA_ELEMENTS && <DataElements />}
                        {selectedMenu === DATA_ENTRY && <Entry />}
                        {selectedMenu === USERS && <Users />}
                        {selectedMenu === ABOUT && <About />}
                    </div>
                </div>
            </div>

           {  <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                /> }
        </>
    )
}

export default Layout