import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      setError("User already exists. Try logging in.");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Log in the user immediately after signing up
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setAuthUser(newUser);

    setSuccess("Account created successfully! Redirecting...");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button onClick={handleSignUp} style={styles.button}>
          Sign Up
        </button>
      </form>
      <p style={styles.loginPrompt}>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>
          Log In
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
    "&:focus": {
      borderColor: "#22c55e",
    },
  },
  button: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#16a34a",
    },
  },
  error: {
    color: "#ef4444",
    marginBottom: "16px",
  },
  success: {
    color: "#22c55e",
    marginBottom: "16px",
  },
  link: {
    textDecoration: "none",
    color: "#22c55e",
    fontWeight: "bold",
  },
  loginPrompt: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#555",
  },
};

export default SignUpPage;
