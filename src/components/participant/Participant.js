/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ParticipantTable from './ParticipantTable';
import { fetchParticipants } from '../../actions/participantActions';

class Participant extends Component {

    componentDidMount() {
        this.props.getRepos();
    }

    render() {
        return (
            <ParticipantTable participants={this.props.participants}/>
        );
    }
}

Participant.propTypes = {
    participants: PropTypes.array,
    error: PropTypes.string,
    isFetching: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        participants: state.participants.participants,
        error: state.participants.error,
        isFetching: state.participants.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getRepos: () => dispatch(fetchParticipants())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);