import React, { useState } from 'react';
import { useTransaction } from '../context/TransactionContext';

function TransactionList({ transactions, onEdit }) {
  const [deletingId, setDeletingId] = useState(null);
  const { deleteTransaction, loading } = useTransaction();

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      setDeletingId(id);
      try {
        await deleteTransaction(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    return type === 'pemasukan' ? 'bi-arrow-up-circle-fill' : 'bi-arrow-down-circle-fill';
  };

  const getTypeColor = (type) => {
    return type === 'pemasukan' ? 'text-success' : 'text-danger';
  };

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <h5 className="mt-3 text-muted">Tidak ada transaksi</h5>
          <p className="text-muted">Tambahkan transaksi pertama Anda untuk mulai melacak keuangan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="bi bi-list-ul me-2"></i>
          Daftar Transaksi
        </h5>
        <span className="badge bg-primary">{transactions.length} transaksi</span>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <i className={`bi ${getTypeIcon(tx.type)} ${getTypeColor(tx.type)} me-2`}></i>
                    <h6 className="mb-0">{tx.description}</h6>
                    {tx.category && (
                      <span className="badge bg-light text-dark ms-2 small">
                        {tx.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <span className={`fw-bold ${getTypeColor(tx.type)}`}>
                      {tx.type === 'pengeluaran' ? '-' : '+'}Rp {tx.amount.toLocaleString('id-ID')}
                    </span>
                    {tx.date && (
                      <small className="text-muted ms-3">
                        <i className="bi bi-calendar3 me-1"></i>
                        {formatDate(tx.date)}
                      </small>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-1 ms-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(tx)}
                    disabled={loading || deletingId === tx.id}
                    title="Edit transaksi"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(tx.id)}
                    disabled={loading || deletingId === tx.id}
                    title="Hapus transaksi"
                  >
                    {deletingId === tx.id ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-trash"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
