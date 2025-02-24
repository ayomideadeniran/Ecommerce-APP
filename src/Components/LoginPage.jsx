import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setAuthUser(user); // Update state
      navigate("/"); // Redirect after login
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      <button onClick={handleLogin} style={styles.button}>Log In</button>
      <p>
        Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
      </p>
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "400px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" },
  input: { padding: "12px", width: "100%", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px" },
  button: { padding: "12px 24px", backgroundColor: "#22c55e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" },
  error: { color: "#ef4444", marginBottom: "16px" },
  link: { textDecoration: "none", color: "#22c55e", fontWeight: "bold" },
};

export default LoginPage;
