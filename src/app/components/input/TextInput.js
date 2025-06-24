import React from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const TextInput = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    disabled = false,
    variant = 'outlined',
    fullWidth = true,
    options = null, // For select dropdown
    ...props
}) => {
    return (
        <FormControl fullWidth={fullWidth} variant={variant}>
            <FormLabel>{label}</FormLabel>
            {options ? (
                <Select
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <TextField
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    variant={variant}
                    select={false}
                    {...props}
                />
            )}
        </FormControl>
    );
};

export default TextInput;