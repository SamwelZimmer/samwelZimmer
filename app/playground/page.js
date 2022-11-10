import './styles.css';

import Link from 'next/link';

function randomBoxShape() {
  const weights = [1, 1, 1, 1, 2, 2, 2];
  const height = weights[Math.floor(Math.random() * weights.length)];
  const width = weights[Math.floor(Math.random() * weights.length)];
  const types = [`col-span-1 row-span-1 aspect-square justify-end`, `col-span-1 row-span-2 aspect-[2/1] justify-start`, `col-span-2 row-span-1 aspect-[2/1] justify-start`]
  return types[Math.floor(Math.random() * types.length)];
}

export default function PlaygoundPage() {
    return (
      <main>
        <div className='py-12 flex flex-col gap-1'>
          <h1 className="text-5xl md:text-6xl w-full text-right px-3 dark:text-white opacity-60 dark:opacity-70">Samwel{"'"}s Playground</h1>
          <h1 className="text-base md:text-xl font-thin w-full text-right px-3 dark:text-white opacity-70">A collage of loose ends</h1>
        </div>

        <section className='px-6 py-12'>
          <div className='grid w-full h-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-6 gap-12'>
            <Link href="/playground/neumorphism" className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>neumorphism</h4>
              <p className='dark:text-white opacity-50'>a design style</p>
            </Link>
            <div className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>project 2</h4>
              <p className='dark:text-white opacity-50'>project 2 sub</p>
            </div>
            <div className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>project 2</h4>
              <p className='dark:text-white opacity-50'>project 2 sub</p>
            </div>            
            <div className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>project 2</h4>
              <p className='dark:text-white opacity-50'>project 2 sub</p>
            </div>            
            <div className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>project 2</h4>
              <p className='dark:text-white opacity-50'>project 2 sub</p>
            </div>            
            <div className={`w-full h-full px-2 py-8 flex flex-col rounded-xl displayed-container ${randomBoxShape()}`}>
              <h4 className='dark:text-white opacity-90'>project 2</h4>
              <p className='dark:text-white opacity-50'>project 2 sub</p>
            </div>
          </div>
        </section>
      </main>
    );
  }