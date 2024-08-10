import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ActivateLoader, ShowAlert } from "../AlertLoader";
import * as XLSX from 'xlsx';
import { CircularProgress } from "./CircularProgress";
import { StarRating } from "./StarRating";

export const Rating = ({ rating, setRating }) => {
    const downloadExcel = async () => {
        try {
            console.log("downloading excel file");
            ActivateLoader(true);
            const dataArray = Object.keys(rating).map(key => [key, rating[key] / 10 + '/10', rating[key]]);
            const headers = ['Resume', 'Rating', 'Percentage Match'];
            dataArray.unshift(headers);
            const worksheet = XLSX.utils.aoa_to_sheet(dataArray);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');
            XLSX.writeFile(workbook, "Rating result.xlsx");
        } catch (error) {
            ShowAlert(error, 'red');
            console.log(error);
        } finally {
            ActivateLoader(false);
        }
    };

    return (
        <div className="h-full flex w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold ">Resume Rating</h1>
            <button className="w-28 h-10 my-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 transition-colors" onClick={downloadExcel}>
                Download
            </button>
            <div className=" w-[95%] overflow-auto border border-gray-300 rounded-lg shadow-lg">
                <table className="w-full text-center">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="p-2 border-b border-gray-300 h-16">Resume Name</th>
                            <th className="p-2 border-b border-gray-300">Rating Score</th>
                            {/* <th className="p-4 border-b border-gray-300">Rating</th> */}
                            <th className="p-2 border-b border-gray-300">Percentage Match</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(rating).map((entries, index) => (
                            <tr key={entries[0]} className={`${index % 2 === 0 ? '' : 'bg-gray-100'} border-b border-gray-300`}>
                                <td className="py-1 max-w-[200px] truncate border border-gray-300">{entries[0]}</td>
                                <td className="py-1 border border-gray-300 h-16 ">{entries[1] / 10}/10
                                <StarRating value={entries[1] / 10} />
                                </td>
                                <td className="py-1 border border-gray-300">
                                    <CircularProgress percentage={entries[1]} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
