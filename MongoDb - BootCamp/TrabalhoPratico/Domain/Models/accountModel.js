import mongoose from 'mongoose';
import { accountSchema } from '../Schemas/accountSchema.js';

const accountModel = mongoose.model('account', accountSchema, 'account');

export { accountModel };