import React, { useState, useMemo } from 'react';
import { useTransaction } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryCard from '../components/SummaryCard';

function Dashboard() {
  const { 
    transactions, 
    loading, 
    error, 
    isApiMode
  } = useTransaction();
  
  const { user } = useAuth();
  
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchFilter = filter === 'semua' || tx.type === filter;
      const matchSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [transactions, filter, searchTerm]);

  // Calculate filtered summary
  const filteredSummary = useMemo(() => {
    const totalFilteredIncome = filteredTransactions
      .filter((tx) => tx.type === 'pemasukan')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalFilteredExpense = filteredTransactions
      .filter((tx) => tx.type === 'pengeluaran')
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      totalIncome: totalFilteredIncome,
      totalExpense: totalFilteredExpense,
      balance: totalFilteredIncome - totalFilteredExpense
    };
  }, [filteredTransactions]);

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">
                <i className="bi bi-speedometer2 me-2 text-primary"></i>
                Dashboard Keuangan
              </h2>
              {user && (
                <p className="text-muted mb-0">Welcome back, {user.name || user.username}!</p>
              )}
            </div>
            <div className="badge bg-info">
              {isApiMode ? 'API Mode' : 'Local Mode'}
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <button type="button" className="btn-close" onClick={() => window.location.reload()}></button>
        </div>
      )}

      {/* Summary Cards */}
      <SummaryCard filteredSummary={filteredSummary} />

      {/* Filters and Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3">
                <div>
                  <label className="form-label mb-1">
                    <i className="bi bi-funnel me-1"></i>
                    Filter:
                  </label>
                  <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="semua">Semua Transaksi</option>
                    <option value="pemasukan">Pemasukan</option>
                    <option value="pengeluaran">Pengeluaran</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <label className="form-label mb-1">
                <i className="bi bi-search me-1"></i>
                Search:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Cari deskripsi transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Column: Form */}
        <div className="col-lg-5">
          <TransactionForm
            editing={editingTransaction}
            onCancel={handleCancelEdit}
          />

          {/* Filtered Summary */}
          <div className="card mt-4">
            <div className="card-header">
              <h6 className="mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Ringkasan Filter
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-12 mb-2">
                  <div className="p-2 bg-success bg-opacity-10 rounded">
                    <small className="text-muted d-block">Pemasukan</small>
                    <strong className="text-success">
                      Rp {filteredSummary.totalIncome.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
                <div className="col-12 mb-2">
                  <div className="p-2 bg-danger bg-opacity-10 rounded">
                    <small className="text-muted d-block">Pengeluaran</small>
                    <strong className="text-danger">
                      Rp {filteredSummary.totalExpense.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
                <div className="col-12">
                  <div className={`p-2 rounded ${filteredSummary.balance >= 0 ? 'bg-primary bg-opacity-10' : 'bg-warning bg-opacity-10'}`}>
                    <small className="text-muted d-block">Saldo</small>
                    <strong className={filteredSummary.balance >= 0 ? 'text-primary' : 'text-warning'}>
                      Rp {filteredSummary.balance.toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Transaction List */}
        <div className="col-lg-7">
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEditTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
