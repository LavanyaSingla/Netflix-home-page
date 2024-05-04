import React from 'react';
import './Home.scss';
import axios from 'axios';
const apiKey ="7097b47d67b4f154140d7023e8806ce"
const url="https://api.themoviedb.org/3"
const Card = (img) => (
    <img className='card' src={img} alt="cover" />
)
const Row = ({ title ,arr=[]}) => {
    <div className='row'>
        <h2>{title}</h2>
        <div>
            {
                arr.map(()=>(
                    <Card />
                ))
            }
        </div>
    </div>
}
const Home = () => {
    return (
        <section className="home">
            <div className="banner">
                <Row title={"Popular on Netflix"} />
            </div>
        </section>
    )
}

export default Home