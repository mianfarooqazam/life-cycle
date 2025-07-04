import { useState } from 'react';
import { User, Settings, Bell } from 'lucide-react';
import { Badge, Box, Typography } from '@mui/material';
import Image from 'next/image';
import ProfileModal from '../modal/ProfileModal';
import NotificationModal from '../modal/NotificationModal';
import SettingsModal from '../modal/SettingsModal';

export default function Header() {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileModalOpen(true);
    };

    const handleNotificationClick = () => {
        setNotificationModalOpen(true);
    };

    const handleSettingsClick = () => {
        setSettingsModalOpen(true);
    };

    const handleCloseModal = () => {
        setProfileModalOpen(false);
    };

    const handleCloseNotificationModal = () => {
        setNotificationModalOpen(false);
    };

    const handleCloseSettingsModal = () => {
        setSettingsModalOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#f7f6fb',
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 64,
                    gridColumn: 'span 9'
                }}
            >
                {/* Logos on the left */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Image
                        src="/lca-logo.png"
                        alt="LCA Logo"
                        width={69}
                        height={69}
                        style={{
                            objectFit: 'contain',
                            backgroundColor: 'transparent'
                        }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: '#5BB045' }}>
                        Life Cycle Analysis
                    </Typography>
                </Box>

                {/* Icons on the right */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge>
                        <Box
                            onClick={handleProfileClick}
                            sx={{
                                cursor: 'pointer',
                                color: 'black',
                                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                                padding: '10px',
                                borderRadius: '15px',
                                backgroundColor: 'white',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            <User size={24} />
                        </Box>
                    </Badge>
                    <Badge>
                        <Box sx={{
                            cursor: 'pointer',
                            color: 'black',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                            padding: '10px',
                            borderRadius: '15px',
                            backgroundColor: 'white',
                            transition: 'color 0.2s'
                        }}
                        onClick={handleSettingsClick}
                        >
                            <Settings size={24} />
                        </Box>
                    </Badge>
                    <Badge
                        badgeContent={5}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#5BB045',
                                color: 'white'
                            }
                        }}
                    >
                        <Box sx={{
                            cursor: 'pointer',
                            color: 'black',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                            padding: '10px',
                            borderRadius: '15px',
                            backgroundColor: 'white',
                            transition: 'color 0.2s'
                        }}
                        onClick={handleNotificationClick}
                        >
                            <Bell size={24} />
                        </Box>
                    </Badge>
                </Box>
            </Box>

            {/* Profile Modal */}
            <ProfileModal
                open={profileModalOpen}
                onClose={handleCloseModal}
            />
            {/* Notification Modal */}
            <NotificationModal
                open={notificationModalOpen}
                onClose={handleCloseNotificationModal}
            />
            {/* Settings Modal */}
            <SettingsModal
                open={settingsModalOpen}
                onClose={handleCloseSettingsModal}
            />
        </>
    );
}