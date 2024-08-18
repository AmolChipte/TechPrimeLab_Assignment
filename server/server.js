const express = require('express')
const cors = require('cors')
const User = require("./models/User")
const Project = require("./models/Project")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://localhost:3000'],
    methods:["GET","POST","PUT","DELETE"],
    credentials : true
}))
app.use(cookieParser());

// Data Retrieve from Login.js
app.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        const data = {
            email:email,
            password:password
        }
        const users = await User.findOne({
            email: data.email,
            password: data.password
        })
        if(users){
            const token = jwt.sign(
                {
                  username: users.email,
                },
                "anykey",
                {
                  expiresIn: "1h",
                }
            );
            // save the token into cookie
            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });

            // Data send to Login.js
            res.json({
                status: "Success",
                Message: "User Found"
            })
        }else{
            // Data send to Login.js
            res.json({
                status: "Failed",
                Message: "User NOT Found"
            })
        }
    }catch(error){
        console.log(error)
    }
})

// Data Retrieve from CreateProject.js
app.post('/create_project', async(req, res) => {
    {
        try{
            const {projectName, proReason, type, division, category, priority, dept, startDate, endDate, location, status} = req.body
            const projectData = {
                projectName:projectName,
                proreason : proReason,
                type : type,
                division : division,
                category : category,
                priority :priority,
                dept : dept,
                startDate : new Date(startDate),
                endDate : new Date(endDate),
                location : location,
                status : 'Registered'
            }

            const projects = await Project.insertMany({
                projectname: projectData.projectName,
                proreason : projectData.proreason,
                type : projectData.type,
                division : projectData.division,
                category : projectData.category,
                priority : projectData.priority,
                dept : projectData.dept,
                startdate : projectData.startDate,
                enddate : projectData.endDate,
                location : projectData.location,
                status : projectData.status
            })
            if(projects){
                console.log("Project Created")
                // Data send to ProjectListing.js
                res.json({
                    status: "Success",
                    Message: "Project Created Successfully"
                })
            }else{
                console.log("Something Went Wrong")
                // Data send to CreateProject.js
                res.json({
                    status: "Failed",
                    Message: "Project is Not Created"
                })
            }
        }catch(error){
            console.log(error)
        }
    }
})

// Forward Data to Project Listing
app.get('/project_list', async(req, res) => {
    {
        try{
            const result = await Project.find()
            res.json(result)
        }catch(error){
            console.log(error)
        }
    }
})

// Update Data from Project listing
app.post('/project_list/updateChange', async(req, res) => {
    try{
        let updated = null
        const {id, value} = req.body
        if(value === "Start"){
            updated = await Project.findByIdAndUpdate(
                id,
                {status: 'Running'},
                {new: true}
            )
        }else if(value === "Close") {
            updated = await Project.findByIdAndUpdate(
                id,
                {status: 'Closed'},
                {new: true}
            )
        }else if(value === "Cancel"){
            updated = await Project.findByIdAndUpdate(
                id,
                {status: 'Cancelled'},
                {new: true}
            )
        }
        if(updated){
            console.log("Status Updated")
            res.json({
                status: "Success",
                Message: "Status Updated"
            })
        }
    }catch(error){
        console.log(error)
    }  
})

// Dashboard Update Boxes
app.get('/dashboard/update', async(req, res) => {
    try{
        const currentDate = new Date()

        const total = await Project.countDocuments('_id')
        const close = await Project.countDocuments({status: "Closed"})
        const running = await Project.countDocuments({status: "Running"})
        const closure = await Project.countDocuments({$and:[
                                                        {$or:[{status: "Running"},
                                                            {status: "Registered"}]
                                                        },
                                                        {
                                                        enddate: {$lt: currentDate}
                                                        }]})
        const cancel = await Project.countDocuments({status: "Cancelled"})
        const result = {
            total: total,
            close: close,
            running: running,
            closure: closure,
            cancel: cancel
        }
        res.json(result)
    }catch(error){
        console.log(error)
    }
})

app.get('/dashboard', async(req, res) => {
    {
        try{
            const totalStr = await Project.countDocuments({dept: "Strategy"})
            const closeStr = await Project.countDocuments({$and: [{dept: "Strategy"},{status: "Closed"}]})
            const totalFin = await Project.countDocuments({dept: "Finance"})
            const closeFin = await Project.countDocuments({$and: [{dept: "Finance"},{status: "Closed"}]})
            const totalQlt = await Project.countDocuments({dept: "Quality"})
            const closeQlt = await Project.countDocuments({$and: [{dept: "Quality"},{status: "Closed"}]})
            const totalMan = await Project.countDocuments({dept: "Maintenance"})
            const closeMan = await Project.countDocuments({$and: [{dept: "Maintenance"},{status: "Closed"}]})
            const totalSto = await Project.countDocuments({dept: "Stores"})
            const closeSto = await Project.countDocuments({$and: [{dept: "Stores"},{status: "Closed"}]})
            const totalhr = await Project.countDocuments({dept: "HR"})
            const closehr = await Project.countDocuments({$and: [{dept: "HR"},{status: "Closed"}]})
            const results = [
                {
                    "name" : "STR",
                    "total": totalStr,
                    "close": closeStr
                },
                {
                    "name" : "FIN",
                    "total": totalFin,
                    "close": closeFin
                },
                {
                    "name" : "QLT",
                    "total": totalQlt,
                    "close": closeQlt
                },
                {
                    "name" : "MAN",
                    "total": totalMan,
                    "close": closeMan
                },
                {
                    "name" : "STO",
                    "total": totalSto,
                    "close": closeSto
                },
                {
                    "name" : "HR",
                    "total": totalhr,
                    "close": closehr
                }
            ]
            
            res.json(results)
        }catch(error){
            console.log(error)
        }
    }
})

// logout
app.get('/logout',async (req, res) => {
    res.clearCookie("token")
    res.end()
})

// Server
app.listen(8000, () => {
    console.log("Server is Running on http://localhost:8000")
})
