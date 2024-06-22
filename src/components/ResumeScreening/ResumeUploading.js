import { useState } from "react"
export const ResumeUploading=()=>{
    const [isUploadOptionActivate,setIsUploadOptionActivate]=useState(true);
    return(
        <div className='h-[40%] flex shadow-md flex-col items-center justify-center'>
            <h1>This is resume uploading section</h1>
            <div className="h-[60%] w-[40%] border border-black border-dotted rounded-md flex flex-col justify-center items-center relative">
                {!isUploadOptionActivate&&<>
                    <textarea className="h-[90%] w-[90%] rounded-md focus:outline-none bg-gray-100" placeholder="Type or Copy Paste Resume here"></textarea>
                    <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(true)}}>upload resume</div>
                </>}
                {isUploadOptionActivate&&<> 
                <label for='resume-input' className=" h-[40%] border border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"><p>Upload or Drop Resume</p><p>as .pdf or .docx file</p> </label>
                <input id='resume-input' type='file' className="hidden"></input>
                <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(false)}}>copy past resume</div>
                </>}
            </div>
        </div>
    )
}