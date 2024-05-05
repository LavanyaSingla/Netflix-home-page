import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "7097b47d67b4f154140d702d3e8806ce";
const url = "https://api.themoviedb.org/3";
const upcoming = "upcoming";
const imgUrl = "https://image.tmdb.org/t/p/original"
const now_playing = "now_playing";
const popular = "popular";
const top_rated = "top_rated";

const Card = ({ img }) => (
    <img className='card' src={img} alt="cover" />
);
const Row = ({ title, arr = [] }) => {
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div>
                {
                    arr.map((item, index) => (
                        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
                    ))
                }
            </div>
        </div>
    )
}
const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [playingMovies, setPlayingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [genre, setGenre] = useState([])
    useEffect(() => {
        const fetchData = async (type, setting) => {
            const { data: { results } } = await axios.get(`${url}/movie/${type}?api_key=${apiKey}`);
            setting(results)
        }
        fetchData(upcoming, setUpcomingMovies);
        fetchData(now_playing, setPlayingMovies);
        fetchData(top_rated, setTopRatedMovies);
        fetchData(popular, setPopularMovies);

        const fetchGenre = async () => {
            const { data } = await axios.get(`${url}/genre/tv/list?api_key=${apiKey}`);

            setGenre(data.genres);
            console.log(data)
        };
        fetchGenre()
    }, [])

    return (
        <section className="home">
            <div className="banner" style={{
                backgroundImage: popularMovies[0] ?
                    `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` : "none"
            }}>
                {
                    popularMovies[0] && (
                        <h1>{popularMovies[0].original_title}</h1>
                    )
                }
                {
                    popularMovies[0] && (
                        <p>{popularMovies[0].overview}</p>
                    )
                }

                <div>
                    <button><BiPlay /> Play</button>
                    <button>My List <AiOutlinePlus /></button>

                </div>
            </div>

            <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Recently Played"} arr={playingMovies} />
            <Row title={"Top-Rated"} arr={topRatedMovies} />
            <Row title={"Popular"} arr={popularMovies} />

            <div className="genreBox">

                {
                    genre.map((item) => (
                        <Link key={item.id} to={`/genre/${item.id}`}>
                            {item.name}
                        </Link>
                    ))
                }


            </div>

        </section>
    )
}

export default Home
