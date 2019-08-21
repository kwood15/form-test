import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

// todo
const styles: any = {
  fieldset: {
    border: 'none'
  },
  input: {
    padding: '3px 4px'
  },
  error: {
    color: 'red'
  },
  button: {
    border: 'none',
    padding: '4px 8px',
    primary: {
      color: '#ffffff',
      backgroundColor: '#3c93bc',
    },
    secondary: {
      color: '#404040',
      backgroundColor: '#e8e8e8'
    }
  }
};

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const validationSchema: Yup.ObjectSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password has to be longer than 6 characters!'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords are not the same')
    .required('Confirm password is required')
});

const initialValues: FormValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
};

export const FormikWrapper: React.FC<{}> = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting }) => {
      // todo post
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }}
    render={({ isSubmitting, handleSubmit, handleReset, errors, touched }) => (
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
            />
            {errors.password && touched.password && (
              <div>
                <span style={styles.error}>{errors.password}</span>
              </div>
            )}
          </div>
        </fieldset>
        <fieldset style={styles.fieldset}>
          <label htmlFor="password" aria-label="Password">
            Confirm password
          </label>
          <div>
            <Field
              style={styles.input}
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm your password"
            />
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <div>
                <span style={styles.error}>{errors.passwordConfirmation}</span>
              </div>
            )}
          </div>
        </fieldset>
        <div>
          <button type="reset" onClick={handleReset} style={{...styles.button, ...styles.button.secondary}}>
            Reset
          </button>
          <button type="submit" style={{...styles.button, ...styles.button.primary}}>
            {isSubmitting ? 'Submitting' : 'Register'}
          </button>
        </div>
      </form>
    )}
  />
);
