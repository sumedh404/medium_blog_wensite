
import { Hono } from "hono";

import { verify } from "hono/jwt";

export const authMiddleware = new Hono<{
    Bindings : {
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
    
}>();

authMiddleware.use('/*', async(c, next)=>{


    const header = c.req.header('autorization') || "";

    const user = await verify(header, c.env.JWT_SECRET)

    if(user){
       c.set("userId", user.id);
       next();
    }else{
       c.status(403)
       return c.json({ error : "Unauthorized -- You are not logged in"})
    }
})