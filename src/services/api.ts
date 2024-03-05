import axios from 'axios'

const API_URL = 'http://qr-core-desa.blupy.com.py'

const API_BASE = axios.create({baseURL: API_URL, headers:{
    'User-Api-Key': '1',
    'X-Api-Key': 'asdfg8awenrasd8f'
}})

const APICALLER = {
    generarQR: async(datos : {})=>{
        try {
            const {data} = await API_BASE.post('/comercio/generar-qr',datos)
            
            return {success: data.success, results: data.results}
        } catch (error) {            
            return {success:false, message:'Error'}
        }
    },
    consultarAutorizacion: async(id : string)=>{
        try {
            const {data} = await API_BASE.get(`/comercio/consultar-autorizacion/${id}`)
            return {success: data.success, results: data.results}
        } catch (error) {
            return {success:false, message:'Error'}
        }
    }
}
export default APICALLER