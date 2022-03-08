import React,{useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,Title,LinearScale,BarElement,CategoryScale} from 'chart.js';
import { Pie,Doughnut,Bar } from 'react-chartjs-2';
import { Container,Grid,Paper,Typography } from '@mui/material';


import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { getStatistics } from '../redux/actions-creators/DashBoard_action';


type Props = {
    getDashboard: () => any,
    statitics:any,
}


ChartJS.register(ArcElement, Tooltip, Legend,Title,BarElement,LinearScale,CategoryScale);

const options = {
    responsive:true,
    maintainAspectRatio: false
}

const optionsCitys = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Denuncias por ciudad',
      },
    },
};

const DashboardMetrics: React.FC<Props> = (props) => {
    const {statitics,getDashboard} = props;
    // const [carga,setCarga] = useState(true);
    
    useEffect(()=>{
        getDashboard();
    },[getDashboard])

    const dataComplaints = {
        labels: ['Aprobadas', 'Rechazadas', 'Pendientes'],
        datasets: [
            {
                label: '# de denuncias',
                data: [statitics.dashboard.length !== 0 ? statitics.dashboard[0].aprobadas : 0, statitics.dashboard.length !== 0 ?  statitics.dashboard[0].rechazadas : 0, statitics.dashboard.length !== 0 ? statitics.dashboard[0].pendientes : 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataUsers = {
        labels: ['Funcionarios', 'Piragueros', 'Pendientes','Rechazados'],
        datasets: [
            {
                label: '# de denuncias',
                data: [statitics.dashboard.length !== 0 ? statitics.dashboard[1].funcionarios : 0, statitics.dashboard.length !== 0 ?  statitics.dashboard[1].piraguero : 0, statitics.dashboard.length !== 0 ? statitics.dashboard[1].pendiente : 0, statitics.dashboard.length !== 0 ? statitics.dashboard[1].rechazado : 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataTypeTracking = {
        labels: ['Ambientales', 'Legales', 'Sociales'],
        datasets: [
            {
                label: '# de denuncias',
                data: [statitics.dashboard.length !== 0 ? statitics.dashboard[2].AMBIENTAL : 0, statitics.dashboard.length !== 0 ?  statitics.dashboard[2].LEGAL : 0, statitics.dashboard.length !== 0 ? statitics.dashboard[1].pendiente : 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const dataClassTracking = {
        labels: ['Seguimiento', 'Solución', 'Cierre'],
        datasets: [
            {
                label: '# de denuncias',
                data: [statitics.dashboard.length !== 0 ? statitics.dashboard[3].SEGUIMIENTO : 0, statitics.dashboard.length !== 0 ?  statitics.dashboard[3].SOLUCION : 0, statitics.dashboard.length !== 0 ? statitics.dashboard[3].CIERRE : 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const labels = statitics.dashboard.length !== 0 ? Object.keys(statitics.dashboard[4]) : [];
    const dataCitys = {
        labels,
        datasets: [
          {
            label: 'Ciudades',
            data: labels.map((label) => {
                return statitics.dashboard.length !== 0 ? statitics.dashboard[4][label] : 0 
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
  return (
    <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography gutterBottom variant="h4" component="div">DASHBOARD</Typography>
            <br />
            <Typography gutterBottom variant="body2" component="div">Estadisticas reales de los procesos realizados que realizamos dentro del equipo de ALMAVI, para el sistema de observatorio ambiental los piraguas. </Typography>
            <Grid container spacing={3} sx={{marginTop:3}}>
                <Grid item xs={12} md={8} lg={8}>
                <Typography gutterBottom variant="h4" component="div">Denuncias</Typography>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height:400,
                        }}
                    >
                        {statitics.length !== 0 ? <Pie data={dataComplaints} options={options} width={2} height={1}/> : null}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                <Typography gutterBottom variant="h4" component="div">Usuarios</Typography>
                    <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height:400,
                        }}
                    >
                        <Pie data={dataUsers} options={options} width={2} height={1}/>
                    </Paper>
                </Grid>    
            </Grid>
            <Grid container spacing={3} sx={{marginTop:3}}>
                <Grid item xs={12} md={4} lg={4}>
                    <Typography gutterBottom variant="h4" component="div">Tipos de Seguimientos</Typography>
                        <Paper
                            sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height:400,
                            }}
                        >
                            <Doughnut data={dataTypeTracking} options={options} width={2} height={1}/>
                        </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Typography gutterBottom variant="h4" component="div">Clases de Seguimientos</Typography>
                        <Paper
                            sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height:400,
                            }}
                        >
                            <Doughnut data={dataClassTracking} options={options} width={2} height={1}/>
                        </Paper>
                </Grid>
               
            </Grid>
            <Grid container spacing={3} sx={{marginTop:3}}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography gutterBottom variant="h4" component="div">Denuncias por ciudad</Typography>
                        <Paper
                            sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height:400,
                            }}
                        >
                            <Bar options={optionsCitys} data={dataCitys}  width={2} height={1}/>
                        </Paper>
                </Grid>     
            </Grid>
        </Container>
        
    </div>
  )
}

const mapStatetoProps = (state:any) =>{
    return{
      statitics:state.getDashboard
    }
  }

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
    return {
        getDashboard:()=>{
            dispatch<any>(getStatistics()) 
        }
    }
}

export default connect(mapStatetoProps,mapDispatchToProps) (DashboardMetrics)