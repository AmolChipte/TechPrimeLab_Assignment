import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../css/Dashboard.css'
import DashboardActiveIcon from '../assets/Dashboard-active.svg'
import ProjectListIcon from '../assets/Project-list.svg'
import CreateProjectIcon from '../assets/create-project.svg'
import LogoutIcon from '../assets/Logout.svg'
import Logo from '../assets/Logo.svg'
import {BarChart,XAxis,YAxis,Tooltip,Legend,Bar, ResponsiveContainer,LabelList} from 'recharts'

function Dashboard(){

    const [data, setData] = useState()
    const [totalProject, setTotalProject] = useState()
    const [closedProject, setClosedProject] = useState()
    const [runningProject, setRunningProject] = useState()
    const [closureProject, setClosureProject] = useState()
    const [cancelledProject, setCancelledProject] = useState()

    const loadData = async () => {
        const results = await axios.get("http://localhost:8000/dashboard")
        setData(results.data)
    }

    useEffect(() => {
        loadData()
        updateBox()
    }, [])

    const updateBox = async() => {
        const result = await axios.get(`http://localhost:8000/dashboard/update`)
        setTotalProject(result.data.total)
        setClosedProject(result.data.close)
        setRunningProject(result.data.running)
        setClosureProject(result.data.closure)
        setCancelledProject(result.data.cancel)
    }

    return(
        <div className='totalbody'>

            {/* Sidebar Code */}
            <div className="sidebarcontainer">
                <div className='sidebariconcontainer'>
                    <div class="sidebaricon">
                        <p className="activeDashboard"></p>
                        <a href="http://localhost:3000/dashboard">
                            <img src={DashboardActiveIcon} alt="Dashboard"/>
                        </a>
                    </div>
                    <div className="sidebaricon">
                        <a href="http://localhost:3000/project_list">
                            <img src={ProjectListIcon} alt="Project List" />
                        </a>
                    </div>
                    <div className="sidebaricon line">
                        <img width="30" height="30" src="https://img.icons8.com/office/30/000000/horizontal-line.png" alt="-" />
                    </div>
                    <div className="sidebaricon">
                        <a href="http://localhost:3000/create_project">
                            <img src={CreateProjectIcon} alt='Create New Project'/>
                        </a>
                    </div>
                </div>
                <div className="sidebaricon sidebarlogoutIcon">
                    <a href="http://localhost:3000/logout">
                        <img src={LogoutIcon} alt="Logout"/>
                    </a>
                </div>
            </div>

            {/* Dashboard Code */}
            <div className="dashboardcontainer">
                <div className='dashboardHeading'>
                    <p className="dashboardHead">Dashboard</p>
                </div>
                
                <img className='dashboardLogo' src={Logo} alt="logo"/>
                <div className='dashboardHeadingBox'>
                    <div className='dashboardBox'>
                        <p className='dashboardBoxTitle'>Total Projects</p>
                        <p className='dashboardBoxNumber'>{totalProject}</p>
                    </div>
                    <div className='dashboardBox'>
                        <p className='dashboardBoxTitle'>Closed</p>
                        <br className='onlyformobileview'/>
                        <p className='dashboardBoxNumber'>{closedProject}</p>
                    </div>
                    <div className='dashboardBox'>
                        <p className='dashboardBoxTitle'>Running</p>
                        <br className='onlyformobileview'/>
                        <p className='dashboardBoxNumber'>{runningProject}</p>
                    </div>
                    <div className='dashboardBox'>
                        <p className='dashboardBoxTitle'>Closure Delay</p>
                        <p className='dashboardBoxNumber'>{closureProject}</p>
                    </div>
                    <div className='dashboardBox'>
                        <p className='dashboardBoxTitle'>Cancelled</p>
                        <br className='onlyformobileview'/>
                        <p className='dashboardBoxNumber'>{cancelledProject}</p>
                    </div>
                </div>
                <div className='dashboardBody'>
                    <div className='dashboardGraphTitle'>Department wise - Total Vs Closed</div>
                    <div className='dashboardGraph'>
                        <ResponsiveContainer width={550} height={300}>
                            <BarChart width={500} height={275} barGap={5} barCategoryGap={22} data={data}>
                                <XAxis dataKey="name" tickLine={false} />
                                <YAxis width={15} type="number" domain={[0, 12]}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#044e92" radius={3}>
                                    <LabelList dataKey="total" position="top" />
                                </Bar>
                                <Bar dataKey="close" fill="#068203">
                                    <LabelList dataKey="close" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard