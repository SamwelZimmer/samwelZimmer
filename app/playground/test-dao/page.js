'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BiArrowBack, BiHomeAlt } from "react-icons/bi";
import { motion } from 'framer-motion';

import './styles.css';

import welcomePage from './public/welcome.png';
import mintPage from './public/mint.png';
import memberPage from './public/member_page.png';
import tokenSupply from './public/token_supply.png';
import wallet from './public/wallet.png';

export default function TestDAO() {
    return (
        <div className='w-full h-full bg-green-400'>

            <div className='bg-color fixed w-screen h-screen' />
            
            <div className='fixed flex md:flex-col justify-between p-[50px] h-screen w-screen z-30'>
                <HomeButton />
                <BackButton />
            </div>
            
            <main className="fixed flex flex-col text-2xl px-20 md:pr-0 md:text-base gap-20 pt-[30%] md:pt-40 text-center md:text-left md:justify-around left-0 top-0 h-screen w-screen md:w-2/3 py-40 pl-[50px] border-r-8 border-[#6F1D1B] border-opacity-20 text-[#BB9457]">
                <div className='md:w-1/2'>
                    <p>This project is simply my first step in blockchain development.</p>
                    <p>It is a simple <Link href="https://www.investopedia.com/tech/what-dao/" className='underline'>DAO</Link> where members can democratically vote.</p>
                    <p>Once the voting time has elapsed, the outcome of the vote is fulfilled via a <Link href="https://www.ibm.com/uk-en/topics/smart-contracts" className='underline'>smart contract</Link>.</p>
                </div>

                <h1 className='text-6xl font-thin text-[#6F1D1B] md:w-[80%]'>Decentralized Autonomous Organization</h1>

                <div className='md:w-1/2'>
                    <p>I am using the <Link className='underline' href="https://www.alchemy.com/overviews/goerli-faucet#:~:text=Goerli%20is%20a%20proof%20of,Goerli%20ETH%20to%20execute%20transactions.">Goerli testnet</Link> as results in essentially costless development.</p>
                    <p>The site is not live as it is to be un-manned from here on out.</p>
                </div>

                <p className='opacity-50'>This project was made possible by <Link className='underline' href="https://buildspace.so/">buildspace</Link>.</p>
            </main>

            <aside className='backdrop-blur-sm md:backdrop-blur-0 text-2xl md:text-base md:bg-transparent top-[60%] md:top-0 right-0 absolute w-full md:w-2/3 text-center text-[#99582A] pb-32'>
                <Image src={welcomePage} alt="Welcome Page"></Image>
                <p>The landing page of the DAO.<br/> You connect your Metamask wallet as a form of authorisation.</p>
                <Image src={mintPage} alt="Mint Page"></Image>
                <p>At this point, you have the option to mint a ERC-1155 entry token</p>
                <p className='opacity-40'>This basically means that multiple people can own the same token</p>
                <Image src={memberPage} alt="Member Page"></Image>
                <p>Once the token is in the wallet you have member access.</p>
                <p className='opacity-40'>You can see all the members and the amount of governance tokens they own.</p>
                <p className='opacity-40'>You can also vote on proposals.</p>
                <div className='flex flex-row w-full items-center justify-center'> 
                    <Image src={wallet} alt="Wallet" className='w-[320px] h-[500px]'></Image>
                    <Image src={tokenSupply} alt="Token Supply" className='h-[300px] w-[500px]'></Image>
                </div>
                <p className=''>The governance token {"("}SWL{")"} can be found in the members Metamask wallet.</p>
                <p className='opacity-40'>And the transactions / contracts can be seen on Etherscan.</p>
            </aside>
        </div>
    );
}

const HomeButton = () => (
    <Link href="https://www.samwelzimmer.com" className=''>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='border border-[#432818] text-[#6F1D1B] fixed shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <BiHomeAlt />
        </motion.button>
    </Link>
);

const BackButton = () => (
    <Link href="https://www.samwelzimmer.com/playground" className=''>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='marble border border-[#432818] text-[#6F1D1B] shadow-2xl aspect-square p-3 rounded-md text-5xl md:text-xl font-serif'>
            <BiArrowBack />
        </motion.button>
    </Link>
);
