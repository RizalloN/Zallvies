/* eslint-disable @next/next/no-img-element */
import useCurrentUser from "@/hooks/currentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    
    if(!session){
      return {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
    }
  
    return {
      props: {}
    }
}
const Profiles = () => {
    const router = useRouter();
    const { data: user } = useCurrentUser(); 
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);
  
      return () => {
        clearTimeout(timer);
      };
    }, [router]);
    useEffect(() => {
        const handleContextMenu = (event: Event) => {
          event.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu);
        };
        }, []);
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Currently Watching</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push('/')}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent 
                            group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/images/profile-yellow.png" alt="profile" />
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center
                            group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profiles;