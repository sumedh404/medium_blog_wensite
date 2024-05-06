

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


    const header = c.req.header('Authorization') || "";

    const user = await verify(header, c.env.JWT_SECRET)

    if(user){
       c.set("userId", user.id);
       await next();
    }else{
       c.status(403)
       return c.json({ error : "Unauthorized -- You are not logged in"})
    }
})

blogRouter.post('/', async(c)=>{

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



blogRouter.put('/', async(c)=>{

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


blogRouter.get('/', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    

    try{

        const post = await prisma.post.findMany();

      return c.json({
        post: post
      })
    }catch(err){

        c.status(411)
        return c.json({
            error : "Error while fetching data"
        })
    }
})
