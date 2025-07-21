import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import ResearchJobs from "@/models/researchJobs.model";

export async function GET(request:Request, 
    {params} : {params : {jobId : string}}
) {
    try {
        await dbConnect();
    
        const session = await auth()
        if (!session || !session.user) {
            return Response.json({
                success : false,
                message : "User is not logged in"
            }, {
                status : 401
            })
        }
    
        const userId = session.user.id;
        const {jobId} = await params;
        const job = await ResearchJobs.findOne({userId, _id : jobId});
        if (!job) {
            return Response.json({
                success : false,
                message : "Job not found with given id"
            }, {
                status : 404
            })
        }
    
        const jobStatus = job.status;
        return Response.json({
            success : true,
            message : "Job status fetched successfully",
            jobStatus
        }, {
            status : 200
        })
    } catch (error) {
        console.log("Error is : ", error);
        return Response.json({
            success : false,
            message : "Something went wrong",
            error
        })
    }
}