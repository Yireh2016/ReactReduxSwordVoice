import mongoose, {Schema} from 'mongoose'

const visitorSchema = new Schema({
  visitorName: {type: String, required: true},
  visitorEmail: {type: String, unique: true, required: true},
  visitorIsSubscriber: {type: Boolean, required: true},
  visitorIsConfirm: {type: Boolean, required: true, dafault: false},
  visitorDate: {type: Date, required: true, default: Date.now()} //
})

mongoose.model('Visitor', visitorSchema)
