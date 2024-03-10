CREATE PROC SP_CONSULTAPOLIZASXID
	@IdPolizas INT
AS
BEGIN
	SELECT EmpleadoGenero, SKU, Cantidad, Fecha FROM Polizas WHERE IdPolizas = @IdPolizas;
END;