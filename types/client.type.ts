export interface Client {
  name: string;
  email: string;
  activeProjects: number;
  totalRevenue: {
    amount: string;
    currency: string;
  };
  outstanding: {
    amount: string;
    currency: string;
  };
}
