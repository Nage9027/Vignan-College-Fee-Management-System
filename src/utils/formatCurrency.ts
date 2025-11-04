// src/utils/formatCurrency.ts

export const formatCurrency = (amount: number): string => {
    if (amount < 100000) {
      // Below 1 lakh → show full amount (₹95,000)
      return `₹${amount.toLocaleString('en-IN')}`;
    } else if (amount < 10000000) {
      // Below 1 crore → convert to Lakh (₹2.45 L)
      const lakhs = amount / 100000;
      return `₹${lakhs.toFixed(lakhs >= 10 ? 0 : 2)} L`;
    } else {
      // 1 crore and above → convert to Crore (₹3.25 Cr)
      const crores = amount / 10000000;
      return `₹${crores.toFixed(crores >= 10 ? 0 : 2)} Cr`;
    }
  };
  