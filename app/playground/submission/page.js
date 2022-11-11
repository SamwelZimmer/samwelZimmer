'use client';

import './styles.css';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsFillCaretLeftFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

function getWindowDimensions() {
    if (typeof window !== 'undefined') {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height};
    }
}

export default function PlaygoundPage() {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isSignUp, setIsSignUp] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const percentX = (mousePosition.x / windowDimensions?.width) * 100
    const percentY = (mousePosition.y / windowDimensions?.height) * 100

    const changeToSignUp = () => {
        setIsSignUp(!isSignUp)
    }

    const emailValidation = () => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase())
    }

    useEffect(() => {
        setValid(emailValidation());
    }, [email])


    const handleSubmit = (e, email) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if (typeof window !== 'undefined') {
        useEffect(() => {
            const handleMouseMove = (e) => {
                setMousePosition({ x: e.clientX, y: e.clientY });
            };
    
            window.addEventListener('mousemove', handleMouseMove);
    
            return () => {
                window.removeEventListener(
                  'mousemove',
                  handleMouseMove
                );
            }; 
        }, []);
    }




    const mouseVariants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10
        }
    }

    const overlayVariants = {
        default: {
            x: 0,
            y: 0,
            opacity: 1
        },
        drop: {
            x: 500,
            opacity: 0,
            rotate: 30
        },
        btnStart: {
            x: 0,
            y: -100,
            opacity: 0
        },
        btnEnd: {
            x: 0,
            y: 0,
            opacity: 1
        }
    }

    const SubmitVariants = {
        left: {
            x: 100
        },
        right: {
            x: -100
        }
    }

    const dropOverlay = () => {
        if (isSignUp) return "drop"
        else return "default"
    }

    const dropButton = () => {
        if (isSignUp) return "btnEnd"
        else return "btnStart"
    }

    const changePosition = () => {
        if (percentY < 85 && percentY > 70 && !valid) {
            if (percentX < 50 && percentX > 44) {
                return "left"
            }
            else if (percentX < 54 && percentX > 50) {
                return "right"
            }
        }
        else return null
    }

    return (
        <>
            <BackButton />
            <HomeButton />

            <motion.div 
                className='w-6 aspect-square rounded-full glass-pointer z-20 fixed'
                variants={mouseVariants}
                animate="default"
            ></motion.div>

            {/* Central Part */}
            <main className='absolute top-0 left-0 shifting-background h-screen w-screen'>
                    {submitted ? 
                        // Submission Successful
                        <div className={`z-50 w-[400px] centered-axis-xy`}>
                            <motion.div className='main-container rounded-xl w-[400px] aspect-square flex flex-col justify-center gap-12 px-12 text-white font-medium text-5xl text-center cursor-pointer'>
                                Cheers Lad
                                <p className='text-base opacity-70'>I got your email.</p>
                                <p className='text-base opacity-30'>bad choice</p>
                            </motion.div>
                        </div>
                    :
                    <>
                        {/* Overlay */}
                        <div className={`z-50 w-[400px] centered-axis-xy`}>
                            <motion.div variants={overlayVariants} animate={dropOverlay} whileHover={{ rotate: 15, translateX: -30 }}  onClick={changeToSignUp} className='main-container rounded-xl w-[400px] aspect-square flex flex-col justify-center gap-12 px-12 text-white font-medium text-5xl text-center cursor-pointer'>
                                Wanna Sign Up?
                                <p className='text-base opacity-70'>Click Me</p>
                            </motion.div>
                        </div>
                    
                        {/* Email Form */}
                        <form className='' onSubmit={handleSubmit}>
                            <div className={`w-[400px] centered-axis-xy  ${isSignUp ? `z-50` : `z-10`}`}>
                                <div className='main-container rounded-xl w-full aspect-square flex flex-col justify-center gap-12 px-12'>
                                    <div>
                                        <h3 className='text-center text-4xl text-white opacity-70 font-semibold'>Gimme Your Email</h3>
                                        <p className='text-center text-base text-white opacity-50 pt-2'>(please)</p>
                                    </div>
                                    <div className='w-full flex-col items-center justify-center gap-2'>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 rounded-xl glass-input border border-transparent focus:outline-none text-slate-600 placeholder:text-slate-100 placeholder:text-opacity-60' placeholder='email'></input>
                                        <p className='text-white text-sm opacity-50 text-center'>In the form {"'"}abc@email.com{"'"}</p>

                                    </div>
                                </div>
                            </div>

                            {/* Moving Submit Button */}
                            <motion.div variants={overlayVariants} animate={dropButton} className='p-2 fixed top-[75%] left-[46%] z-20'>
                                <motion.button disabled={!valid} required type='submit' variants={SubmitVariants} animate={changePosition}  className='glass-btn px-6 py-3 text-white rounded-xl'>
                                    Submit
                                </motion.button>
                            </motion.div>
                        </form>
                    </>}   
            </main>

            <p className='absolute bottom-[5%] w-full text-center text-white opacity-30'>
                this page has been designed specifically for mouse input
            </p>

            {/* Shapes */}
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -1000 }} animate={{ rotate: 360, translateY: -1000, translateX: 1000 }} transition={{ duration: 7, repeat: Infinity }} className='absolute top-[30%] left-[12%] w-12 z-0'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -500 }} animate={{ rotate: 360, translateY: -1000, translateX: 500 }} transition={{ duration: 10, repeat: Infinity }} className='absolute top-[10%] left-[70%] w-44 z-10'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 360, translateY: 1000, translateX: -10 }} animate={{ rotate: -360, translateY: -1000, translateX: 30 }} transition={{ duration: 25, repeat: Infinity }} className='absolute top-[70%] left-[10%] w-32 z-20'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -500 }} animate={{ rotate: 360, translateY: -1000, translateX: 30 }} transition={{ duration: 7, repeat: Infinity }} className='absolute top-[20%] left-[90%] w-8 z-10'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: -360, translateY: 1000, translateX: -100 }} animate={{ rotate: 360, translateY: -1000, translateX: 400 }} transition={{ duration: 17, repeat: Infinity }} className='absolute top-[15%] left-[15%] w-16 z-0'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -10 }} animate={{ rotate: -360, translateY: -1000, translateX: 1000 }} transition={{ duration: 20, repeat: Infinity }} className='absolute top-[35%] left-[22%] w-40 z-10'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -1000 }} animate={{ rotate: 360, translateY: -1000, translateX: 200 }} transition={{ duration: 32, repeat: Infinity }} className='absolute top-[64%] left-[60%] w-32 z-0'><GenerateSquares /></motion.div>
            <motion.div initial={{ rotate: 0, translateY: 1000, translateX: -400 }} animate={{ rotate: 360, translateY: -1000, translateX: 600 }} transition={{ duration: 21, repeat: Infinity }} className='absolute top-[25%] left-[73%] w-8 z-20'><GenerateSquares /></motion.div>

            
        </>
    );
}

function GenerateSquares() {
    return (
        <div className={`bg-red-900 glass rounded-xl aspect-square w-full`} />
    );
}

function BackButton() {
    return (
        <Link href="/playground" className="glass-btn absolute top-12 left-12 z-50 rounded-full p-3 text-white opacity-50">
            <BsFillCaretLeftFill />
        </Link>
    )
}

function HomeButton() {
    return (
        <Link href="/" className="glass-btn absolute top-12 right-12 z-50 rounded-full p-3 text-white opacity-50">
            <AiFillHome />
        </Link>
    )
}