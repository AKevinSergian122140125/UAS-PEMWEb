import React, { useState, useEffect } from 'react';
import { useTransaction } from '../context/TransactionContext';

function TransactionForm({ editing, onCancel }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('pemasukan');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  
  const { addTransaction, updateTransaction, loading } = useTransaction();

  // Predefined categories
  const categories = {
    pemasukan: ['Gaji', 'Bonus', 'Investasi', 'Bisnis', 'Lainnya'],
    pengeluaran: ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Lainnya']
  };

  useEffect(() => {
    if (editing) {
      setDescription(editing.description);
      setAmount(formatNumber(editing.amount));
      setType(editing.type);
      setCategory(editing.category || '');
    } else {
      resetForm();
    }
  }, [editing]);

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('pemasukan');
    setCategory('');
    setError('');
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const parseNumber = (formatted) => {
    return Number(formatted.replace(/[^\d]/g, ''));
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = parseNumber(rawValue);
    if (numericValue >= 0) {
      setAmount(formatNumber(numericValue));
    }
  };

  const validateForm = () => {
    if (!description.trim()) {
      setError('Deskripsi tidak boleh kosong.');
      return false;
    }

    const parsedAmount = parseNumber(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Jumlah harus berupa angka lebih dari 0.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const transactionData = {
      description,
      amount: parseNumber(amount),
      type,
      category: category || categories[type][0],
      date: new Date().toISOString()
    };

    try {
      if (editing) {
        await updateTransaction(editing.id, transactionData);
      } else {
        await addTransaction(transactionData);
      }
      
      resetForm();
      if (onCancel) onCancel(); // Close edit mode
    } catch (error) {
      setError('Failed to save transaction');
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">
          <i className={`bi ${editing ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
          {editing ? 'Edit Transaksi' : 'Tambah Transaksi'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <i className="bi bi-card-text me-1"></i>
              Deskripsi *
            </label>
            <input
              id="description"
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi transaksi"
              disabled={loading}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              <i className="bi bi-currency-dollar me-1"></i>
              Jumlah (Rp) *
            </label>
            <input
              id="amount"
              type="text"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              disabled={loading}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  <i className="bi bi-arrow-up-down me-1"></i>
                  Jenis *
                </label>
                <select
                  id="type"
                  className="form-select"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setCategory(''); // Reset category when type changes
                  }}                  disabled={loading}
                >
                  <option value="pemasukan">
                    Pemasukan
                  </option>
                  <option value="pengeluaran">
                    Pengeluaran
                  </option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  <i className="bi bi-tag me-1"></i>
                  Kategori
                </label>
                <select
                  id="category"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Pilih kategori</option>
                  {categories[type].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button 
              type="submit" 
              className={`btn ${editing ? 'btn-warning' : 'btn-primary'} flex-fill`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {editing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <i className={`bi ${editing ? 'bi-check-circle' : 'bi-plus-circle'} me-1`}></i>
                  {editing ? 'Update Transaksi' : 'Tambah Transaksi'}
                </>
              )}
            </button>

            {editing && (
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                <i className="bi bi-x-circle me-1"></i>
                Cancel
              </button>
            )}
          </div>
        </form>      </div>
    </div>
  );
}

export default TransactionForm;
