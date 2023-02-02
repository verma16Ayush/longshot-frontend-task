import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';

export function FacebookCircularProgress(props: CircularProgressProps & {clr: string}) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={props.size}
        thickness={props.thickness}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        // disableShrink
        sx={{
          // color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          color: props.clr || '#1a90ff',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={props.size}
        color={props.color}
        thickness={props.thickness}
        value={props.value || 0}
        {...props}
      />
    </Box>
  );
}