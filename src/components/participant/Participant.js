/**
 * Created by bao on 3/6/17.
 */

import React, { Component } from 'react';

import ParticipantTable from './ParticipantTable';

class Participant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participants : [
                {
                    id: "1",
                    name: "bao",
                    email: "bao@gmail.com",
                    address: "test street"
                }
            ]
        };
    }

    render() {
        return (
            <ParticipantTable participants={this.state.participants}/>
        );
    }
}

export default Participant;