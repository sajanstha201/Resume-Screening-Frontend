import { useState } from "react"
import mammoth from "mammoth"
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;


export const ResumeUploading=({resumeDetail,setResumeDetail})=>{
    const [isUploadOptionActivate,setIsUploadOptionActivate]=useState(true);
    const UploadResumeDetail=()=>{
        try{
            if(!isUploadOptionActivate){
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0'); 
                const day = String(now.getDate()).padStart(2, '0');
                const hour = String(now.getHours()).padStart(2, '0');
                const minute = String(now.getMinutes()).padStart(2, '0');
                const second = String(now.getSeconds()).padStart(2, '0');
                const formattedDateTime = `${year}-${month}-${day}_${hour}-${minute}-${second}`;
                const resumeText=document.getElementById('resume-text').value.trim()
                if(resumeText){
                    setResumeDetail(prevData=>({...prevData,['Resume No'+formattedDateTime]:resumeText}))
                }
                else{
                    console.log('no text')
                }
      
            }
            else{
                const file=document.getElementById('job-input').files[0]
                const reader=new FileReader();
                let fullText=''
                reader.onload=async (event)=>{
                    if(file.name.endsWith('.doc')||file.name.endsWith('.docx')){
                        const doc=await mammoth.extractRawText({arrayBuffer:event.target.result})
                        fullText=doc.value
                    }
                    else if(file.name.endsWith('.pdf')){
                        const pdf = await getDocument({ data: event.target.result }).promise;
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const textContent = await page.getTextContent();
                            textContent.items.forEach(item => {
                                fullText += item.str + ' ';
                            });
                        }
                    }
                }
                reader.readAsArrayBuffer(file)
            }
        }
        catch(error){
            console.log(error)
        }
        finally{
            console.log('reseume detail from state',resumeDetail)
        }
    }
    return(
        <div className='h-[40%] flex shadow-md flex-col items-center justify-center'>
            <h1>This is resume uploading section</h1>
            <div className="h-[60%] w-[40%] border border-black border-dotted rounded-md flex flex-col justify-center items-center relative">
                {!isUploadOptionActivate&&<>
                    <textarea id='resume-text' className="h-[90%] w-[90%] rounded-md focus:outline-none bg-gray-100" placeholder="Type or Copy Paste Resume here" ></textarea>
                    <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(true)}}>upload resume</div>
                </>}
                {isUploadOptionActivate&&<> 
                <label htmlFor='resume-input' className=" h-[40%] border border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"><span>Upload or Drop Resume</span><span>as .pdf or .docx file</span> </label>
                <input id='resume-input' type='file' accept='.pdf,.doc,.docx' className="hidden" onChange={UploadResumeDetail} multiple></input>
                <div className="absolute bottom-1" onClick={()=>{setIsUploadOptionActivate(false)}}>copy past resume</div>
                </>}
            </div>
            <button  className={`${isUploadOptionActivate?'hidden':''} w-28 h-10 mt-2 bg-green-500 rounded-md border-2 border border-black shadow-sm`} onClick={UploadResumeDetail}>Add</button>
        </div>
    )
}