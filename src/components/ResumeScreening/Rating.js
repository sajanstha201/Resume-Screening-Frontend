import { useState } from "react"

export const Rating=({rating,setRating})=>{
    return(
        <div className="h-[50vh] flex flex-col items-center m-5">
            <h2>Resume Rating</h2>
            <button  className="w-28 h-10 bg-green-500 rounded-md border-2 border border-black shadow-sm">Download</button>
            <div className="h-[80%] overflow-auto mt-5 w-[60%]">
                <table className="border w-full">
                    <thead >
                        <tr>
                            <th>Resume Name</th>
                            <th>Rating Score</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td>sajan</td>
                            <td>4</td>
                            <td>55</td>
                        </tr>
                        <tr>
                            <td>sajan</td>
                            <td>4</td>
                            <td>55</td>
                        </tr>
                        <tr>
                            <td>sajan</td>
                            <td>4</td>
                            <td>55</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}