// types/database.ts
export interface Database {
  users: UserTable;
}

export interface UserTable {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}
