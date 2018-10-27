import {app} from './server';
import {server} from './server';
app.listen({ port: 5001 }, () =>
  console.log(`🚀 Server ready at http://localhost:5001${server.graphqlPath}`)
);
