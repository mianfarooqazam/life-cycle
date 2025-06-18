"use client";
import { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    Avatar,
    Divider,
    Button,
    IconButton,
    Paper,
    TextField,
    InputAdornment,
    Collapse
} from '@mui/material';
import { X, Mail, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 0,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
};

export default function ProfileModal({ open, onClose }) {
    const { currentUser, updatePassword } = useAuth();
    const [userEmail, setUserEmail] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUserEmail(currentUser.email || 'No email available');

            // Format the creation date
            if (currentUser.metadata && currentUser.metadata.creationTime) {
                const date = new Date(currentUser.metadata.creationTime);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                setCreationDate(formattedDate);
            } else if (currentUser.metadata && currentUser.metadata.createdAt) {
                const date = new Date(currentUser.metadata.createdAt);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                setCreationDate(formattedDate);
            } else {
                setCreationDate('Date not available');
            }
        }
    }, [currentUser]);

    const getInitials = (email) => {
        if (!email) return 'U';
        return email.charAt(0).toUpperCase();
    };

    const resetPasswordForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Validation checks with toast messages
        if (!currentPassword.trim()) {
            toast.error('Please enter your current password');
            return;
        }

        if (!newPassword.trim()) {
            toast.error('Please enter a new password');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (currentPassword === newPassword) {
            toast.error('New password must be different from current password');
            return;
        }

        try {
            setLoading(true);

            // Show loading toast
            const loadingToast = toast.loading('Updating password...');

            await updatePassword(currentPassword, newPassword);

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Reset form
            resetPasswordForm();
            setShowChangePassword(false);

            // Show success toast
            toast.success('Password updated successfully! 🎉', {
                duration: 5000,
                style: {
                    background: '#5BB045',
                    color: 'white',
                    fontWeight: '500'
                }
            });

        } catch (error) {
            console.error('Password update error:', error);

            // Handle specific Firebase errors with appropriate toast messages
            let errorMessage = 'Failed to update password. Please try again.';

            switch (error.code) {
                case 'auth/invalid-credential':
                    errorMessage = 'Current password is incorrect. Please check and try again.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Current password is incorrect';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'New password is too weak. Please choose a stronger password.';
                    break;
                case 'auth/requires-recent-login':
                    errorMessage = 'For security, please log out and log back in before changing your password';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your connection and try again.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Your account has been disabled. Please contact support.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'User account not found. Please try logging in again.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Password update is not allowed. Please contact support.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address. Please try logging in again.';
                    break;
                case 'auth/user-token-expired':
                    errorMessage = 'Your session has expired. Please log in again.';
                    break;
                default:
                    // Handle any other Firebase auth errors
                    if (error.code && error.code.startsWith('auth/')) {
                        errorMessage = `Authentication error: ${error.code.replace('auth/', '').replace('-', ' ')}`;
                    } else if (error.message) {
                        // If it's not a Firebase auth error, show the general message
                        errorMessage = error.message.includes('auth/')
                            ? 'Authentication error. Please try logging in again.'
                            : 'An unexpected error occurred. Please try again.';
                    }
            }

            toast.error(errorMessage, {
                duration: 6000,
                style: {
                    background: '#f56565',
                    color: 'white',
                    fontWeight: '500'
                }
            });

            // Clear the current password field if it's wrong
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                setCurrentPassword('');
            }

        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        // Reset password form when closing
        resetPasswordForm();
        setShowChangePassword(false);
        onClose();
    };

    const handleToggleChangePassword = () => {
        if (showChangePassword) {
            resetPasswordForm();
        }
        setShowChangePassword(!showChangePassword);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="profile-modal-title"
            aria-describedby="profile-modal-description"
        >
            <Paper sx={modalStyle}>
                {/* Header */}
                <Box sx={{
                    p: 3,
                    pb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}>
                    <Typography
                        id="profile-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        Profile Information
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            }
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                    {/* Avatar Section */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: '#5BB045',
                                fontSize: '2rem',
                                fontWeight: 600,
                                mb: 2
                            }}
                        >
                            {getInitials(userEmail)}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 500, textAlign: 'center' }}>
                            User Profile
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Email Section */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        backgroundColor: '#f7f6fb',
                        borderRadius: 1,
                        mb: 2
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            backgroundColor: 'white',
                            borderRadius: 1,
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <Mail size={20} color="#5BB045" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Email Address
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                                {userEmail}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Creation Date Section */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        backgroundColor: '#f7f6fb',
                        borderRadius: 1,
                        mb: 3
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            backgroundColor: 'white',
                            borderRadius: 1,
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <Calendar size={20} color="#5BB045" />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Profile Created
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {creationDate}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Change Password Section */}
                    <Box sx={{ mb: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<Lock size={18} />}
                            onClick={handleToggleChangePassword}
                            disabled={loading}
                            sx={{
                                width: '100%',
                                backgroundColor: '#5BB045',
                                color: '#fff',
                                fontWeight: 600,
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#4a9537',
                                    color: '#fff',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                                    '& .MuiButton-startIcon': {
                                        transform: 'rotate(5deg)',
                                    }
                                },
                                '&:active': {
                                    transform: 'translateY(0px)',
                                    boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                                },
                                '&:disabled': {
                                    backgroundColor: '#e0e0e0',
                                    color: '#999',
                                    boxShadow: 'none',
                                    transform: 'none'
                                },
                                '& .MuiButton-startIcon': {
                                    transition: 'transform 0.3s ease',
                                }
                            }}
                        >
                            {showChangePassword ? 'Cancel Password Change' : 'Change Password'}
                        </Button>

                        {/* Password Change Form */}
                        <Collapse in={showChangePassword}>
                            <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    disabled={loading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    disabled={loading}
                                    helperText="Must be at least 6 characters"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    disabled={loading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    disabled={loading}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    sx={{
                                        mt: 2,
                                        py: 1.5,
                                        backgroundColor: '#5BB045',
                                        '&:hover': {
                                            backgroundColor: '#4a9537'
                                        },
                                        '&:disabled': {
                                            backgroundColor: '#ccc'
                                        }
                                    }}
                                >
                                    {loading ? 'Updating Password...' : 'Update Password'}
                                </Button>
                            </Box>
                        </Collapse>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'flex-end',
                        mt: 3
                    }}>
                       <Button 
  variant="contained"
  onClick={handleClose}
  disabled={loading}
  sx={{ 
    px: 3,
    backgroundColor: '#5BB045',
    color: '#fff',
    fontWeight: 600,
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#4a9537',
      color: '#fff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
    },
    '&:disabled': {
      backgroundColor: '#e0e0e0',
      color: '#999',
      boxShadow: 'none',
      transform: 'none'
    }
  }}
>
  Close
</Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}