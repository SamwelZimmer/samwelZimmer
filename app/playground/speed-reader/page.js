'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GrHome } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import Link from 'next/link';

import './styles.css';

const introString = "Need to read fast? I got you. Paste text into the box below.";

export default function SpeedReader() {
    const [curStr, setCurStr] = useState(introString);
    const [curArr, setCurArr] = useState([]);
    const [count, setCount] = useState(0);
    const [sliderValue, setSliderValue] = useState(3);
    const [formValue, setFormValue] = useState("");
    const [fileUpload, setFileUpload] = useState(false);

    const timeDelay = () => {
        return (1 / sliderValue) * 1000;
    }

    useEffect(() => {
        setCurArr(curStr.split(" "));
    }, [curStr]);

    const incrementCount = () => {
        if (count < curArr.length) {
            setTimeout(() => 
                setCount(count + 1)
            , timeDelay())
        }
    }

    useEffect(() => {
        if (curArr[count] !== undefined) {
            document.title = `${curArr[count]}`;
        } else {
            document.title = `SpeedReader`
        }
    });

    incrementCount();

    const handleSubmit = (e) => {
        e.preventDefault();
        setCount(0);
        setCurStr(formValue);
    }

    function showFile(e) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            console.log(text)
            setFormValue(text);
            console.log(formValue);
        };
        reader?.readAsText(e.target.files[0]);
    }

    function FileUpload() {
        return (
            <div className="flex items-center justify-center w-full h-[400px] md:h-[200px]">
                <label htmlFor="dropzone-file" className="flex flex-col items-center h-full justify-center p-2.5 w-full text-xl md:text-sm text-gray-200 bg-slate-700 placeholder:opacity-60 focus:outline focus:outline-slate-400 border border-slate-500 rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-xl">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 md:text-sm text-gray-300"><span className="font-semibold">Click to upload</span></p>
                        <p className="md:text-xs text-gray-400">Only .txt files</p>
                        <p className="md:text-xs text-gray-500 opacity-70">Could I do other file types?</p>
                        <p className="md:text-xs text-gray-500 opacity-70">Maybe.</p>
                        <p className="md:text-xs text-gray-500 opacity-70">Can I be bothered?</p>
                        <p className="md:text-xs text-gray-500 opacity-70 ">No.</p>
                    </div>
                    <input id="dropzone-file" onChange={(e) => showFile(e)} type="file" className="hidden" />
                </label>
            </div> 
        );
    }

    return (
        <>
            <main className='bg-slate-900 text-slate-400 h-screen flex flex-col justify-center items-center'>
                <BackButton />
                <HomeButton />

                <div className='text-[8rem] p-20'>{curArr[count] !== undefined ? curArr[count] : <span className='text-slate-700'>SpeedReader</span>}</div>

                <div className='flex flex-col md:flex-row w-[500px] justify-between items-center gap-8'>
                    <p className='text-2xl md:text-base'>Words per seconds: <span className='font-bold text-slate-300'>{sliderValue}</span></p>
                    <input id="default-range" type="range" min="1" max="15" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className="w-[300px] h-4 md:h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                </div>

                <form onSubmit={handleSubmit} className='w-full px-32 md:px-0 md:w-[500px] pt-20 flex flex-col justify-center gap-6' >
                    { fileUpload ? 
                        <>
                            <textarea value={formValue} onChange={(e) => setFormValue(e.target.value)} id="message" rows="4" className="h-[400px] md:h-[200px] p-2.5 w-full text-xl md:text-sm text-gray-200 bg-slate-700 rounded-lg border border-slate-500 placeholder:opacity-60 focus:outline focus:outline-slate-400" placeholder="Write/paste your words here..."></textarea>
                        </>
                    :   
                        <>
                            <FileUpload />
                        </> }
                    <div className='flex flex-row gap-12 justify-center'>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type='submit' className='bg-transparent text-3xl md:text-base border border-slate-500 w-[100px] px-5 p-3 self-center rounded-lg hover:border-slate-200 hover:text-slate-200'>Read</motion.button>
                        <motion.button onClick={() => setFileUpload(!fileUpload)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type='button' className='bg-transparent text-3xl md:text-base border border-slate-500 w-[100px] px-5 p-3 self-center rounded-lg hover:border-slate-200 hover:text-slate-200'>{!fileUpload ? "Type" : "File"}</motion.button>
                    </div>
                    
                </form>


            </main>
        </>
    );
}

const HomeButton = () => (
    <Link href="https://www.samwelzimmer.com">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='border border-slate-600 text-slate-400 fixed md:absolute right-[15%] md:right-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <GrHome />
        </motion.button>
    </Link>

    
);

const BackButton = () => (
    <Link href="https://www.samwelzimmer.com/playground">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='marble border border-slate-600 text-slate-400 fixed md:absolute left-[15%] md:left-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <BiArrowBack />
        </motion.button>
    </Link>
   
);