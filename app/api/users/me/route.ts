import { connectToDB } from "@/lib/database/dbConfig";
import { getTokenData } from "@/lib/helpers/getTokenData";
import User from "@/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectToDB()

export async function GET(request:NextRequest){
    try {
       const userId= await getTokenData(request)
       const user= await User.findById(userId).select('-password')
       return NextResponse.json({message:'user Found', data:user})
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:400})
    }
    
}