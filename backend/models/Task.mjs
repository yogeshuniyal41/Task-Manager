import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    name: {type :String , required:true},
    description: {type :String , required:true},
    createdAt:{type:Date , required:true},
    deadline: {type: Date , required:true},
    user : {type : String, required:true, ref: 'User' },
    status:{type :String , required:true}
});

export default mongoose.model('Task', taskSchema,'tasks');
