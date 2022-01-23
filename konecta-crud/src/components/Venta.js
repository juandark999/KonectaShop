import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../services/api';
import Swal from 'sweetalert2';

class Venta extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:"",
            cantidad:"",
            errores:[]
        }
    }

    cambioValor = (e) =>{
        const state= this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state, errores:[] });
    }
    
    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !== -1;
    }
    
    enviarDatos = (e) =>{
        e.preventDefault();

        
        const { 
            id_producto, 
            cantidad, 
        } = this.state;
        
        let datosEnviar = { 
            id_producto: id_producto,  
            cantidad:cantidad, 
        }
        
        console.log(this.setState.id_producto);

        let errores = [];

        if(!id_producto)errores.push("error_id");
        if(!cantidad)errores.push("error_cantidad");

        this.setState({errores:errores});
        if(errores.length > 0) return false;
        
        
        fetch(Api+"?venta", {
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta => respuesta.json())
        .then((datos) => {
            if(datos.success == 1){
                Swal.fire({
                    title: 'Compleado!',
                    text: 'Venta realizada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'aceptar'
                  }).then(()=> {
                    this.props.history.push("/");
                  })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: datos.msg,
                    icon: 'error',
                    confirmButtonText: 'aceptar'
                  })
            }
        })
        .catch(console.log)


    }
    
    render(){

        const{
            id_producto, 
            cantidad, 
        } = this.state;
        
        return( 
            <div className="card">
                <div className="card-header">
                    Venta
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>

                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="">ID Producto</label>
                                <input type="number" 
                                       name="id_producto" 
                                       onChange={this.cambioValor} 
                                       value={id_producto} 
                                       id="id_producto" 
                                       className={ ((this.verificarError("error_id"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe el id del producto</small>
                            </div>

                            <div className="form-group col-6">
                                <label htmlFor="">Cantidad</label>
                                <input type="number"
                                       name="cantidad"
                                       onChange={this.cambioValor}
                                       value={cantidad}
                                       id="cantidad"
                                       className={ ((this.verificarError("error_cantidad"))?"is-invalid":"" )+" form-control"} />
                                <small id="helpId" className="invalid-feedback">Escribe la cantidad del producto</small>
                            </div>
                        </div>

                        <div className="btn-group mt-3" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Confirmar</button>
                            <Link className="btn btn-primary" to={"/"}>Cancelar</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Venta;