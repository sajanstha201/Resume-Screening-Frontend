import mammoth from "mammoth"
import { useState } from "react"
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ShowAlert } from "../AlertLoader";

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;


export const JobDescription=({jobDescriptionDetail,setJobDescriptionDetail})=>{
    const [isUploadOptionActivate,setIsUploadOptionActivate]=useState(false)
    const UploadJobDescription=()=>{
        try{
            let fullText=''
            if(!isUploadOptionActivate){
                fullText=document.getElementById('job-text').value.trim()
            }
            else{
                const file=document.getElementById('job-input').files[0]
                const reader=new FileReader();
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
            setJobDescriptionDetail(fullText)
        }
        catch(error){
            ShowAlert(error,'red')
            console.log(error)
        }
        finally{
            console.log(jobDescriptionDetail)
        }
    }
    return(
        <div className='h-full flex flex-col items-center justify-center w-[40%]  '>
            <h1 >Job Description</h1>
            <div className="h-[60%] w-[80%] bg-[#adcbe3] border border-black border-dotted rounded-md flex flex-col justify-center items-center relative">
                {!isUploadOptionActivate&&<>
                    <textarea id='job-text' className="h-[90%] w-[90%] bg-[#adcbe3] rounded-md focus:outline-none " placeholder="Type or Copy Paste Job Description here" onChange={UploadJobDescription}></textarea>
                    <div className="absolute bottom-1 bg-white px-1 rounded-md" onClick={()=>{
                        setIsUploadOptionActivate(true);
                        document.getElementById('job-text').value='';
                        }}>upload</div>
                </>}
                {isUploadOptionActivate&&<> 
                <label htmlFor='job-input' className=" h-[40%] border bg-[#dfe3ee] border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"><span>Upload or Drop Job Description</span><span>as .pdf or .docx file</span> </label>
                <input id='job-input' type='file' accept=".pdf,.docx" className="hidden" onChange={UploadJobDescription}></input>
                <div className="absolute bottom-1 bg-white px-1 rounded-md" onClick={()=>{
                    setIsUploadOptionActivate(false);
                    document.getElementById('job-input').value='';
                    }}>copy past</div>
                </>}

            </div>
        </div>
    )
}