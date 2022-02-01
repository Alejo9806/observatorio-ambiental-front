import React,{useEffect,useState} from 'react';
import { connect} from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { getAddress, registerComplaint } from '../redux/actions-creators/Complaint_action';
//Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

type FormElement = React.FormEvent<HTMLFormElement>;

type Props = {
    registerComplaint: (newComplaint:any,token:string) => any,
    getAddress:(lat:number,lon:number) =>any,
    longitud:number,
    latitud:number,
    auth:any,
    address:any,
    openstreetmap:number,
    setOpenstreetmap:React.Dispatch<React.SetStateAction<number>>
}

interface IComplaint {
    departamento:string,
    ciudad:string,
    titulo:string,
    descripcion:string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



const ComplaintRegister: React.FC<Props> = (props) => {

    const {registerComplaint,getAddress,longitud,latitud,auth,address,openstreetmap,setOpenstreetmap} = props;

    const [complaint,setNewComplaint] = useState<IComplaint>({departamento:'',ciudad:'',titulo:'',descripcion:''})
   

    useEffect(() => {
        if(longitud && latitud && openstreetmap === 0){
            getAddress(latitud,longitud);
        }  
        setOpenstreetmap(1);
    });

    
    const handleComplaint = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const nameInput = e.target.name;
        let value;
        value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewComplaint({
            ...complaint,
            [nameInput]: value
        })
    }

    const handleSubmit = (e:FormElement) =>{
        e.preventDefault();
        console.log(complaint,auth);
        if(auth.isLoggedIn){
            const token = auth.user.token;
            const newComplaint = {
                ubicacion:{
                    coordenadas:{
                        latitud:latitud,
                        longitud:longitud,
                        altitud:""
                    },
                    departamento:address.address.state,
                    ciudad:address.address.county
                },
                denuncia:{
                    titulo:complaint.titulo,
                    descripcion:complaint.descripcion
                },
                piraguero:{
                    nombre:"victor",
                    id:"61ee3855632f4b6799bac8b9"
                }
            }
            registerComplaint(newComplaint,token);
        }
        
    }


    return (
        <div>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom component="div">
                    Registra tu problema
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* <Grid item xs={12} sm={12}>
                        <TextField  required type="text"  fullWidth onChange={handleComplaint} id='departamento' name='departamento' label="Departamento" variant="outlined" value={complaint.departamento}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField  required type="text" fullWidth onChange={handleComplaint} id='ciudad' name='ciudad'  label="Ciudad" variant="outlined" value={complaint.ciudad}/>
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                        <TextField  required type="text" fullWidth onChange={handleComplaint} id='titulo' name='titulo' label="Titulo" variant="outlined" value={complaint.titulo}/>
                    </Grid>   
                    <Grid item xs={12} sm={12}>
                        <TextField  required type="text" fullWidth onChange={handleComplaint} id='descripcion' name='descripcion' label="Descripcion" variant="outlined" value={complaint.descripcion}/>       
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button type='submit' fullWidth variant="outlined">Enviar</Button>
                    </Grid>
                </form>
            </Box>
        </div>
    );
};


const mapStatetoProps = (state:any) =>{
    return{
      auth:state.loggin,
      address:state.address
    }
  }

const mapDispatchToProps = (dispatch:Dispatch<AnyAction>) =>{
    return {
        registerComplaint:(complaint:any,token:string) => {
            dispatch<any>(registerComplaint(complaint,token)) 
        },
        getAddress:(lat:number,lon:number) =>{
            dispatch<any>(getAddress(lat,lon))
        }
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ComplaintRegister);