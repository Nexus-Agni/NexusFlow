import mongoose,{Schema, Document, Mongoose, ObjectId} from "mongoose";

export enum ResearchJobStatus {
    PENDING = 'PENDING',
    PLANNING = 'PLANNING', 
    SEARCHING = 'SEARCHING',
    ANALYZING = 'ANALYZING',
    WRITING = 'WRITING',
    CRITIQUING = 'CRITIQUING',
    REVISING = 'REVISING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface ResearchJobs extends Document {
    userId : string,
    initialQuery : string,
    status : ResearchJobStatus,
    researchPlan : string,
    finalContentId : ObjectId,
}

const ResearchJobsSchema : Schema<ResearchJobs> = new mongoose.Schema<ResearchJobs>({
    userId : {
        type : String,
        required : true
    },
    initialQuery : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : Object.values(ResearchJobStatus),
        default : ResearchJobStatus.PENDING
    },
    researchPlan : {
        type : String,
        required : false
    },
    finalContentId : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : "GeneratedContent"
    }
},
{
    timestamps : true
})

const ResearchJobs = mongoose.models.ResearchJobs || mongoose.model<ResearchJobs>("ResearchJobs", ResearchJobsSchema)

export default ResearchJobs