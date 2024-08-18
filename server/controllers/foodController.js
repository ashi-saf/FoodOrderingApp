const foodModel = require('../models/FoodModel.js');
const fs = require('fs');

//add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//listing all the foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'food removed' });
  } catch (error) {
    console.log();
    res.json({ success: false, message: error.message });
  }
};
//get a single food
const getFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    console.log(food);
    if (!food) {
      return res.json({ success: false, message: 'Food item not found' });
    }
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//update a food
const updateFood = async (req, res) => {
  try {
    // Find the existing food item by ID
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.json({ success: false, message: 'Food item not found' });
    }

    // If a new image is uploaded, delete the old image file and update the image field
    if (req.file) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log('Failed to delete old image:', err);
      });
      food.image = req.file.filename;
    }

    // Update the food item with the new data from the request body
    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;

    // Save the updated food item to the database
    await food.save();

    res.json({
      success: true,
      message: 'Food item updated successfully',
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
module.exports = {
  addFood,
  listFood,
  removeFood,
  updateFood,
  getFood,
};
