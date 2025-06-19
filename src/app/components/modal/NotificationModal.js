"use client";
import { Modal, Box, Typography, IconButton, Paper, Divider, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { X, Bell } from 'lucide-react';

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

const sampleNotifications = [
    {
        id: 1,
        title: 'Password Changed',
        message: 'Your password was changed successfully.',
        date: '2024-06-01 14:23'
    },
    {
        id: 2,
        title: 'Profile Updated',
        message: 'Your profile information was updated.',
        date: '2024-05-28 09:10'
    },
    {
        id: 3,
        title: 'New Login',
        message: 'A new login to your account was detected.',
        date: '2024-05-25 18:45'
    }
];

export default function NotificationModal({ open, onClose, notifications = sampleNotifications }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="notification-modal-title"
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
                        id="notification-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Bell size={22} color="#5BB045" />
                        Notifications
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
                    {notifications.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" align="center">
                            No notifications.
                        </Typography>
                    ) : (
                        <List>
                            {notifications.map((notif) => (
                                <div key={notif.id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#5BB045' }}>
                                                <Bell size={18} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={notif.title}
                                            secondary={
                                                <>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                        sx={{ fontWeight: 500 }}
                                                    >
                                                        {notif.message}
                                                    </Typography>
                                                    <br />
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {notif.date}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                            ))}
                        </List>
                    )}
                </Box>
            </Paper>
        </Modal>
    );
} 