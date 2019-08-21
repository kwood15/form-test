import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// todo
const styles = {
  form: {
    padding: '50px'
  },
  fieldset: {
    border: 'none'
  },
  input: {
    padding: '3px 4px'
  }
};

const validationSchema: Yup.ObjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'This field must be at least 1 character long')
    .required('This is a required field')
});

export const FormikWrapper: React.FC = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values, { setSubmitting }) => {
      console.log('Submitted value', values);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 8000);
    }}
  >
    {({ handleChange, handleBlur, values }) => (
      <Form style={styles.form}>
        <fieldset style={styles.fieldset}>
          <label htmlFor="email" aria-label="Email">
            Email
          </label>
          <div>
            <input
              style={styles.input}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
        </fieldset>
        <fieldset style={styles.fieldset}>
          <label htmlFor="password" aria-label="Password">
            Password
          </label>
          <div>
            <input
              style={styles.input}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </fieldset>
        <div>
          <button type="submit">Login</button>
        </div>
      </Form>
    )}
  </Formik>
);
