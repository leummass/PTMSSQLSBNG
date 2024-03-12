CREATE PROC SP_ELIMINAREMPLEADO
	@IdEmpleado INT
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	SET NOCOUNT ON;
	BEGIN TRY;
		BEGIN TRANSACTION;

		DELETE FROM Empleado WHERE IdEmpleado = @IdEmpleado;

		IF @@ROWCOUNT > 0
		BEGIN
			SET @Resultado = 1;
			SET @Mensaje = 'Se eliminó al empleado correctamente con ID '+CAST(@IdEmpleado AS VARCHAR(20));
		END
		ELSE
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'No se encontró ningún empleado para eliminar con ID '+CAST(@IdEmpleado AS VARCHAR(20));
		END
		COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
			
		IF ERROR_NUMBER() = 547
		BEGIN
				
			SET @Resultado = 0;
			SET @Mensaje = 'El registro está siendo referenciado por otra tabla'

		END
		ELSE
		BEGIN
		
			SET @Resultado = -1
			SET @Mensaje = ERROR_MESSAGE();
			
		END
		
	END CATCH
	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
END