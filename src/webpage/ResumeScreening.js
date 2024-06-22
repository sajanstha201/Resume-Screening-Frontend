import {JobDescription,ResumeUploading,UploadedResume,Rating} from '../components/ResumeScreening'
export const ResumeScreening=()=>{
    return(
        <div className='bg-gray-100'>
            <div className="h-[80vh] shadow-md flex flex-row ">
                <JobDescription/>
                <div className='h-full flex flex-col shadow-md w-[60%] '>
                    <ResumeUploading/>
                    <UploadedResume/>
                </div>
            </div>
            <Rating/>
        </div>
    )
}