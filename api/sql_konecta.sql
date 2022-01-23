-- Obtener el producto con mayor inventario (stock) --Tabla productos
SELECT * FROM productos WHERE stock = (SELECT MAX(stock ) FROM productos);

--Obtener el producto mas vendido -- Tabla ventas
SELECT ventas.id_producto, SUM(ventas.cantidad) AS TotalVentas FROM ventas GROUP BY ventas.id_producto ORDER BY SUM(ventas.cantidad) DESC LIMIT 1;