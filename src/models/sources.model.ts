import mongoose,{Schema, Document, Mongoose, ObjectId} from "mongoose";

export interface Sources extends Document {
    jobId : ObjectId,
    url : string,
    title : string,
    retrivedAt : Date
}

const SourcesSchema : Schema<Sources> = new mongoose.Schema<Sources>({
    jobId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "ResearchJobs"
    },
    url : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : false
    },
    retrivedAt : {
        type : Date,
        required : true
    }
},
{
    timestamps : true
})

const Sources = mongoose.models.Sources || mongoose.model<Sources>("Sources", SourcesSchema)

export default Sources