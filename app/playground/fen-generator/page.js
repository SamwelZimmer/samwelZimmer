'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing, FaChess } from "react-icons/fa";
import { GrHome } from "react-icons/gr";
import { BiArrowBack, BiCopy } from "react-icons/bi";
import Link from 'next/link';

import './styles.css';

const whiteColor = "rgba(255, 255, 255)"
const layout = new Array(64).fill("_");
const keys = Array.from({length:64},(v,k)=>k);
const pieces = ["_", "p", "r", "n", "b", "q", "k"];
const icons = {"_": "", "p": <FaChessPawn />, "P": <FaChessPawn color={whiteColor} />, "r": <FaChessRook />, "R": <FaChessRook color={whiteColor} />, "n": <FaChessKnight />, "N": <FaChessKnight color={whiteColor} />, "b":  <FaChessBishop />, "B":  <FaChessBishop color={whiteColor} />, "q": <FaChessQueen />, "Q": <FaChessQueen color={whiteColor} />, "k": <FaChessKing />, "K": <FaChessKing color={whiteColor} />}

export default function FenGenerator() {
    const [isWhite, setIsWhite] = useState(true);
    const [activePiece, setActivePiece] = useState(pieces[0]);
    const [board, setBoard] = useState(layout);
    const [rerender, setrerender] = useState(false);
    const [FEN, setFEN] = useState("");
    

    const whiteSquare = (i) => {
        if (Math.floor(i / 8) % 2 == 0) {
            if (i % 2 == 0) return true;
        } else {
            if (i % 2 != 0) return true
        }
    }

    const setPiece = (i) => {
        if ((!isWhite && board[i] === activePiece) || (isWhite && board[i] === activePiece.toUpperCase())) {
            board[i] = "_";
        } else {
            board[i] = isWhite ? activePiece.toUpperCase() : activePiece;
        }
        setBoard(board)
        // this is to force a re-render of the square when clicked
        setrerender(!rerender)

        getFEN();
    }

    const showIcons = (i) => { 
        return (icons[board[i]])
    }

    const getFEN = () => {
        let rows = [];
        let row = [];
        for (let i = 0; i < board.length; i++) {
            row.push(board[i])
            if (row.length === 8) {
                rows.push(row)
                row = [];
            }
        }

        for (let n = 0; n < rows.length; n++) {
            let line = rows[n]
            for (let i = 0; i < line.length; i++) {
                if (line[i] === "_") {
                    line[i] = ""
                } 
            }
            let count = 0
            let fenRow = []
            for (let i = 0; i < line.length; i++) {
                if (line[i] === "") {count += 1} 
                if (line[i] !== "") {
                    if (count > 0) {fenRow.push(count)}
                    count = 0
                    fenRow.push(line[i])
                }
                if ((i === line.length - 1) && (line[i] === "")) {fenRow.push(count)}
            }
            rows[n] = fenRow.join("")
        }
        let fen = rows.join("/")
        setFEN(fen)
    }

    const readFEN = () => {
        const fen = FEN.split(" ")[0].split("/");
        let fenArray = [];
        for (let i = 0; i < fen.length; i++) {
            let row = fen[i].split("");
            for (let n = 0; n < row.length; n++) {
                if (!isNaN(row[n])) {
                    for (let j = 0; j < row[n]; j++) {
                        fenArray.push("_");
                    }
                } else {
                    fenArray.push(row[n]);
                }
            }
        }
        return fenArray;
    }

    const BoardFromFEN = () => {
        setBoard(readFEN())
    }

    const clearBoard = () => {
        setFEN("8/8/8/8/8/8/8/8");
        // BoardFromFEN();
    }

    const standardBoard = () => {
        setFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        // BoardFromFEN();
    }

    const copyFEN = () => {
        navigator.clipboard.writeText(FEN);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <main className='green-bg w-full h-full md:h-full flex flex-col pb-[50%] md:pb-[10%] justify-center items-center p-32 gap-12 font-serif'>
                <HomeButton />
                <BackButton />

                <h1 className='text-5xl gold-text'>Chess Position Translator</h1>

                <section className='flex flex-col md:flex-row w-full justify-around'>
                    <aside className='flex flex-row md:flex-col items-start justify-around py-20 md:py-6'>
                        <label className="inline-flex justify-center self-center relative items-center mr-5 cursor-pointer">
                            <input defaultChecked type="checkbox" value={isWhite} onChange={() => {setIsWhite(!isWhite)}} className="sr-only peer" />
                            <div className="w-11 h-6 bg-black opacity-70 rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-200"></div>
                            <span className="ml-3 text-sm gold-text">{isWhite ? "White" : "Black"}</span>
                        </label>
                       
                        <motion.button onClick={() => setActivePiece(pieces[1])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessPawn style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                        <motion.button onClick={() => setActivePiece(pieces[2])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessRook style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                        <motion.button onClick={() => setActivePiece(pieces[3])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessKnight style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                        <motion.button onClick={() => setActivePiece(pieces[4])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessBishop style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                        <motion.button onClick={() => setActivePiece(pieces[5])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessQueen style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                        <motion.button onClick={() => setActivePiece(pieces[6])} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='marble w-[75px] aspect-square border border-[#d4af37] rounded-md flex justify-center items-center text-3xl shadow-2xl'>
                            <FaChessKing style={{ color: `${isWhite ? "white" : "black"}`}} />
                        </motion.button>
                    </aside>

                    <div style={{ display: "grid",  gridTemplateColumns:  `repeat(8, minmax(0, 1fr))`}} className="marble rounded-sm w-full md:w-[calc(95vh)] p-6 shadow-2xl">
                        {
                            keys.map((i) => {
                                return (
                                    <motion.button onClick={() => setPiece(i)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ background: `${whiteSquare(i) ? "transparent" : "rgba(0, 0, 0, 0.7)"}`  }} key={i} className={`aspect-square border border-[#d4af37] border-opacity-50 shadow-2xl flex items-center justify-center text-opacity-60 text-4xl font-serif`}>
                                        {showIcons(i)}
                                    </motion.button>
                                )
                            })                     
                        }
                    </div>
                </section>

                <div className='w-full flex flex-col md:flex-row justify-between items-center pt-12'>
                    <div className='h-full flex flex-row gap-12'>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => clearBoard()} className='rounded-md marble px-5 p-3 shadow-2xl border border-[#d4af37]'>
                            Empty
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => standardBoard()} className='rounded-md marble px-5 shadow-2xl border border-[#d4af37]'>
                            Standard
                        </motion.button>
                    </div>
                   
                    
                    <div className='flex flex-row gap-12 items-center justify-center w-full md:w-2/3 pt-12 md:pt-0'>
                        <p className='gold-text'>FEN:</p>
                        <form onSubmit={handleSubmit} className="flex flex-row w-full gap-12">
                            <input value={FEN} onChange={(e) => setFEN(e.target.value)} type="text" id="default-input" className="bg-white bg-opacity-20 border border-gray-300 border-opacity-30 outline-none focus:outline focus:outline-[#d4af37] text-gray-200 text-sm rounded-lg w-full p-2.5" placeholder='Enter Your Fen String' />
                            <motion.button onClick={() => BoardFromFEN()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='border border-[#d4af37] text-black rounded-md marble p-3 px-5 shadow-2xl'>
                                <FaChess />
                            </motion.button>
                        </form>
                        <motion.button onClick={() => copyFEN()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='border border-[#d4af37] text-black rounded-md marble p-3 px-5 shadow-2xl'>
                            <BiCopy />
                        </motion.button>
                    </div>
                </div>
               <div className='text-white w-full flex flex-col opacity-60'>
                    <div className='hidden md:flex md:flex-col gap-8 pt-48'>
                        <p className='flex flex-row gap-3 items-center self-center'>You can place peices on the board and generate the relevant <Link href="https://www.chess.com/terms/fen-chess" className='underline'>FEN string</Link>, copying it to clipboard using <BiCopy />.</p>
                        <p className='flex flex-row gap-3 items-center self-center'>Or, you can see the board layout using your own FEN by writing it and pressing <FaChess />.</p>
                        <hr className='w-1/3 self-center' />
                        <p className='flex flex-row gap-3 items-center self-center'>If you want to clear the board, you can press the {"'"}Empty{"'"} button followed by <FaChess />.</p>
                        <p className='flex flex-row gap-3 items-center self-center'>And, for the standard opening position, press {"'"}Standard{"'"}, then <FaChess />.</p>
                    </div>

                    <div className='md:hidden flex flex-col gap-8 text-2xl pt-32'>
                        <p className='flex flex-row gap-3 items-center'>You can place peices on the board and generate the relevant FEN, copying it to clipboard using <BiCopy />.</p>
                        <p className='flex flex-row gap-3 items-center'>Or, you can see the board layout using your own FEN by writing it and pressing <FaChess />.</p>
                        <Link href="https://www.chess.com/terms/fen-chess" className='underline text-center'>What even is FEN</Link>
                        <hr className='w-1/3 self-center' />
                        <p className='flex flex-row gap-3 items-center'>If you want to clear the board, you can press the {"'"}Empty{"'"} button followed by <FaChess />.</p>
                        <p className='flex flex-row gap-3 items-center'>And, for the standard opening position, press {"'"}Standard{"'"}, then <FaChess />.</p>
                    </div>

               </div>
            </main>
         
        </>
    )
}

const HomeButton = () => (
    <Link href="/">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='marble border border-[#d4af37] fixed md:absolute right-[15%] md:right-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <GrHome />
        </motion.button>
    </Link>

    
)

const BackButton = () => (
    <Link href="/playground">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='marble border border-[#d4af37] fixed md:absolute left-[15%] md:left-[10%] top-[90%] md:top-[10%] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <BiArrowBack />
        </motion.button>
    </Link>
   
)