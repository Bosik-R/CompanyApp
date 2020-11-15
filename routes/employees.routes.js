const express = require('express');
const departmentsModel = require('../models/departments.model');
const router = express.Router();
const Employee = require('../models/employees.model');

router.get('/employees', async (req, res) => {

  try {
    res.json(await Employee.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const dep = await Employee.aggregate([ { $sample: { size: 1 } } ]);
    if(!dep){
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await Employee.findById(req.param.id);
    if(!dep) {
      res.status(404).json({ message: 'Not forund' });
    } else {
      res.json(dep)
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  
  try {
    const newEmployee = new Employee( {
      firstName: firstName,
      lastName: lastName,
      department: department,
    });
    await newEmployee.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
      dep.firstName = firstName;
      dep.lastName = lastName;
      dep.department = department;
      await dep.save();
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id);
    if(dep) {
      await dep.remove();
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
