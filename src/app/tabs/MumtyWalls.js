"use client";
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { DoorOpen, RectangleHorizontal } from 'lucide-react';
import DoorModal from '@/app/components/modal/DoorModal';
import WindowModal from '@/app/components/modal/WindowModal';

export default function MumtyWalls() {
    const [doorModalOpen, setDoorModalOpen] = useState(false);
    const [windowModalOpen, setWindowModalOpen] = useState(false);

    return (
        <div className="p-2">
            {/* <h2 className="text-2xl font-bold mb-6 text-center">Mumty Walls</h2> */}
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<DoorOpen size={20} />}
                    onClick={() => setDoorModalOpen(true)}
                    sx={{
                        backgroundColor: '#5BB045',
                        color: '#fff',
                        fontWeight: 600,
                        py: 1.5,
                        px: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#4a9537',
                            color: '#fff',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                        }
                    }}
                >
                    Add Door
                </Button>

                <Button
                    variant="contained"
                    startIcon={<RectangleHorizontal size={20} />}
                    onClick={() => setWindowModalOpen(true)}
                    sx={{
                        backgroundColor: '#5BB045',
                        color: '#fff',
                        fontWeight: 600,
                        py: 1.5,
                        px: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 2px 8px rgba(91, 176, 69, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#4a9537',
                            color: '#fff',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 16px rgba(91, 176, 69, 0.4)',
                        }
                    }}
                >
                    Add Window
                </Button>
            </Box>

            <DoorModal 
                open={doorModalOpen} 
                onClose={() => setDoorModalOpen(false)} 
            />
            
            <WindowModal 
                open={windowModalOpen} 
                onClose={() => setWindowModalOpen(false)} 
            />
        </div>
    );
}