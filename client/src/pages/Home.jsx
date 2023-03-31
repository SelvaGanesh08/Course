import React from 'react'
import FooterBar from '../components/FooterBar'
import NavBar from '../components/NavBar'
import bg from '../img/bg.jpg'
function Home() {

    return (
        
        <>
        <NavBar/>
            <section className="hero-section" style={{backgroundImage:`url(${bg})`}}>
                <div className="container">
                    <div className="hero-text text-white">
                        <h2>Get The Best Online Courses</h2>
                        
                    </div>
                </div>
            </section>
            {/* Hero sec*/}
        <FooterBar/>
        </>


    )
}

export default Home