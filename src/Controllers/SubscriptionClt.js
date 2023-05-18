const Subscription = require('../Models/Subscription/Subscription');
const { sendResponse } = require('../services/helperServices')
const User = require('../Models/Auth/UserModel');

class SubscriptionClt {
    constructor() {

    }
    async createSubscription(req, res) {
        try {
            const { name, price,duration,description,isActive } = req.body;
            const subscription = await Subscription.create({
                name, price,duration,description,isActive
            })
                res.status(200).json(subscription)

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
const Sub = new SubscriptionClt();
module.exports = Sub