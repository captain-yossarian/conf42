// https://catchts.com/useful-patterns#dependent_arguments
const obj = {
  a: "a",
  b: 42,
  c: "c",
};
// Second argument should be a property name which corresponds to string
// @ts-ignore
stringProperty(obj, "a"); // ok
// @ts-ignore
stringProperty(obj, "b"); // expected error

type Values<T> = T[keyof T];

type FilterPropertyBy<Obj, Type> = Values<{
  [Prop in keyof Obj]: Obj[Prop] extends Type ? Prop : never;
}>;

type Test = FilterPropertyBy<typeof obj, number>;

const string = <
  Obj extends Record<PropertyKey, unknown>,
  Key extends FilterPropertyBy<Obj, string>
>(
  obj: Obj & Record<Key, string>,
  key: Key
) => {
  //charAt is a string prototype method
  const result = obj[key].charAt; // ok
};

const result = string(obj, "c");

////////////////////////////
///////// INCLUDES /////////
////////////////////////////

const PROPS = ["a", "b", "c"] as const;

const withTuple =
  <List extends string[]>(list: readonly [...List]) =>
  (prop: string): prop is List[number] =>
    list.includes(prop);

const includes = withTuple(PROPS);

declare let str: string;

if (includes(str)) {
  str; // "a" | "b" | "c"
}
