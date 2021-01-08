
app.use(bodyParser.json())
const caseRouters = require('./routers/caseRouters')
app.use('/cases', caseRouters);
