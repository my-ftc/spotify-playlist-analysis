// components/CustomTooltip.tsx
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: '#0a0f26', // Updated arrow color to match the tooltip background
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#0a0f26', // Tooltip background color
        color: '#fff', // Optional: Set text color for better readability
        fontFamily: 'Poppins, sans-serif', // Font family
        maxWidth: '180px', // Adjusted width of the tooltip
        padding: '8px 10px', // Optional: Adjust padding for a better look
    },
}));

interface CustomTooltipProps {
    title: string; // The tooltip title
    placement?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip placement
    children: React.ReactElement; // Tooltip trigger element should be a valid React element
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, placement = 'right', children }) => {
    return (
        <BootstrapTooltip title={title} arrow placement={placement}>
            {children}
        </BootstrapTooltip>
    );
};

export default CustomTooltip;
