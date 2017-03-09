/**
 * Created by bao on 3/6/17.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import ParticipantTable from './ParticipantTable';
import ParticipantForm from './ParticipantForm';
import * as participantActions from '../../actions/participantActions';
import * as participantTableActions from '../../actions/participantTableActions';
import { sortMap, Comparator } from '../../services/participant';

class Participant extends Component {

  componentDidMount() {
    this.props.participantRequestActions.fetchParticipants();
  }

  render() {
    return (
      <div>
        <ParticipantForm onSubmit={this.props.participantRequestActions.postParticipant}/>
        <ParticipantTable
          participants={this.props.participants}
          isFetching={this.props.isFetching}
          editingParticipant={this.props.editingParticipant}
          initialValues={this.props.editingParticipant} // for edit redux-form
          isDeleteForm={this.props.isDeleteForm}
          sortAttribute={this.props.sortAttribute}
          participantRequestActions={this.props.participantRequestActions}
          participantTableActions={this.props.participantTableActions} />
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
          Comparator(state.participantTable.sortAttribute)
        ),
        isFetching: state.participants.isFetching,
        editingParticipant: state.participantTable.editingParticipant,
        isDeleteForm: state.participantTable.isDeleteForm,
        sortAttribute: state.participantTable.sortAttribute,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        participantRequestActions: bindActionCreators(participantActions, dispatch),
        participantTableActions: bindActionCreators(participantTableActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
