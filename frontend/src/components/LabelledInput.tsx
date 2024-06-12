import { ChangeEvent } from "react";


interface labelledInputType{
    label: string;
    placeholder: string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}
export function LabelledInput ({label, placeholder, onChange, type}:labelledInputType){

    return(
    <div>
       <label className="block mb-2 text-sm font-bold text-black pt-2">{label}</label>
       <input onChange={onChange} type={type || "text"} id={placeholder} className="bg-gray-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />

    </div>
    )
}