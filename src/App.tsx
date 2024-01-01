import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ClearIcon from '@mui/icons-material/Clear';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function GridItem({ item, index }) {
  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',

    // height: '100%',
    // aspectRatio: '1 / 1',
    // aspectRatio: '9 / 16',

    border: '1px solid #ccc',
    borderRadius: 0,
    // bgcolor: item?.backgroundColor,
    // color: theme.palette.getContrastText(item?.backgroundColor),
  };

  return (
    <Card sx={cardStyles}>
      <CardActions
        sx={{ p: 0, display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton className="dragHandle" aria-label="drag" size="medium">
          <Tooltip title="拖曳" placement="top">
            <DragHandleIcon />
          </Tooltip>
        </IconButton>

        <IconButton aria-label="delete" size="small">
          <Tooltip title="刪除" placement="top">
            <ClearIcon />
          </Tooltip>
        </IconButton>
      </CardActions>

      <CardContent
        sx={{
          flexGrow: 1,
          // pt: '24%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          {item.id}
        </Typography>
      </CardContent>
    </Card>
  );
}
// end of GridItem

function GridSortable() {
  const [list, setList] = useState([]);

  // Drag and Drop Handler
  const onDragDropEnds = (oldIndex, newIndex) => {
    console.log('Drag and drop other tasks');
    console.log(oldIndex, newIndex);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
      .then((res) => res.json())
      .then((data) =>
        setList(() =>
          data.map((item) => ({
            id: item.id,
            name: item.title,
          })),
        ),
      );
  }, []);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 60px)',
        // height: '100%',
        
        '& .grid-container': {
          // height: '100%',
          height: 'calc(100vh - 60px)',
          // position: 'relative',
          display: 'grid',
          gap: '0',
          gridTemplateColumns: 'repeat(3, 1fr)',
          // gridTemplateRows: '100%',
          gridTemplateRows: 'repeat(5, 1fr)',
          // gridTemplateRows: 'repeat(5, 10vh)',
          overflowY: 'hidden',
        },

        '& .dropArea': {
          position: 'relative',

          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',

            backgroundColor: '#ebebeb',
            zIndex: 1,
          },
        },
      }}
    >
      {list.length === 0 ? (
        'LOADING...'
      ) : (
        <ReactSortable
          list={list}
          setList={(newlist) => setList(newlist)}
          ghostClass="dropArea"
          handle=".dragHandle"
          filter=".ignoreDrag"
          preventOnFilter
          className="grid-container"
          onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
        >
          <>
            {list.map((item, index) => (
              <GridItem key={item.id} item={item} index={index} />
            ))}
          </>
        </ReactSortable>
      )}
    </Box>
  );
}

function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'green', height: '100%' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item component="aside" xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>

        <Grid
          item
          component="main"
          xs={6}
          md={8}
          sx={{
            p: 8,

            border: '1px solid #ccc',
            bgcolor: '#aaa',
            shadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          <GridSortable />
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

      <Container maxWidth="xl" sx={{ height: '100vh' }}>
        <Box sx={{ bgcolor: '#ccc', height: '60px', mb: 2 }}>header</Box>

        <Box sx={{ bgcolor: '#cfe8fc', height: 'calc(100vh - 60px)' }}>
          <FullWidthGrid />
        </Box>
      </Container>
    </>
  );
}

export default App;
