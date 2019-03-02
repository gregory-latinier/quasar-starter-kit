export const validation = {
  methods: {
    validate (rules) {
      Object.keys(rules).forEach((key) => this.$refs[key].validate())
      return Object.keys(rules).reduce((valid, key) => valid && !this.$refs[key].hasError, true)
    }
  }
}
