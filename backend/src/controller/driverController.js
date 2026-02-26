import Driver from "../modal/driverModal.js";

const getUploadedFileLocation = (files, fieldName) => {
  const uploadedFile = files?.[fieldName]?.[0];
  if (!uploadedFile) return null;

  return (
    uploadedFile.path ||
    uploadedFile.secure_url ||
    uploadedFile.url ||
    uploadedFile.filename ||
    null
  );
};

const createDriver = async (req, res) => {
  try {
    const files = req.files || {};

    console.log("[create-driver][controller] Request received", {
      bodyKeys: Object.keys(req.body || {}),
      fileKeys: Object.keys(files),
    });

    const {
      employeeNumber,
      status,
      firstName,
      surName,
      driverPrivateHireLicense,
      driverPrivateHireLicenseExpiry,
      privateHireCardNo,
      dateOfBirth,
      carRegistration,
      email,
      address,
      vehicleTypes,
      carMake,
      carModal,
      carColor,
      carPrivateHireLicense,
      carPrivateHireLicenseExpiry,
      carInsuranceExpiry,
      contact,
      driverLicense,
      driverLicenseExpiry,
      NationalInsurance
    } = req.body;

    const driverPicturePath = getUploadedFileLocation(files, "driverPicture");
    const privateHireCardPath = getUploadedFileLocation(files, "privateHireCard");
    const dvlaCardPath = getUploadedFileLocation(files, "dvlaCard");
    const carPicturePath = getUploadedFileLocation(files, "carPicture");
    const privateHireCarPaperPath = getUploadedFileLocation(
      files,
      "privateHireCarPaper"
    );
    const driverPrivateHirePaperPath = getUploadedFileLocation(
      files,
      "driverPrivateHirePaper"
    );
    const insurancePath = getUploadedFileLocation(files, "insurance");
    const motExpiryPath = getUploadedFileLocation(files, "motExpiry");
    const V5Path = getUploadedFileLocation(files, "V5");

    const missingFields = [];

    if (!employeeNumber) missingFields.push("employeeNumber");
    if (!status) missingFields.push("status");
    if (!firstName) missingFields.push("firstName");
    if (!surName) missingFields.push("surName");
    if (!driverPrivateHireLicense)
      missingFields.push("driverPrivateHireLicense");
    if (!driverPrivateHireLicenseExpiry)
      missingFields.push("driverPrivateHireLicenseExpiry");
    if (!privateHireCardNo) missingFields.push("privateHireCardNo");
    if (!dateOfBirth) missingFields.push("dateOfBirth");
    if (!carRegistration) missingFields.push("carRegistration");
    if (!email) missingFields.push("email");
    if (!address) missingFields.push("address");
    if (!vehicleTypes) missingFields.push("vehicleTypes");
    if (!carMake) missingFields.push("carMake");
    if (!carModal) missingFields.push("carModal");
    if (!carColor) missingFields.push("carColor");
    if (!carPrivateHireLicense) missingFields.push("carPrivateHireLicense");
    if (!carPrivateHireLicenseExpiry)
      missingFields.push("carPrivateHireLicenseExpiry");
    if (!carInsuranceExpiry) missingFields.push("carInsuranceExpiry");
    if (!contact) missingFields.push("contact");
    if (!driverLicense) missingFields.push("driverLicense");
    if (!driverLicenseExpiry) missingFields.push("driverLicenseExpiry");
    if (!NationalInsurance) missingFields.push("NationalInsurance");
    if (!driverPicturePath) missingFields.push("driverPicture(file)");
    if (!privateHireCardPath) missingFields.push("privateHireCard(file)");
    if (!dvlaCardPath) missingFields.push("dvlaCard(file)");
    if (!carPicturePath) missingFields.push("carPicture(file)");
    if (!privateHireCarPaperPath)
      missingFields.push("privateHireCarPaper(file)");
    if (!driverPrivateHirePaperPath)
      missingFields.push("driverPrivateHirePaper(file)");
    if (!insurancePath) missingFields.push("insurance(file)");
    if (!motExpiryPath) missingFields.push("motExpiry(file)");
    if (!V5Path) missingFields.push("V5(file)");

    if (missingFields.length > 0) {
      console.error("[create-driver][controller] Validation failed", {
        missingFields,
      });
      return res
        .status(400)
        .json({ error: "All fields are required", missingFields });
    }

    const newDriver = new Driver({
      employeeNumber,
      status,
      firstName,
      surName,
      driverPrivateHireLicense,
      driverPrivateHireLicenseExpiry,
      driverPicture: driverPicturePath,
      privateHireCardNo,
      privateHireCard: privateHireCardPath,
      dvlaCard: dvlaCardPath,
      NationalInsurance,
      dateOfBirth,
      carRegistration,
      carPicture: carPicturePath,
      privateHireCarPaper: privateHireCarPaperPath,
      driverPrivateHirePaper: driverPrivateHirePaperPath,
      insurance: insurancePath,
      motExpiry: motExpiryPath,
      V5: V5Path,
      email,
      address,
      vehicleTypes: vehicleTypes?.split(",") || [],
      carMake,
      carModal,
      carColor,
      carPrivateHireLicense,
      carPrivateHireLicenseExpiry,
      carInsuranceExpiry,
      contact,
      driverLicense,
      driverLicenseExpiry,
    });

    await newDriver.save();

    console.log("[create-driver][controller] Driver saved", {
      id: newDriver._id,
      employeeNumber,
    });

    return res.status(201).json({
      message: "Driver profile created successfully",
      driver: newDriver,
    });
  } catch (err) {
    console.error("[create-driver][controller] Unexpected error", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      bodyKeys: Object.keys(req.body || {}),
      fileKeys: Object.keys(req.files || {}),
    });
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ message: "Driver fetched successfully", driver });
  } catch (error) {
    console.error('Error in getDriverById controller:', error);
    return res.status(500).json({ message: 'Server error while fetching driver', error: error.message });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteDriverById = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    if (driver.status !== "Delete") {
      driver.status = "Delete";
      await driver.save();
      return res.status(200).json({ message: "Driver status set to 'Delete'" });
    } else {
      await Driver.findByIdAndDelete(id);
      return res.status(200).json({ message: "Driver permanently deleted" });
    }
  } catch (err) {
    console.error("Error deleting driver:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;

    const updateData = {
      ...req.body,
    };

    if (updateData.vehicleTypes) {
      updateData.vehicleTypes = updateData.vehicleTypes.split(",");
    }

    if (req.files) {
      if (req.files["driverPicture"]) {
        updateData.driverPicture = getUploadedFileLocation(
          req.files,
          "driverPicture"
        );
      }
      if (req.files["privateHireCard"]) {
        updateData.privateHireCard = getUploadedFileLocation(
          req.files,
          "privateHireCard"
        );
      }
      if (req.files["dvlaCard"]) {
        updateData.dvlaCard = getUploadedFileLocation(req.files, "dvlaCard");
      }
      if (req.files["carPicture"]) {
        updateData.carPicture = getUploadedFileLocation(req.files, "carPicture");
      }
      if (req.files["privateHireCarPaper"]) {
        updateData.privateHireCarPaper = getUploadedFileLocation(
          req.files,
          "privateHireCarPaper"
        );
      }
      if (req.files["driverPrivateHirePaper"]) {
        updateData.driverPrivateHirePaper = getUploadedFileLocation(
          req.files,
          "driverPrivateHirePaper"
        );
      }
      if (req.files["insurance"]) {
        updateData.insurance = getUploadedFileLocation(req.files, "insurance");
      }
      if (req.files["motExpiry"]) {
        updateData.motExpiry = getUploadedFileLocation(req.files, "motExpiry");
      }
      if (req.files["V5"]) {
        updateData.V5 = getUploadedFileLocation(req.files, "V5");
      }
    }

    const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateData, {
      new: true,
    });

    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({
      message: "Driver profile updated successfully",
      driver: updatedDriver,
    });
  } catch (err) {
    console.error("Error updating driver:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  createDriver,
  getAllDrivers,
  deleteDriverById,
  updateDriverById,
  getDriverById,
};
