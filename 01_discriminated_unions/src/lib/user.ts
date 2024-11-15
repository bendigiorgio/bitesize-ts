type User = {
  name: string;
} & (
  | {
      role: "admin";
      email: string;
      section: string;
    }
  | {
      role: "user";
      email: string;
      status?: string;
    }
  | {
      role: "guest";
    }
);

/** 問題ない */

const guestUser: User = {
  name: "guest",
  role: "guest",
};

const normalUser: User = {
  name: "normal",
  role: "user",
  email: "",
};

const adminUser: User = {
  name: "admin",
  role: "admin",
  email: "",
  section: "",
};

/** エラー */

const invalidUser: User = {
  name: "invalidAdmin",
  role: "admin",
};

const invalidUser2: User = {
  name: "invalidUser",
  role: "user",
  email: "",
  section: "",
};

const invalidUser3: User = {
  name: "invalidGuest",
  role: "guest",
  email: "",
  section: "",
};
