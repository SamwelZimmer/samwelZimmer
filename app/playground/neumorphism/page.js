'use client';

import { useEffect, useState } from 'react';

import './styles.css';

export default function Neumorphism() {
    const [isPressed, setIsPressed] = useState(false);
    const [color, setColor] = useState("#c0c0c0");
    const [shadow, setShadow] = useState('#a5a5a5');
    const [highlight, setHighlight] = useState("#dbdbdb");

    const [selectedColor, setSelectedColor] = useState("grey");

    const pressButton = () => {
        setIsPressed(!isPressed)
        console.log(isPressed)
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




    return (
      <main className={`bg-${selectedColor} h-screen flex flex-col pb-2`}>
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
                <button onClick={() => pressButton()} className={`displayed-container displayed-container${isPressed ? "-pressed" : ""}-${selectedColor} w-[100px] aspect-square`}></button>
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