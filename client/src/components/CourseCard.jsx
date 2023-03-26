import React from 'react'

function CourseCard(prop){

    return(
        <>
  {/* course */}
  <div className="mix col-lg-3 col-md-4 col-sm-6 design">
    <div className="course-item">
      <div className="course-thumb set-bg" data-setbg="img/courses/2.jpg">
        <div className="price">Price: $15</div>
      </div>
      <div className="course-info">
        <div className="course-text">
          <h5>{prop.title}</h5>
          <p>Lorem ipsum dolor sit amet, consectetur</p>
          <div className="students">120 Students</div>
        </div>
        <div className="course-author">
          <p>
            William Parker, <span>Developer</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  {/* course */}
</>

    )
}

export default CourseCard