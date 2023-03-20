import React from 'react'
function SearchBar() {
    return (
        <>
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    {/* search form */}
                    <form className="course-search-form">
                        <input type="text" placeholder="Course" />
                        <input type="text" className="last-m" placeholder="Category" />
                        <button className="site-btn btn-dark">Search Couse</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchBar