CREATE PROC SP_ELIMINAREMPLEADO
	@IdEmpleado INT,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY;
		BEGIN TRANSACTION;

		DELETE FROM Empleado WHERE IdEmpleado = @IdEmpleado;

		IF @@ROWCOUNT > 0
		BEGIN
			SET @Resultado = 1;
			SET @Mensaje = 'Se eliminó al empleado correctamente';
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

END;