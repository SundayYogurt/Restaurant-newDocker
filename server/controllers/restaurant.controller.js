const Restaurant = require("../models/restaurant.model.js")
const restaurantController = {};
//Create and save a new restaurant
restaurantController.create = async (req, res) => {
    const { name, type, imageUrl } = req.body;
    //validate data
    if (!name || !type || !imageUrl) {
        res.status(400).send({ message: "Name, Type or ImageUrl can't be empty!" });
        return;
    }
    await Restaurant.findOne({ where: { name } }).then((restaurant) => {
        if (restaurant) {
            res.status(400).send({ message: "Restaurant already exists!" });
        }
        const newRestaurant = {
            name,
            type,
            imageUrl
        }

        Restaurant.create(newRestaurant).then((data) => {
            res.send(data);
        }).catch((error) => {
            res.status(500).send({ message: error.message || "Something error while creating a restaurant" })
        })
    })
};

//getAll Restaurant
restaurantController.getAll = async (req, res) => {
    await Restaurant.findAll().then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while getting all method" })
    })
}

//get Restaurant by id
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


module.exports = restaurantController;

