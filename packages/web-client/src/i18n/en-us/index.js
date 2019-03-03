// This is just an example,
// so you can safely delete all default props below

export default {
  form: {
    errors: {
      any: {
        empty: 'The \'{field}\' is required'
      },
      string: {
        base: 'The \'{field}\' is required',
        email: 'The \'{field}\' must be a valid email'
      }
    },
    fields: {
      password: 'Password',
      username: 'Username'
    }
  },
  validations: {
    errors: {
      dateAfter: 'The "{after}" must be after "{before}"',
      email: 'Please type a valid email',
      maxLength: 'Please type at most {count} characters',
      minLength: 'Please type at least {count} characters',
      required: 'This field is required'
    }
  }
}
