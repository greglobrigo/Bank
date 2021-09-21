import React from 'react'
import {    
    FillDelete,
    ContactInfo
} from './component';
import ButtonComponent from './ButtonComponent';

function TableComponent({setCurrentSelectedData, handleDeleteUser, expenses}) {

    
    return (
        <>
             <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="action-col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ?
                    expenses.map((data, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{data.item_name}</th>
                                <td>{data.quantity}</td>
                                <td>{data.price}</td>
                                <td className="action-btns">
                                                            
                                    <ButtonComponent
                                        handleFunction = {()=>setCurrentSelectedData(data)}
                                        iconName = {<ContactInfo />}                                                                     
                                        btnClass= {"btn btn-info"}
                                        dbsToggle={"modal"}
                                        dbsTarget={"#detailsModal"}
                                    />
                                
                                    <ButtonComponent
                                        handleFunction = {() => handleDeleteUser(index)}
                                        iconName = {<FillDelete />}                                                                 
                                        btnClass= {"btn btn-danger"}
                                    />
                                </td>
                            </tr>
                        )
                    }) : <th className="no-user-available" colSpan="100%"><h3>No Expenses Available</h3></th>}
                </tbody>
            </table>
        </>
    )
}

export default TableComponent
