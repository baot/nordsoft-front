/**
 * Created by bao on 3/8/17.
 */

import React from 'react';

export function validationRequired(value /*, allValues, props */) {
  if (!value) {
    return 'required';
  }
}

export function validationEmail(value /* ,allValues, props */) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined
}

export function renderField({ input, label, type, meta: { touched, error, warning } }) {
  return (
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  );
}
