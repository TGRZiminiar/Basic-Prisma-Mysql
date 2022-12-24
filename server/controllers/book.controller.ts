import { Request, Response } from "express"
import { db } from "../utils/dbConnect";

export const GetAllBook = async(req:Request, res:Response) => {
    try {
    
        const data = await db.book.findMany({
            select: {
              id: true,
              title: true,
              datePublished: true,
              isFiction: true,
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            authorId: true,
            },
          });

        return res.status(200).json(data)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const GetSingleBook = async(req:Request, res:Response) => {
    try {
        
        const { bookid } = req.headers;

        if(!bookid){
            return res.status(500).json("Book Id Is Require")
        }

        const data = await db.book.findUnique({
            where: {
              id:parseInt(bookid as string),
            },
            select: {
              id: true,
              title: true,
              isFiction: true,
              datePublished: true,
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          });

        
        return res.status(200).json(data)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}


export const CreateBook = async(req:Request, res:Response) => {
    try {
    
        const {title, authorId, datePublished, isFiction}:{title:string, authorId:number, datePublished:Date, isFiction:boolean} = req.body;

        const bookData = await db.book.create({
            data: {
              title,
              authorId,
              isFiction,
              datePublished: datePublished,
            },
            select: {
              id: true,
              title: true,
              isFiction: true,
              datePublished: true,
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
        });
        return res.status(201).json(bookData)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const UpdateBook = async(req:Request, res:Response) => {
    try {
    
        const {title, authorId, datePublished, isFiction}:{title:string, authorId:number, datePublished:Date, isFiction:boolean} = req.body;
        const { bookid } = req.headers;

        if(!bookid){
            return res.status(500).json("Book Id Is Require")
        }

        const bookData = await db.book.update({
            where: {
              id:parseInt(bookid as string),
            },
            data: {
              title,
              isFiction,
              datePublished,
              authorId,
            },
            select: {
              id: true,
              title: true,
              isFiction: true,
              datePublished: true,
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          });
        return res.status(204).json(bookData)

    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}

export const DeleteBook = async(req:Request, res:Response) => {
    try {
        const { bookid } = req.headers;

        if(!bookid){
            return res.status(500).json("Book Id Is Require")
        }

        await db.book.delete({
            where:{
                id:parseInt(bookid as string)
            }
        })

        return res.status(204).json("Remove Book SUccessFully");


    } catch (error:any) {
        return res.status(500).json(error.message);
    }
}