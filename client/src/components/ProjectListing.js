import React, { useState, useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../css/ProjectListing.css'
import DashboardIcon from '../assets/Dashboard.svg'
import ProjectListActiveIcon from '../assets/Project-list-active.svg'
import CreateProjectIcon from '../assets/create-project.svg'
import LogoutIcon from '../assets/Logout.svg'
import Logo from '../assets/Logo.svg'
import BackArrowIcon from '../assets/back arrow.svg'
import MagnifierIcon from '../assets/magnifier.svg'

function ProjectListing(){

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [order, setOrder] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [status, setStatus] = useState()
    let pageLength = data.length

    const loadData = async () => {
        const results = await axios.get("http://localhost:8000/project_list",{order})
        setData(results.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const sorting = (e) => {
        setOrder(e.target.value)
        if(order === 'priority'){
            const sortedData = [...data].sort((a,b) => 
                a.priority.toLowerCase() < b.priority.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'category'){
            const sortedData = [...data].sort((a,b) => 
                a.category.toLowerCase() < b.category.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'proreason'){
            const sortedData = [...data].sort((a,b) => 
                a.proreason.toLowerCase() < b.proreason.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'division'){
            const sortedData = [...data].sort((a,b) => 
                a.division.toLowerCase() < b.division.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'dept'){
            const sortedData = [...data].sort((a,b) => 
                a.dept.toLowerCase() < b.dept.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'location'){
            const sortedData = [...data].sort((a,b) => 
                a.location.toLowerCase() < b.location.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }
        if(order === 'status'){
            const sortedData = [...data].sort((a,b) => 
                a.status.toLowerCase() < b.status.toLowerCase() ? -1 : 1
            )
            setData(sortedData)
        }        
    }

    const handleChange = (e) => {
        const id = e.target.value
        const value = e.target.textContent
        axios.post(`http://localhost:8000/project_list/updateChange`,{id, value})
        .then((result) => {
            if(result.data.status === "Success"){
                loadData()
            }
        }) 
    }

    const handlePrevClick = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if(currentPage < numbers.length){
            setCurrentPage(currentPage + 1)
        }
    }

    function changeCurrPage(id){
        setCurrentPage(id)
    }

    const resultData = data.filter((element) => {
        return search.toLowerCase() === '' 
            ? element 
            : (element.projectname.toLowerCase().includes(search) ||
                element.division.toLowerCase().includes(search) ||
                element.proreason.toLowerCase().includes(search) ||
                element.category.toLowerCase().includes(search) ||
                element.priority.toLowerCase().includes(search) ||
                element.dept.toLowerCase().includes(search) ||
                element.location.toLowerCase().includes(search) ||
                element.status.toLowerCase().includes(search))
    })

    pageLength = resultData.length

    // Pagination
    const recordsPerPage = 7
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const npage = Math.ceil(pageLength / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const records = resultData.slice(firstIndex, lastIndex)

    function getDate(d) {
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const date = new Date(d)
        const month = monthArr[date.getMonth()];
        const year = date.getFullYear();
        const day = date.getDate();
        return `${month}-${day}, ${year}`;
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
                        <p className="activeDashboard"></p>
                        <a href="http://localhost:3000/project_list">
                            <img src={ProjectListActiveIcon} alt="Project List" />
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
            <div className="projectlistingcontainer">
                <div className='projectlistingHeading'>
                    <img className='BackArrow' src={BackArrowIcon} alt='Back'/>&emsp;
                    <p className="projectlistingHead">Project Listing</p>
                </div>
                <img className='projectlistingLogo' src={Logo} alt="logo"/>
                <div className='projectlistingBody'>
                    <div className='projectlistingSearchbar'>
                        <div className='projectlistingSearch'>
                            <img className="projectlistingMagnifier" src={MagnifierIcon} alt='search'/>
                            <input type='text' className='projectlistingBar' placeholder='Search' onChange={(e) => {
                                                                                      setSearch(e.target.value.toLowerCase())
                                                                                      setCurrentPage(1)
                                                                                      }}/>                       
                        </div>
                        <div className='projectlistingFilter'>
                            <label className='projectlistingSortLabel'>Sort By: </label>
                            
                            <select className='projectlistingSort' name="sort" onChange={(value) => sorting(value)}>
                                <option value="priority">Priority</option>
                                <option value="category">Category</option>
                                <option value="proreason">Reason</option>
                                <option value="division">Division</option>
                                <option value="dept">Department</option>
                                <option value="location">Location</option>
                                <option value="status">Status</option>
                            </select>
                            <button className='projectlistingGoButton' onClick={sorting}>Go</button>
                        </div>
                    </div>
                    <div className='projectlistingTableDesktop'>
                        <table>
                        <tr>
                            <th className='projectlistingTableHead'>Project Name</th>
                            <th className='projectlistingTableHead'>Reason</th>
                            <th className='projectlistingTableHead'>Division</th>
                            <th className='projectlistingTableHead'>Category</th>
                            <th className='projectlistingTableHead'>Priority</th>
                            <th className='projectlistingTableHead'>Dept.</th>
                            <th className='projectlistingTableHead'>Location</th>
                            <th className='projectlistingTableHead'>Status</th>
                            <th colSpan="3" className='projectlistingTableHead'>Action</th>
                        </tr>
                        {
                            records.map((element, i) => (
                                    <tr key={i}>
                                        <td className='projectlistingTableDescTitle'>{element.projectname} 
                                            <td className='projectlistingTableDate'>{getDate(element.startdate)} to {getDate(element.enddate)}</td>
                                        </td>
                                        <td className='projectlistingTableDesc'>{element.proreason}</td>
                                        <td className='projectlistingTableDesc'>{element.division}</td>
                                        <td className='projectlistingTableDesc'>{element.category}</td>
                                        <td className='projectlistingTableDesc'>{element.priority}</td>
                                        <td className='projectlistingTableDesc'>{element.dept}</td>
                                        <td className='projectlistingTableDesc'>{element.location}</td>
                                        <td className='projectlistingTableDesc'>{element.status}</td>
                                        <td className='projectlistingTableDesc'>
                                            <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Start</button>
                                        </td>
                                        <td className='projectlistingTableDesc'>
                                            <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Close</button>
                                        </td>
                                        <td className='projectlistingTableDesc'>
                                            <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Cancel</button>
                                        </td>
                                    </tr>
                            ))
                        }
                        </table>
                        <nav>
                            <ul className='projectlistingList'>
                                <a href="#" onClick={handlePrevClick}>
                                    <li>&laquo;</li>
                                </a>
                                {
                                numbers.map((n,i) => (
                                    <a href='#' onClick={() => changeCurrPage(n)}>
                                        <li key={i} className={n === currentPage ? 'active' : ''}>
                                            {n}
                                        </li>
                                    </a>
                                ))
                            }<a href="#" onClick={handleNextClick}>
                                <li>&raquo;</li>
                            </a>
                        </ul>
                        </nav>
                    </div>

                    {/* Mobile View */}
                    <div className='projectlistingTableMobile'>
                        {
                            records.map((element, i) => (
                                    <div key={i} className='projectlistingCard'>
                                        <tr>
                                            <td colSpan='2' className='projectlistingTableDescTitle'>{element.projectname} 
                                                <td className='projectlistingTableDate'>{getDate(element.startdate)} to {getDate(element.enddate)}</td>
                                            </td>
                                            <td className='projectlistingTableDesc'><b>{element.status}</b></td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2' className='projectlistingTableDesc'><b>Reason : </b>{element.proreason}</td>
                                        </tr>
                                        <tr>
                                            <td className='projectlistingTableDesc'><b>Type : </b>{element.type}</td>
                                            <td colSpan='2' className='projectlistingTableDesc'><b>Category : </b>{element.category}</td>
                                        </tr>
                                        <tr>
                                            <td className='projectlistingTableDesc'><b>Division : </b>{element.division}</td>
                                            <td colSpan='2' className='projectlistingTableDesc'><b>Department : </b>{element.dept}</td>
                                        </tr>
                                        <tr>
                                            <td className='projectlistingTableDesc'><b>Location : </b>{element.location}</td>
                                            <td colSpan='2' className='projectlistingTableDesc'><b>Priority : </b>{element.priority}</td>
                                        </tr>
                                        <tr>
                                            <td className='projectlistingTableDesc'>
                                                <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Start</button>
                                            </td>
                                            <td className='projectlistingTableDesc'>
                                                <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Close</button>
                                            </td>
                                            <td className='projectlistingTableDesc'>
                                                <button type="submit" className='projectlistingButton' value={element._id} onClick={(e) => handleChange(e)}>Cancel</button>
                                            </td>
                                        </tr>
                                    </div>
                            ))
                        }
                        <nav>
                            <ul className='projectlistingList'>
                                <a href="#" onClick={handlePrevClick}>
                                    <li>&laquo;</li>
                                </a>
                                {
                                numbers.map((n,i) => (
                                    <a href='#' onClick={() => changeCurrPage(n)}>
                                        <li key={i} className={n === currentPage ? 'active' : ''}>
                                            {n}
                                        </li>
                                    </a>
                                ))
                            }<a href="#" onClick={handleNextClick}>
                                <li>&raquo;</li>
                            </a>
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectListing