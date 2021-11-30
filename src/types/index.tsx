export type Transaction = {
  title: string;
  amount: number;
  currency: 'INR' | 'USD';
  timestamp: number;
  type: TransactionType;
  user: string;
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
    jumpTo: (screen_name: string, params?: any) => void;
  };
  route: {
    params: any;
  };
};

export type AuthContextType = {
  user: User | null;
  signOut: () => void;
  signIn: () => void;
  loading: boolean;
};

export type User = {
  displayName: string;
  email: string;
  phoneNumber: any;
  photoURL: string;
  uid: string;
};
