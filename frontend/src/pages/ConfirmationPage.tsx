import { Link } from "react-router-dom";

export default function ConfirmationPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Payment confirmation</h1>
      <p>Here will be the results of the transaction</p>
      <Link to="/">Back</Link>
    </div>
  );
}
