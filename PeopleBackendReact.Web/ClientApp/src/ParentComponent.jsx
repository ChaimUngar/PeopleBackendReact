import React from "react";
import PersonForm from "./PersonForm";
import axios, { all } from 'axios';
import PeopleTable from "./PeopleTable";
import { produce } from 'immer';

class ParentComponent extends React.Component {

    state = {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
        },
        edit: false,
        allChecked: false,
        checkedIds: []
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data });
        });

    }

    componentDidMount = () => {
        this.loadPeople();
    }

    onTextChange = (e) => {
        const nextState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person
        axios.post('/api/people/add', { firstName, lastName, age }).then(() => {
            this.loadPeople()
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            })
        })
    }

    onEditClick = ({ id, firstName, lastName, age }) => {
        const nextState = produce(draft => {
            draft.person.id = id,
                draft.person.firstName = firstName,
                draft.person.lastName = lastName,
                draft.person.age = age
            draft.edit = true
        })

        this.setState(nextState)
        console.log(this.state.person)
    }

    onCancelClick = () => {
        const nextState = produce(draft => {
            draft.person.firstName = '',
                draft.person.lastName = '',
                draft.person.age = ''
            draft.edit = false
        })

        this.setState(nextState)
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(() => {
            this.loadPeople()
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                edit: false
            })
        })
    }

    onDeleteOneClick = (person) => {
        axios.post('/api/people/deleteone', person).then(() => {
            this.loadPeople()
        })
    }

    onDeleteAllCheckedClick = () => {
        axios.post('/api/people/deleteallchecked', { ids: this.state.checkedIds }).then(() => {
            this.loadPeople()
        })
    }

    onCheckedClick = () => {
        const { allChecked, people } = this.state

        if (allChecked) {
            this.setState({ checkedIds: [], allChecked: false })
            
        } else {
            this.setState({checkedIds: [...people].map(p => p.id), allChecked: true})
        }

    }

    onCheckedChange = (p) => {
        const { checkedIds } = this.state
        if (checkedIds.includes(p.id)) {
            this.setState({ checkedIds: checkedIds.filter(id => id !== p.id) })
        } else {
            this.setState({ checkedIds: [...checkedIds, p.id] })
        }
    }

    render() {
        const { firstName, lastName, age } = this.state.person
        const { people, edit, checkedIds } = this.state

        return (
            <>
                <div className='container mt-5'>
                    <PersonForm firstName={firstName}
                        lastName={lastName}
                        age={age}
                        onTextChange={this.onTextChange}
                        onAddClick={this.onAddClick}
                        edit={edit}
                        onCancelClick={this.onCancelClick}
                        onUpdateClick={this.onUpdateClick} />

                    <PeopleTable people={people}
                        onEditClick={this.onEditClick}
                        onDeleteOneClick={this.onDeleteOneClick}
                        onDeleteAllCheckedClick={this.onDeleteAllCheckedClick}
                        onCheckedClick={this.onCheckedClick}
                        onCheckedChange={this.onCheckedChange}
                        checkedIds={checkedIds} />
                </div>
            </>

        )
    }
}

export default ParentComponent