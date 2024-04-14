import React from "react";

export default function PersonRow({ firstName, lastName, age, onEditClick, onDeleteOneClick, onCheckedChange, checked }) {
    return (
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input type="checkbox" className="form-check-input mt-2" style={{ transform: 'scale(1.5)' }}
                            onChange={onCheckedChange} checked={checked}></input >
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td><button className="btn btn-info" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={onDeleteOneClick}>Delete</button>
            </td>
        </tr>
    )
}

