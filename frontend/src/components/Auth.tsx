

import {Link, useNavigate} from 'react-router-dom'
import { LabelledInput } from './LabelledInput'
import  {SignupType}  from '@sumedh00/medium-commom'
import { useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export const Auth = ({type}: {type: "signup" | "signin"})=>{

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name:"",
        email:"",
        password:"",
    });


    async function sendRequest(){

        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs");
        }catch(e){
                console.error("Error sending request")
        }
    }


    return(
        <div className="h-screen flex justify-center flex-col">

        <div className="flex justify-center">

            <div>
                
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                    {type === "signin" ? "Don't have an account " : "Already have an account?"}
                         <Link className='pl-2 underline' to={type === "signin"? '/signup' : '/signin'}>
                            {type === "signin"? "Sign up" : "Sign in"}
                            </Link>
                    </div>
                </div>
               { type === "signup" ? <LabelledInput label="Name" placeholder="Jhon Doe..." onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name : e.target.value
                    })
                }}/> : null}
                <LabelledInput label="Email"  placeholder="example@gmail.com..." onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email : e.target.value
                    })
                }}/><LabelledInput label="Password" type={"password"} placeholder="1234 or abcd... etc" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password : e.target.value
                    })
                }}/>


                
<button onClick={sendRequest}  type="button"  className=" w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"} </button>
            </div>
        </div>
    </div>)
}