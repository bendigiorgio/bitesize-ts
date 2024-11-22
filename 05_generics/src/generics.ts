export async function wrappedFetch(url: string, params?: RequestInit) {
  const baseUrl = "http://localhost:4721/api";
  const response = await fetch(`${baseUrl}/${url}`, params);
  return response.json();
}

const res = await wrappedFetch("endpoint_1"); // any

// 型を使う時定義するパターン
export async function genericWrappedFetch<T>(
  url: string,
  params?: RequestInit
) {
  const baseUrl = "http://localhost:4721/api";
  const response = await fetch(`${baseUrl}/${url}`, params);
  return response.json() as T;
}

const typedRes = await genericWrappedFetch<{ id: number }>("endpoint_1"); // { id: number }

// 型がinferされるパターン

const createSet = <T>(data: T[]) => {
  return new Set<T>(data);
};

const stringSet = createSet(["a", "b", "c"]); // Set<string>
const numberSet = createSet([1, 2, 3]); // Set<number>

const ensureBothSame = <T>(foo: T, bar: T) => {};

ensureBothSame(1, 1); // OK
ensureBothSame("a", 1); // NG

// keyofを使う

type MyObject = {
  a: string;
  b: number;
};

type KeysOfMyObject = keyof MyObject; // "a" | "b"

const getKey = <T, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

const myObject: MyObject = { a: "a", b: 1 };

const valueOfMyObject = getKey(myObject, "a"); // string

// 型でもジェネリックすが使える！
type ResponseType<TData> = {
  data: TData;
  status: number;
};

type UserResponse = ResponseType<{ id: number; name: string }>;
