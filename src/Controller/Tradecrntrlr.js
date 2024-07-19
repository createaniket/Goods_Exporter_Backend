const Trade = require("../Models/Tradecontribution");
const xlsx = require("xlsx");
const Member = require("../Models/Users");

// Create Trade Manually
exports.createTrade = async (req, res) => {
  try {
    const trade = new Trade({
      memberId: req.user._id, // Get memberId from authenticated user
      memberName: req.body.memberName,
      date: req.body.date,
      exportAmount: req.body.exportAmount,
      description: req.body.description,
      invoiceNumber: req.body.invoiceNumber,
      approved: req.body.approved || "Pending",
    });
    await trade.save();
    res.status(201).send(trade);
  } catch (error) {
    res.status(400).send(error);
  }
};




function excelDateToJSDate(excelDate) {
  const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const epochStart = Date.UTC(1899, 11, 30); // December 30, 1899
  const utcDays = excelDate - 1; // Adjust for Excel's epoch start
  const date = new Date(epochStart + utcDays * msPerDay);
  return date.toISOString().split("T")[0]; // Return as YYYY-MM-DD format
}

// Bulk Upload Trades
exports.bulkUploadTrades = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File not provided" });
    }

    const filePath = req.file.path;
    let workbook;

    try {
      workbook = xlsx.readFile(filePath);
    } catch (err) {
      return res.status(400).json({ error: "Invalid file format" });
    }

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return res.status(400).json({ error: "No sheets found in the file" });
    }

    const sheet = workbook.Sheets[sheetName];
    const trades = xlsx.utils.sheet_to_json(sheet);

    const tradeDocs = trades.map((trade) => {
      return {
        member: req.user._id, // Get memberId from authenticated user
        company: trade.Company,
        exportAmount: trade.ExportAmount || null,
        description: trade.Description || "",
        invoiceNumber: trade.InvoiceNumber || "",
        approved: trade.approved || "Pending",
        consignee: trade.Consignee || "",
        methodOfDispatch: trade.MethodOfDispatch || "",
        typeOfShipment: trade.TypeOfShipment || "",
        vesselAircraft: trade.VesselAircraft || "",
        portOfLoading: trade.PortOfLoading || "",
        reference: trade.Reference || "",
        billOfLadingNumber: trade.BillOfLadingNumber || "",
        invoiceDate: trade.InvoiceDate
          ? excelDateToJSDate(trade.InvoiceDate)
          : null,
        buyerReference: trade.BuyerReference || "",
        countryOfOrigin: trade.CountryOfOrigin || "",
        countryOfFinalDestination: trade.CountryOfFinalDestination || "",
        terms: trade.Terms || "",
        methodOfPayment: trade.MethodOfPayment || "",
      };
    });

    tradeDocs.map( (trade) => {
      console.log("tyhentrade by one",trade)
    })

    // Validate required fields
    const missingFields = tradeDocs.some(
      (doc) => !doc.company || !doc.invoiceDate || !doc.exportAmount
    );
    if (missingFields) {
      return res.status(400).json({
        error: "Required fields are missing or invalid",
        message: tradeDocs,
      });
    }

    await Trade.insertMany(tradeDocs);

    const member = await Member.findById(req.user._id);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    member.files.push({
      filePath: filePath, // Store the file path instead of the file buffer
      fileType: req.file.mimetype,
      filename: req.file.originalname,
    });
    await member.save();

    res.status(201).json({ trades: tradeDocs, files: member.files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};