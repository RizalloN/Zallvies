import React, {useEffect} from "react";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const {data:favorites = []} = useFavorites();
  const { isOpen, closeModal} = useInfoModal();

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
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <ToastContainer theme="dark" />
      <Billboard />
      <div className="pb-40">
      <MovieList title="Trending Now" data={movies}/>
      <MovieList title="My List" data={favorites}/>
      </div>
    </>
  );
}
