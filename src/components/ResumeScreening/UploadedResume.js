import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShowAlert } from "../AlertLoader";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const UploadedResume = ({ setRating, resumeDetail, setResumeDetail, requestPosting }) => {
  const deleteData = (e) => {
    const key = e.target.closest('td').previousSibling.innerHTML;
    const oldList = { ...resumeDetail };
    delete oldList[key];
    setResumeDetail(oldList);
    ShowAlert('Deleted: ' + key, 'red');
  };

  const removeAll = () => {
    ShowAlert('Removed All', 'red');
    document.getElementById('resume-input').value=''
    setResumeDetail({});
    setRating([]);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold ">Uploaded Resume</h1>
            <div className="flex gap-4 my-2 ">
                <button 
                  className="w-28 h-10 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 transition-colors" 
                  onClick={removeAll}
                >
                  Remove All
                </button>
                <button 
                  className="w-28 h-10 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors" 
                  onClick={requestPosting}
                >
                  Submit
                </button>
          </div>

      <div className=" w-4/5 overflow-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="w-full text-center">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-2 border-b border-gray-300 h-16">SN</th>
              <th className="py-2 border-b border-gray-300">Resume Name</th>
              <th className="py-2 border-b border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(resumeDetail).map((key, index) => (
              <tr key={key} className={`${index % 2 === 0 ? '' : 'bg-gray-100'} border-b border-gray-300`}>
                <td className="py-2 p-1 h-16">{index + 1}</td>
                <td className="py-2 p-1 max-w-[400px] truncate">{key}</td>
                <td className="pr-4 p-1">
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    onClick={deleteData} 
                    className="cursor-pointer transform hover:scale-125 hover:text-red-600 transition-transform"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
