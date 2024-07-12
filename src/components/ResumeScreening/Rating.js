import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ActivateLoader, ShowAlert } from "../AlertLoader";
import * as XLSX from 'xlsx'
import { CircularProgress } from "./CircularProgress";
import { StarRating } from "./StarRating";
export const Rating = ({ rating, setRating }) => {
    const downloadExcel= async()=>{
        try{
            console.log("downloaing excel file")
            ActivateLoader(true)
                const dataArray=Object.keys(rating).map(key=>[key,rating[key]/10+'/10',rating[key]])
                
                const headers = ['Resume', 'Rating', 'Percentage Match'];
                dataArray.unshift(headers)
                const worksheet=XLSX.utils.aoa_to_sheet(dataArray)
                const workbook=XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
                XLSX.writeFile(workbook, "Rating result.xlsx");
            }
            catch(error){
                ShowAlert(error,'red');
                console.log(error)
            }
            finally{
                ActivateLoader(false)
            }
    }
    return (
        <div className="h-full flex flex-col items-center  justify-center">
            <h1>Resume Rating</h1>
            <div className="h-[70%] overflow-auto  w-[90%]">
                <table className="w-full text-center" style={{ border: '1px solid #ddd' }}>
                    <thead>
                        <tr className="bg-[#f2f2f2]" style={{ border: '1px solid #dddddd', position: 'sticky', top: 0, zIndex: 1 }}>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Resume Name</th>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Rating Score</th>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Rating</th>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Percentage Match</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(rating).map((entries, index) => (
                            <tr key={entries[0]} className={`${index % 2 === 0 ? '' : 'bg-gray-100'}`} style={{ border: '1px solid #dddddd' }}>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>{entries[0]}</td>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>{entries[1]/10}/10</td>
                                <td className="p-4 flex justify-center items-center h-full" >
                                    <StarRating value={entries[1]/10}/>
                                </td>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>
                                    <CircularProgress percentage={entries[1]}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="w-28 h-10 m-2 bg-[#a7d4b2] rounded-md border-2 border-black shadow-sm" onClick={downloadExcel}>
                Download
            </button>
        </div>
    );
};
