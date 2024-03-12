CREATE PROC SP_ACTUALIZAEMPLEADO
	@IdEmpleado INT,
	@Nombre VARCHAR(20),
	@Apellido VARCHAR(20),
	@Puesto VARCHAR(15)
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	SET NOCOUNT ON;
	BEGIN TRY
		
		BEGIN TRANSACTION;
		
		UPDATE Empleado
		SET Nombre = @Nombre, Apellido = @Apellido, Puesto = @Puesto
		WHERE IdEmpleado = @IdEmpleado

		IF @@ROWCOUNT > 0
        BEGIN

            SET @Resultado = 1;
            SET @Mensaje = 'Se actualizó correctamente al empleado con ID '+ CAST(@IdEmpleado AS VARCHAR(10));

        END
        ELSE
        BEGIN

            SET @Resultado = 0;
            SET @Mensaje = 'No se encontró ningún empleado para actualizar con ID '+CAST(@IdEmpleado AS VARCHAR(10));

        END
        
        COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0

				ROLLBACK TRANSACTION;

		SET @Resultado = 0;
		SET @Mensaje = ERROR_MESSAGE();

	END CATCH

	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;

END