const Trade = require("../Models/Tradecontribution");
const xlsx = require("xlsx");



// Create Trade Manually
exports.createTrade = async (req, res) => {
    try {
      const trade = new Trade({
        memberId: req.user._id,  // Get memberId from authenticated user
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
  
  // Bulk Upload Trades
  exports.bulkUploadTrades = async (req, res) => {
    try {
      const file = req.file;
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const trades = xlsx.utils.sheet_to_json(sheet);
  
      const tradeDocs = trades.map((trade) => ({
        memberId: req.user._id,  // Get memberId from authenticated user
        memberName: trade.memberName,
        date: new Date(trade.date),
        exportAmount: trade.exportAmount,
        description: trade.description,
        invoiceNumber: trade.invoiceNumber,
        approved: trade.approved || "Pending",
      }));
  
      await Trade.insertMany(tradeDocs);
  
      const member = await Member.findById(req.user._id);
      member.files.push({
        fileData: file.buffer,
        fileType: file.mimetype,
        filename: file.originalname
      });
      await member.save();
  
      res.status(201).send({ trades: tradeDocs, files: member.files });
    } catch (error) {
      res.status(400).send(error);
    }
  };