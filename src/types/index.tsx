export type Transaction = {
  title: string;
  amount: number;
  currency: 'INR' | 'USD';
  timestamp: number;
  type: TransactionType;
};
export type TransactionType = 'EARN' | 'SPEND' | 'HOLD' | 'FUTURE' | 'LOAN';

export type TransactionResponse = {
  key?: string;
  amount: number;
  currency: 'INR' | 'USD';
  timestamp: number;
  title: string;
  type: TransactionType;
};

export type Screen = {
  navigation: {
    navigate: (screen_name: string, params?: any) => void;
    pop: (count?: number) => void;
  };
  route: {
    params: any;
  };
};
