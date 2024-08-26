import caseSchema from "../Models/case.model.js";

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
      lab: lab?._id,
    });
    await newCase.save();
    res.status(201).json({ message: "Case created successfully" });
  } catch (error) {
    console.log("createCase controller causing error: ", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





////////////////////////////////////////////////////////////////

const getCases = async (req, res) => {
  try {
    const cases = await caseSchema.find().populate("lab");
    res.status(200).json(cases);
  } catch (error) {
    console.log("getCases controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////

const getCase = async (req, res) => {
  const { caseID } = req.params;
  try {
    const Case = await caseSchema.findOne({ caseID }).populate("lab");
    res.status(200).json(Case);
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
    console.log("sendMesage controller causing error: ", error);
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
    const updatedCase = await caseSchema.findOneAndUpdate(
      { caseID },
      { Status },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    console.log("updateStatus controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



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
};

//     import mongoose from "mongoose";

// const caseSchema = new mongoose.Schema({
//   caseID: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   DentalLab: {
//     type: String,
//     required: true,
//   },
//   Destination: {
//     type: String,
//     required: true,
//     default: "In House",
//   },
//   Status: {
//     type: String,
//     required: true,
//     Enum: ["Pending", "Completed", "Shipped"],
//   },
//   DesignApproval: {
//     type: Boolean,
//     required: true,
//   },
//   fileName: {
//     type: String,
//     required: true,
//   },
//   fileURL: {
//     type: String,
//     required: true,
//   },
//   TeethData: [
//     {
//       ToothNumber: {
//         type: String,
//         required: true,
//       },
//       DesignType: {
//         type: String,
//         required: true,
//       },
//       ToothMaterial: {
//         type: String,
//         required: true,
//         Enum: ["Zirconia", "e.MAX CAD", "ArgenZ Esthetic Crown", "Wax", "Bruxzir", "Lava Zirconia"]
//       },
//     },
//   ],
//     IsDeleted: {
//         type: Boolean,
//         default: false,
//     },
//     TAT: {
//         type: String,
//         required: true,
//         Enum: ["Next day at 7 am", "2 Hrs", "6 Hrs"]
//     },
//     Model: {
//        type: Boolean,
//          required: true,
//     },
//     customTray: {
//         type: Boolean,
//         required: true,
//     },
//     RPDFramework: {
//         type: Boolean,
//         required: true,
//     },
//     Abutment: {
//         type: Number,
//         required: true,
//     },
//     Message: {
//         type: String,
//     },
//     isApproved: {
//         type: Boolean,
//         default: false,
//     },
//     OrderMessages: [
//         {
//             message: {
//                 type: String,
//                 required: true,
//             },
//             sender: {
//                 type: String,
//                 required: true,
//             },
//             date: {
//                 type: Date,
//                 default: Date.now,
//             },
//         },
//     ],

// });

// export default mongoose.model("Case", caseSchema);
