import React from 'react'


const UserSectionComponent = ({loginAccount, handleSelectedMenu, handleLogout, defaultProfPic, Link}) => {    
    return (
        <>
             <div className="dropdown" style={{zIndex: "100"}}>
                    <a href="google.com" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={loginAccount[0].thumbnail_url || defaultProfPic || '/static/media/blank_image.07300db7.png'} alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>{loginAccount[0].first_name}</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <Link to="/profile"><li><p className="dropdown-item" onClick={() => handleSelectedMenu()}>Profile</p></li></Link>
                        <li><hr className="dropdown-divider"/></li>
                        <li><div className="dropdown-item" onClick={() => handleLogout()}>Sign out</div></li>
                    </ul>
                </div>
        </>
    )
}

export default UserSectionComponent
