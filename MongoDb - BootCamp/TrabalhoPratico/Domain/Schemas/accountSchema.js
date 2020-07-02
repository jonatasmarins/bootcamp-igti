import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    agencia: {
        type: Number,
        required: true
    },
    conta: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        // validate: validateBalance(value),
    }
});

// const validateBalance = (value) => {
//     if (value < 0) {
//         throw new Error("O Saldo da conta não pode ser menor que Zero");
//     }

//     return value;
// }

export { accountSchema };