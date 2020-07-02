import mongoose from 'mongoose';

const DbName = "accountbank";
const connectionString = `mongodb+srv://bootcamp:bootcamp@cluster0.klwk1.mongodb.net/${DbName}?retryWrites=true&w=majority`;

const OpenConnection = async () => {
    try {
        await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Connected in ${DbName}`);
    } catch (error) {
        console.log(error);
    }
}

export {OpenConnection};