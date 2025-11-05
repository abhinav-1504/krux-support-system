export function CustomerInfoPanel({ ticketId }: { ticketId: string }) {
  const mockInfo = {
    name: "Rahul Sharma",
    loans: ["Business Loan - Pending"],
  };

  return (
    <div>
      <h3>Customer Info</h3>
      <p>Name: {mockInfo.name}</p>
      <p>Loans: {mockInfo.loans.join(", ")}</p>
    </div>
  );
}