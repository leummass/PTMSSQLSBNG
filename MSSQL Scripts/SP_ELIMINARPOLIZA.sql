CREATE PROC SP_ELIMINARPOLIZA
	@IdPolizas INT
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	DECLARE @CantidadArticuloPoliza INT;
	DECLARE @SKUArticuloPoliza INT;
	BEGIN TRY
		BEGIN TRANSACTION;
		SELECT @CantidadArticuloPoliza = Cantidad, @SKUArticuloPoliza = SKU
		FROM Polizas 
		WHERE IdPolizas = @IdPolizas;

		UPDATE Inventario 
		SET Cantidad = Cantidad + @CantidadArticuloPoliza 
		WHERE SKU = @SKUArticuloPoliza;

		DELETE FROM Polizas WHERE IdPolizas = @IdPolizas;

		IF @@ROWCOUNT > 0
		BEGIN
			SET @Resultado = 1;
			SET @Mensaje = 'Se eliminó la poliza correctamente';
		END
		ELSE
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'No se encontró ningún registro para eliminar';
		END
		COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;
		SET @Resultado = -1
		SET @Mensaje = 'Error inesperado: ' + ERROR_MESSAGE();

	END CATCH
	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
	
END