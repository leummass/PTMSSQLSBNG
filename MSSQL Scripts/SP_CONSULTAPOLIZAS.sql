CREATE PROC SP_CONSULTAPOLIZAS
AS
BEGIN
	SELECT IdPolizas as idpolizas, EmpleadoGenero as empleadogenero, SKU as sku, Cantidad as cantidad, Fecha as fecha 
	FROM Polizas 
END;