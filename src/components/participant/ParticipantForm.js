/**
 * Created by bao on 3/6/17.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { validationRequired, validationEmail, renderField } from './FormFields';

import '../../styles/ParticipantForm.css';

class ParticipantForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="participantForm">
        <div className="form-input">
          <Field name="name" component={renderField} type="text" validate={validationRequired} label="Full Name"/>
        </div>
        <div className="form-input double-size">
          <Field name="email" component={renderField} type="text" validate={[validationRequired, validationEmail]} label="E-mail address"/>
        </div>
        <div className="form-input">
          <Field name="phone" component={renderField} type="text" validate={validationRequired} label="Phone number"/>
        </div>
        <div className="form-input submit">
          <button type="submit">Add New</button>
        </div>
      </form>
    );
  }
}

ParticipantForm = reduxForm({
  form: 'addParticipant'
})(ParticipantForm);

export default ParticipantForm;
