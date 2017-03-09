/**
 * Created by bao on 3/6/17.
 */

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import { map } from 'ramda';

import { validationRequired, validationEmail, renderField } from './FormFields';

import '../ParticipantTable.css';

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
    <div>
      <button onClick={cancelHandler}>Cancel</button>
      <button onClick={confirmHandler}>{(isDelete) ? "Delete" : "Save"}</button>
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
    participants, editFormParticipantHandler, editingParticipant,
    isDeleteForm, cancelEditParticipantHandler, requestEditParticipant,
    getDeleteFormParticipant, deleteParticipant, cancelDeletingParticipant, handleSubmit,
    sortParticipant,
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
                editParticipant={editFormParticipantHandler.bind(null, participant)}
                deleteParticipant={getDeleteFormParticipant.bind(null, participant)}/>
            </div>
          </div>
        );
      } else if (isDeleteForm) {
        return (
          <div className="table-row body" key={participant.id}>
            <div className="text">{participant.name}</div>
            <div className="text double-size">{participant.email}</div>
            <div className="text">{participant.phone}</div>
            <div className="option">
              <SubmitOptionComponent
                isDelete={true}
                cancelHandler={cancelDeletingParticipant.bind(null, participant)}
                confirmHandler={deleteParticipant.bind(null, participant)}/>
            </div>
          </div>
        );
      }

      return (
        <div className="table-row body" key={editingParticipant.id} >
          <div className="text">
            <Field
              name="name" component={renderField}
              type="text" validate={validationRequired} label="Full name"/>
          </div>
          <div className="text double-size">
            <Field name="email" component={renderField}
              type="text" validate={[validationEmail, validationRequired]} label="E-mail address"/>
          </div>
          <div className="text">
            <Field name="phone" component={renderField}
              type="text" validate={validationRequired} label="Phone number"/>
          </div>
          <div className="option">
            <SubmitOptionComponent
              isDelete={false}
              cancelHandler={cancelEditParticipantHandler.bind(null, participant)}
              confirmHandler={handleSubmit(data => {
                requestEditParticipant(data);
              })}/>
          </div>
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

  return (
    <div className="table-container">
      <div className="table-row header">
        <div
          className={divClass('name')}
          onClick={props.sortParticipant.bind(null, "name", true)}>Name</div>
        <div
          className={divClass('email')}
          onClick={props.sortParticipant.bind(null, "email", true)}>E-mail address</div>
        <div
          className={divClass('phone')}
          onClick={props.sortParticipant.bind(null, "phone", true)}>Phone number</div>
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
  isDeleteForm: PropTypes.bool,
  deleteParticipant: PropTypes.func.isRequired,
  getDeleteFormParticipant: PropTypes.func.isRequired,
  cancelDeletingParticipant: PropTypes.func.isRequired,
  sortParticipant: PropTypes.func.isRequired,
  sortAttribute: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

ParticipantTable = reduxForm({
  form: 'editParticipant',
  enableReinitialize: true, // form will reinitialize everytime initialValue changes
})(ParticipantTable);

export default ParticipantTable;
