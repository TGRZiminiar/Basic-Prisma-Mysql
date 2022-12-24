import { db } from "../utils/dbConnect";

type Author = {
    firstName : string;
    lastName : string;
};

type Book = {
    title : string;
    isFiction : boolean;
    datePublished : Date;
};


const seed = async() => {
    await Promise.all(
        getAuthors().map((author:Author) => {
            return db.author.create({
                data:{
                    firstName : author.firstName,
                    lastName  : author.lastName
                }
            })
        })
    )
    const author = await db.author.findFirst({
        where:{
            firstName:"Yuil",
        }
    })

    await Promise.all(
        getBooks().map((book) => {
            const {title, isFiction, datePublished} = book;
            return db.book.create({
                //@ts-ignore
                data:{
                    title           :   title,
                    isFiction       :   isFiction,
                    datePublished   :   datePublished,
                    authorId        :   author?.id,
                }
            })
        })
    )

}

seed();

function getAuthors():Array<Author> {
    return [
        {
            firstName:"Jonh",
            lastName:"Doe"
        },
        {
            firstName:"William",
            lastName:"ShakeSpear"
        },
        {
            firstName:"Yuil",
            lastName:"Hatari"
        },
    ];
}

function getBooks():Array<Book> {
    return [
        {
            title:"Sapien",
            isFiction:false,
            datePublished: new Date(),
        },
        {
            title:"Calculus II",
            isFiction:false,
            datePublished: new Date(),
        },
        {
            title:"Homie",
            isFiction:true,
            datePublished: new Date(),
        },
       
    ];
}

