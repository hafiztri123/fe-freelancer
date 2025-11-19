export interface CreateClientBody {
  name: string;
  email: string;
  company?: string;
  phone: string;
  address?: string;
  notes?: string;
  currency: string;
  paymentTerms: number;
}

export interface ErrorBody {
  [key: string]: string;
}
