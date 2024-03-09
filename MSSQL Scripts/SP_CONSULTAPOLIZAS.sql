CREATE PROC SP_CONSULTAPOLIZAS
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	IF EXISTS( SELECT IdPolizas FROM Polizas )
	BEGIN
		SELECT IdPolizas, EmpleadoGenero, SKU, Cantidad, Fecha FROM Polizas;
		SET @Resultado = 1;
		SET @Mensaje = '';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontraron polizas';
	END
END