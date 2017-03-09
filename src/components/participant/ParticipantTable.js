/**
 * Created by bao on 3/6/17.
 */

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import { map } from 'ramda';

import { validationRequired, validationEmail, renderField } from './FormFields';

import '../../styles/ParticipantTable.css';

const OptionComponent = ({ editParticipant, deleteParticipant }) => {
  return (
    <div>
      <a className="fa fa-pencil" onClick={editParticipant}/>
      <a className="fa fa-trash" onClick={deleteParticipant}/>
    </div>
  );
};

OptionComponent.propTypes = {
  editParticipant: PropTypes.func.isRequired,
  deleteParticipant: PropTypes.func.isRequired,
};

const SubmitOptionComponent = ({ isDelete, cancelHandler, confirmHandler }) => {
  return (
    <div className="button option">
      <button className="cancel" onClick={cancelHandler}>Cancel</button>
      <button className="confirm" onClick={confirmHandler}>{(isDelete) ? "Delete" : "Save"}</button>
    </div>
  );
};

SubmitOptionComponent.propTypes = {
  isDelete: PropTypes.bool.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  confirmHandler: PropTypes.func.isRequired,
};

// TODO REFACTOR
const populateRows = ({
    participants, editingParticipant, isDeleteForm, handleSubmit, participantRequestActions, participantTableActions
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
                editParticipant={participantTableActions.requestEditingFormParticipant.bind(null, participant)}
                deleteParticipant={participantTableActions.requestDeletingFormParticipant.bind(null, participant)}/>
            </div>
          </div>
        );
      } else if (isDeleteForm) {
        return (
          <div className="table-row body" key={participant.id}>
            <div className="text">{participant.name}</div>
            <div className="text double-size">{participant.email}</div>
            <div className="text">{participant.phone}</div>
              <SubmitOptionComponent
                isDelete={true}
                cancelHandler={participantTableActions.cancelDeletingParticipant.bind(null, participant)}
                confirmHandler={participantRequestActions.deleteParticipant.bind(null, participant)}/>
          </div>
        );
      }

      return (
        <div className="table-row body" key={editingParticipant.id} >
          <div className="text edit">
            <Field
              name="name" component={renderField}
              type="text" validate={validationRequired} label="Full name"/>
          </div>
          <div className="text edit double-size">
            <Field name="email" component={renderField}
              type="text" validate={[validationEmail, validationRequired]} label="E-mail address"/>
          </div>
          <div className="text edit">
            <Field name="phone" component={renderField}
              type="text" validate={validationRequired} label="Phone number"/>
          </div>
            <SubmitOptionComponent
              isDelete={false}
              cancelHandler={participantTableActions.cancelEditingParticipant.bind(null, participant)}
              confirmHandler={handleSubmit(data => {
                participantRequestActions.editParticipant(data);
              })}/>
        </div>
      );

    })(participants.valueSeq());
};

let ParticipantTable = (props) => {
  const divClass = (attr) => {
    return classNames({
      text: true,
      'double-size': (attr === 'email'),
      'fa fa-arrow-down': (attr === props.sortAttribute)
    });
  };

  const { sortParticipant } = props.participantTableActions;

  return (
    <div className="table-container">
      <div className="table-row header">
        <div
          className={divClass('name')}
          onClick={sortParticipant.bind(null, "name", true)}>Name</div>
        <div
          className={divClass('email')}
          onClick={sortParticipant.bind(null, "email", true)}>E-mail address</div>
        <div
          className={divClass('phone')}
          onClick={sortParticipant.bind(null, "phone", true)}>Phone number</div>
        <div className="option"></div>
      </div>
      {populateRows(props)}
    </div>
  );
};

ParticipantTable.propTypes = {
  participants: PropTypes.object.isRequired,
  editingParticipant: PropTypes.object,
  isDeleteForm: PropTypes.bool,
  sortAttribute: PropTypes.string,
  participantRequestActions: PropTypes.object,
  participantTableActions: PropTypes.object,
};

ParticipantTable = reduxForm({
  form: 'editParticipant',
  enableReinitialize: true, // form will reinitialize everytime initialValue changes
})(ParticipantTable);

export default ParticipantTable;
