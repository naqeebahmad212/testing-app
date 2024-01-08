import {connectToDB} from '@/lib/database/dbConfig'
import User from '@/lib/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

connectToDB()


export async function POST(request : NextRequest){
    try {
        const reqBody= await request.json()
        const {username, email, password}=reqBody
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({error:'user already exists'})
        }
        const salt= await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt)

        const newUser= new User({
            username,
            password:hashPassword,
            email
        })
       const savedUser = await newUser.save()
      

       return NextResponse.json({ message:'user Created', success:true, savedUser  })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}