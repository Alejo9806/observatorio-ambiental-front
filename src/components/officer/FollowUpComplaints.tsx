import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


const FollowUpComplaints = () => {
  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{padding:3}}
      >
        <Typography component="h1" variant="h4" align='center' sx={{paddingLeft:3}}>
        Información denuncia
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Ubicacion
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Departamento:
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Ciudad: 
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Denuncia  
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Titulo: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha de generacion de la denuncia: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Fecha ultima actualizacion de denuncia:
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Descripcion: 
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Estado: 
        </Typography>
        <br />
        <Typography gutterBottom variant="h5" component="div" sx={{paddingLeft:3}}>
        Piraguero
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{paddingLeft:3}}>
        Praguero denunciante: 
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography component="h1" variant="h5">
            Seguimiento
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tracking"
                    label="Seguimiento"
                    name="tracking"
                    autoComplete="tracking"
                    autoFocus
                    multiline
                    rows={4}
                    maxRows={4}
                />
                <TextField
                    margin="normal"
                    id="conclusion"
                    label="Conclusion o texto de valor"
                    type="text"
                    name="conclusion"
                    fullWidth
                    autoFocus
                    autoComplete="conclusion"
                    multiline
                    rows={4}
                    maxRows={4}
                  />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Enviar seguimiento
                </Button>
            </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}

export default FollowUpComplaints