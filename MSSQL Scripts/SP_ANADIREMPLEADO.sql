CREATE PROC SP_ANADIREMPLEADO
	@IdEmpleado INT,
	@Nombre VARCHAR(20),
	@Apellido VARCHAR(20),
	@Puesto VARCHAR(15),
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(150) OUTPUT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		INSERT INTO Empleado 
		VALUES (@IdEmpleado, @Nombre, @Apellido, @Puesto);

		COMMIT TRANSACTION;

		SET @Resultado = 1;
		SET @Mensaje = 'Se guardó el registro exitosamente'

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		
		IF ERROR_NUMBER() = 2627
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Ya hay un empleado con el mismo ID, intente con uno diferente'
		END
		ELSE IF ERROR_NUMBER() = 547
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = ''
		END
		ELSE
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Error inesperado: '+ERROR_MESSAGE();
		END

	END CATCH
		
END



