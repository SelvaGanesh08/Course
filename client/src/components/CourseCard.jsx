import React from 'react'

function CourseCard({ data }) {

  return (
    <div className=" course-items-area">
      {data.map((item) => (

        // <div className="mix col-lg-3 col-md-4 col-sm-6 design">
          <div className="course-item" key={item.id}>
              <div className="price">{item.title}</div>
            <div className="course-info">
              <div className="course-text">
                <h5>Rating{item.rating}</h5>
                
                <div className="students">Reviews:{item.reviews}</div>
                <span className='course-author'><a href={item.url}>Vist</a></span> 
              </div>
              {/* <div className="course-author">
               
              </div> */}
            </div>
          {/* </div> */}
        </div>

      ))}

</div>
  )
}

export default CourseCard