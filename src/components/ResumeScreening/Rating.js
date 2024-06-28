import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ActivateLoader, ShowAlert } from "../AlertLoader";
import * as XLSX from 'xlsx'
export const Rating = ({ rating, setRating }) => {
    const downloadExcel= async()=>{
        try{
            console.log("downloaing excel file")
            ActivateLoader(true)
                const dataArray=Object.keys(rating).map(key=>[key,rating[key]])
                const worksheet=XLSX.utils.aoa_to_sheet(dataArray)
                console.log('worksheet',worksheet)
                const workbook=XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook,worksheet,'sheet1')
                XLSX.writeFile(workbook, "rating result.xlsx");
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
        <div className="h-[70vh] flex flex-col items-center m-5 mb-24">
            <h1>Resume Rating</h1>
            <button className="w-28 h-10 bg-[#a7d4b2] rounded-md border-2 border-black shadow-sm" onClick={downloadExcel}>
                Download
            </button>
            <div className="h-[80%] overflow-auto mt-5 w-[60%]">
                <table className="w-full text-center" style={{ border: '1px solid #ddd' }}>
                    <thead>
                        <tr className="bg-[#f2f2f2]" style={{ border: '1px solid #dddddd', position: 'sticky', top: 0, zIndex: 1 }}>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Resume Name</th>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Rating Score</th>
                            <th className="p-4" style={{ backgroundColor: '#f2f2f2' }}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(rating).map((entries, index) => (
                            <tr key={entries[0]} className={`${index % 2 === 0 ? '' : 'bg-gray-100'}`} style={{ border: '1px solid #dddddd' }}>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>{entries[0]}</td>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>{entries[1]}</td>
                                <td className="p-4" style={{ border: '1px solid #dddddd' }}>
                                    {Array.from({ length: entries[1] }).map((_, i) => (
                                        <FontAwesomeIcon key={`filled-${i}`} icon={faStar} style={{ color: 'orange' }} />
                                    ))}
                                    {Array.from({ length: 10 - entries[1] }).map((_, i) => (
                                        <FontAwesomeIcon key={`empty-${i}`} icon={faStar} />
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
