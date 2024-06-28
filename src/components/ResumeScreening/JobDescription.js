import mammoth from "mammoth"
import { useState } from "react"
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { ShowAlert } from "../AlertLoader";

GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;


export const JobDescription=({jobDescriptionDetail,setJobDescriptionDetail})=>{
    const [isUploadOptionActivate,setIsUploadOptionActivate]=useState(false)
    const [file,setFile]=useState([])
    const UploadJobDescription=()=>{
        try{
            if(!isUploadOptionActivate){
                setJobDescriptionDetail(document.getElementById('job-text').value.trim())
            }
            else{
                const file=document.getElementById('job-input').files[0]
                setFile([file])
                const reader=new FileReader();
                reader.onload=async (event)=>{
                    if(file.name.endsWith('.doc')||file.name.endsWith('.docx')){
                        const doc=await mammoth.extractRawText({arrayBuffer:event.target.result})
                        setJobDescriptionDetail(doc.value)
                    }
                    else if(file.name.endsWith('.pdf')){
                        let fullText=''
                        const pdf = await getDocument({ data: event.target.result }).promise;
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const textContent = await page.getTextContent();
                            textContent.items.forEach(item => {
                                fullText += item.str + ' ';
                            });
                        }
                        setJobDescriptionDetail(fullText)
                    }
                }
                reader.readAsArrayBuffer(file)
            }
        }
        catch(error){
            ShowAlert(error,'red')
            console.log(error)
        }
    }
    return(
        <div className='h-full flex flex-col items-center justify-center w-[40%]  '>
            <h1 >Job Description</h1>
            <div className={`${file.length===0?'border-dotted border-black bg-[#adcbe3] shadow-lg':'bg-[#8b9dc3] '} h-[50%] w-[70%]  border  rounded-lg flex flex-col justify-center items-center relative`}>
            {isUploadOptionActivate?<>
                {file.length!==0?<>
                <div onClick={()=>{setJobDescriptionDetail('');setFile([]);}} className="bg-red-400 pt-1 text-[8px] w-[15px] h-[15px] cursor-pointer rounded-full right-1 top-1 absolute flex items-center justify-center pb-1 border border-black border-2 ">x</div>
                {file[0].name}
                </>:<>
                <label htmlFor='job-input' className=" h-[40%] border bg-[#dfe3ee] border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"><span>Upload or Drop Job Description</span><span>as .pdf or .docx file</span> </label>
                <input id='job-input' type='file' accept=".pdf,.docx" className="hidden" onChange={UploadJobDescription}></input>
                <div className="absolute bottom-1 bg-white px-1 rounded-md" onClick={()=>{
                    setIsUploadOptionActivate(false);
                    document.getElementById('job-input').value='';
                    }}>copy past</div>
                </>}
                </>:<>
                    <textarea id='job-text' className="h-[90%] w-[90%] bg-[#adcbe3] rounded-md focus:outline-none " placeholder="Type or Copy Paste Job Description here" onChange={UploadJobDescription}></textarea>
                    <div className="absolute bottom-1 bg-white px-1 rounded-md" onClick={()=>{
                        setIsUploadOptionActivate(true);
                        document.getElementById('job-text').value='';
                        }}>upload</div>
                </>}


            </div>
        </div>
    )
}