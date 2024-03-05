import { Container,Grid, Typography,Button } from "@mui/joy";

function Autorizado({limpiar}: {limpiar:()=>void}) {
    //console.log(datos);
    
    return (<Container>
    <Grid container spacing={2}>
      <Grid xs={12} >
        <Typography maxWidth={400} variant='soft' level="h1" display='block' >PAGO AUTORIZADO</Typography>
      </Grid>
        <Grid xs={12}>
            <Button onClick={limpiar} variant='soft'>LISTO</Button>
        </Grid>
      </Grid>
    </Container>  );
}

export default Autorizado;