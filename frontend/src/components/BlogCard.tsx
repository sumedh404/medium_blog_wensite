import { Link } from "react-router-dom";




interface blogCardPorps{

    id: string;
    authorName: string;
    title : string;
    content : string;
    publishedDate: string;
}


export const BlogCard =({
    id,
    authorName,
    title,
    content,
    publishedDate
}:blogCardPorps)=>{

    return <div className=" p-4 border-b border-slate-200 pb-4">

       
           <div className="flex">
        <Link to={`/blog/${id}`}></Link>
                <Avataar size="small" name={authorName}/>
                 <div className="font-extralight pl-2 text-sm flex justify-center flex-cols">
                        {authorName}
                 </div>
                 <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
                        <Circle/>
                 </div>
                 <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-cols">
                    {publishedDate}
                 </div>
           </div>

           <div className="text-xl font-bold pt-2">
               {title}
           </div>

           <div className="text-md font-thin">
                {content.slice(0,100) + '....'}
           </div>
           <div className="text-slate-500 text-sm font-thin pt-4">

            {`${Math.ceil(content.length/100)} minute(s)`}
           </div>

    </div>
}


export function Avataar({ name, size }: {name : string , size :"small" | "big"}){

    return <div className={`relative inline-flex item-center justify-center  overflow-hidden bg-gray-600 rounded-full ${size === "small"?"w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small"?"text-xs" :"text-md"} font-extralight  text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
    </div>
}

function Circle(){

    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}