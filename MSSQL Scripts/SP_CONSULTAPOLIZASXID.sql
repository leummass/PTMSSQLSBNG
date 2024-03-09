CREATE PROC SP_CONSULTAPOLIZASXID
	@IdPolizas INT,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	IF EXISTS ( SELECT IdPolizas FROM Polizas WHERE IdPolizas = @IdPolizas )
	BEGIN
		SELECT EmpleadoGenero, SKU, Cantidad, Fecha FROM Polizas WHERE IdPolizas = @IdPolizas;
		SET @Resultado = 1;
		SET @Mensaje = 'Poliza encontrado';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontró la poliza';
	END
END;