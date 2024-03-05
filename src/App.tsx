import { Button, Container, Grid, Input, Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import {QRCodeSVG} from 'qrcode.react'
import APICALLER from "./services/api"
import Autorizado from "./Autorizado"



function App() {
  const [monto,setMonto] = useState('')
  const [dato,setDato] = useState('')
  const [continuarPeticion,setContinuarPeticion] = useState(false)
  const [autorizado,setAutorizado] = useState(false)

  const generar = async()=>{
    let montoInt = parseInt(monto)
    const res = await APICALLER.generarQR({monto:montoInt,comercio_id:1,descripcion:'Venta de BLUPY'})
    if(res.success){
      setContinuarPeticion(true)
      setDato(res.results.id)
    }
  }
  const limpiar = ()=>{
    setContinuarPeticion(false)
    setDato('')
    setMonto('')
    setAutorizado(false)
  }
  const cancelar = ()=>{
    setContinuarPeticion(false)
    setDato('')
    setMonto('')
  }

  useEffect(()=>{
    const consultarAutorizacion = async()=>{
      const res = await APICALLER.consultarAutorizacion(dato)
      if(res.success){        
        setContinuarPeticion(false)
        setAutorizado(true)
      }

    }
    const interval = setInterval(() => {
      if (continuarPeticion) {
        consultarAutorizacion();
      }
    }, 6000);
    return ()=> clearInterval(interval)
  },[continuarPeticion,dato])

  if(autorizado) return <Autorizado limpiar={limpiar}/>


  return <Container maxWidth='md'>
    <Grid container spacing={2}>
      <Grid xs={12} >
        <Typography>GENERAR QR PARA PAGOS</Typography>
      </Grid>
      <Grid xs={12} md={8}>
        <Input placeholder="Ingrese monto" value={monto} onChange={e=>{setMonto(e.target.value)}} />
      </Grid>
      <Grid xs={12} md={4}>
        <Button variant='soft' onClick={generar}>GENERAR</Button>
      </Grid>

      {
        dato != '' && <>
        <Grid xs={12} alignItems='center' justifyContent='center'>
          <QRCodeSVG value={dato} size={256} />
          <Typography>{dato}</Typography>
        </Grid>
        <Grid xs={12}>
        <Button onClick={cancelar} >Cancelar</Button>
        </Grid>
        </>
      }
      
    </Grid>
  </Container>
}

export default App