import React, { Component } from 'react';
import {connect} from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { loggedIn } from '../Actions';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            tags: false,
            addTags: false
        }
    }

    // componentDidMount() {
    //     this.props.mutate({
    //         variables: {}
    //     })
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    searchChangeHandler = event => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    hoverToggle = () => {
        const active = this.state.tags;
        this.setState({tags: !active});
    }

    mouseOut = () => {
        this.setState({tags: false});
    }

    addTags = () => {
        const active = this.state.addTags;
        this.setState({addTags: !active});
    }

    render() {
        console.log('notes', this.props.notes)
        console.log('length', this.props.notes.length)
        console.log('loggedin', this.props.loggedIn)
        const filter = (this.props.notes.length > 0 && this.props.loggedIn) ? this.props.notes.filter(note => note.title.toLowerCase().includes(this.state.search.toLowerCase())) : [];
        return (
            <div className='Notes'>
            <div className='Notes--Search'>
                <input placeholder="Search..." name='search' value={this.state.search} onChange={this.searchChangeHandler} />
            </div>
            <ul>
                {filter.map((note, index) => {
                return <li className='note' onClick={() => {this.props.previewNote(note.title, note.content, note.id)}} key={note.id} onMouseOver={this.hoverToggle} onMouseOut={this.mouseOut}>
                    <div className="note--title" >
                    {note.Title.length > 30 ? note.title.substring(0,30).concat('...') : note.title}
                    </div>
                    <br/>
                    <div className='note--text'>
                    {note.content.length > 70 ? note.content.substring(0,70).concat('...') : note.content}
                    </div>
                </li>
                })}
            </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        loggedIn: state.loggedIn
    }
}

// const getNotes = gql `
//     query notes {
//         notes {
//             id
//             title
//             content
//         }
//     }
// `
// const NotesComponent = graphql(getNotes)(Notes);

export default connect(mapStateToProps) (Notes);