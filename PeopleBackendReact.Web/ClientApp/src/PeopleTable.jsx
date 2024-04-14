import React from "react";
import PersonRow from "./PersonRow";

export default function PeopleTable({ people, onEditClick, onDeleteOneClick, onDeleteAllCheckedClick, 
    onCheckedChange, onCheckedClick, checkedIds }) {
    return (
        <table className="table table-hover table-striped table-bordered">
            <thead>
                <tr>
                    <th style={{ width: '15%' }}>
                        <button className="btn btn-danger w-100" onClick={onDeleteAllCheckedClick}>Delete All Checked</button>
                        <button className="btn btn-outline-danger w-100 mt-2" onClick={onCheckedClick}>Check All</button>
                        <button className="btn btn-outline-danger w-100 mt-2" onClick={onCheckedClick}>Uncheck All</button>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {people.map(p => <PersonRow
                    key={p.id}
                    firstName={p.firstName}
                    lastName={p.lastName}
                    age={p.age}
                    onEditClick={() => onEditClick(p)}
                    onDeleteOneClick={() => onDeleteOneClick(p)}
                    onCheckedChange={() => onCheckedChange(p)}
                    checked={checkedIds.includes(p.id)} />)}
            </tbody>
        </table>
    )
}