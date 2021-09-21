import React from "react";
import {FillDelete, Search, ContactInfo, PersonPlus, ArrowSortedDownIcon, ArrowSortedUpIcon} from "./component";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fade  from 'react-reveal/Fade'
import ButtonComponent from "./ButtonComponent";
import "./style.css";

const TableComponent = ({
  setCurrentSelectedData,
  handleDeleteUser,
  users,
  insertUserData,
  loadDummyData,
  searchHandler,
  deleteDummyAccounts,
  handleGenerateAccountNo,
  searchTerm,
  sortByAccountNumber,
  sortByFullName,  
  sortByAddress,
  sortByMobileNo,
  sortByEmail,
  sortByCurrentBalance,
  convertToMoney,
  isOrdered,  
  setShow  
}) => {
 

  return (
    <>        
      <ToastContainer
      pauseOnFocusLoss={false}   
      limit={8}      
      />
      <div className="btns-n-search">  
        <div className="add-client-btns">
          <ButtonComponent
            handleFunction={handleGenerateAccountNo}
            iconName={<PersonPlus />}
            btnDescription={" Add Client"}
            btnClass={"btn btn-primary user-btn"}
            dbsToggle={"modal"}
            dbsTarget={"#exampleModal"}
          />
          <ButtonComponent
            handleFunction={insertUserData}
            btnDescription={"Load Data"}
            btnClass={
              loadDummyData
                ? "btn btn-secondary user-btn"
                : "btn btn-primary user-btn"
            }
          />
          <ButtonComponent
            handleFunction={deleteDummyAccounts}
            btnDescription={"Delete Data"}
            btnClass={
              loadDummyData
                ? "btn btn-primary user-btn"
                : "btn btn-secondary user-btn"
            }
          />
        </div>
        <div className="d-flex user-input">           
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={searchHandler}
            value={searchTerm}
          />
           <div style={{backgroundColor: "white", border: "1px solid #ced4da", borderRadius: "0.25rem", borderLeft: "none"}}>
            <Search size={40}/>
            </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th style={{cursor: "pointer"}} onClick={() => sortByAccountNumber()} scope="col">
                Acct # {isOrdered.accountNumber ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>
              <th style={{cursor: "pointer"}} onClick={() => sortByFullName()} scope="col">
                Full Name {isOrdered.fullName ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>              
              <th style={{cursor: "pointer"}} onClick={() => sortByAddress()} scope="col">
                Address {isOrdered.address ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>
              <th style={{cursor: "pointer"}} onClick={() => sortByMobileNo()} scope="col">
              Phone No. {isOrdered.mobileNo ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>
              <th style={{cursor: "pointer"}} onClick={() => sortByEmail()} scope="col">
              Email {isOrdered.email ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>
              <th style={{cursor: "pointer"}} onClick={() => sortByCurrentBalance()} scope="col">
                Balance {isOrdered.balance ? <ArrowSortedDownIcon/> : <ArrowSortedUpIcon/>}
              </th>
              <th scope="col" className="action-col">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((data, index) => {
                return (
                  <Fade up duration={index>10 ? 1000: `${index}00`}>
                  <tr key={index}>
                    <th scope="row">{data.account_no}</th>
                    <td>{data.first_name + " " + data.last_name}</td>                    
                    <td>{data.address}</td>
                    <td>{data.mobile_no}</td>
                    <td>{data.email}</td>
                    <td>{convertToMoney(data.balance)}</td>
                    <td className="action-btns">
                      <ButtonComponent
                        handleFunction={() => {setCurrentSelectedData(data); setShow(true)}}
                        iconName={<ContactInfo className="white" />}
                        btnClass={"btn btn-info"}
                        dbsToggle={"modal"}
                        dbsTarget={"#detailsModal"}
                      />

                      {/* <ButtonComponent
                        handleFunction={() => handleDeleteUser(data.account_no)}
                        iconName={<FillDelete />}
                        btnClass={"btn btn-danger"}
                      /> */}
                    </td>
                  </tr>
                  </Fade>
                );
              })
            ) : (
              <th className="no-user-available" colSpan="100%">
                <h3>No User Available</h3>
              </th>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableComponent;
