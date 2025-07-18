import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import ResearchJobs, { ResearchJobStatus } from "@/models/researchJobs.model";
import { log } from "console";

export async function POST(request:Request) {
    try {
        await dbConnect();
    
        //check if user is logged in
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
        const {initialQuery} = await request.json();

        if (!initialQuery) {
            return Response.json({
                success : false,
                message : "Initial query is required"
            }, {
                status : 400
            })
        }

        // create research job
        const newResearchJob = await ResearchJobs.create({
            userId,
            initialQuery,
            status : ResearchJobStatus.PENDING,
        })

        //TODO : Call the Agent API to start the research job

        return Response.json({
            success : true,
            researchJobId : newResearchJob.id,
            message : "Research job created successfully",
        }, {
            status : 201
        })

    } catch (error) {
        log("Error creating research job : ",  error)
        return Response.json({
            sucess : false,
            message : `Something went wrong ${error}`
        }, {
            status : 500
        })
    }
    
}