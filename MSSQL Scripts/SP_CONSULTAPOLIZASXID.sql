CREATE PROC SP_CONSULTAPOLIZASXID
	@IdPolizas INT
AS
BEGIN
	SELECT IdPolizas AS idpolizas, EmpleadoGenero AS empleadogenero, SKU AS sku, Cantidad AS cantidad, Fecha as fecha 
	FROM Polizas 
	WHERE IdPolizas = @IdPolizas;
END;