# TypeScript Query String Serializer
![Tests](https://github.com/Nakerdev/tsc-query-string-serializer/workflows/Tests/badge.svg?branch=master&event=push)
![Compilation](https://github.com/Nakerdev/tsc-query-string-serializer/workflows/Compilation/badge.svg?branch=master&event=push)

**tsc-query-string-serializer** is an utility written in TypeScript to serialize objects into _query strings_ for _GET_
HTTP requests.

Signature (declaration):

```typescript
export declare const queryStringSerializer: {
    serialize: (obj: Object, encodeUri?: boolean) => string;
};
```

By default the _query string_ is encoded. If you prefer not encode it just set to _false_ the optional argument _encodeUri_.

Usage example:

```typescript
import { queryStringSerializer } from "tsc-query-string-serializer";
const searchCriteria = { ids: [ 'product-1', 'product-2' ] };
const queryString = queryStringSerializer.serialize(searchCriteria);
const endPoint = "https://myendpoint.com/api/products?" + queryString;
myHttpClient.get(endPoint);
```

Output examples without encode:

Input | Output
--- | ---
{ a: 'b' } | a=b
{ a: 'b', c: 'd' } | a=b&c=d
{ a: ['foo', 'bar', 'baz'] } | a[]=foo&a[]=bar&a[]=baz
{ a: [ 'b', [ 'c', [ 'd' ] ] ] } | a[]=b&a[1][]=c&a[1][1][]=d
{ a: { b: 'c', d: { e: 'f' } } } | a[b]=c&a[d][e]=f

For more complex examples you can see ![the tests](https://github.com/Naker90/tsc-query-string-serializer/blob/master/__test__/queryParamsSerializer.spec.ts).
