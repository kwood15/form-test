import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

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
  },
  error: {
    color: 'red'
  }
};

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: ''
};

const validation: Yup.ObjectSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email')
  .required('This is a required field')
});

export const FormikWrapper: React.FC<{}> = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validation}
    onSubmit={(values, { setSubmitting }) => {
      // todo post
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }}
    render={({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <fieldset style={styles.fieldset}>
          <label htmlFor="email" aria-label="Email">
            Email
          </label>
          <div>
            <Field
              style={styles.input}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              // onChange={handleChange}
              // onBlur={handleBlur}
              autoComplete="email"
            />
            {errors.email && touched.email && (
               <div><span style={styles.error}>{errors.email}</span></div>
            )}
          </div>
        </fieldset>
        <fieldset style={styles.fieldset}>
          <label htmlFor="password" aria-label="Password">
            Password
          </label>
          <div>
            <Field
              style={styles.input}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              // onChange={handleChange}
              // onBlur={handleBlur}
              autoComplete="current-password"
            />
            {errors.password && touched.password && (
               <div><span style={styles.error}>{errors.password}</span></div>
            )}
          </div>
        </fieldset>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    )}
  />
);
