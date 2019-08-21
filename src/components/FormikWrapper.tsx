import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

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
  passwordConfirmation: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
};

function getValidationSchema(values: FormValues) {
  return Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password has to be longer than 6 characters!'),
     passwordConfirmation: Yup.string()
      .oneOf([values.password], 'Passwords are not the same!')
      .required('Password confirmation is required')
  });
}

function validate(values: FormValues) {
  const validationSchema = getValidationSchema(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false })
    return {}
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}


function getErrorsFromValidationError(validationError: any) {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors: [], error: { path: string, errors: number[]}) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

export const FormikWrapper: React.FC<{}> = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      // todo post
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 1000);
    }}
    render={({ isSubmitting, handleSubmit, errors, touched }) => ( // handleChange, handleBlur, values
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
               <div><span style={styles.error}>{errors.password}</span></div>
            )}
          </div>
        </fieldset>
        <fieldset style={styles.fieldset}>
          <label htmlFor="password" aria-label="Password">
            Confirm password:
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
               <div><span style={styles.error}>{errors.passwordConfirmation}</span></div>
            )}
          </div>
        </fieldset>
        <div>
          <button type="submit">
            {isSubmitting ? 'Loading' : 'Register'}
          </button>
        </div>
      </form>
    )}
  />
);
