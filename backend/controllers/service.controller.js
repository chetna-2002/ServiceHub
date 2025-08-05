import Service from '../models/service.model.js'


// Create a new service
export const createService = async (req, res) => {
  try {
    const { title, category, description, price, location } = req.body;

    const service = new Service({
      title,
      category,
      description,
      price,
      location,
      userId: req.user.userId// assuming user is authenticated
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: "Service created successfully!",
      service
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};



// Get all services
export const getAllServices = async (req, res) => {
  try {  //.find only userid fetch karega provider ka sara data dekhne ke liye .populated use kiya h
    const services = await Service.find().populate("userId", "fullname phone"); // optional user info
    res.status(200).json({
      success: true,
      message: "Services fetched successfully!",
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// get myservice 


export const getMyServices = async (req, res) => {
  try {
    const myServices = await Service.find({ userId: req.user.userId });
    if (!myServices) {
      return res.status(404).json({ message: "Service not found" });
    }
    

    res.status(200).json({
      success: true,
      message: "Your posted services",
      services: myServices
    });
  } catch (error) {
    console.error("Error fetching your services:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// delete service 

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
// data comes in form of obejectId so converted into string
// service.userId → Mongoose ObjectId
// Ye DB se aata hai ObjectId type mein, jo ek special object hota hai — not just a string.
//  req.userId → JWT se decoded value
// Ye JWT decode hone ke baad userId as a string deta hai.


    if (service.userId.toString() !== req.user.userId) 
  { 
      return res.status(403).json({ message: "Unauthorized to delete" });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// update service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,// konsa update krna h
      req.body,  // kya update krna h 
      { new: true , runValidators: true } // return updated document  if we dont write new:true it will return old data instead of updated 
    );
    // runvalidator : true means it follow the schema or apply validation if we dont write it it will accept wrong data 

    res.status(200).json({ success: true, message :"service updated successfully",updatedService });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// filtered data 

export const getFilteredServices = async (req, res) => {
  try {
    const { category, location } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = location;

    }

    const services = await Service.find(filter).populate('userId', 'fullname phone');

    res.status(200).json({ success: true, message : "filtered apply",services});
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ message: "Server error" });
  }
};







