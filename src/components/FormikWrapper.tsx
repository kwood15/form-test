import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

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

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: ''
};

const validationSchema: Yup.ObjectSchema = Yup.object().shape({
  email: Yup.string()
    .min(1, 'This field must be at least 1 character long')
    .required('This is a required field')
});

export const FormikWrapper: React.FC<{}> = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
      <form style={styles.form} onSubmit={handleSubmit}>
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
              autoComplete="email"
            />
            {errors.email}
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
              autoComplete="current-password"
            />
          </div>
          {errors.password}
        </fieldset>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    )}
  </Formik>
);
