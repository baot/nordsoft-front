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

const populateRows = (participants, editParticipantHandler, editingParticipant) => {
  return map((participant) => {
    if (!Object.is(editingParticipant, participant)) {
      return (
        <div className="table-row body" key={participant.id}>
          <div className="text">{participant.name}</div>
          <div className="text double-size">{participant.email}</div>
          <div className="text">{participant.phone}</div>
          <div className="option">
            <OptionComponent
              editParticipant={editParticipantHandler.bind(null, participant)}/>
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
          <OptionComponent
            editParticipant={editParticipantHandler.bind(null, participant)}/>
        </div>
      </div>
    );

  })(participants);
};

let ParticipantTable = ({ participants, editParticipantHandler, editingParticipant }) => {
  return (
    <div className="table-container">
      <div className="table-row header">
        <div className="text">Name</div>
        <div className="text double-size">E-mail address</div>
        <div className="text">Phone number</div>
        <div className="option"></div>
      </div>
      {populateRows(participants, editParticipantHandler, editingParticipant)}
    </div>
  );
};

ParticipantTable.propTypes = {
  participants: PropTypes.array.isRequired,
  editParticipantHandler: PropTypes.func.isRequired,
  editingParticipant: PropTypes.object,
};

ParticipantTable = reduxForm({
  form: 'editParticipant',
  enableReinitialize: true, // form will reinitialize everytime initialValue changes
})(ParticipantTable);

export default ParticipantTable;
