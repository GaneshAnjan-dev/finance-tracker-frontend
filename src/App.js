import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddEditTransaction from "./pages/AddEditTransaction";
import "./styles/theme.css";

function App() {
  const [currentPage, setCurrentPage] = React.useState("dashboard");
  const [editTransaction, setEditTransaction] = React.useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== "addEdit") {
      setEditTransaction(null);
    }
  };

  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setCurrentPage("addEdit");
  };

  return (
    <div className="app-root">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="app-main">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "transactions" && (
          <Transactions onEdit={handleEdit} />
        )}
        {currentPage === "addEdit" && (
          <AddEditTransaction
            transaction={editTransaction}
            onDone={() => handleNavigate("transactions")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
