import React from 'react'

function FooterBar(){
    return(
        <>
  {/* footer section */}
  <footer className="footer-section spad pb-0">
    <div className="footer-top">
      <div className="footer-warp">
        <div className="row">
          <div className="widget-item">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              <li>
                1481 Creekside Lane <br />
                Avila Beach, CA 931
              </li>
              <li>+53 345 7953 32453</li>
              <li>yourmail@gmail.com</li>
            </ul>
          </div>
          <div className="widget-item">
            <h4>Newsletter</h4>
            <form className="footer-newslatter">
              <input type="email" placeholder="E-mail" />
              <button className="site-btn">Subscribe</button>
              <p>*We don’t spam</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  </footer>
  {/* footer section end */}
</>

    )
}

export default FooterBar