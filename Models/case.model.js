import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  caseID: {
    type: String,
    required: true,
    // unique: true,
  },
  DentalLab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab", // Referencing the 'Lab' model
  },
  Destination: {
    type: String,

    default: "In House",
  },
  Status: {
    type: String,
    default: "Case Initiated",
    Enum: [
      "Pending",
      "Completed",
      "Shipped",
      "Hold",
      "Rush",
      "Design Approval",
      "Design Rejected",
    ],
  },

  DesignApproval: {
    type: Boolean,
    default: false,
  },
  fileName: {
    type: String,
  },

  fileURL: {
    type: String,
  },
  DesignerName: {
    default: "not assigned",
    type: String,
  },
  QCName: {
    default: "not assigned",
    type: String,
  },

  TeethData: [
    {
      ToothNumber: {
        type: String,
      },
      DesignType: {
        type: String,
      },
      ToothMaterial: {
        type: String,

        Enum: [
          "Zirconia",
          "e.MAX CAD",
          "ArgenZ Esthetic Crown",
          "Wax",
          "Bruxzir",
          "Lava Zirconia",
        ],
      },
    },
  ],
  IsDeleted: {
    type: Boolean,
    default: false,
  },
  TAT: {
    type: String,

    Enum: ["Next day at 7 am", "2 Hrs", "6 Hrs"],
  },
  Model: {
    type: Boolean,
  },
  customTray: {
    type: Boolean,
  },
  RPDFramework: {
    type: Boolean,
  },
  Abutment: {
    type: Number,
  },
  Message: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  OrderMessages: [
    {
      message: {
        type: String,
      },
      sender: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
  },
});

export default mongoose.model("Case", caseSchema);
