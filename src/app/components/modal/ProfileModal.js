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
  Paper
} from '@mui/material';
import { X, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
  outline: 'none'
};

export default function ProfileModal({ open, onClose }) {
  const { currentUser } = useAuth();
  const [userEmail, setUserEmail] = useState('');
  const [creationDate, setCreationDate] = useState('');

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
        // Alternative property name in case creationTime is not available
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

  return (
    <Modal
      open={open}
      onClose={onClose}
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
            onClick={onClose}
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

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'flex-end',
            mt: 3
          }}>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{ 
                px: 3,
                borderColor: '#5BB045',
                color: '#5BB045',
                '&:hover': {
                  borderColor: '#4a9537',
                  backgroundColor: 'rgba(91, 176, 69, 0.04)'
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