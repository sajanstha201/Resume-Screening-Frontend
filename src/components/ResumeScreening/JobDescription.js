import { useState } from "react"

export const JobDescription=()=>{
    const [isUploadOptionActivate,setIsUploadOptionActivate]=useState(true)
    return(
        <div className='h-full flex flex-col items-center justify-center w-[40%] shadow-md '>
            <h1>Job Description</h1>
            <div className="h-[60%] w-[80%] border border-black border-dotted rounded-md flex flex-col justify-center items-center relative">
                {!isUploadOptionActivate&&<>
                    <textarea className="h-[90%] w-[90%] rounded-md focus:outline-none bg-gray-100" placeholder="Type or Copy Paste Job Description here"></textarea>
                    <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(true)}}>upload job description</div>
                </>}
                {isUploadOptionActivate&&<> 
                <label for='job-description-input' className=" h-[40%] border border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"><p>Upload or Drop Job Description</p><p>as .pdf or .docx file</p> </label>
                <input id='job-description-input' type='file' className="hidden"></input>
                <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(false)}}>copy past job description</div>
                </>}

            </div>
        </div>
    )
}