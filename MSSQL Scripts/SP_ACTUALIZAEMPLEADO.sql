CREATE PROC SP_ACTUALIZAEMPLEADO
	@IdEmpleado INT,
	@Nombre VARCHAR(20),
	@Apellido VARCHAR(20),
	@Puesto VARCHAR(15),
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	
	SET NOCOUNT ON;
	BEGIN TRY
		
		BEGIN TRANSACTION;
		
		UPDATE Empleado
		SET Nombre = @Nombre, Apellido = @Apellido, Puesto = @Puesto
		WHERE IdEmpleado = @IdEmpleado

		IF @@ROWCOUNT > 0
        BEGIN

            SET @Resultado = 1;
            SET @Mensaje = 'Se actualizó correctamente al empleado con ID '+ @IdEmpleado;

        END
        ELSE
        BEGIN

            SET @Resultado = 0;
            SET @Mensaje = 'No se encontró ningún empleado para actualizar.';

        END
        
        COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0

				ROLLBACK TRANSACTION;

		SET @Resultado = 0;
		SET @Mensaje = ERROR_MESSAGE();

	END CATCH
END