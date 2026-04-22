import {SocialFooter} from "../../components/social/footer";
import { useEffect, useState } from "react";

import { db } from "../../services/firebaseConection";
import { getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
 } from "firebase/firestore";


interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps{
  linkedin: string,
  instagram: string,
  github: string,
}
 

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(()=>{
    function loadLinks(){
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef).then((snapshot)=>{
        const lista = [] as LinksProps[];

        snapshot.forEach((doc) =>{
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })

        setLinks(lista);
      }).catch(()=>{})
      

    }

    loadLinks();

  }, [])

  useEffect(()=>{
   function loadSocialLinks(){
 const docRef = doc(db, "social", "linkSocial");
    getDoc(docRef).then((snapshot)=>{
      if(snapshot.data() !== undefined){
        setSocialLinks({
          linkedin: snapshot.data()?.linkedin,
          instagram: snapshot.data()?.instagram,
          github: snapshot.data()?.github,
        })
      }
    })
   }
   loadSocialLinks();
  }, [])


  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" text-3xl md:text-4xl font-bold mt-20">Lucas Gabriel</h1>
      <span className="mb-5 mt-3"> Veja meus links: </span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
       {
        links.map((link)=>{
         return  ( <section key={link.id} className={`"bg-neutral-900 text-neutral-100 mb-4 w-full py-4 rounded-lg select-none transiction-transform hover:bg-neutral-800"`} style={{backgroundColor: link.bg, color: link.color}}>
          <a href={link.url} target="_blanck">
            <p className="text-base md:text-lg"> {link.name} </p>
          </a>
        </section>)
        })
       }
        <SocialFooter instagram={socialLinks?.instagram} linkedin={socialLinks?.linkedin} github={socialLinks?.github}/>
      </main>
    </div>
  );
}
