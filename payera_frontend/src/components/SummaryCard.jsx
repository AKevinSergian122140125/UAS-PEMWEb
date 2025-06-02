import React from 'react';
import { useTransaction } from '../context/TransactionContext';

function SummaryCard({ filteredSummary }) {
  const { summary, loading, isApiMode } = useTransaction();
  
  // Use filtered summary if provided, otherwise use global summary
  const displaySummary = filteredSummary || summary;
  
  const { totalIncome, totalExpense, balance } = displaySummary;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const getBalanceIcon = (balance) => {
    if (balance > 0) return 'bi-arrow-up-circle-fill';
    if (balance < 0) return 'bi-arrow-down-circle-fill';
    return 'bi-dash-circle-fill';
  };

  const getBalanceColorClass = (balance) => {
    if (balance > 0) return 'text-success';
    if (balance < 0) return 'text-danger';
    return 'text-muted';
  };

  if (loading) {
    return (
      <div className="row mb-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body text-center">
                <div className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-12 placeholder-lg"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row mb-4">
      {/* Total Pemasukan */}
      <div className="col-md-4 mb-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center bg-success text-white rounded">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="bi bi-arrow-up-circle-fill display-6 me-2"></i>
              <div>
                <h6 className="card-title mb-0 text-white-50">Total Pemasukan</h6>
                {isApiMode && <small className="text-white-50">API Mode</small>}
              </div>
            </div>
            <h4 className="card-text fw-bold mb-0">
              {formatCurrency(totalIncome)}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Pengeluaran */}
      <div className="col-md-4 mb-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center bg-danger text-white rounded">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="bi bi-arrow-down-circle-fill display-6 me-2"></i>
              <div>
                <h6 className="card-title mb-0 text-white-50">Total Pengeluaran</h6>
                {isApiMode && <small className="text-white-50">API Mode</small>}
              </div>
            </div>
            <h4 className="card-text fw-bold mb-0">
              {formatCurrency(totalExpense)}
            </h4>
          </div>
        </div>
      </div>

      {/* Saldo */}      <div className="col-md-4 mb-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className={`card-body text-center text-white rounded ${
            balance >= 0 ? 'bg-primary' : 'bg-warning'
          }`}>
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className={`bi ${getBalanceIcon(balance)} display-6 me-2`}></i>
              <div>
                <h6 className="card-title mb-0 text-white-50">Saldo</h6>
                {isApiMode && <small className="text-white-50">API Mode</small>}
              </div>
            </div>
            <h4 className={`card-text fw-bold mb-0 ${getBalanceColorClass(balance)} ${balance < 0 ? 'text-dark' : ''}`}>
              {formatCurrency(balance)}
            </h4>
            {balance < 0 && (
              <small className="text-dark">
                <i className="bi bi-exclamation-triangle me-1"></i>
                Defisit
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {summary.transactionCount > 0 && (
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6 col-md-3">
                  <i className="bi bi-list-ul text-primary"></i>
                  <div className="fw-bold">{summary.transactionCount}</div>
                  <small className="text-muted">Total Transaksi</small>
                </div>
                <div className="col-6 col-md-3">
                  <i className="bi bi-percent text-success"></i>
                  <div className="fw-bold">
                    {totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0}%
                  </div>
                  <small className="text-muted">Rasio Pengeluaran</small>
                </div>
                <div className="col-6 col-md-3">
                  <i className="bi bi-piggy-bank text-info"></i>
                  <div className="fw-bold">
                    {totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0}%
                  </div>
                  <small className="text-muted">Tingkat Tabungan</small>
                </div>
                <div className="col-6 col-md-3">
                  <i className="bi bi-graph-up text-warning"></i>
                  <div className="fw-bold">
                    {formatCurrency(totalExpense > 0 ? totalIncome / totalExpense : 0)}
                  </div>
                  <small className="text-muted">Avg. per Transaksi</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SummaryCard;
