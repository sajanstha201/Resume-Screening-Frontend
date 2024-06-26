import { ShowAlert } from "../AlertLoader";

export const UploadedResume=({resumeDetail,setResumeDetail,requestPosting})=>{
    const deleteData=(e)=>{
        const key=e.target.nextSibling.innerHTML;
        const oldList={...resumeDetail};
        delete oldList[key];
        setResumeDetail(oldList)
    }
    const removeAll=()=>{
        ShowAlert('Removed All','red');
        setResumeDetail({});
    }
    return(
        <div className='h-[60%] flex flex-col  items-center justify-center '>
                <h1>Uploaded Resume</h1>
                <div className="h-[70%] w-[80%] flex flex-wrap overflow-auto border border-2 border-black rounded-md p-5 cursor-pointer">
                    {Object.keys(resumeDetail).map((key)=>(
                        <>
                        <div  className="flex items-center justify-center border border-black w-[80px] h-[100px] rounded-xl m-2 relative bg-[#8b9dc3] ">
                        <div onClick={deleteData}className="bg-red-600 w-[11px] h-[11px] rounded-full right-1 top-1 absolute flex items-center justify-center pb-1 border border-black border-1 hover:w-[12px] hover:h-[12px]">x</div>
                                <p className="m-2 w-[80%] h-[80%] overflow-hidden text-sm">{key}</p>
                        </div>
                        </>
                    ))}
                </div>
                <div className="flex gap-2 m-2">
                    <button  className="w-28 h-10 bg-[#ff8c00] rounded-md border-2 border border-black shadow-sm" onClick={removeAll}>Remove All</button>
                    <button  className="w-28 h-10 bg-[#bfd6f6] rounded-md border-2 border border-black shadow-sm" onClick={requestPosting}>Submit</button>
                </div>
        </div>
    )
}