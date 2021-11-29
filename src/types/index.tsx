export type Transaction = {
  title: string;
  amount: number;
  currency: 'INR' | 'USD';
  timestamp: number;
  type: 'EARN' | 'SPEND' | 'HOLD' | 'FUTURE' | 'LOAN';
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
