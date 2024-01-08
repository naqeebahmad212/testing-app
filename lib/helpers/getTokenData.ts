import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'


export const getTokenData=(request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || "";
       const decodeInfo:any= jwt.verify(token,process.env.TOKEN_SECRET!)
       return decodeInfo.id
    } catch (error:any) {
        throw new Error (error.message)
    }
}