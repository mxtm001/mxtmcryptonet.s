interface User {
  id: string
  email: string
  name: string
  balance: number
  totalInvested: number
  totalEarnings: number
  isVerified: boolean
  createdAt: Date
}

interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "investment" | "earnings"
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  date: Date
  description: string
}

interface Investment {
  id: string
  name: string
  amount: number
  returnRate: number
  duration: string
  status: "active" | "completed"
  startDate: Date
  endDate: Date
  currentValue: number
}

const DEMO_USER: User = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
  balance: 5500000,
  totalInvested: 5500000,
  totalEarnings: 5500000,
  isVerified: true,
  createdAt: new Date("2024-01-01"),
}

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 100000,
    currency: "EUR",
    status: "completed",
    date: new Date("2024-01-15"),
    description: "Initial Deposit",
  },
  {
    id: "2",
    type: "investment",
    amount: 50000,
    currency: "EUR",
    status: "completed",
    date: new Date("2024-01-20"),
    description: "Bitcoin Mining Investment",
  },
  {
    id: "3",
    type: "earnings",
    amount: 15000,
    currency: "EUR",
    status: "completed",
    date: new Date("2024-02-01"),
    description: "Monthly Returns",
  },
  {
    id: "4",
    type: "deposit",
    amount: 200000,
    currency: "EUR",
    status: "completed",
    date: new Date("2024-02-10"),
    description: "Additional Investment",
  },
  {
    id: "5",
    type: "earnings",
    amount: 25000,
    currency: "EUR",
    status: "completed",
    date: new Date("2024-03-01"),
    description: "Quarterly Bonus",
  },
]

const DEMO_INVESTMENTS: Investment[] = [
  {
    id: "1",
    name: "Bitcoin Mining Pool",
    amount: 500000,
    returnRate: 12.5,
    duration: "12 months",
    status: "active",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2025-01-15"),
    currentValue: 562500,
  },
  {
    id: "2",
    name: "Ethereum Staking",
    amount: 300000,
    returnRate: 8.3,
    duration: "6 months",
    status: "active",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-01"),
    currentValue: 324900,
  },
  {
    id: "3",
    name: "DeFi Yield Farming",
    amount: 200000,
    returnRate: 15.2,
    duration: "3 months",
    status: "active",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-01"),
    currentValue: 230400,
  },
  {
    id: "4",
    name: "Altcoin Portfolio",
    amount: 400000,
    returnRate: 18.7,
    duration: "12 months",
    status: "active",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2025-01-20"),
    currentValue: 474800,
  },
  {
    id: "5",
    name: "NFT Trading Fund",
    amount: 150000,
    returnRate: 22.4,
    duration: "9 months",
    status: "active",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-11-15"),
    currentValue: 183600,
  },
]

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return DEMO_USER
  },

  getUserTransactions: async (): Promise<Transaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DEMO_TRANSACTIONS
  },

  getUserInvestments: async (): Promise<Investment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return DEMO_INVESTMENTS
  },

  processWithdrawal: async (amount: number, method: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return {
      success: false,
      message: "Fehlgeschlagene Auszahlung. Bitte zahlen Sie 550 EUR ein, um den Betrag abheben zu können.",
    }
  },

  processDeposit: async (amount: number, method: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return {
      success: true,
      message: "Einzahlung erfolgreich verarbeitet!",
    }
  },
}
