const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

export const MongoDB = async () => {
    let db = null;

    // we will use this example to understand the difference between env variable and backup connection string
    let url = process.env.DBURL || 'mongodb://localhost:27017/booking_app_db'
    try {
       db  = await mongoose.connect(url, {})
    } catch (error) {
        throw error
    }
     console.log("Database connected successfully 📂")
}