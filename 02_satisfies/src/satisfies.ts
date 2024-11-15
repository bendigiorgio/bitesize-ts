const typedObject: Record<string, string> = {
  someAttribute: "someValue",
  color: "blue",
  name: "Ben",
};

typedObject.someAttribute; // 自動に変数名が見えない
typedObject.notIncluded; // エラーにならない

const satisfiesObject = {
  someAttribute: "someValue",
  color: "blue",
  name: "Ben",
} satisfies Record<string, string>;

satisfiesObject.someAttribute; // 自動に変数名が見える
satisfiesObject.notIncluded; // エラーになる

const satisfiesErrorObject = {
  someAttribute: "someValue",
  color: "blue",
  name: "Ben",
  age: 24,
} satisfies Record<string, string>;
