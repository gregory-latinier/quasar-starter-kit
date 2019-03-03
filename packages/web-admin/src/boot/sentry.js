import * as Sentry from '@sentry/browser'

export default ({ app, router, Vue }) => {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [new Sentry.Integrations.Vue({ Vue })]
    })
  }
}
