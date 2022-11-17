'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { GrHomeOption } from "react-icons/gr";
import { IoChevronBackOutline } from "react-icons/io5";

import './styles.css';

export default function Neumorphism() {
    const [isPressed, setIsPressed] = useState(false);
    const [color, setColor] = useState("#c0c0c0");
    const [shadow, setShadow] = useState('#a5a5a5');
    const [highlight, setHighlight] = useState("#dbdbdb");

    const [selectedColor, setSelectedColor] = useState("grey");

    const pressButton = () => {
        setIsPressed(!isPressed)
    }

    const changeColor = (colorHex, shadowHex, highlightHex) => {
        setColor(colorHex);
        setShadow(shadowHex);
        setHighlight(highlightHex);
    }

    const selectColor = (color) => {
        setSelectedColor(color);
        console.log(selectedColor)
    }

    function BackButton () {
        const [backPressed, setBackPressed] = useState(false);
        const backPress = () => {
            setBackPressed(!backPress);
        }
        return (
            <Link className='absolute top-[10%] left-[10%]' href="/playground">
                <div className="w-full grid items-center justify-center">
                    <button onClick={() => backPress()} className={`displayed-container${backPressed ? "-pressed" : ""}-${selectedColor} w-[70px] md:w-[60px] rounded-xl aspect-square flex justify-center items-center text-4xl md:text-base`}>
                        <IoChevronBackOutline style={{ opacity: "0.5"}} />
                    </button>
                </div>
            </Link>
        )
    }

    function HomeButton() {
        const [homePressed, setHomePressed] = useState(false);
        const homePress = () => {
            setHomePressed(!homePressed);
        }
        return (
            <Link className='absolute top-[10%] right-[10%]' href="/">
                <div className="w-full grid items-center justify-center">
                    <button onClick={() => homePress()} className={`displayed-container${homePressed ? "-pressed" : ""}-${selectedColor} w-[70px] md:w-[60px] rounded-xl aspect-square flex justify-center items-center text-4xl md:text-base`}>
                        <GrHomeOption style={{ opacity: "0.5"}} />
                    </button>
                </div>
            </Link>
        )
    }

    return (
      <main className={`bg-${selectedColor} h-screen flex flex-col justify-center items-center pb-2`}>

        <BackButton />
        <HomeButton />

        <section className='w-full flex flex-col items-center justify-center py-32'>
            <div className='grid grid-flow-row grid-cols-4 md:grid-cols-8 w-2/3 gap-6'>
            <button className={`select-button${selectedColor === "white" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("white")} className='bg-[#ffffff] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "beige" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("beige")} className='bg-[#fdf5e6] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "grey" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("grey")} className='bg-[#c0c0c0] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "orange" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("orange")} className='bg-[#ffe2d6] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "red" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("red")} className='bg-[#561029] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "purple" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("purple")} className='bg-[#1a0a53] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "blue" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("blue")} className='bg-[#00364a] w-full aspect-square rounded-full'></div>
                </button>
                <button className={`select-button${selectedColor === "black" ? "-pressed" : ""}-${selectedColor} w-[50px] aspect-square p-2`}>
                    <div onClick={() => selectColor("black")} className='bg-[#232323] w-full aspect-square rounded-full'></div>
                </button>
            </div>
        </section>

        <h1 className="text-6xl w-full text-center opacity-50 text-slate-300">Neumorphism</h1>

        <section className='py-32'>
            <div className="w-full grid items-center justify-center">
                <button onClick={() => pressButton()} className={`displayed-container displayed-container${isPressed ? "-pressed" : ""}-${selectedColor} w-[125px] md:w-[100px] aspect-square`}></button>
            </div>
          
        </section>
            <h3 className="absolute bottom-0 text-lg w-full text-center opacity-70 text-slate-300 px-6 pb-2">
                An evolution on {"'"}skeuomorphic{"'"} design.
                <br/>
                Elements sit on the background, yet slightly raised, whilst using similar materials and textures.
            </h3>
      </main>


    );
}