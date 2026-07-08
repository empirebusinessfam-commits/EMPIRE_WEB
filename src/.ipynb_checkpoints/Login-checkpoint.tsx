import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace 'your-secure-password' with the actual password you want to use
    if (password === 'EBF2026') {
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      navigate('/dashboard'); // Smooth client-side redirect
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Login</h2>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// Quick inline styling to keep things clean and centralized
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000000', // Matches your luxury brand theme
    color: '#ffffff',
    fontFamily: 'sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2.5rem',
    borderRadius: '8px',
    backgroundColor: '#111111',
    border: '1px solid #333333',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    textAlign: 'center' as const,
  },
  title: {
    marginBottom: '2rem',
    fontSize: '1.75rem',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    textAlign: 'left' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.85rem',
    color: '#b3b3b3',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #444444',
    backgroundColor: '#222222',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ff0000', // Crimson red accent
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: '#ff4d4d',
    fontSize: '0.85rem',
    margin: 0,
    textAlign: 'left' as const,
  },
};