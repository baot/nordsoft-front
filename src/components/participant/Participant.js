/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ParticipantTable from './ParticipantTable';
import ParticipantForm from './ParticipantForm';
import { fetchParticipants, postParticipant,
  editParticipant, deleteParticipant } from '../../actions/participantActions';
import { requestEditingFormParticipant, cancelEditingParticipant, sortParticipant,
  requestDeletingFormParticipant, cancelDeletingParticipant } from '../../actions/participantTableActions';
import { sortMap, Comparator } from '../../services/participant';

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
          isFetching={this.props.isFetching}
          editingParticipant={this.props.editingParticipant}
          initialValues={this.props.editingParticipant} // for edit redux-form
          isDeleteForm={this.props.isDeleteForm}
          sortAttribute={this.props.sortAttribute}
          cancelEditParticipantHandler={this.props.cancelEditParticipant}
          requestEditParticipant={this.props.requestEditParticipant}
          deleteParticipant={this.props.deleteParticipant}
          getDeleteFormParticipant={this.props.getDeleteFormParticipant}
          cancelDeletingParticipant={this.props.cancelDeletingParticipant}
          editFormParticipantHandler={this.props.getEditFormParticipant}
          sortParticipant={this.props.sortParticipant}
        />
      </div>
    );
  }
}

Participant.propTypes = {
    // from participantReducer
    participants: PropTypes.object,
    isFetching: PropTypes.bool,
    // from participantTableReducer
    editingParticipant: PropTypes.object,
    isDeleteForm: PropTypes.bool,
    sortAttribute: PropTypes.string,
    // from participant actions
    getParticipants: PropTypes.func,
    addParticipant: PropTypes.func,
    deleteParticipant: PropTypes.func,
    requestEditParticipant: PropTypes.func,
    // from participant table actions
    getEditFormParticipant: PropTypes.func,
    cancelEditParticipant: PropTypes.func,
    getDeleteFormParticipant: PropTypes.func,
    cancelDeletingParticipant: PropTypes.func,
    sortParticipant: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        participants: sortMap(
          (state.participants.participants),
          Comparator(state.participantTable.sortAttribute)),
        isFetching: state.participants.isFetching,
        editingParticipant: state.participantTable.editingParticipant,
        isDeleteForm: state.participantTable.isDeleteForm,
        sortAttribute: state.participantTable.sortAttribute,
    };
};

// TODO use bindActionCreators
const mapDispatchToProps = (dispatch) => {
    return {
        getParticipants: () => dispatch(fetchParticipants()),
        addParticipant: (participant) => dispatch(postParticipant(participant)),
        getEditFormParticipant: (participant) => dispatch(requestEditingFormParticipant(participant)),
        cancelEditParticipant: (participant) => dispatch(cancelEditingParticipant(participant)),
        requestEditParticipant: (participant) => dispatch(editParticipant(participant)),
        getDeleteFormParticipant: (participant) => dispatch(requestDeletingFormParticipant(participant)),
        cancelDeletingParticipant: (participant) => dispatch(cancelDeletingParticipant(participant)),
        deleteParticipant: (participant) => dispatch(deleteParticipant(participant)),
        sortParticipant: (attribute, isAscending) => dispatch(sortParticipant(attribute, isAscending)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
