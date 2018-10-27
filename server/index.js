import {app} from './server';
import {server} from './server';
app.listen({ port: 5001 }, () =>
  console.log(`🚀 Server ready at http://localhost:8070${server.graphqlPath}`)
);