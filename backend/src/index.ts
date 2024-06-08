import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors';
const app = new Hono<{
   Bindings:{
    DATABASE_URL:String,
    JWT_SECRET:String,
   }
}>();


app.use('/*', cors());
app.route('/api/v1/user', userRouter)

app.route('/api/v1/blog', blogRouter)




export default app



















// use if u need 
// "prisma:generate": "prisma generate --no-engine",
//     "build": "prisma generate --no-engine && next build"