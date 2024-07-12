import React, { useState } from 'react';
import mammoth from 'mammoth';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { ShowAlert } from '../AlertLoader';

// Ensure PDF.js worker is correctly loaded
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

export const JobDescription = ({ jobDescriptionDetail, setJobDescriptionDetail }) => {
  const [isUploadOptionActivate, setIsUploadOptionActivate] = useState(false);
  const [file, setFile] = useState([]);

  const UploadJobDescription = () => {
    try {
      if (!isUploadOptionActivate) {
        // If using text input mode
        setJobDescriptionDetail(document.getElementById('job-text').value.trim());
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
    <div className='h-full flex flex-col items-center justify-center w-full'>
      <h1>Job Description</h1>
      <div className={`${file.length === 0 ? 'border-dotted border-black  bg-[#adcbe3] shadow-lg' : 'bg-[#8b9dc3]'} h-[90%] w-[60%] border rounded-lg flex flex-col justify-center items-center relative`}>
        {isUploadOptionActivate ? (
          <>
            {file.length !== 0 ? (
              <>
                <div
                  onClick={() => {
                    setJobDescriptionDetail('');
                    setFile([]);
                  }}
                  className="bg-red-400 pt-1 text-[8px] w-[15px] h-[15px] cursor-pointer rounded-full right-1 top-1 absolute flex items-center justify-center pb-1 border border-black border-2"
                >
                  x
                </div>
                {file[0].name}
              </>
            ) : (
              <>
                <label
                  htmlFor='job-input'
                  className="h-[40%] border bg-[#dfe3ee] border-black w-[60%] rounded-md flex flex-col items-center justify-center hover:border-2"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <span>Upload or Drop Job Description</span>
                  <span>as .pdf or .docx file</span>
                </label>
                <input
                  id='job-input'
                  type='file'
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={UploadJobDescription}
                />
                <div
                  className="absolute bottom-1 bg-white px-1 rounded-md cursor-pointer"
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
              id='job-text'
              className="h-[90%] w-[90%] bg-[#adcbe3] rounded-md focus:outline-none"
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
