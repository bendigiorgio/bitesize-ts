import { z } from "zod";

// 型レベルのバリデーション
export const mySchema = z.object({
  string: z.string(),
  number: z.number(),
  boolean: z.boolean(),
  array: z.array(z.string()),
  object: z.object({
    key: z.string(),
  }),
  union: z.union([z.string(), z.number()]),
  unionOr: z.string().or(z.number()), // 上記と同じ
  enum: z.enum(["a", "b"]),
  date: z.date(),
});

// 値の形レベルのバリデーション
export const mySchemaExtended = z.object({
  string: z.string().min(3).max(10).email(),
  number: z.number().nullable().optional(),
  boolean: z.boolean(),
  array: z.array(z.string()).length(3),
  date: z.date().min(new Date()),
});

// カスタムバリデーション
export const mySchemaCustom = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  })
  .refine((vals) => vals.password === vals.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"], // エラーメッセージの表示場所
  });

// 値を変換する
export const annoyingResponseSchema = z.object({
  created_at: z.coerce.date(),
  float: z
    .string()
    .transform((val) => Number(val.split("-").join(".")))
    .refine((val) => !Number.isNaN(val)),
  userType: z.string().optional().default("user"),
  stringNum: z.coerce.number(),
  fakeBool: z.string().transform((val) => Boolean(Number(val))),
});

const testData = {
  created_at: "2024-12-12T12:12:12.000Z",
  float: "3-14",
  userType: "admin",
  stringNum: "123",
  fakeBool: "0",
};

const badTestData = {
  created_at: "エラー",
  float: null,
  userType: undefined,
  stringNum: "文字列",
  fakeBool: "1",
};

const result = annoyingResponseSchema.parse(testData);
console.log("テスト１（正しい）：", result);

const badResult = annoyingResponseSchema.safeParse(badTestData);
console.log(
  "テスト２（エラー）：",
  badResult.success,
  "エラー：",
  badResult.error?.errors
);
