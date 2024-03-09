CREATE PROC SP_CONSULTAPOLIZAS
AS
BEGIN
	SELECT IdPolizas, EmpleadoGenero, SKU, Cantidad, Fecha FROM Polizas;
END;