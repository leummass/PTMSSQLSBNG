CREATE PROC SP_ACTUALIZAINVENTARIO
	@SKU VARCHAR(20),
	@Nombre VARCHAR(20),
	@Cantidad INT
AS
BEGIN
	
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	SET NOCOUNT ON;
	BEGIN TRY
		
		BEGIN TRANSACTION;
		
		UPDATE Inventario
		SET Nombre = @Nombre, Cantidad = @Cantidad
		WHERE SKU = @SKU;

		IF @@ROWCOUNT > 0
        BEGIN

            SET @Resultado = 1;
            SET @Mensaje = 'Se actualizó correctamente al articulo con SKU '+ @SKU;

        END
        ELSE
        BEGIN

            SET @Resultado = 0;
            SET @Mensaje = 'No se encontró ningún articulo para actualizar.';

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