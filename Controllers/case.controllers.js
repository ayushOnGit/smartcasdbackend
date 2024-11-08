import caseSchema from "../Models/case.model.js";
import labSchema from "../Models/labs.model.js";

const createCase = async (req, res) => {
  const {
    caseID,
    DentalLab,
    Destination,
    Status,
    DesignApproval,
    fileName,
    fileURL,
    TeethData,
    IsDeleted,
    TAT,
    Model,
    customTray,
    RPDFramework,
    Abutment,
    Message,
    isApproved,
    OrderMessages,
    lab,
  } = req.body;
  
  try {
    // Check if a case with the same caseID already exists
    const existingCase = await caseSchema.findOne({ caseID });
    if (existingCase) {
      return res.status(400).json({ message: "Case ID already exists. Please use a unique Case ID." });
    }

    const newCase = new caseSchema({
      caseID,
      DentalLab: lab?._id,
      Destination,
      Status,
      DesignApproval,
      fileName,
      fileURL,
      TeethData,
      IsDeleted,
      TAT,
      Model,
      customTray,
      RPDFramework,
      Abutment,
      Message,
      isApproved,
      OrderMessages,
      lab: lab?._id,
    });
    await newCase.save();
    res.status(201).json({ message: "Case created successfully" });
  } catch (error) {
    console.log("createCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


/////////////////////////////////////////////////////////////////



export const updateDesignerName = async (req, res) => {
  try {
    const { caseID, designerName } = req.body;
    console.log('Request body:', req.body); // Log request body to ensure it's received properly

    if (!caseID || !designerName) {
      return res.status(400).json({ message: "caseID and designerName are required" });
    }

    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID: caseID }, 
      { DesignerName: designerName }, 
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json({
      message: "Designer name updated successfully",
      updatedCase,
    });
  } catch (error) {
    console.error('Error during designer update:', error); // Log error details
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};






////////////////////////////////////////////////////////////////

const getCases = async (req, res) => {
  try {
    const cases = await caseSchema.find().populate("lab");
    console.log('can we have the cases with lab',cases)
    res.status(200).json(cases);
  } catch (error) {
    console.log("getCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// const getCasesbylab = async (req, res) => {
//   const { labName } = req.params;

//   try {
//     const cases = await caseSchema.aggregate([
//       {
//         $match: {
//           "lab.labName": labName // Match the `labName` directly in the embedded `lab` field
//         }
//       },
//       {
//         $project: {
//           lab: 0 // Exclude `lab` field if it's not needed in the result
//         }
//       }
//     ]);
    
    

//     res.status(200).json(cases);
//     console.log('labdetails from lab route controller',cases)
//   } catch (error) {
//     console.log("getCases controller causing error: ", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


///////////////////////////////////////////////////////////////

const getCase = async (req, res) => {
  const { caseID } = req.params;
  try {
    const Case = await caseSchema.findOne({ caseID }).populate("lab");
    res.status(200).json(Case);
    console.log('if cases are there',Case)
  } catch (error) {
    console.log("getCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/////////////////////////////////////////////////////////////

const updateCase = async (req, res) => {
  const { caseID } = req.params;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


///////////////////////////////////////////////////////////////

const deleteCase = async (req, res) => {
  const { caseID } = req.params;
  try {
    const deletedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { IsDeleted: true },
      { new: true }
    );
    res.status(200).json(deletedCase);
  } catch (error) {
    console.log("deleteCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



/////////////////////////////////////////////////////////////////////



const sendMesage = async (req, res) => {
  const { caseID } = req.params;
  const { message, sender, date } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      {
        $push: {
          OrderMessages: {
            message,
            sender,
            date,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.error("sendMesage controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const approveCase = async (req, res) => {
  const { caseID } = req.params;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { isApproved: true },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("approveCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getApprovedCases = async (req, res) => {
  try {
    const cases = await caseSchema.find({ isApproved: true });
    res.status(200).json(cases);
  } catch (error) {
    console.log("getApprovedCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPendingCases = async (req, res) => {
  try {
    const cases = await caseSchema.find({ Status: "Pending" });
    res.status(200).json(cases);
  } catch (error) {
    console.log("getPendingCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCompletedCases = async (req, res) => {
  try {
    const cases = await caseSchema.find({ Status: "Completed" });
    res.status(200).json(cases);
  } catch (error) {
    console.log("getCompletedCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getShippedCases = async (req, res) => {
  try {
    const cases = await caseSchema.find({ Status: "Shipped" });
    res.status(200).json(cases);
  } catch (error) {
    console.log("getShippedCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTAT = async (req, res) => {
  const { caseID } = req.params;
  const { TAT } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { TAT },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateTAT controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  const { caseID } = req.params;
  const { Status } = req.body;
  try {
    // const updatedCase = await caseSchema.findOneAndUpdate(
    //   { caseID },
    //   { Status },
    //   { new: true }
    // );
    // res.status(200).json(updatedCase);
    const updatedCase = await caseSchema.findById(caseID);
    if (updatedCase) {
      updatedCase.Status = Status;
      await updatedCase.save();
      res.status(200).json(updatedCase);
    }
    else {
      res.status(404).json({ message: "Case not found" });
    }
  } catch (error) {
    console.log("updateStatus controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateRPDFramework = async (req, res) => {
  const { caseID } = req.params;
  const { RPDFramework } = req.body;
  try {
    const updatedCase = await caseSchema.findById(caseID);
    if (updatedCase) {
      updatedCase.RPDFramework = RPDFramework;
      await updatedCase.save();
      res.status(200).json(updatedCase);
    }
    else {
      res.status(404).json({ message: "Case not found" });
    }
  } catch (error) {
    console.log("updateRPDFramework controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const updateCustomTray = async (req, res) => {
  const { caseID } = req.params;
  const { customTray } = req.body;
  try {
    const updatedCase = await caseSchema.findById(caseID);
    if (updatedCase) {
      updatedCase.customTray = customTray;
      await updatedCase.save();
      res.status(200).json(updatedCase);
    }
    else {
      res.status(404).json({ message: "Case not found" });
    }
  } catch (error) {
    console.log("updateCustomTray controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const updateDesignApproval = async (req, res) => {
  const { caseID } = req.params;
  const { DesignApproval } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { DesignApproval },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateDesignApproval controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const updateDestination = async (req, res) => {
  const { caseID } = req.params;
  const { Destination } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { Destination },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateDestination controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


///////////////////////////////////////////////////////


const updateMessage = async (req, res) => {
  const { caseID } = req.params;
  const { Message } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { Message },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateMessage controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


////////////////////////////////////////

const AddTeethData = async (req, res) => {
  const { caseID } = req.params;
  const { ToothNumber, DesignType, ToothMaterial } = req.body;
  try {
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      {
        $push: {
          TeethData: {
            ToothNumber,
            DesignType,
            ToothMaterial,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("AddTeethData controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQC = async (req, res) => {
  const { caseID } = req.params;
  const { QCName } = req.body;
  try {
      const updatedCase = await caseSchema.findOneAndUpdate(
          { caseID: caseID },
          { QCName: QCName },
          { new: true }
      );
      if (!updatedCase) {
          return res.status(404).json({ message: "Case not found" });
      }
      res.status(200).json({ message: "QCName updated successfully", updatedCase });
  } catch (error) {
      res.status(500).json({ message: "Error updating QCName", error: error.message });
  }
};





export const getCasesByLabName = async (req, res) => {
  try {
    const { labName } = req.query; // Retrieve labName from query parameters
    const normalizedLabName = labName.trim(); // Normalize the labName input

    // Find the Lab document by its labName
    const lab = await labSchema.findOne({ labName: normalizedLabName });
    console.log('Lab found:', lab);

    if (!lab) {
      return res.status(404).json({ message: "Lab not found." });
    }

    // Log the lab ID without the 'new ObjectId()' wrapper
    console.log('Lab ID:', lab._id.toString()); // Convert to string for clearer logging

    // Find cases where the DentalLab field matches the lab's _id 66fcf42b21ba95ae44943f01
    const cases = await caseSchema.find({ DentalLab: lab._id })
      .populate({
        path: 'DentalLab',
        select: 'labName', // Only select the labName field from the Lab schema
      });

    console.log('Cases found:', cases);

    if (!cases.length) {
      return res.status(404).json({ message: "No cases found for the specified lab." });
    }

    return res.status(200).json(cases);
  } catch (error) {
    console.error("Error retrieving cases:", error);
    return res.status(500).json({ message: "Server error. Unable to retrieve cases." });
  }
};




export {
  createCase,
  getCases,
  getCase,
  updateCase,
  deleteCase,
  sendMesage,
  approveCase,
  getApprovedCases,
  getPendingCases,
  getCompletedCases,
  getShippedCases,
  updateTAT,
  updateStatus,
  updateDesignApproval,
  updateDestination,
  updateMessage,
  AddTeethData,
  updateRPDFramework,
  updateCustomTray,
};

