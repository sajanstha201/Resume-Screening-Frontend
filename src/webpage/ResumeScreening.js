import { useState } from 'react'
import {JobDescription,ResumeUploading,UploadedResume,Rating} from '../components/ResumeScreening'
export const ResumeScreening=()=>{
    const [jobDescriptionDetail,setJobDescriptionDetail]=useState('')
    const [resumeDetail,setResumeDetail]=useState({})
    const [rating,setRating]=useState([])
    return(
        <div className='bg-gray-100'>
            <div className="h-[80vh] shadow-md flex flex-row ">
                <JobDescription jobDescriptionDetail={jobDescriptionDetail} setJobDescriptionDetail={setJobDescriptionDetail}/>
                <div className='h-full flex flex-col shadow-md w-[60%] '>
                    <ResumeUploading resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}/>
                    <UploadedResume resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}/>
                </div>
            </div>
            <Rating rating={rating} setRating={setRating} />
        </div>
    )
}