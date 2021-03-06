const Product = require('../models/products.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {

  try {
    const dep = await Product.aggregate([ { $sample: { size: 1 } } ]);
    if(!dep){
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = await Product.findById(req.param.id);
    if(!dep) {
      res.status(404).json({ message: 'Not forund' });
    } else {
      res.json(dep)
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { name, client } = req.body;
  
  try {
    const newProduct = new Product( { name: name, client: client });
    await newProduct.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { name, client } = req.body;

  try {
    const dep = await Product.findById(req.params.id);
    if(dep) {
      dep.name = name;
      dep.client = client;
      await dep.save();
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
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
};