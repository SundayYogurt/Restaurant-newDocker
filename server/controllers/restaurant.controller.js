const Restaurant = require("../models/restaurant.model.js") // import model restaurant
const restaurantController = {}; // สร้าง object สำหรับ controller

// สร้างและบันทึกร้านอาหารใหม่
restaurantController.create = async (req, res) => {
    const { name, type, imageUrl } = req.body; // รับข้อมูลจาก body
    //validate data
    if (!name || !type || !imageUrl) {         // ตรวจสอบข้อมูลครบหรือไม่
        res.status(400).send({ message: "Name, Type or ImageUrl can't be empty!" });
        return;
    }
    await Restaurant.findOne({ where: { name } }).then((restaurant) => { // ตรวจสอบชื่อซ้ำ
        if (restaurant) {
            res.status(400).send({ message: "Restaurant already exists!" });
        }
        const newRestaurant = {
            name,
            type,
            imageUrl
        }

        Restaurant.create(newRestaurant).then((data) => { // สร้างร้านอาหารใหม่
            res.send(data);
        }).catch((error) => {
            res.status(500).send({ message: error.message || "Something error while creating a restaurant" })
        })
    })
};

// ดึงข้อมูลร้านอาหารทั้งหมด
restaurantController.getAll = async (req, res) => {
    await Restaurant.findAll().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while getting all method" })
    })
}

// ดึงข้อมูลร้านอาหารตาม id
restaurantController.getById = async (req, res) => {
    const id = req.params.id;
    await Restaurant.findByPk(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: error.message || "No found Restaurant" + id })
        } else {
            res.send(data)
        }
    }).catch((error) => {
        res.status(500).send({
            message: error.message || "something error while getting restaurant by id" + id
        })
    })
}

// แก้ไขข้อมูลร้านอาหารตาม id
restaurantController.updateById = async (req, res) => {
    try {
        const id = req.params.id;

        //validate data
        const { name, type, imageUrl } = req.body
        if (!name && !type && !imageUrl) {
            res.status(400).send({ message: "Name, Type and ImageUrl can't be empty!" });
            return;
        }
        await Restaurant.update({ name, type, imageUrl }, { where: { id } }).then((num)=>{
            console.log(num)
            if(num[0] === 1){
                res.send({message:"Restaurant update successfully!"})
            }else{
                res.status(404).send({message:"Can't update Restaurant id "+id+" Maybe restaurant not found or request.body is empty"})
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message || "something error while updating restaurant by id" + id
        })
    }
}

// ลบร้านอาหารตาม id
restaurantController.deleteById = async (req,res) => {

    const id = req.params.id
    if(!id){
        res.status(400).send({message:"Id is missing"});
        return;
    }
    await Restaurant.destroy({where:{id}}).then((num)=>{
        if(num === 1){
            res.status(200).send({message:"Restaurant was deleted"})
        }else{
            res.status(404).send({message:"Can't delete restaurant with id"+id+"."})
        }
    }).catch((error)=>{
        res.status(500).send({message:"Server Error"})
    })
}

module.exports = restaurantController; // ส่งออก controller

