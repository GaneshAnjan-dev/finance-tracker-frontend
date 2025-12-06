const API_BASE = "http://localhost:9090";

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function fetchTransactions() {
  const res = await fetch(`${API_BASE}/transactions`);
  return handleResponse(res);
}

export async function createTransaction(transaction) {
  const res = await fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return handleResponse(res);
}
