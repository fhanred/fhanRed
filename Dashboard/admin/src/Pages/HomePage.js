import React from 'react';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Button, Card,
  CardContent,

  CardActions,
  Grid,
}
  from '@mui/material'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '10px',
    backgroundColor: '#1976d2', // Color de fondo azul
    color: '#ffffff', // Color de texto blanco
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    color: '#ffffff',
  },
  pos: {
    marginBottom: 12,
  },
  Button: {
    color: '#ffffff',
  },
  cardContent: {
    '& > * + *': {
      marginTop: '10px', // Ajusta el espacio entre los elementos de Typography
    },
  },
});
// Define el tema personalizado
const theme = createTheme({
  typography: {
    fontSize: 16, // Tamaño de la tipografía
  },
  palette: {
    primary: {
      main: '#1976d2', // Color azul principal
    },
    text: {
      primary: '#ffffff', // Color de texto blanco
    },
  },
});

const HomePage = () => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/empleados" className="link">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  GESTION DE EMPLEADOS
                </Typography>


                <Typography variant="body2" component="h3">
                  - Gestioná consultas.
                  <br />
                  - Ingresá nuevos empleados.
                  <br />
                  - Editá información de empleados.
                  <br />

                </Typography>
              </CardContent>

            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/clientes" className="link">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  CLIENTES
                </Typography>
                <Typography variant="body2" component="h3">
                  - Listado de Clientes.
                  <br />
                  - Ver detalles de contratos.
                  <br />
                  - Ver estados de servicios.

                </Typography>
              </CardContent>

            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/tareas" className="link">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  TAREAS
                </Typography>
                <Typography variant="body2" component="h3">
                  - Asignar tareas.
                  <br />
                  - Asignar turnos de trabajo.
                  <br />
                  - Ver calendario.

                </Typography>
              </CardContent>

            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/caja" className="link">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  CAJA
                </Typography>
                <Typography variant="body2" component="h3">
                  - Gestioná consultas.
                  <br />
                  - Recibos.
                  <br />
                  - Facturas.

                </Typography>
              </CardContent>

            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/comprobantes" className="link">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  ACTUALIZACIONES
                </Typography>
                <Typography variant="body2" component="h3">
                  - Comprobantes.
                  <br />
                  - Modificaciones de Comprobantes.
                  <br />
                  - Editá información de contactos.

                </Typography>
              </CardContent>

            </Card>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomePage;
