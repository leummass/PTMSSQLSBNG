CREATE PROC SP_ELIMINARARTICULO
	@SKU VARCHAR(20)
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	SET NOCOUNT ON;
	BEGIN TRY;
		BEGIN TRANSACTION;

		DELETE FROM Inventario WHERE SKU = @SKU;

		IF @@ROWCOUNT > 0
		BEGIN
			SET @Resultado = 1;
			SET @Mensaje = 'Se elimin� correctamente el articulo con SKU '+@SKU;
		END
		ELSE
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'No se encontr� ning�n articulo para eliminar con SKU '+@SKU;
		END
		COMMIT TRANSACTION;

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0

			ROLLBACK TRANSACTION;
			IF ERROR_NUMBER() = 547
			BEGIN
				
				SET @Resultado = 0;
				SET @Mensaje = 'El articulo est� siendo referenciado por otra tabla'

			END
			ELSE
			BEGIN
				SET @Resultado = -1
				SET @Mensaje = ERROR_MESSAGE();
			END
	END CATCH
	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;

END