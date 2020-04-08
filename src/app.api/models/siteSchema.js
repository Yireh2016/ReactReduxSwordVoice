import mongoose, {Schema} from 'mongoose'
// import { siteUrlSchema } from "./siteUrlSchema";

export const siteSchema = new Schema({
  sitemap: {
    hostname: {type: String, default: `${process.env.WEB_URL}`},
    level: {type: String, default: 'warn'},
    urls: [{}]
  }
})

mongoose.model('Site', siteSchema)
