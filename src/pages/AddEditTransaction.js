import React from "react";
import { createTransaction } from "../api";

function AddEditTransaction({ transaction, onDone }) {
  const [form, setForm] = React.useState({
    type: transaction?.type || "expense",
    amount: transaction?.amount || "",
    category: transaction?.category || "",
    description: transaction?.description || "",
    date: transaction?.date || "",
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const isEdit = !!transaction;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.amount || !form.date || !form.type) {
      setError("Type, amount, and date are required.");
      return;
    }

    const payload = {
      type: form.type,
      amount: parseFloat(form.amount),
      category: form.category,
      description: form.description,
      date: form.date,
    };

    try {
      setLoading(true);
      await createTransaction(payload);
      setSuccess("Transaction saved successfully!");
      setForm({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
      if (onDone) onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-edit">
      <h1>{isEdit ? "Edit Transaction" : "Add Transaction"}</h1>

      <div className="card">
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-row">
            <label>Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-row">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="input"
              step="0.01"
            />
          </div>

          <div className="form-row">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
              placeholder="Food, Rent, Travel..."
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddEditTransaction;
