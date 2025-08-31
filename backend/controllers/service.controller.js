import Service from '../models/service.model.js'

// ✅ Create a new service
export const createService = async (req, res) => {
  try {
    const { serviceTitle, bio, skills, hourlyRate, alternateNumber } = req.body

    const service = new Service({
      serviceTitle,
      bio,
      skills,
      hourlyRate,
      alternateNumber,
      userId: req.user.userId // from auth middleware
    })

    await service.save()

    res.status(201).json({
      success: true,
      message: "Service created successfully!",
      service
    })
  } catch (error) {
    console.error("Error creating service:", error)
    res.status(500).json({ success: false, message: "Something went wrong!" })
  }
}

// ✅ Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("userId", "name phone")
    res.status(200).json({
      success: true,
      message: "Services fetched successfully!",
      services,
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Get logged-in user’s services
export const getMyServices = async (req, res) => {
  try {
    const myServices = await Service.find({ userId: req.user.userId })
    if (!myServices || myServices.length === 0) {
      return res.status(404).json({ message: "No services found" })
    }

    res.status(200).json({
      success: true,
      message: "Your posted services",
      services: myServices
    })
  } catch (error) {
    console.error("Error fetching your services:", error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// ✅ Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    if (service.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete" })
    }

    await Service.findByIdAndDelete(req.params.id)

    res.status(200).json({ success: true, message: "Service deleted successfully" })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Update a service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({ message: "Service not found" })
    }

    if (service.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to update" })
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.status(200).json({ 
      success: true, 
      message: "Service updated successfully", 
      service : updatedService 
    })
  } catch (error) {
    console.error("Update error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// ✅ Filter services
export const getFilteredServices = async (req, res) => {
  try {
    const { serviceTitle, skills } = req.query

    const filter = {}

    if (serviceTitle) {
      filter.serviceTitle = { $regex: serviceTitle, $options: "i" } // case-insensitive search
    }

    if (skills) {
      filter.skills = { $regex: skills, $options: "i" }
    }

    const services = await Service.find(filter).populate('userId', 'name phone')

    res.status(200).json({ 
      success: true, 
      message: "Filtered results", 
      services 
    })
  } catch (error) {
    console.error("Filter error:", error)
    res.status(500).json({ message: "Server error" })
  }
}
