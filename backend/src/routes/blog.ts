

import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput,updatePostInput } from '@sumedh00/medium-commom'

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();



blogRouter.use('/*', async(c, next)=>{


    const authHeader = c.req.header('Authorization') || "";

    try{

    
    const user = await verify(authHeader, c.env.JWT_SECRET)

    if(user){
       c.set("userId", user.id);
       await next();
    }else{
       c.status(403)
       return c.json({ error : "Unauthorized -- You are not logged in"})
    }
   }
   catch(err){
       c.status(403);
       return c.json({
        message : "you are not logged in"
       })
   }

})

blogRouter.post('/create', async(c)=>{

    const body = await c.req.json();

    const {success} = createPostInput.safeParse(body)

    
    if(!success) {
        c.status(411)
        c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());


      const authorId = c.get("userId")

      try{

      

      const post = await prisma.post.create({
        data:{
          title : body.title,
          content: body.content,
          authorId: authorId
        },
      })

     return c.json({
        id : post.id
    })
    }catch(err){
        c.json({ error:"Error while creating blog"})
    }
})



blogRouter.put('/update', async(c)=>{

    const body = await c.req.json();

    const {success} = updatePostInput.safeParse(body)

    
    if(!success) {
        c.status(411)
        c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content
        }
    })

    c.status(200)
    return c.json({
        post,
        message : "updated sussfully"
    })
})

blogRouter.get('/:id', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");

    try{

        const post = await prisma.post.findFirst({
        where :{
            id: id,
        },
      })

      return c.json({
        post
      })
    }catch(err){

        c.status(411)
        return c.json({
            error : "Error while fetching data"
        })
    }
})



// bug ::  Not able to get all blogs in bulk
blogRouter.get('/', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    

    try{

        const posts = await prisma.post.findMany( {
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        }
    );

        if (!posts) {
            c.status(404)
            c.json({ error: "No posts found" });
            return;
        }
        c.status(200)
         
        return c.json({
           post : posts
      })
      
    }catch(err){

        c.status(411)
        return c.json({
            error : "Error while fetching data"
        })
    }
})
