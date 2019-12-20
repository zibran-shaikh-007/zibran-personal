const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = require('../models/schema.model');
const Employee = mongoose.model('employee');


router.get('/', (req, res) => {

    Employee.find((err, docs) => {
        //console.log(docs)
        if (!err) {
            res.render('employee', {
                data: docs
            })
        }
        else {
            res.send('Error occured')
        }
    })

})

router.post('/', (req, res) => {
    //console.log(req.body)
    var employee = new Employee();
    employee.username = req.body.username;
    employee.email = req.body.email;
    employee.save((err, docs) => {
        if (!err) {
            //console.log(docs)
            res.redirect('/')
        } else {
            console.log("error occured")
        }
    })

})

router.get('/edit/:id', (req, res) => {
    //console.log(req.params.id)
    Employee.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render('edit', {
                Title: 'Edit Form',
                employeeDetail : docs,
                
            })
        }
    })
})

router.post('/edit/:id', (req, res) => {
    //console.log(req.body)
    Employee.findByIdAndUpdate(req.params.id , req.body,  (err, docs) => {
        if (!err) {
            res.redirect('../')
        } else {
            console.log(`error occured ${err}`)
        } 
    })
})

router.get('/delete/:id', (req, res) => {
    //console.log(req.params.id)
    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.redirect('../')
        }
    })
})

module.exports = router;