import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage({ setAuthStatus }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) {
      setError("Email already registered.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setAuthStatus(true); // Set the user as authenticated
    localStorage.setItem("authUser", JSON.stringify({ email }));
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignUp} style={styles.button}>
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <a href="/login" style={styles.link}>
          Log In
        </a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    width: "100%",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "#ef4444",
    marginBottom: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#22c55e",
    fontWeight: "bold",
  },
};

export default SignUpPage;