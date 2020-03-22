import {queryStringSerializer} from "../src/queryStringSerializer";

describe("query string serializer should", () => {

  it("serializes single key-value", () => {
    const obj = { a: "b" };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("a=b");
  });

  it("serializes different keys and values", () => {
    const queryString1 = queryStringSerializer.serialize({ a: "b" });
    const queryString2 = queryStringSerializer.serialize({ a: "b" });

    expect(queryString1).toBe("a=b");
    expect(queryString2).toBe("a=b");
  });

  it("serializes multiple keys and values", () => {
    let obj = { a: "b", c: "d" };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("a=b&c=d");
  });

  it("serializes arrays", () => {
    let array = ["foo","bar","fizz"];

    const queryString = queryStringSerializer.serialize({a : array});

    expect(queryString).toBe("a[]=foo&a[]=bar&a[]=fizz");
  });

  it("serializes nested objects", () => {
    let obj = { foo: { a: "b", baz: { a: "b" }}};

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[a]=b&foo[baz][a]=b");
  });

  it("serializes nested arrays", () => {
    let obj = { foo: [ "a", [ "b", [ "c" ] ] ] };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[]=a&foo[1][]=b&foo[1][1][]=c");
  });

  it("serializes complicated nested objects", () => {
    let obj = { foo: { a: "b", c: { d: "e", f: { g: "h" } } } };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[a]=b&foo[c][d]=e&foo[c][f][g]=h");
  });

  it("serializes complicated nested arrays", () => {
    let obj = { "foo": [ "a", "b", [ "c", "d", [ "e", [ "f" ] ] ] ] };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[]=a&foo[]=b&foo[2][]=c&foo[2][]=d&foo[2][2][]=e&foo[2][2][1][]=f");
  });

  it("serializes multiple keys and values with nested arrays", () => {
    let obj = {
      foo: [ "a", [ "b", [ "c" ] ] ],
      bar: [ "a", [ "b", [ "c" ] ] ]
    };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[]=a&foo[1][]=b&foo[1][1][]=c&bar[]=a&bar[1][]=b&bar[1][1][]=c");
  });

  it("serializes multiple keys and values with nested objects", () => {
    let obj = {
      foo: { a: "b", c: { d: "e" } },
      bar: { a: "b", c: { d: "e" } }
    };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[a]=b&foo[c][d]=e&bar[a]=b&bar[c][d]=e");
  });

  it("serializes nested objects with inners arrays", () => {
    let obj = { foo: { a: "b", c: { d: [ "e", "f" ] } } };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[a]=b&foo[c][d][]=e&foo[c][d][]=f");
  });

  it("serializes nested arrays with inners objects", () => {
    let obj = { foo: [ "a", [ "b", { d: "e" } ] ] };

    const queryString = queryStringSerializer.serialize(obj);

    expect(queryString).toBe("foo[]=a&foo[1][]=b&foo[1][1][d]=e");
  });
});
