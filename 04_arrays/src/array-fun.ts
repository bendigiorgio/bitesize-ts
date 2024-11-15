// ランタイムでも使いたい変数

type TypedRole = "admin" | "member" | "guest";

const roles = ["admin", "member", "guest"] as const;

type Role = (typeof roles)[number];

// もっと細かい型

const restrictedTuple: [string, string] = ["something", "something else"];
restrictedTuple[2]; // Tupleになっているので、存在しないindexを参照するとエラーになる

// ジェネリクスにconstを使う
declare function getStatus<T>(statuses: T[]): T;
const currentStatus = getStatus(["online", "offline"]); // string

declare function getStatus2<const T>(statuses: T[]): T;
const currentStatus2 = getStatus2(["online", "offline"]); // "online" | "offline"
