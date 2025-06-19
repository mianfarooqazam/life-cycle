"use client";
import { Modal, Box, Typography, IconButton, Paper, Divider, Switch, FormControlLabel } from '@mui/material';
import { X, Settings } from 'lucide-react';
import { useThemeMode } from '../../context/ClientProvider';

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

export default function SettingsModal({ open, onClose }) {
    const { mode, toggleTheme } = useThemeMode();
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="settings-modal-title"
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
                        id="settings-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <Settings size={22} color="#5BB045" />
                        Settings
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                        Preferences
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Enable Notifications"
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
                        label="Dark Theme"
                        sx={{ mb: 2 }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                        More settings coming soon...
                    </Typography>
                </Box>
            </Paper>
        </Modal>
    );
} 