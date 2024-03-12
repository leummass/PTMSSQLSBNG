CREATE PROC SP_ANADIRARTICULO
	@SKU VARCHAR(20),
	@Nombre VARCHAR(30),
	@Cantidad INT
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	BEGIN TRY
		BEGIN TRANSACTION;

		INSERT INTO Inventario 
		VALUES(@SKU, @Nombre, @Cantidad);

		COMMIT TRANSACTION;

		SET @Resultado = 1;
		SET @Mensaje = 'Se guardó el registro exitosamente con SKU '+@SKU

	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		
		IF ERROR_NUMBER() = 2627
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Ya hay un articulo con el mismo SKU, intente con uno diferente'
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