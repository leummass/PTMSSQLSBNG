CREATE PROC SP_ANADIREMPLEADO
	@IdEmpleado INT,
	@Nombre VARCHAR(20),
	@Apellido VARCHAR(20),
	@Puesto VARCHAR(15)
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	BEGIN TRY
		BEGIN TRANSACTION;

		INSERT INTO Empleado 
		VALUES (@IdEmpleado, @Nombre, @Apellido, @Puesto);

		COMMIT TRANSACTION;

		SET @Resultado = 1;
		SET @Mensaje = 'Se guardó el registro exitosamente con el ID '+ CAST(@IdEmpleado AS VARCHAR(20))

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
	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
END



