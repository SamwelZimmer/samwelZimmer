import Link from "next/link";

export default function HomePage() {
    return (
      <>
        <main className="flex flex-col gap-12">
          <div>
            <h1 className="text-6xl text-slate-700">Samwel Zimmer</h1>
          </div>
          <Link href={"https://masters.samwelzimmer.com/"} className="hover:opacity-50 underline">Master's Project</Link>
          <Link href={"https://projects.samwelzimmer.com/"} className="hover:opacity-50 underline">Check out all my other projects</Link>

          <div className="flex flex-col opacity-40">
            As you can probably tell, this site is just temporary and another, hopefully better, one is slowly being constructed.
          </div>
        </main>
      </>

    );
}