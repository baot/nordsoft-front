/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ParticipantTable from './ParticipantTable';
import ParticipantForm from './ParticipantForm';
import { fetchParticipants, postParticipant,
  requestEditingFormParticipant, cancelEditingParticipant } from '../../actions/participantActions';

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
          cancelEditParticipantHandler={this.props.cancelEditParticipant}
        />
      </div>
    );
  }
}

Participant.propTypes = {
    participants: PropTypes.object,
    error: PropTypes.string,
    isFetching: PropTypes.bool,
    getParticipants: PropTypes.func,
    addParticipant: PropTypes.func,
    requestEditParticipant: PropTypes.func,
    cancelEditParticipant: PropTypes.func,
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
        requestEditParticipant: (participant) => dispatch(requestEditingFormParticipant(participant)),
        cancelEditParticipant: (participant) => dispatch(cancelEditingParticipant(participant)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
