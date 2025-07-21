import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import GeneratedContent from "@/models/generatedContent.model";
import ResearchJobs from "@/models/researchJobs.model";

export async function GET(request : Request,
    {params} : {params : {jobId : string}}
) {
    try {

        await dbConnect()
    
        const session = await auth();
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
        
        const researchJobs = await ResearchJobs.findOne({userId, _id : jobId});
        if (!researchJobs) {
            return Response.json({
                success : false,
                message : "Job not found with given id"
            }, {
                status : 404
            })
        }
    
        const finalContentId = researchJobs.finalContentId;
    
        if (!finalContentId) {
            return Response.json({
                success : false,
                message : "Final content not found"
            }, {
                status : 404
            })
        }
    
        const finalContent = await GeneratedContent.findById(finalContentId);
        if (!finalContent) {
            return Response.json({
                success : false,
                message : "Final content not found"
            }, {
                status : 404
            })
        }
    
        return Response.json({
            success : true,
            data : finalContent
        }, {
            status : 200
        })
    } catch (error) {
        console.log("Error : ", error)
        return Response.json({
            success : false,
            message : "Internal server error"
        }, {
            status : 500
        })
        
    }
}