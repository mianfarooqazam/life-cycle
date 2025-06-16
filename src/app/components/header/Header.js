import { User, Settings, Bell } from 'lucide-react';
import { Badge, Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Header() {
    return (
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
                    <Box sx={{
                        cursor: 'pointer',
                        color: 'black',
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        padding: '10px',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        transition: 'color 0.2s'
                    }}>
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
                    }}>
                        <Settings size={24} />
                    </Box>
                </Badge>
                <Badge badgeContent={5} color="primary">
                    <Box sx={{
                        cursor: 'pointer',
                        color: 'black',
                        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        padding: '10px',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        transition: 'color 0.2s'
                    }}>
                        <Bell size={24} />
                    </Box>
                </Badge>
            </Box>
        </Box>
    );
}
