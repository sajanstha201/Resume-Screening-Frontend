import React, { useState } from 'react';
import mammoth from 'mammoth';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { ShowAlert } from '../AlertLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// Ensure PDF.js worker is correctly loaded
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

export const JobDescription = ({ jobDescriptionDetail, setJobDescriptionDetail }) => {
  const [isUploadOptionActivate, setIsUploadOptionActivate] = useState(true);
  const [file, setFile] = useState([]);

  const UploadJobDescription = () => {
    try {
      if (!isUploadOptionActivate) {
        // If using text input mode
        setJobDescriptionDetail(document.getElementById('job-text').value);
      } else {
        // If uploading a file
        const file = document.getElementById('job-input').files[0];
        setFile([file]);
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
              const doc = await mammoth.extractRawText({ arrayBuffer: event.target.result });
              setJobDescriptionDetail(doc.value);
            } else if (file.name.endsWith('.pdf')) {
              let fullText = '';
              const pdf = await getDocument({ data: event.target.result }).promise;
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                textContent.items.forEach((item) => {
                  fullText += item.str + ' ';
                });
              }
              setJobDescriptionDetail(fullText);
            }
          } catch (error) {
            ShowAlert(error, 'red');
            console.error('Error processing file:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      ShowAlert(error, 'red');
      console.error('Error handling job description:', error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      document.getElementById('job-input').files = files;
      setFile(files);
      UploadJobDescription();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-semibold mb-4">Job Description</h1>
      <div className={`border rounded-lg flex flex-col justify-center items-center relative shadow-lg ${file.length === 0 ? 'border-dotted border-black bg-blue-200' : 'bg-blue-400'} h-3/4 w-3/5 overflow-hidden`}>
        {isUploadOptionActivate ? (
          <>
            {file.length !== 0 ? (
              <>
                  <FontAwesomeIcon icon={faClose} size='2x'
                   onClick={() => {
                    setJobDescriptionDetail('');
                    setFile([]);
                  }}
                  className="text-red-800 cursor-pointer right-1 top-1 absolute flex items-center justify-center "
                  />
                {file[0].name}
              </>
            ) : (
              <>
                <label
                  htmlFor="job-input"
                  className="h-2/5 border bg-gray-200 border-black w-3/5 rounded-md text-[10px]  md:text-md flex flex-col items-center justify-center hover:border-2"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p className='w-full flex items-center justify-center text-center'>Upload or Drop Job Description</p>
                  <span>as .pdf or .docx file</span>
                </label>
                <input
                  id="job-input"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={UploadJobDescription}
                />
                <div
                  className="absolute bottom-1 bg-white px-1 rounded-md cursor-pointer text-[10px] md:text-md"
                  onClick={() => {
                    setIsUploadOptionActivate(false);
                    document.getElementById('job-input').value = '';
                  }}
                >
                  switch to copy paste
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <textarea
              id="job-text"
              className="h-[90%] w-[90%] bg-blue-200 rounded-md focus:outline-none p-2"
              placeholder="Type or Copy Paste Job Description here"
              onChange={UploadJobDescription}
            ></textarea>
            <div
              className="absolute bottom-1 bg-white px-1 rounded-md cursor-pointer"
              onClick={() => {
                setIsUploadOptionActivate(true);
                document.getElementById('job-text').value = '';
              }}
            >
              switch to upload
            </div>
          </>
        )}
      </div>
    </div>
  );
};
