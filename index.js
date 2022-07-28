const moduleExports = require('./lib')
const App = {}
Object.keys(moduleExports).forEach((key) => {
  if (key === '__esModule') return
  App[key] = moduleExports[key]

})
module.exports = App
