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
                        <h2>Get The Best Free Online Courses</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                            malesuada lorem maximus mauris scelerisque, at rutrum nulla <br />{" "}
                            dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.
                        </p>
                    </div>
                </div>
            </section>
            {/* Hero sec*/}
        <FooterBar/>
        </>


    )
}

export default Home