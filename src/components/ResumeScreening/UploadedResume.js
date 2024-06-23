export const UploadedResume=({resumeDetail,setResumeDetail})=>{
    return(
        <div className='h-[60%] flex flex-col shadow-md items-center justify-center '>
                <h2>This is uploaded resume section</h2>
                <div className="h-[70%] w-[80%] flex-wrap overflow-auto border border-2 border-green-400 rounded-md">
                    <div className="border border-black w-[80px] h-[100px] rounded-md m-2 relative bg-green-400 overflow-hidden p-2">
                    <div className="bg-red-600 w-[15px] h-[15px] rounded-full right-1 top-1 absolute flex items-center justify-center pb-1 border border-black border-1 hover:w-[17px] hover:h-[17px]">x</div>

                    </div>

                </div>
                <div className="flex gap-2 m-2">
                    <button  className="w-28 h-10 bg-red-500 rounded-md border-2 border border-black shadow-sm">Remove All</button>
                    <button  className="w-28 h-10 bg-green-500 rounded-md border-2 border border-black shadow-sm">Submit</button>
                </div>
        </div>
    )
}