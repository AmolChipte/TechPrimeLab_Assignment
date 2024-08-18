import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import CreateProject from './components/CreateProject.js'
import ProjectListing from './components/ProjectListing.js'
import Logout from './components/Logout.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Navigate to='/login'/>}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/dashboard' element = {<Dashboard />}/>
        <Route path='/create_project' element = {<CreateProject />}/>
        <Route path='/project_list' element = {<ProjectListing />}/>
        {/* <Route path='/logout' element={<Logout/>}/> */}
        <Route path='/logout' element={<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
