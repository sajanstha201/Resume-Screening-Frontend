import { Link } from "react-router-dom"
export const Home=()=>{
    return(
        <div className="flex w-full h-[100vh] flex-col items-center">
            <div className="flex flex-row items-center w-full justify-between px-96 h-[20%]">
                <div className="">
                    LOGO
                </div>
                <div>
                    Company Name
                </div>
            </div>
            <h1 className="m-10 text-[40px]">Resume Screening</h1>
            <div className="text-[20px] w-[40%] flex items-center justify-center m-10">
                <p className="text-center">  Built an AI-powered resume matching platform with React and Django, leveraging BERT and lemmatization for keyword extraction. Compare uploaded resumes with job descriptions to generate relevance ratings for enhanced candidate matching.
                </p>
            </div>
            <Link to='/resume-screening' className="flex w-[50%] border-2 bg-[#adcbe3] h-[20%] items-center justify-center rounded-xl shadow-xl hover:bg-[#a1c4e0] text-xl">
                Click Here For Resume Screening Webpage
            </Link>
        </div>
    )
}