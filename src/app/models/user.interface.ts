export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'customer';
}