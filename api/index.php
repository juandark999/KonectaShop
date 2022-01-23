<?php 

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    //Conexión base de datos
    $servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBD = "konecta";
    $conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBD);

    //Consulta producto
    if(isset($_GET["consultar"])){
        $queryProductos = mysqli_query($conexionBD, "SELECT * FROM productos WHERE id=".$_GET["consultar"]);
        if(mysqli_num_rows($queryProductos) > 0){
            $productos = mysqli_fetch_all($queryProductos, MYSQLI_ASSOC);
            echo json_encode($productos);
            exit();
        }
        else { echo json_encode(["success" => 0]);}
    }

    //Borrar producto
    if(isset($_GET['borrar'])){
        $sqlProducto = mysqli_query($conexionBD, "DELETE FROM productos WHERE id=".$_GET["borrar"]);
        if($sqlProducto){
            echo json_encode(["success" => 1]);
            exit();
        }
        else { echo json_encode(["success" => 0]); }
    }

    //Crear nuevo producto
    if(isset($_GET["insertar"])){

        $data = json_decode(file_get_contents("php://input"));

        $nombre_producto = $data->nombre_producto;
        $ref = $data->referencia;
        $precio = $data->precio;
        $peso = $data->peso;
        $categoria = $data->categoria;
        $stock = $data->stock;
        $fecha_creacion = date('Y-m-d', strtotime($data->fecha_creacion));
        
        $sqlProducto = mysqli_query($conexionBD,
                         "INSERT INTO productos(nombre_producto, referencia, precio, peso, categoria, stock, fecha_creacion) 
                          VALUES('$nombre_producto', '$ref', $precio, $peso, '$categoria', $stock, '$fecha_creacion')"
        );

        echo json_encode(["success" => 1]);
        exit();
    }

    //Actualizar producto
    if(isset($_GET["actualizar"])){
        $data = json_decode(file_get_contents("php://input"));

        $id = $data->id;
        $nombre_producto = $data->nombre_producto;
        $ref = $data->referencia;
        $precio = $data->precio;
        $peso = $data->peso;
        $categoria = $data->categoria;
        $stock = $data->stock;
        $fecha_creacion = date('Y-m-d', strtotime($data->fecha_creacion));

        $sqlProducto = mysqli_query(
                            $conexionBD, "UPDATE productos SET nombre_producto='$nombre_producto', referencia='$ref', precio=$precio, peso=$peso, 
                            categoria='$categoria', stock=$stock, fecha_creacion='$fecha_creacion' WHERE id = $id"
        );

        echo json_encode(["success" => 1]);
        exit();
    }

    //Crear Venta
    if(isset($_GET["venta"])){
        $data = json_decode(file_get_contents("php://input"));

        $id = $data->id_producto;
        $cantidad = $data->cantidad;
        $fecha_creacion = date('Y-m-d', time());

        $queryProducto = mysqli_query($conexionBD, "SELECT * FROM productos WHERE id = $id");
        
        if(mysqli_num_rows($queryProducto) > 0){

            $product = mysqli_fetch_all($queryProducto, MYSQLI_ASSOC);
            if($product[0]['stock'] < $cantidad){
                echo json_encode(array('success' => 0, 'msg' => 'Lo sentimos, no se puede realizar la venta por falta de inventario'));
                exit();
            }

            $stock = $product[0]['stock'] - $cantidad;

            $qr_update_product = mysqli_query($conexionBD, "UPDATE productos SET stock=$stock WHERE id = $id");
            $qr_insert_sale = mysqli_query($conexionBD, "INSERT INTO ventas(id_producto, cantidad, fecha_creacion) VALUES($id, $cantidad, '$fecha_creacion')");

            echo json_encode(["success" => 1 ]);

            exit();
        } else {
            echo json_encode(["success" => 0]);
        }
        
        exit();
    }

    //Consulta todos los productos
    $sqlProductos = mysqli_query($conexionBD, "SELECT * FROM productos");
    if(mysqli_num_rows($sqlProductos) > 0){
        $productos = mysqli_fetch_all($sqlProductos, MYSQLI_ASSOC);
        echo json_encode($productos);
    }
    else { echo json_encode(["success" => 0]); }
?>