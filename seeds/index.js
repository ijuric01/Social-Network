const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/my-database', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '610696ec2f8abd56a01b4995',
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptas atque repellendus explicabo harum earum consectetur dolor inventore pariatur quidem odit, omnis modi quas! Ad commodi quaerat fuga laborum omnis?',

            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/ijuric01/image/upload/v1627982476/STORAGE/cnhmbrhickoqyanxjjo1.jpg',
                    filename: 'STORAGE/cnhmbrhickoqyanx'
                },
                {
                    url: 'https://res.cloudinary.com/ijuric01/image/upload/v1627982475/STORAGE/skdf2blzhdksozuumx1b.jpg',
                    filename: 'STORAGE/skdf2blzhdksozuumx1b'
                }
            ],
            geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			}

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});