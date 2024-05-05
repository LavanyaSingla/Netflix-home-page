import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <div className="banner">

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
            </div>

        </section>
    )
}

export default Home
