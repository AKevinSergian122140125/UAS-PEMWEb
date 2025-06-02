import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { transactionAPI, apiHelpers } from '../services/api';
import { toast } from 'react-toastify';


const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isApiMode, setIsApiMode] = useState(false);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0
  });

  // Sample data for fallback mode
  const sampleTransactions = [
    { id: 1, description: 'Gaji Bulanan', amount: 5000000, type: 'pemasukan', date: new Date().toISOString() },
    { id: 2, description: 'Makan Siang', amount: 50000, type: 'pengeluaran', date: new Date().toISOString() },
    { id: 3, description: 'Bayar Listrik', amount: 200000, type: 'pengeluaran', date: new Date().toISOString() },
  ];
  // Calculate summary statistics
  const calculateSummary = useCallback((transactionList) => {
    const listToCalculate = transactionList || transactions;
    
    const totalIncome = listToCalculate
      .filter(tx => tx.type === 'pemasukan')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const totalExpense = listToCalculate
      .filter(tx => tx.type === 'pengeluaran')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const balance = totalIncome - totalExpense;
    const transactionCount = listToCalculate.length;
    
    const newSummary = {
      totalIncome,
      totalExpense,
      balance,
      transactionCount
    };
    
    setSummary(newSummary);
    return newSummary;
  }, []); // Remove transactions dependency to avoid loops

  // Load transactions from API or localStorage
  const loadTransactions = useCallback(async () => {
    if (isApiMode) {
      try {
        const response = await transactionAPI.getTransactions();
        setTransactions(response.data);
        calculateSummary(response.data);
      } catch (error) {
        console.error('Failed to load transactions:', error);
        toast.error('Failed to load transactions');
        // Fallback to localStorage
        const localData = JSON.parse(localStorage.getItem('transactions') || '[]');
        setTransactions(localData);
        calculateSummary(localData);
      }
    } else {
      const localData = JSON.parse(localStorage.getItem('transactions') || '[]');
      if (localData.length === 0) {
        setTransactions(sampleTransactions);
        calculateSummary(sampleTransactions);
      } else {
        setTransactions(localData);
        calculateSummary(localData);      }
    }
  }, [isApiMode]); // Remove circular dependencies
  // Check API availability and load initial data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        const available = await apiHelpers.isApiAvailable();
        setIsApiMode(available);
        
        if (available) {
          // Load from API
          try {
            const response = await transactionAPI.getTransactions();
            setTransactions(response.data);
            calculateSummary(response.data);
          } catch (error) {
            console.error('Failed to load transactions from API:', error);
            // Fallback to localStorage
            const localData = JSON.parse(localStorage.getItem('transactions') || '[]');
            setTransactions(localData.length > 0 ? localData : sampleTransactions);
            calculateSummary(localData.length > 0 ? localData : sampleTransactions);
          }
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem('transactions');
          const localTransactions = saved ? JSON.parse(saved) : sampleTransactions;
          setTransactions(localTransactions);
          calculateSummary(localTransactions);
        }
      } catch (error) {
        setError('Failed to initialize data');
        console.error('Initialization error:', error);
        // Final fallback to sample data
        setTransactions(sampleTransactions);
        calculateSummary(sampleTransactions);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []); // Remove circular dependencies
  // Save to localStorage when transactions change (fallback mode)
  useEffect(() => {
    if (!isApiMode && transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      calculateSummary(transactions);
    }
  }, [transactions, isApiMode]); // Remove calculateSummary dependency

  // Add new transaction
  const addTransaction = async (transactionData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isApiMode) {
        const response = await transactionAPI.createTransaction(transactionData);
        const newTransaction = response.data;
        setTransactions(prev => [newTransaction, ...prev]);
        calculateSummary([newTransaction, ...transactions]);
        toast.success('Transaksi berhasil ditambahkan!');
        return newTransaction;
      } else {
        // Fallback mode
        const newTransaction = {
          ...transactionData,
          id: Date.now(), // Simple ID for demo
          date: new Date().toISOString()
        };
        const updatedTransactions = [newTransaction, ...transactions];
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        calculateSummary(updatedTransactions);
        toast.success('Transaksi berhasil ditambahkan!');
        return newTransaction;
      }
    } catch (error) {
      setError('Gagal menambahkan transaksi');
      toast.error('Gagal menambahkan transaksi');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update transaction
  const updateTransaction = async (id, transactionData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isApiMode) {
        const response = await transactionAPI.updateTransaction(id, transactionData);
        const updatedTransaction = response.data;
        setTransactions(prev => 
          prev.map(tx => tx.id === id ? updatedTransaction : tx)
        );
        calculateSummary(transactions);
        toast.success('Transaksi berhasil diperbarui!');
        return updatedTransaction;
      } else {
        // Fallback mode
        const updatedTransaction = { ...transactionData, id, date: new Date().toISOString() };
        const updatedTransactions = transactions.map(tx => 
          tx.id === id ? updatedTransaction : tx
        );
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        calculateSummary(updatedTransactions);
        toast.success('Transaksi berhasil diperbarui!');
        return updatedTransaction;
      }
    } catch (error) {
      setError('Gagal memperbarui transaksi');
      toast.error('Gagal memperbarui transaksi');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      if (isApiMode) {
        await transactionAPI.deleteTransaction(id);
        setTransactions(prev => prev.filter(tx => tx.id !== id));
        calculateSummary(transactions.filter(tx => tx.id !== id));
        toast.success('Transaksi berhasil dihapus!');
      } else {
        // Fallback mode
        const updatedTransactions = transactions.filter(tx => tx.id !== id);
        setTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        calculateSummary(updatedTransactions);
        toast.success('Transaksi berhasil dihapus!');
      }
    } catch (error) {
      setError('Gagal menghapus transaksi');
      toast.error('Gagal menghapus transaksi');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const refreshTransactions = async () => {
    await loadTransactions();
  };

  const value = {
    transactions,
    loading,
    error,
    summary,
    isApiMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refreshTransactions,
    clearError: () => setError(null)
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};

export default TransactionContext;