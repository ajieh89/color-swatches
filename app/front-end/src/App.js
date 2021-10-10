import './App.css';
import React from 'react';
import { Box, AppBar, Button, Typography, Toolbar, CircularProgress } from '@mui/material';
import moment from 'moment';

const App = () => {
  const [ colorSwatches, setColorSwatches ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);

  React.useEffect(() => {
    getColorSwatches();
  }, []);

  const getColorSwatches = async () => {
    setLoading(true);
    const response = await fetch('http://127.0.0.1:8000/api/color-swatches/');
    const data = await response.json();

    if (data.status === 'Ok') {
      setColorSwatches(data.data);
    } else {
      setColorSwatches([]);
    }
    setLoading(false);
  }

  const renderColorSwatches = () => {
    if (colorSwatches && colorSwatches.length > 0) {

      return colorSwatches.map((item, index) => {
        let bgColor = null;
        let info = {
          'space': item.name
        };

        switch(item.name.toUpperCase()) {
          case "RGB":
            bgColor = 'rgb(' + item.red + ', ' + item.green  + ', ' + item.blue  + ')';
            info['red'] = item.red;
            info['green'] = item.green;
            info['blue'] = item.blue;
            break;
          case "HSL":
            bgColor = 'hsl(' + item.hue + ', ' + item.saturation  + '%, ' + item.lightness  + '%)';
            info['hue'] = item.hue;
            info['saturation'] = `${item.saturation}%`;
            info['lightness'] =  `${item.lightness}%`;
            break;
          default:
            bgColor = 'white';
            break;
        }

        return (
          <Box key={`color-${index}`} className='color-display' sx={{ backgroundColor: bgColor }}>
            <div className='color-info'>
              { Object.keys(info).map((key, ind) => (
                <div key={moment.utc() + ind}>
                  {`${key.toUpperCase()}: ${info[key]}`}
                </div>
              )) }
            </div>
          </Box>
        )
      });
    } else {
      return 'NO COLORS IS RETURNED!';
    }
  }


  if (loading) {
    return (
      <div className='loading'>
        <CircularProgress />
      </div>
    );
  }


  return (
    <div className='app'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Color Swatches
            </Typography>
            <Button variant="contained" color="success" onClick={()=> { getColorSwatches() }}>Refresh </Button>
          </Toolbar>
        </AppBar>
        <div className='color'>
          { renderColorSwatches() }
        </div>
    </div>
  );
}

export default App;
