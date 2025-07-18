import mongoose,{Schema, Document, Mongoose, ObjectId} from "mongoose";

export interface GeneratedContent extends Document {
    jobId : ObjectId,
    version : number,
    content : string,
    critiqueFeedback : string,
    isFinal : boolean,
}

const GeneratedContentSchema : Schema<GeneratedContent> = new mongoose.Schema<GeneratedContent>({
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "ResearchJobs"
    },
    version : {
        type : Number,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    critiqueFeedback : {
        type : String,
        required : false
    },
    isFinal : {
        type : Boolean,
        required : true
    }
},
{
    timestamps : true
})

const GeneratedContent = mongoose.models.GeneratedContent || mongoose.model<GeneratedContent>("GeneratedContent", GeneratedContentSchema)

export default GeneratedContent