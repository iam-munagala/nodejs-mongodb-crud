const express = require("express");
const student = require("../models/student");
const { json } = require("body-parser");
const router = express.Router();

//request send to create the student 

router.post("/:id",async(req,res)=>{
        const student1 = new student({
            name :req.body.name,
            email : req.body.email,
            regdno: req.body.regdno
        })

        try {
            const s1 = await student1.save()
            res.json(s1);
        } catch (error) {
            res.json(404).json({message:"does not exist"})
        }
})

// display all the students in the record 

router.get("/",async(req,res)=>{
    try {
        const students = await student.find();
        res.json(students);
    } catch (error) {
        res.send('Error' + error)
    }
})

// get the details of the student by id 

router.get('/:id',async(req,res)=>{
    try {
        const studentdetails = await student.findById(req.params.id)
        res.json(studentdetails)
    } catch (error) {
        res.send('Error'+error)
        
    }
})

// patch the record ( or ) update the records 

router.patch("/:id",async(req,res)=>{
    try {
        const students = await student.findById(req.params.id)
        students.name = req.body.name
        const s1 = await students.save()
        res.json(s1)
    } catch (error) {
        res.send(error)
    }
})


// delete the student record 

router.delete('/:id',async(req,res)=>{
    try {
        const students = await student.findOneAndDelete(req.params.id)
        if(!students){
            res.status(404).json({nessage:"student not found"})
        }
        res.status(200).json({message:"Student deleted successfully",students})
    } catch (error) {
        res.json({message:"Error deleting the student record ",error:error.message})
    }
})


module.exports = router;