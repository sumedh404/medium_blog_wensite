


import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/index"

export const Blogs = ()=>{

    const{loading, blogs,error } = useBlogs();

    if(loading){
        return <div>
             loading.....
        </div>
    }

    if(error){
        return<div>
            Error whhile fetching blogs , {error.message}
        </div>
    }
    return  <div>
         <Appbar/>
    <div className="flex justify-center">
        <div className=" max-w-xl">
            {
               blogs && blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard 
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd march 2024"}
                />)
                ):<div>No Blogs Available</div>

            }          
        </div>
    </div>
    </div>
}

