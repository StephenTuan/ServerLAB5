var express = require('express');
var router = express.Router();

const modelDistributor = require('../models/distributor')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/list', async(req, res)=> {
  try {
    const data = await modelDistributor.find({});
    res.status(200).json({ status: 200, message: "Lấy danh sách nhà phân phối thành công", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Lỗi lấy danh sách nhà phân phối", error: error.message });
  }
});

router.post('/add', async(req, res)=>{
  try {
    const model = new modelDistributor(req.body);
    const data = await model.save();
    res.status(201).json({ status: 201, message: "Thêm nhà phân phối thành công", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Lỗi thêm nhà phân phối", error: error.message });
  }
})

router.put('/updat/:id', async (req, res) => {
  try {
    const data = await modelDistributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) {
      return res.status(404).json({ status: 404, message: "Không tìm thấy nhà phân phối" });
    }
    res.status(200).json({ status: 200, message: "Cập nhật nhà phân phối thành công", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Lỗi cập nhật nhà phân phối", error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  console.log("Attempting to delete ID:", req.params.id);
  try {
    const data = await modelDistributor.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ status: 404, message: "Không tìm thấy nhà phân phối" });
    }
    res.status(200).json({ status: 200, message: "Xóa nhà phân phối thành công", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Lỗi xóa nhà phân phối", error: error.message });
  }
});

module.exports = router;