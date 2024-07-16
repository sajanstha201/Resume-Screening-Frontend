import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShowAlert } from "../AlertLoader";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const UploadedResume=({setRating,resumeDetail,setResumeDetail,requestPosting})=>{
    const deleteData=(e)=>{
        const key=e.target.closest('td').previousSibling.innerHTML;
        const oldList={...resumeDetail};
        delete oldList[key];
        setResumeDetail(oldList)
        ShowAlert('Deleted:'+key,'red')
    }
    const removeAll=()=>{
        ShowAlert('Removed All','red');
        setResumeDetail({});
        setRating([]);
    }
    return(
        <div className='h-full flex flex-col  items-center justify-center '>
                <h1>Uploaded Resume</h1>
                <div className="h-[70%] w-[90%] overflow-auto">
                    <table className="w-full text-center" style={{ border: '1px solid #ddd' }}>
                        <thead>
                            <tr className="bg-[#f2f2f2]" style={{ border: '1px solid #dddddd', position: 'sticky', top: 0, zIndex: 1 }}>
                                <th>SN</th>
                                <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Resume Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(resumeDetail).map((key,index) => (
                                <tr  className={`${index % 2 === 0 ? '' : 'bg-gray-100'}`} style={{ border: '1px solid #dddddd' }}>
                                    <td className="p-4">{index+1}</td>
                                    <td className="p-4 max-w-[400px] overflow-hidden" >{key}</td>
                                    <td className="p-4"><FontAwesomeIcon icon={faTrash} onClick={deleteData} className="transform hover:scale-125 hover:text-red-600"/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-2 m-2">
                    <button  className="w-28 h-10 bg-[#dc3545] text-white rounded-md shadow-sm" onClick={removeAll}>Remove All</button>
                    <button  className="w-28 h-10 bg-[#0d6efd] text-white rounded-md  shadow-sm" onClick={requestPosting}>Submit</button>
                </div>



                {/* <div className="h-[70%] w-[80%] flex flex-wrap overflow-auto border border-2 border-black rounded-md p-5 cursor-pointer">
                    {Object.keys(resumeDetail).map((key)=>(
                        <>
                        <div  className="flex items-center justify-center border shadow-lg w-[80px] h-[100px] rounded-md m-2 relative bg-[#8b9dc3] ">
                        <div onClick={deleteData} className="bg-red-400 pt-1 text-[8px] w-[12px] h-[12px] cursor-pointer rounded-full right-1 top-1 absolute flex items-center justify-center pb-1 border border-black border-2 ">x</div>
                                <p className="m-2 w-[80%] h-[80%] overflow-hidden text-sm">{key}</p>
                        </div>
                        </>
                    ))}
                </div>
                <div className="flex gap-2 m-2">
                    <button  className="w-28 h-10 bg-[#ff8c00] rounded-md border-2 border border-black shadow-sm" onClick={removeAll}>Remove All</button>
                    <button  className="w-28 h-10 bg-[#bfd6f6] rounded-md border-2 border border-black shadow-sm" onClick={requestPosting}>Submit</button>
                </div> */}
        </div>
    )
}