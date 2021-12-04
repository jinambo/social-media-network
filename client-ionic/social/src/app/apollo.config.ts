import { HttpHeaders } from "@angular/common/http";
import { ApolloLink } from "@apollo/client";

const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODBmMTUzYjY3MDE1MWYwMDc0ODNjOCIsImVtYWlsIjoiamlya29zQGNhdWNhdS5jeiIsInVzZXJuYW1lIjoiamlya29zMSIsImlhdCI6MTYzODAzMjI2OSwiZXhwIjoxNjM4MDM1ODY5fQ.zCxDzPczb4ONeTCOh5STFRD7LqEWIkk4fWWTtoEtBoc`)
    });

    return forward(operation);
});