import React from "react";
import { fetchTransactions } from "../api";

function Transactions({ onEdit }) {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="transactions">
      <h1>Transactions</h1>

      {loading && <p className="info-text">Loading transactions...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <div className="card">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className={t.type === "income" ? "row-income" : "row-expense"}>
                  <td>{t.date}</td>
                  <td className="type-cell">{t.type}</td>
                  <td>{t.category}</td>
                  <td>{t.description}</td>
                  <td>{t.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Transactions;
