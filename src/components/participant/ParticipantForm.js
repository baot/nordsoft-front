/**
 * Created by bao on 3/6/17.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class ParticipantForm extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <Field name="name" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="email">E-mail address</label>
                    <Field name="email" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="phone">Phone number</label>
                    <Field name="phone" component="input" type="text" />
                </div>
                <button type="submit">Add New</button>
            </form>
        );
    }
}

ParticipantForm = reduxForm({
    form: 'addParticipant'
})(ParticipantForm);

export default ParticipantForm;