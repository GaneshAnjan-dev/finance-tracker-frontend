import React from "react";
import { fetchTransactions } from "../api";

function Dashboard() {
  const [summary, setSummary] = React.useState({
    income: 0,
    expense: 0,
    net: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchTransactions();
        let income = 0;
        let expense = 0;
        data.forEach((t) => {
          if (t.type === "income") income += t.amount;
          else expense += t.amount;
        });
        setSummary({
          income,
          expense,
          net: income - expense,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="dashboard">
      <h1 className="motivation-title">
        “Your money flows where your focus goes.”
      </h1>
      <p className="motivation-subtitle">
        Track every rupee with intention and watch your wealth manifest.
      </p>

      {loading && <p className="info-text">Loading summary...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <div className="summary-grid">
          <div className="summary-card income-card">
            <h2>Total Income</h2>
            <p className="summary-amount">₹{summary.income.toFixed(2)}</p>
          </div>
          <div className="summary-card expense-card">
            <h2>Total Expenses</h2>
            <p className="summary-amount">₹{summary.expense.toFixed(2)}</p>
          </div>
          <div className="summary-card savings-card">
            <h2>Net Balance</h2>
            <p className="summary-amount">₹{summary.net.toFixed(2)}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
