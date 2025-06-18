"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      router.push('/');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
    }

    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f7f6fb',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: '600px'
      }}>

        {/* Left side - Login Form (60%) */}
        <Box sx={{
          flex: '0 0 60%',
          padding: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
        
            <Typography 
              component="h1" 
              fontWeight="bold" 
              variant="h4" 
              gutterBottom
              sx={{ textAlign: 'center', mb: 1 }}
            >
              Life Cycle Analysis
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 4, textAlign: 'center' }}
            >
              Carbon, Cost & Quantity Calculation Dashboard
            </Typography>

            {error && <Alert severity="error" sx={{ width: '100%', mb: 3 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600
                }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary.main">
                    Dont have an account? Sign Up
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right side - Logo (40%) */}
        <Box sx={{
          flex: '0 0 40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/lca-logo.png"
              alt="LCA Logo"
              width={250}
              height={250}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Box>

      </Box>
    </Box>
  );
}