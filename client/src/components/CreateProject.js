import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../css/CreateProject.css'
import DashboardIcon from '../assets/Dashboard.svg'
import ProjectListIcon from '../assets/Project-list.svg'
import CreateProjectActiveIcon from '../assets/create-project-active.svg'
import LogoutIcon from '../assets/Logout.svg'
import Logo from '../assets/Logo.svg'
import BackArrowIcon from '../assets/back arrow.svg'

function CreateProject(){

    const [projectName, setProjectName] = useState('')
    const [proReason, setProReason] = useState('')
    const [type, setType] = useState('')
    const [division, setDivision] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('')
    const [dept, setDept] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [location, setLocation] = useState('')

    const [emptyBox, setEmptyBox] = useState('createprojectTextarea')
    const [emptyName, setEmptyName] = useState('createprojectpara')

    const [emptyReasonLabel, setEmptyReasonLabel] = useState('createprojectLabel')
    const [emptyReasonBox, setEmptyReasonBox] = useState('createprojectSelectList')
    const [emptyReasonPara, setEmptyReasonPara] = useState('createprojectPara')
    const [emptyTypeLabel, setEmptyTypeLabel] = useState('createprojectLabel')
    const [emptyTypeBox, setEmptyTypeBox] = useState('createprojectSelectList')
    const [emptyTypePara, setEmptyTypePara] = useState('createprojectPara')
    const [emptyDivisionLabel, setEmptyDivisionLabel] = useState('createprojectLabel')
    const [emptyDivisionBox, setEmptyDivisionBox] = useState('createprojectSelectList')
    const [emptyDivisionPara, setEmptyDivisionPara] = useState('createprojectPara')
    const [emptyCategoryLabel, setEmptyCategoryLabel] = useState('createprojectLabel')
    const [emptyCategoryBox, setEmptyCategoryBox] = useState('createprojectSelectList')
    const [emptyCategoryPara, setEmptyCategoryPara] = useState('createprojectPara')
    const [emptyPriorityLabel, setEmptyPriorityLabel] = useState('createprojectLabel')
    const [emptyPriorityBox, setEmptyPriorityBox] = useState('createprojectSelectList')
    const [emptyPriorityPara, setEmptyPriorityPara] = useState('createprojectPara')
    const [emptyDepartmentLabel, setEmptyDepartmentLabel] = useState('createprojectLabel')
    const [emptyDepartmentBox, setEmptyDepartmentBox] = useState('createprojectSelectList')
    const [emptyDepartmentPara, setEmptyDepartmentPara] = useState('createprojectPara')
    const [emptyStartDateLabel, setEmptyStartDateLabel] = useState('createprojectLabel')
    const [emptyStartDateBox, setEmptyStartDateBox] = useState('createprojectDate')
    const [emptyStartDatePara, setEmptyStartDatePara] = useState('createprojectPara')
    const [emptyEndDateLabel, setEmptyEndDateLabel] = useState('createprojectLabel')
    const [emptyEndDateBox, setEmptyEndDateBox] = useState('createprojectDate')
    const [emptyEndDatePara, setEmptyEndDatePara] = useState('createprojectPara')
    const [emptyLocationLabel, setEmptyLocationLabel] = useState('createprojectLabel')
    const [emptyLocationBox, setEmptyLocationBox] = useState('createprojectSelectList')
    const [emptyLocationPara, setEmptyLocationPara] = useState('createprojectPara')

    const [invalidEndDate, setInvalidEndDate] = useState('createprojectPara')

    // const [invalidDate, setInvalidDate] = useState('createprojectpara')
    const navigate = useNavigate()

    const checkEmpty = () => {
        let flag = 0
        if(projectName === ''){
            setEmptyBox('createprojectTextareaalert')
            setEmptyName('createprojectalertInvalid')
            flag = 1
        }
        if(proReason === ''){
            setEmptyReasonLabel('createprojectAlertLabel')
            setEmptyReasonBox('createprojectAlertSelectList')
            setEmptyReasonPara('createprojectAlertPara')
            flag = 1
        }
        if(type === ''){
            setEmptyTypeLabel('createprojectAlertLabel')
            setEmptyTypeBox('createprojectAlertSelectList')
            setEmptyTypePara('createprojectAlertPara')
            flag = 1
        }
        if(division === ''){
            setEmptyDivisionLabel('createprojectAlertLabel')
            setEmptyDivisionBox('createprojectAlertSelectList')
            setEmptyDivisionPara('createprojectAlertPara')
            flag = 1
        }
        if(category === ''){
            setEmptyCategoryLabel('createprojectAlertLabel')
            setEmptyCategoryBox('createprojectAlertSelectList')
            setEmptyCategoryPara('createprojectAlertPara')
            flag = 1
        }
        if(priority === ''){
            setEmptyPriorityLabel('createprojectAlertLabel')
            setEmptyPriorityBox('createprojectAlertSelectList')
            setEmptyPriorityPara('createprojectAlertPara')
            flag = 1
        }
        if(dept === ''){
            setEmptyDepartmentLabel('createprojectAlertLabel')
            setEmptyDepartmentBox('createprojectAlertSelectList')
            setEmptyDepartmentPara('createprojectAlertPara')
            flag = 1
        }
        if(startDate === ''){
            setEmptyStartDateLabel('createprojectAlertLabel')
            setEmptyStartDateBox('createprojectAlertDate')
            setEmptyStartDatePara('createprojectAlertPara')
            flag = 1
        }
        if(endDate === ''){
            setEmptyEndDateLabel('createprojectAlertLabel')
            setEmptyEndDateBox('createprojectAlertDate')
            setEmptyEndDatePara('createprojectAlertPara')
            flag = 1
        }
        if(location === ''){
            setEmptyLocationLabel('createprojectAlertLabel')
            setEmptyLocationBox('createprojectAlertSelectList')
            setEmptyLocationPara('createprojectAlertPara')
            flag = 1
        }
        return flag
    }

    const submit = async (e) => {
        e.preventDefault()
        checkEmpty()
        if(checkEmpty() === 0){
            try{
                await axios.post("http://localhost:8000/create_project", {projectName, proReason, type, division, category, priority, dept, startDate, endDate, location})
                .then((result) => {
                    if(result.data.status === "Success"){
                        navigate("/project_list")
                    }else{
                    console.log("Project Not Created")
                    }
            })
        }catch(error){
            console.log(error)
        }}
    }

    function checkDate(e){
        if(e.target.value < endDate || endDate == ''){
            setStartDate(e.target.value)
        }else{
            setInvalidEndDate("createprojectAlertPara")
        }
    }

    return(
        <div className='totalbody'>
            {/* Sidebar Code */}
            <div className="sidebarcontainer">
                <div className='sidebariconcontainer'>
                    <div class="sidebaricon">
                        <a href="http://localhost:3000/dashboard">
                            <img src={DashboardIcon} alt="Dashboard"/>
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
                        <p className="activeDashboard"></p>
                        <a href="http://localhost:3000/create_project">
                            <img src={CreateProjectActiveIcon} alt='Create New Project'/>
                        </a>
                    </div>
                </div>
                <div className="sidebaricon sidebarlogoutIcon">
                    <a href="http://localhost:3000/logout">
                        <img src={LogoutIcon} alt="Logout"/>
                    </a>
                </div>
            </div>

            {/* Create Project Code */}
            <div className="createprojectcontainer">
                <div className='createprojectHeading'>
                    <img className='BackArrow' src={BackArrowIcon} alt='Back'/>&emsp;
                    <p className="createprojectHead">Create Project</p>
                </div>
                <img className='createprojectLogo' src={Logo} alt="logo"/>
                <div className='createprojectBody'>
                    <form>
                    <p className={emptyName}>Project Name is Required</p>
                        <textarea className={emptyBox} rows='2' cols='50' placeholder='Enter Project Theme' onChange={(e) => {
                                                                                    setEmptyBox('createprojectTextarea')
                                                                                    setEmptyName('createprojectpara')
                                                                                    setProjectName(e.target.value)}} required></textarea>
                        <button type="submit" className='createprojectButton1' onClick={submit}>Save Project</button>
                        <div className="createprojectOptions"> 
                            <div className='createprojectBox'>           
                                <label className={emptyReasonLabel}>Reason<span style={{color: "red"}}> *</span></label>
                                <select className={emptyReasonBox} name="Reasons" onChange={(e) => {
                                                                                    setEmptyReasonLabel('createprojectLabel')
                                                                                    setEmptyReasonBox('createprojectSelectList')
                                                                                    setEmptyReasonPara('createprojectPara')
                                                                                    setProReason(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Business">For Business</option>
                                    <option value="Personal">For Personal</option>
                                    <option value="Dealership">For Dealership</option>
                                    <option value="Transport">For Transport</option>
                                </select>
                                <p className={emptyReasonPara}>Reason is Required</p>
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyTypeLabel}>Type<span style={{color: "red"}}> *</span></label>
                                <select className={emptyTypeBox} name="Types" onChange={(e) => {
                                                                                    setEmptyTypeLabel('createprojectLabel')
                                                                                    setEmptyTypeBox('createprojectSelectList')
                                                                                    setEmptyTypePara('createprojectPara')
                                                                                    setType(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Internal">Internal</option>
                                    <option value="External">External</option>
                                </select>
                                <p className={emptyTypePara}>Type is Required</p>
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyDivisionLabel}>Division<span style={{color: "red"}}> *</span></label>
                                <select className={emptyDivisionBox} name="Divisions" onChange={(e) => {
                                                                                    setEmptyDivisionLabel('createprojectLabel')
                                                                                    setEmptyDivisionBox('createprojectSelectList')
                                                                                    setEmptyDivisionPara('createprojectPara')
                                                                                    setDivision(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Filters">Filters</option>
                                    <option value="Pumps">Pumps</option>
                                    <option value="Compressor">Compressor</option>
                                    <option value="Glass">Glass</option>
                                    <option value="Water Heater">Water Heater</option>
                                </select>
                                <p className={emptyDivisionPara}>Division is Required</p>
                            </div>
                        </div>
                        <div className="createprojectOptions"> 
                            <div className='createprojectBox'> 
                                <label className={emptyCategoryLabel}>Category<span style={{color: "red"}}> *</span></label>
                                <select className={emptyCategoryBox} name="Categories" onChange={(e) => {
                                                                                    setEmptyCategoryLabel('createprojectLabel')
                                                                                    setEmptyCategoryBox('createprojectSelectList')
                                                                                    setEmptyCategoryPara('createprojectPara')
                                                                                    setCategory(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Quality A">Quality A</option>
                                    <option value="Quality B">Quality B</option>
                                    <option value="Quality C">Quality C</option>
                                    <option value="Quality D">Quality D</option>
                                </select>
                                <p className={emptyCategoryPara}>Category is Required</p>
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyPriorityLabel}>Priority<span style={{color: "red"}}> *</span></label>
                                <select className={emptyPriorityBox} name="Priorities" onChange={(e) => {
                                                                                    setEmptyPriorityLabel('createprojectLabel')
                                                                                    setEmptyPriorityBox('createprojectSelectList')
                                                                                    setEmptyPriorityPara('createprojectPara')
                                                                                    setPriority(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                <p className={emptyPriorityPara}>Priority is Required</p>
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyDepartmentLabel}>Department<span style={{color: "red"}}> *</span></label>
                                <select className={emptyDepartmentBox} name="Departments" onChange={(e) => {
                                                                                    setEmptyDepartmentLabel('createprojectLabel')
                                                                                    setEmptyDepartmentBox('createprojectSelectList')
                                                                                    setEmptyDepartmentPara('createprojectPara')
                                                                                    setDept(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Strategy">Strategy</option>
                                    <option value="HR">HR</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Quality">Quality</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Stores">Stores</option>
                                </select>
                                <p className={emptyDepartmentPara}>Department is Required</p>
                            </div>
                        </div>
                        <div className="createprojectOptions"> 
                            <div className='createprojectBox'> 
                                <label className={emptyStartDateLabel}>Start Date as per Project Plan<span style={{color: "red"}}> *</span></label>
                                <input className={emptyStartDateBox} type='date' onChange={(e) => {
                                                                                    setEmptyStartDateLabel('createprojectLabel')
                                                                                    setEmptyStartDateBox('createprojectDate')
                                                                                    setEmptyStartDatePara('createprojectPara')
                                                                                    checkDate(e)
                                                                                    setStartDate(e.target.value)}}/>
                                <p className={emptyStartDatePara}>Start Date is Required</p>                                                    
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyEndDateLabel}>End Date as per Project Plan<span style={{color: "red"}}> *</span></label>
                                <input className={emptyEndDateBox} type='date' min={startDate} onChange={(e) => {
                                                                                    setEmptyEndDateLabel('createprojectLabel')
                                                                                    setEmptyEndDateBox('createprojectDate')
                                                                                    setEmptyEndDatePara('createprojectPara')
                                                                                    // checkDate(e)
                                                                                    setEndDate(e.target.value)}}/>
                                <p className={emptyEndDatePara}>End Date is Required</p>
                                <p className={invalidEndDate}>End Date Cannot sbe Smaller than Start Date</p>
                            </div>
                            <div className='createprojectBox'> 
                                <label className={emptyLocationLabel}>Location<span style={{color: "red"}}> *</span></label>
                                <select className={emptyLocationBox} name="Locations" onChange={(e) => {
                                                                                    setEmptyLocationLabel('createprojectLabel')
                                                                                    setEmptyLocationBox('createprojectSelectList')
                                                                                    setEmptyLocationPara('createprojectPara')
                                                                                    setLocation(e.target.value)}}>
                                    <option value="none">--- SELECT ---</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Mumbai">Mumbai</option>
                                </select>
                                <p className={emptyLocationPara}>Location is Required</p>
                            </div>
                        </div>
                        <div className="createprojectOptions"> 
                            <div className='createprojectBox'> 
                            </div>
                            <div className='createprojectBox'> 
                            </div>
                            <div className='createprojectBox'> 
                                <p className='createprojectStatus'>Status: <span><b>Registering</b></span></p>
                            </div>
                        </div>
                        <button type="submit" className='createprojectButton2' onClick={submit}>Save Project</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProject