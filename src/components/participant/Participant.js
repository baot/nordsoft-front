/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ParticipantTable from './ParticipantTable';
import ParticipantForm from './ParticipantForm';
import { fetchParticipants, postParticipant,
  requestEditingFormParticipant, cancelEditingParticipant, editParticipant } from '../../actions/participantActions';

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
          editFormParticipantHandler={this.props.getEditFormParticipant}
          editingParticipant={this.props.editingParticipant}
          initialValues={this.props.editingParticipant}
          cancelEditParticipantHandler={this.props.cancelEditParticipant}
          requestEditParticipant={this.props.requestEditParticipant}
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
    getEditFormParticipant: PropTypes.func,
    cancelEditParticipant: PropTypes.func,
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
        getEditFormParticipant: (participant) => dispatch(requestEditingFormParticipant(participant)),
        cancelEditParticipant: (participant) => dispatch(cancelEditingParticipant(participant)),
        requestEditParticipant: (participant) => dispatch(editParticipant(participant)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
