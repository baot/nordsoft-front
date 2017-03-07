/**
 * Created by bao on 3/6/17.
 */

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { map } from 'ramda';

import '../ParticipantTable.css';

const OptionComponent = ({ editParticipant }) => {
  return (
    <div>
      <a className="fa fa-pencil" onClick={editParticipant}/>
      <a className="fa fa-trash" />
    </div>
  );
};

OptionComponent.propTypes = {
  editParticipant: PropTypes.func.isRequired,
};

const SubmitOptionComponent = ({ cancelEdit, saveEdit }) => {
  return (
    <div>
      <button onClick={cancelEdit}>Cancel</button>
      <button onClick={saveEdit}>Save</button>
    </div>
  )
};

SubmitOptionComponent.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
};

const populateRows = ({
    participants, editFormParticipantHandler,
    editingParticipant, cancelEditParticipantHandler, requestEditParticipant
  }) => {
    return map((participant) => {
      if (!Object.is(editingParticipant, participant)) {
        return (
          <div className="table-row body" key={participant.id}>
            <div className="text">{participant.name}</div>
            <div className="text double-size">{participant.email}</div>
            <div className="text">{participant.phone}</div>
            <div className="option">
              <OptionComponent
                editParticipant={editFormParticipantHandler.bind(null, participant)}/>
            </div>
          </div>
        );
      }

      return (
        <div className="table-row body" key={editingParticipant.id} >
          <div className="text">
            <Field name="name" component="input" type="text"/>
          </div>
          <div className="text double-size">
            <Field name="email" component="input" type="text"/>
          </div>
          <div className="text">
            <Field name="phone" component="input" type="text"/>
          </div>
          <div className="option">
            <SubmitOptionComponent
              cancelEdit={cancelEditParticipantHandler.bind(null, participant)}
              saveEdit={requestEditParticipant.bind(null, participant)}/>
          </div>
        </div>
      );

    })(participants.valueSeq());
};

let ParticipantTable = (props) => {
  return (
    <div className="table-container">
      <div className="table-row header">
        <div className="text">Name</div>
        <div className="text double-size">E-mail address</div>
        <div className="text">Phone number</div>
        <div className="option"></div>
      </div>
      {populateRows(props)}
    </div>
  );
};

ParticipantTable.propTypes = {
  participants: PropTypes.object.isRequired,
  editFormParticipantHandler: PropTypes.func.isRequired,
  editingParticipant: PropTypes.object,
  cancelEditParticipantHandler: PropTypes.func.isRequired,
  requestEditParticipant: PropTypes.func.isRequired,
};

ParticipantTable = reduxForm({
  form: 'editParticipant',
  enableReinitialize: true, // form will reinitialize everytime initialValue changes
})(ParticipantTable);

export default ParticipantTable;
