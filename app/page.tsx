import Link from "next/link";

export default function HomePage() {
    return (
      <>
        <main className="flex flex-col gap-12">
          <div>
            <h1 className="text-6xl text-slate-300">Samwel Zimmer</h1>
            <p className="text-2xl text-slate-500">Home Page</p>
          </div>
          <Link href={"https://masters.samwelzimmer.com/"} className="hover:opacity-50" >To Masters Project</Link>
        </main>
      </>

    );
}