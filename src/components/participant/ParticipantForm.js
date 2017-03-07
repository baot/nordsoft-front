/**
 * Created by bao on 3/6/17.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import '../ParticipantForm.css';

class ParticipantForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="participantForm">
        <div className="form-input">
          <Field name="name" component="input" type="text" placeholder="Full Name"/>
        </div>
        <div className="form-input double-size">
          <Field name="email" component="input" type="text" placeholder="E-mail address"/>
        </div>
        <div className="form-input">
          <Field name="phone" component="input" type="text" placeholder="Phone number"/>
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
