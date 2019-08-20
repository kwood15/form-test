import * as React from 'react';
import { Formik, Form } from 'formik';
 
export const FormikWrapper: React.SFC = () => (
  <Formik
    initialValues={{ name: '', email: ''}}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Submitted value', values);
      setTimeout(() => setSubmitting(false), 3 * 1000);
    }}
  >
    {props => (
      <Form>
        <label htmlFor="email" aria-label="Email">Email</label>
        <input 
          id="email" 
          name="email"
          type="email"
          placeholder="Enter your email"
          value={props.values.email}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </Form>
    )}
  </Formik>
);