import { useState } from 'react';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'green' }}>
      <Grid container spacing={2}>
        <Grid item component="aside" xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>

        <Grid item component="main" xs={6} md={8} sx={{ bgcolor: 'red' }}>
          <Box>124</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <CssBaseline />

      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#ccc', height: '60px' }}>header</Box>

        <Box sx={{ bgcolor: '#cfe8fc', height: 'calc(100vh - 60px)' }}>
          <FullWidthGrid />
        </Box>
      </Container>

      <h1>Vite + React</h1>

      <div className="card">
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
        >
          <span>count is </span>
          {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
