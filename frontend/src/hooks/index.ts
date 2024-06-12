
import { useState, useEffect } from "react";
import axios from "axios";
import  {BACKEND_URL}  from "../config";



export interface Blog{
   content: string;
    title: string;
    id : string;
    author:{
        name: string;
    }
}



export const useBlog=({id}:{id:string})=>{

        const[loading, setLoading] = useState(true);
        const[blog, setBlog] = useState<Blog[]>([]);
        const[error , setError] = useState<Error | null>(null);


        useEffect(()=>{

            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("token")
                }
            })

            .then(response =>{
                setBlog(response.data.blogs)
                setLoading(false);
            })
            
          .catch(err=>{
            console.error("Error fetching Blogs", err);
            setError(err)
            setLoading(false)
          })

        },[id])

        return {
            loading,
            blog,
            error   
        }

}


export const useBlogs=()=>{

    const[loading, setLoading] = useState(true);
    const[blogs, setBlogs] = useState<Blog[]>([]);
    const[error , setError] = useState<Error | null>(null);


    useEffect(()=>{
        
          axios.get(`${BACKEND_URL}/api/v1/blog`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
          })

          .then(response => {
            setBlogs(response.data.blogs);
            console.log(response.data)
            setLoading(false)
          })
          .catch(err=>{
            console.error("Error fetching Blogs", err);
            setError(err)
            setLoading(false)
          })
    },[]);
    return{
        loading,
        blogs,
        error
    }
}