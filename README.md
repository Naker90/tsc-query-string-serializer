# TypeScript Query String Serializer
![Tests](https://github.com/Naker90/tsc-query-string-serializer/workflows/tests/badge.svg?branch=master&event=push)

**tsc-query-string-serializer** is an utility written in TypeScript to serialize objects into _query strings_ for _GET_
HTTP requests.

Usage example:

```typescript
import { queryStringSerializer } from "tsc-query-string-serializer";
const searchCriteria = { firstName: "Alvaro", age: 22 };
const serializedCriteria = queryStringSerializer.serialize(searchCriteria);
const endPoint = "https://myendpoint.com/api/people?" + serializedCriteria;
myHttpClient.get(endPoint);
```

Output examples:

Input | Output
--- | ---
{ a: 'b' } | a=b
{ a: 'b', c: 'd' } | a=b&c=d
{ a: ['foo', 'bar', 'baz'] } | a[]=foo&a[]=bar&a[]=baz
{ a: [ 'b', [ 'c', [ 'd' ] ] ] } | a[]=b&a[1][]=c&a[1][1][]=d
{ a: { b: 'c', d: { e: 'f' } } } | a[b]=c&a[d][e]=f

For more complex examples you can see ![the tests](https://github.com/Naker90/tsc-query-string-serializer/blob/master/__test__/queryParamsSerializer.spec.ts).
