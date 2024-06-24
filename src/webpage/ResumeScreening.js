import { useState } from 'react'
import {JobDescription,ResumeUploading,UploadedResume,Rating} from '../components/ResumeScreening'
import { ShowAlert } from '../components/AlertLoader'
import axios from 'axios'
export const ResumeScreening=()=>{
    const [jobDescriptionDetail,setJobDescriptionDetail]=useState('')
    const [resumeDetail,setResumeDetail]=useState({})
    const [rating,setRating]=useState([])
    const requestToken=async()=>{
        try{
            const response=await axios.get('http://127.0.0.1:8000/get-token/')
            return response.data
        }
        catch(error){
            ShowAlert(error,'red');
            console.log(error)
        }
    }
    const requestPosting=async()=>{
        try{
            const csrfToken = await requestToken();
            const response=await axios.post('http://127.0.0.1:8000/get-rating/?format=json',
                JSON.stringify({job_description:jobDescriptionDetail,
                resume_detail:resumeDetail}),
                {headers:{
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                }})
            setRating(response.data)
            }
        catch(error){
            ShowAlert(error,'red')
            console.log(error)
        }
    }
    return(
        <div className='bg-gray-100'>
            <div className="h-[80vh] shadow-md flex flex-row ">
                <JobDescription jobDescriptionDetail={jobDescriptionDetail} setJobDescriptionDetail={setJobDescriptionDetail}/>
                <div className='h-full flex flex-col shadow-md w-[60%] '>
                    <ResumeUploading resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}/>
                    {Object.keys(resumeDetail).length!==0&&<UploadedResume resumeDetail={resumeDetail} setResumeDetail={setResumeDetail}  requestPosting={requestPosting}/>}
                </div>
            </div>
            {Object.keys(rating).length!==0&&<Rating rating={rating} setRating={setRating} />}
        </div>
    )
}