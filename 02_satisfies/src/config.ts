interface NuxtConfig {
  devtools?: { enabled: boolean };
  plugins?: string[];
  runtimeConfig?: {
    app?: Record<string, string | undefined>;
    public?: Record<string, string | undefined>;
  };
}

/**
 * 型直接定義
 * この場合実際オブジェクトの中のプロパティが見られていない
 */
const nuxtConfigBad: NuxtConfig = {
  devtools: { enabled: true },
  plugins: ["~/plugins/axios"],
  runtimeConfig: {
    app: {
      apiKey: "1234567890",
      mySecret: process.env.MY_SECRET,
    },
    public: {
      baseUrl: "https://example.com",
      apiUrl: "https://api.example.com",
    },
  },
};

// エラーになる
nuxtConfigBad.runtimeConfig.public.apiUrl; // NG -- ?を使用しないとエラー
nuxtConfigBad.runtimeConfig?.public?.apiUrl; // string | undefined -- 定義しているのに、undefinedの可能性がある
nuxtConfigBad.runtimeConfig?.app?.notIncluded; // OK -- string | undefined

/**
 * satisfiesを使って型を定義
 * この場合実際オブジェクトの中のプロパティが見られている
 */
const nuxtConfig = {
  devtools: { enabled: true },
  plugins: ["~/plugins/axios"],
  runtimeConfig: {
    app: {
      apiKey: "1234567890",
      mySecret: process.env.MY_SECRET,
    },
    public: {
      baseUrl: "https://example.com",
      apiUrl: "https://api.example.com",
    },
  },
} satisfies NuxtConfig;

nuxtConfig.runtimeConfig.public.apiUrl; // OK -- string
nuxtConfig.runtimeConfig.app.mySecret; // OK -- string | undefined
nuxtConfig.runtimeConfig.public.notIncluded; // NG -- 存在しない

// 以下が注意
nuxtConfig.runtimeConfig.public.baseUrl = undefined; // NG -- すでに文字列に設定しているので、undefinedは設定できない

/**
 * satisfiesを使って型を定義
 * この場合実際オブジェクトの中のプロパティが見られているし、変わらないので、値まで見れる
 */
const nuxtConfigBetter = {
  devtools: { enabled: true },
  plugins: ["~/plugins/axios"],
  runtimeConfig: {
    app: {
      apiKey: "1234567890",
      mySecret: process.env.MY_SECRET,
    },
    public: {
      baseUrl: "https://example.com",
      apiUrl: "https://api.example.com",
    },
  },
} as const satisfies NuxtConfig;

nuxtConfigBetter.runtimeConfig.public.apiUrl; // OK --  "https://api.example.com"
nuxtConfigBetter.runtimeConfig.app.mySecret; // OK -- string | undefined
