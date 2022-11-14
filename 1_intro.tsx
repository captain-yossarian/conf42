import React from "react";

// https://catchts.com/undocumented-features

// #1 lowercase

// stolen from here https://stackoverflow.com/questions/68963491/define-a-typescript-type-that-takes-a-lowercase-word#answer-73732194
let str: Lowercase<string>;
str = "abc"; // okay
str = "DEF"; // error in TS4.8+

// #2 Inference prioritization
// stolen from here https://stackoverflow.com/questions/74093078/how-do-i-create-a-literal-type-for-react-component-parameters#74093982
interface SelectProps<Value extends string> {
  value: Value & {}; // <----- TRICK !
  options: Value[];
}

const Select = <Value extends string>(props: SelectProps<Value>) => null;

const ok = <Select value="red" options={["red", "yellow"]} />;
const error = <Select value="green" options={["red", "yellow"]} />;

//Using Value & - means "lower priority inference"

// #3 Non nullable
// docs https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-8.html#improved-intersection-reduction-union-compatibility-and-narrowing

const nonNullable = <T,>(a: T & {}) => {};

nonNullable(null); // expected error
export {};
