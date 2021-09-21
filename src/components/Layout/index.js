import React from 'react'
import {
    BrowserRouter as Router,
    Switch,     
    Route,
} from 'react-router-dom';
import './style.css'
import {
    OutlineHome,
    OutlineDashboard,
    UsersIcon,
    LogIn,
    TransactionIcon,
    Calculator
} from './components'
import HomeComponent from '../Home'
import UsersComponent from '../Users'
import Withdrawals from '../Dashboard/Withdrawals'
import Deposits from '../Dashboard/Deposits'
import Transfers from '../Dashboard/Transfers'
import Profile from '../Profile';
import bankLogo from '../../assets/blg.png'
import defaultProfPic from '../../assets/blank_image.png'
import useHooks from './hooks'
import LinkComponent from './LinkComponent';
import LoginModalComponent from './LoginComponent';
import UserSectionComponent from './UserSectionComponent';
import TransactionComponent from '../Transaction'
import BudgetAppComponent from '../BudgetApp'
import { Link } from "react-router-dom";


// React Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'



const Index = () => {
    const {
        usernameInput,
        setUsernameInput,
        passwordInput,
        setPasswordInput,
        selected,
        isAdmin,
        loginAccount,
        setLoginAccount,
        admin,
        setAdmin,
        historiesSelected,
        handleSelectedMenu,
        handleCheckUser,
        handleLogout,
        matchesMD,
        users,
        setUsers,
        isUser,
        passwordState,
        handleShowPassword,
        handleHidePassword,
        setSelected,
        modalShow,
        setModalShow   
    } = useHooks();

    return (
        <>
            <Router>
            {loginAccount[0] ?
                matchesMD ?
            <div className="side-bar d-flex flex-column flex-shrink-0 p-3 bg-light" styled={{width: '280px'}}>
            <Link to={"/"}>
                <a href="/" onClick={() => handleSelectedMenu(0)} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4"><img src={bankLogo} style={{width: '50%'}} alt="Bank Logo"/></span>
                </a></Link>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">                        
                        <LinkComponent
                        selected={selected}
                        handleSelectedMenu={handleSelectedMenu}
                        Icon={OutlineHome}
                        path={"/"}
                        index={0}
                        description={"Home"}
                        hasSpan={true}                            
                        />
                    </li>
                    <li>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className={`accordion-button ${historiesSelected? `` : `collapsed`}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded={historiesSelected? 'true' : 'false'} aria-controls="collapseTwo" style={{pointerEvents: historiesSelected? `none` : ``}}>
                                    <span className="menus"><OutlineDashboard /></span>Dashboard
                                </button>
                            </h2>
                            <div id="collapseTwo" className={`accordion-collapse collapse ${historiesSelected? `show` : ``}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">                                   
                                        <li className="dashboard-list">
                                        
                                        <LinkComponent
                                            selected={selected}
                                            path={"/dashboard/withdrawals"}
                                            handleSelectedMenu={handleSelectedMenu}
                                            index={1}
                                            description={"Withdrawals History"}
                                        />
                                        </li>                                                                      
                                        <li className="dashboard-list">
                                       
                                        <LinkComponent
                                            path={"/dashboard/deposits"}
                                            handleSelectedMenu={handleSelectedMenu}
                                            selected={selected}
                                            index={2}
                                            description={"Deposits History"}
                                        />
                                        </li>                                        
                                        <li className="dashboard-list">
                                        
                                        <LinkComponent
                                            path={"/dashboard/transfers"}
                                            handleSelectedMenu={handleSelectedMenu}
                                            selected={selected}
                                            index={3}
                                            description={"Transfers History"}
                                        />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    {isAdmin && 
                        <li>          
                            <LinkComponent
                                path={"/users"}
                                handleSelectedMenu={handleSelectedMenu}
                                selected={selected}
                                index={4}
                                hasSpan={true}
                                Icon={UsersIcon}
                                description={"Users"}
                            />
                        </li> 
                    }
                    {isUser && 
                        <>
                            <li>          
                                <LinkComponent
                                    path={"/transactions"}
                                    handleSelectedMenu={handleSelectedMenu}
                                    selected={selected}
                                    index={5}
                                    hasSpan={true}
                                    Icon={TransactionIcon}
                                    description={"Transactions"}
                                />
                            </li>
                            {/* <li>          
                                <LinkComponent
                                    path={"/budget"}
                                    handleSelectedMenu={handleSelectedMenu}
                                    selected={selected}
                                    index={6}
                                    hasSpan={true}
                                    Icon={StatisticsIcon}
                                    description={"Budget"}
                                />
                            </li> */}
                        </>
                    }
                </ul>
                <hr/>
                
                {loginAccount.length === 1 ? <UserSectionComponent
                    loginAccount={loginAccount}
                    handleSelectedMenu={handleSelectedMenu}
                    handleLogout={handleLogout}
                    defaultProfPic={defaultProfPic}
                    Link={Link}
                /> : ''}
        </div>
         : 
         <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <a href="/" onClick={() => handleSelectedMenu(0)} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <span className="fs-4"><img src={bankLogo} style={{width: '50%'}} alt="Bank Logo"/></span>
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className={`${selected === 0 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(0)}><Link to="/" className={`${selected === 0 ? 'mobile-menus' : ''} mobile-links`}>🏠Home</Link></Nav.Link>
                    <NavDropdown title={`⏲️Dashboard`} id="basic-nav-dropdown">

                    <NavDropdown.Item className={`${selected === 1 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(1)}><Link to="/dashboard/withdrawals" className={`${selected === 1 ? 'mobile-menus' : ''} `}><div className='mobile-links'>Withdrawals</div></Link></NavDropdown.Item>
                    <NavDropdown.Item className={`${selected === 2 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(2)}><Link to="/dashboard/deposits" className={`${selected === 2 ? 'mobile-menus' : ''}`}><div className='mobile-links'>Deposits</div></Link></NavDropdown.Item>
                    <NavDropdown.Item className={`${selected === 3 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(3)}><Link to="/dashboard/transfers" className={`${selected === 3 ? 'mobile-menus' : ''}`}><div className='mobile-links'>Transfers</div></Link></NavDropdown.Item>
                    
                    </NavDropdown>

                    {isAdmin &&  <Nav.Link className={`${selected === 4 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(4)}><Link to="/users" className={`${selected === 4 ? 'mobile-menus' : ''} mobile-links`}>🧘Users</Link></Nav.Link>}
                    {isUser &&  <Nav.Link className={`${selected === 5 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(5)}><Link to="/transactions" className={`${selected === 5 ? 'mobile-menus' : ''} mobile-links`}><TransactionIcon />Transactions</Link></Nav.Link>}
                    {/* {isUser &&  <Nav.Link className={`${selected === 6 ? 'mobile-menus' : ''}`} onClick={() => handleSelectedMenu(6)}><Link to="/budget" className={`${selected === 6 ? 'mobile-menus' : ''} mobile-links`}><TransactionIcon />Budget</Link></Nav.Link>} */}


                    <NavDropdown.Divider />
                    {loginAccount.length === 1 ? 
                        <UserSectionComponent
                            loginAccount={loginAccount}
                            handleSelectedMenu={handleSelectedMenu}
                            handleLogout={handleLogout}
                            Link={Link} 
                        />
                    : ''}
                </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
        <hr className="hr" />
        </>  
       : '' }



        {loginAccount[0] &&
        <Switch>
            <>
                <div className="routes-container">
                <Route path="/" exact component={HomeComponent}>
                    <HomeComponent
                    setSelected={setSelected}
                    isAdmin={isAdmin}
                     />
                </Route>
            {isAdmin &&
                <Route path="/users" exact  component={UsersComponent}>
                    <UsersComponent />
                </Route>
            }
            {isUser &&
            <>
                <Route path="/transactions" exact  component={TransactionComponent}>
                    <TransactionComponent 
                    />
                </Route>
                {/* <Route path="/budget-app" exact  component={BudgetAppComponent}>
                    <BudgetAppComponent 
                    />
                </Route> */}
            </>
            }
                <Route path="/dashboard/withdrawals" exact  component={Withdrawals}>
                    <Withdrawals loginAccount={loginAccount} isUser={isUser}/>
                </Route>
                <Route path="/dashboard/deposits" exact  component={Deposits}>
                    <Deposits loginAccount={loginAccount} isUser={isUser}/>
                </Route>
                <Route path="/dashboard/transfers" exact  component={Transfers}>
                    <Transfers loginAccount={loginAccount} isUser={isUser}/>
                </Route>
                <Route path="/profile" exact  component={Profile}>
                    <Profile defaultProfPic={defaultProfPic} loginAccount={loginAccount} setLoginAccount={setLoginAccount} admin={admin} setAdmin={setAdmin} users={users} setUsers={setUsers}/>
                </Route>
                </div>
            </>
        </Switch>
        }

        

            {/* Login Modals */}  
            {loginAccount.length === 1 ? '' :
            <LoginModalComponent
                LogIn={LogIn}
                loginAccount={loginAccount}
                usernameInput={usernameInput}
                setUsernameInput={setUsernameInput}
                passwordInput={passwordInput}
                setPasswordInput={setPasswordInput}
                handleCheckUser={handleCheckUser}
                passwordState={passwordState}
                handleShowPassword={handleShowPassword}
                handleHidePassword={handleHidePassword}
                modalShow={modalShow}
                setModalShow={setModalShow}
            /> }     
        </Router>
    </>
    )
}

export default Index
