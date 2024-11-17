// 型でextends

interface BaseUser {
  id: string;
  name: string;
  profilePicture: string;
}

interface Admin extends BaseUser {
  adminNo: number;
  role: "admin";
}

interface NormalUser extends BaseUser {
  email: string;
  role: "user";
}

type User = Admin | NormalUser;

// genericでextends
declare function hasPermission<T extends User>(
  user: T
): T extends Admin ? true : false;

const adminUser = {
  id: "admin001",
  name: "admin",
  adminNo: 1,
  profilePicture: "http://",
  role: "admin",
} satisfies Admin;

const normalUser = {
  id: "user001",
  name: "user",
  profilePicture: "http://",
  email: "",
  role: "user",
} satisfies NormalUser;

const adminHasPermission = hasPermission(adminUser);

const normalHasPermission = hasPermission(normalUser);

// genericでextends + keyof
const getUniqueProperty = <T extends Record<K, any>, K extends keyof T>(
  obj: T[],
  key: K
) => {
  const set = new Set(obj.map((item) => item[key]));
  return Array.from(set);
};

const users = [
  { id: "001", name: "user1", email: "", profilePicture: "" },
  { id: "002", name: "user2", email: "", profilePicture: "" },
  { id: "003", name: "user3", email: "", profilePicture: "" },
  { id: "004", name: "user4", email: "", profilePicture: "" },
  { id: "005", name: "user5", email: "", profilePicture: "" },
];

const uniqueIds = getUniqueProperty(users, "id");

// extendsとinfer

type ExtractUserRole<T> = T extends { role: infer U } ? U : never;

type AdminRole = ExtractUserRole<Admin>;
type NormalUserRole = ExtractUserRole<NormalUser>;

type BrokenUserRole = ExtractUserRole<BaseUser>;
