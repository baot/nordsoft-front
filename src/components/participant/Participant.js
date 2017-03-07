/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ParticipantTable from './ParticipantTable';
import ParticipantForm from './ParticipantForm';
import { fetchParticipants, postParticipant, requestEditingParticipant } from '../../actions/participantActions';

class Participant extends Component {

  componentDidMount() {
    this.props.getParticipants();
  }

  render() {
    return (
      <div>
        <ParticipantForm onSubmit={this.props.addParticipant}/>
        <ParticipantTable
          participants={this.props.participants}
          editParticipantHandler={this.props.requestEditParticipant}
          editingParticipant={this.props.editingParticipant}
          initialValues={this.props.editingParticipant}
        />
      </div>
    );
  }
}

Participant.propTypes = {
    participants: PropTypes.array,
    error: PropTypes.string,
    isFetching: PropTypes.bool,
    getParticipants: PropTypes.func,
    addParticipant: PropTypes.func,
    requestEditParticipant: PropTypes.func,
    editingParticipant: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        participants: state.participants.participants,
        error: state.participants.error,
        isFetching: state.participants.isFetching,
        editingParticipant: state.participants.editingParticipant,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getParticipants: () => dispatch(fetchParticipants()),
        addParticipant: (participant) => dispatch(postParticipant(participant)),
        requestEditParticipant: (participantId) => dispatch(requestEditingParticipant(participantId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
