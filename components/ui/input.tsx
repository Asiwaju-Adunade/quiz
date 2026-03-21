
export default function Input  ({ label, value, placeholder, type, onChange }:
       {  label: string,
          value: string, 
          placeholder: string,
          type: string 
          onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
       }
){
    return (
        <div className="group flex flex-col pl-5 border border-quiz-light-gray py-2 relative ">
             <div className="h-full w-1 group-hover:bg-quiz-yellow absolute top-0 left-0 transition duration-300" />
             <label className="text-quiz-dark-gray"> {label}</label>
             <input placeholder={placeholder} className=" focus:ring-0 focus:outline-none focus:ring-transparent text-quiz-yellow" defaultValue={value} type={type} onChange={onChange} />
        </div>
    );
}

