import {SocialFooter} from "../../components/social/footer";


export function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" text-3xl md:text-4xl font-bold mt-20">Lucas Gabriel</h1>
      <span className="mb-5 mt-3"> Veja meus links: </span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-neutral-900 text-neutral-100 mb-4 w-full py-4 rounded-lg select-none transiction-transform hover:bg-neutral-800">
          <a href="">
            <p className="text-base md:text-lg"> Canal do youtube </p>
          </a>
        </section>
        <SocialFooter/>
      </main>
    </div>
  );
}
