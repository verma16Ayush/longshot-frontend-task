import { Avatar, Box, Typography, useTheme } from '@mui/material'


export function BasicProfile() {
  const theme = useTheme();
  return (
    <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}} >
      <Avatar sx={{m: 1, bgcolor: theme.palette.primary.main}} >AV</Avatar>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography fontSize={'small'} color='grey' fontWeight={'bold'} >
            verma.ayush16
          </Typography>
          <Typography fontSize='small' color='grey'>
            Credits Used: 313.2
          </Typography>
        </Box>
    </Box>
  )
}