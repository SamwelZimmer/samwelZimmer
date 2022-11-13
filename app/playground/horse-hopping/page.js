'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Range } from 'react-range';
import { FaChessKnight } from "react-icons/fa";
import { HiCode, HiHome } from "react-icons/hi";
import { GrHome } from "react-icons/gr";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

import './styles.css';

export default function HorseHopping() {
    const [sliderValue, setSliderValue] = useState(8);
    const [initialPosition, setInitialPosition] = useState(7);
    const [showNumbers, setShowNumbers] = useState(false);
    const [showCode, setShowCode] = useState(false)


    const size = sliderValue ** 2
    let layout = new Array(size).fill("_");
    const keys = Array.from({length:size},(v,k)=>k)

    const changeInitalPosition = (i) => {
        setInitialPosition(i)
    }

    function placeKnight(pos) {
        layout[pos] = 0
    }

    function validMoves(position) {
        const allMoves = [17, 15, 10, 6, -6, -10, -15, -17]
        let invalidMoves = []
        let x = position % 8;

        // x position of knight
        if (x >= 7) {invalidMoves.push.apply(invalidMoves, [17, 10, -6, -15])}
        else if (x >= 6) {invalidMoves.push.apply(invalidMoves, [10, -6])}
        else if (x <= 0) {invalidMoves.push.apply(invalidMoves, [-17, -10, 6, 15])}
        else if (x <= 1) {invalidMoves.push.apply(invalidMoves, [-10, 6])}

        // y position of knight
        if (position <= 7) {invalidMoves.push.apply(invalidMoves, [-6, -10, -15, -17])}
        else if (position <= 15) {invalidMoves.push.apply(invalidMoves, [-15, -17])}
        else if (position >= 56) {invalidMoves.push.apply(invalidMoves, [6, 10, 15, 17])}
        else if (position >= 48) {invalidMoves.push.apply(invalidMoves, [15, 17])}

        let allMovesSet = new Set(allMoves)
        let invalidMovesSet = new Set(invalidMoves)
        let diff = [...allMovesSet].filter(element => !invalidMovesSet.has(element))
        return diff
    }

    function markMoves() {
        let count = 0;
        let free_spaces = sliderValue ** 2;

        while (free_spaces > 0) {
            for (let i = 0; i < layout.length; i++) {
                if (layout[i] === count) {
                    let x = validMoves(i)
                    for (let n = 0; n < x.length; n++) {
                        let space = x[n]
                        if (layout[space + i] === "_") {
                            layout[space + i] = count + 1
                        }
                    }
                }
            free_spaces = layout.filter((v) => (v === "_")).length;
            }
            count += 1
        }
    }

    placeKnight(initialPosition)
    markMoves()

    return (
        <>
            <main className='w-full h-screen md:h-full flex flex-col pb-[50%] md:pb-0 justify-center items-center p-32 gap-12 shifting-background'>

                {/* <div>
                    <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900">{sliderValue ** 2}</label>
                    <input value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} id="steps-range" type="range" min="4" max="12" step="1" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" /> 
                </div> */}

                <HomeButton />
                <BackButton />

                <div className='font-serif flex flex-col w-full md:w-[calc(95vh)] gap-1'>
                    <h2 className='text-7xl md:text-5xl self-center'><FaChessKnight /></h2>
                    <h1 className='text-7xl md:text-5xl self-center'>Knight Movement</h1>
                </div>
                    
                {/* <div style={{ display: "grid",  gridTemplateColumns:  `repeat(${Math.sqrt(size)}, minmax(0, 1fr))`}} className="wood gap-3 w-full md:w-[calc(95vh)] p-6 rounded-md shadow-2xl">
                    {
                        keys.map((i) => {
                            const opacity = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.6, 4: 0.75, 5: 0.85, 6: 1}
                            return (
                                <motion.button onClick={() => changeInitalPosition(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i} style={{ backgroundColor: "#000000", opacity: `${opacity[layout[i]]}` }} className={`border border-black aspect-square rounded-md shadow-2xl flex items-center justify-center text-opacity-60 text-3xl md:text-base font-serif ${showNumbers && "text-white"}`}>
                                    {layout[i]}
                                </motion.button>
                            )
                        })
                    }
                </div> */}

                {
                    showCode ? 
                    
                    (
                        <div className="wood gap-3 w-full aspect-square md:w-[calc(95vh)] p-6 rounded-md shadow-2xl">

                        </div> 
                    )

                    : 

                    (
                        <div style={{ display: "grid",  gridTemplateColumns:  `repeat(${Math.sqrt(size)}, minmax(0, 1fr))`}} className="wood gap-3 w-full md:w-[calc(95vh)] p-6 rounded-md shadow-2xl">
                            {
                                keys.map((i) => {
                                    const opacity = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.6, 4: 0.75, 5: 0.85, 6: 1}
                                    return (
                                        <motion.button onClick={() => changeInitalPosition(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i} style={{ backgroundColor: "#000000", opacity: `${opacity[layout[i]]}` }} className={`border border-black aspect-square rounded-md shadow-2xl flex items-center justify-center text-opacity-60 text-3xl md:text-base font-serif ${showNumbers && "text-white"}`}>
                                            {layout[i]}
                                        </motion.button>
                                    )
                                })
                            }
                        </div>
                    )

                }



                <div className="flex flex-row w-full items-center justify-center gap-12">
                    <motion.button disabled={showCode} onClick={() => setShowNumbers(!showNumbers)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='wood px-6 py-3 w-[275px] h-[75px] text-3xl md:text-base md:w-[175px] md:h-[50px] rounded-md shadow-2xl text-white text-opacity-50 font-serif disabled:opacity-40'>
                        {showNumbers ? "Hide Numbers" : "Show Numbers" }
                    </motion.button>
                    <motion.button onClick={() => setShowCode(!showCode)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='wood aspect-square h-[75px] md:h-[50px] flex items-center justify-center py-3 text-4xl md:text-xl rounded-md shadow-2xl text-white text-opacity-50 font-serif'>
                        <HiCode />
                    </motion.button>
                </div>

                <div className='w-full flex justify-center items-end absolute bottom-[20%] md:relative text-3xl md:text-lg opacity-70 md:pb-10'>
                    <Link href="https://sebastian.itch.io/knight-jump-visualizer">
                        <p>Inspired by <span className='underline'>Sebastian Lague</span></p>
                    </Link>
                </div>

            </main>

           
        </>
    )
}

function Board() {
    return (
        <div style={{ display: "grid",  gridTemplateColumns:  `repeat(${Math.sqrt(size)}, minmax(0, 1fr))`}} className="wood gap-3 w-full md:w-[calc(95vh)] p-6 rounded-md shadow-2xl">
            {
                keys.map((i) => {
                    const opacity = {0: 0.1, 1: 0.2, 2: 0.4, 3: 0.6, 4: 0.75, 5: 0.85, 6: 1}
                    return (
                        <motion.button onClick={() => changeInitalPosition(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i} style={{ backgroundColor: "#000000", opacity: `${opacity[layout[i]]}` }} className={`border border-black aspect-square rounded-md shadow-2xl flex items-center justify-center text-opacity-60 text-3xl md:text-base font-serif ${showNumbers && "text-white"}`}>
                            {layout[i]}
                        </motion.button>
                    )
                })
            }
        </div>
    );
}

const HomeButton = () => (
    <Link href="/">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='wood absolute right-[15%] md:right-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <GrHome />
        </motion.button>
    </Link>

    
)

const BackButton = () => (
    <Link href="/playground">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='wood absolute left-[15%] md:left-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <BiArrowBack />
        </motion.button>
    </Link>
   
)
