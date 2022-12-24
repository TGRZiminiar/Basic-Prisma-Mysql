import { Request, Response } from "express"
import { db } from "../utils/dbConnect";


export const GetAllAuthor = async(req:Request, res:Response) => {
    try {
    
        const data = await db.author.findMany({
            select:{
                id:true,
                firstName:true,
                lastName:true,
            }
        })

        return res.status(200).json(data)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const GetSingleAuthor = async(req:Request, res:Response) => {
    try {
        
        const { authorid } = req.headers;

        if(!authorid){
            return res.status(500).json("Author Id Is Require")
        }

        const data = await db.author.findUnique({
            where:{
                id:parseInt(authorid as string)
            }
        })

        
        return res.status(200).json(data)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const CreateAuthor = async(req:Request, res:Response) => {
    try {
    
        const {firstName, lastName}:{firstName:string, lastName:string} = req.body;

        const authorData = await db.author.create({
            data:{
                firstName,
                lastName,
            },
            select:{
                id:true,
                firstName:true,
                lastName:true
            }
        })

        return res.status(201).json(authorData)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}


export const UpdateAuthor = async(req:Request, res:Response) => {
    try {
    
        const {firstName, lastName}:{firstName:string, lastName:string} = req.body;
        const { authorid } = req.headers;

        const updateAuthor = await db.author.update({
            where:{
                id:parseInt(authorid as string)
            },
            data:{
                firstName:firstName,
                lastName:lastName
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
            }
        })

        return res.status(201).json(updateAuthor)


    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const DeleteAuthor = async(req:Request, res:Response) => {
    try {
        const { authorid } = req.headers;

        await db.author.delete({
            where:{
                id:parseInt(authorid as string)
            }
        })

        return res.status(204).json("Remove Author SUccessFully");


    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}