import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ height:'100%',display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}