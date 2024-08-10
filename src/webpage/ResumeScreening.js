import { useState } from 'react'
import {JobDescription,ResumeUploading,UploadedResume,Rating} from '../components/ResumeScreening'
import { ActivateLoader, ShowAlert } from '../components/AlertLoader'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive';
export const ResumeScreening=()=>{
    const [jobDescriptionDetail,setJobDescriptionDetail]=useState('')
    const [resumeDetail,setResumeDetail]=useState({})
    const [rating,setRating]=useState([])
    const baseUrl=useSelector(state=>state.baseUrl).backend
    const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
    const [isResumeSeen,setIsResumeSeen]=useState(true)
    const requestToken=async()=>{
        try{
            const response=await axios.get(baseUrl+'get-token/')
            return response.data.token
        }
        catch(error){
            ShowAlert(error,'red');
            console.log(error)
        }
    }
    const requestPosting=async()=>{
        try{
            ActivateLoader(true)
            if(jobDescriptionDetail===''){
                ShowAlert('Empty Job Description','red')
                return
            }
            const response = await axios.post(
                baseUrl+'get-rating/',
                {
                    job_description: jobDescriptionDetail,
                    resume_detail: resumeDetail,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setRating(response.data)
            }
        catch(error){
            ShowAlert(error,'red')
            console.log(error)
        }
        finally{
            ActivateLoader(false)
        }
    }
    return(
        <div className=''>
            <div className='flex flex-col'>
                <div className='w-full h-[60vh] md:h-[30vh] flex flex-col md:flex-row items-center justify-center'>
                    <div className=' w-[90%] md:w-[50%] h-full '>
                    <JobDescription jobDescriptionDetail={jobDescriptionDetail} setJobDescriptionDetail={setJobDescriptionDetail}/>
                    </div>
                    <div className='w-[90%] md:w-[50%] h-full '>
                    <ResumeUploading resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}/>
                    </div>
                </div>
                
                {isMobile&&Object.keys(resumeDetail).length!==0&&
                <>
                <div className='w-full items-center justify-between flex flex-row h-[10vh] bg-slate-500'>
                    <div className={`${isResumeSeen?'underline':''} w-full flex items-center justify-center text-[20px] font-bold text-white`} onClick={()=>setIsResumeSeen(true)}>Uploaded Resume</div>
                    {Object.keys(rating).length!==0&&<div className={`${isResumeSeen?'':'underline'} w-1/2 flex items-center justify-center text-[20px] font-bold text-white`} onClick={()=>setIsResumeSeen(false)}>Result</div>}
                </div>
                <div className='w-full flex flex-col my-5  items-center justify-center'>
                    {isResumeSeen&&
                    <div className='w-[90%] md:w-[50%] h-full '>
                        {Object.keys(resumeDetail).length!==0&&<UploadedResume setRating={setRating} resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}  requestPosting={requestPosting}/>}
                    </div >
                    }
                    {!isResumeSeen&&
                    <div className='w-[90%] md:w-[50%] h-full '>
                        {Object.keys(rating).length!==0&&<Rating rating={rating} setRating={setRating} />}

                    </div>
                    }
                </div>
                </> }

                {!isMobile&&
                <div className='w-full  flex flex-col md:flex-row my-5 items-center justify-center'>
                    <div className='w-[90%] md:w-[50%] h-full '>
                        {Object.keys(resumeDetail).length!==0&&<UploadedResume setRating={setRating} resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}  requestPosting={requestPosting}/>}

                    </div >
                    <div className='w-[90%] md:w-[50%] h-full '>
                        {Object.keys(rating).length!==0&&<Rating rating={rating} setRating={setRating} />}

                    </div>
                </div>}
            </div>
        </div>
    )
}