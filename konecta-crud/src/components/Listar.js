import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../services/api';

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            productos:[] 
        }
    }

    cargarDatos(){
        
        fetch(Api)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            this.setState({ datosCargados:true, productos:datos})
        })
        .catch(console.log)

    }

    borrarDatos = (id) =>{
        
        fetch(Api+"?borrar="+id)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            this.cargarDatos();
        })
        .catch(console.log)

    }


    
    componentDidMount(){
        this.cargarDatos();
    }
    
    render(){

        const{datosCargados, productos} = this.state

        if(!datosCargados){ return(<div>Cargando...</div>); }
        
        return( 
            <div className="card">
                <div className="card-header">
                    <Link type="button" className="btn btn-success m-1" to={'/crear'}>Agregar Producto</Link>
                    <Link type="button" className="btn btn-info" to={'/venta'}>Vender Producto</Link>
                </div>
                <h4 className="m-4">Lista de productos</h4>
                <div className="card-body">
                    <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Referencia</th>
                            <th>Precio</th>
                            <th>Peso</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Fecha Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(
                            (producto) => (
                                <tr key={producto.id}>
                                    <td scope="row">{producto.id}</td>
                                    <td>{producto.nombre_producto}</td>
                                    <td>{producto.referencia}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.peso}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.stock}</td>
                                    <td>{producto.fecha_creacion}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link type="button" className="btn btn-warning" to={'/editar/'+producto.id}>Editar</Link>
                                            <button type="button" className="btn btn-danger" onClick={()=>this.borrarDatos(producto.id)}>Borrar</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                    </table> 
                </div>
            </div>
        );
    }
}

export default Listar;