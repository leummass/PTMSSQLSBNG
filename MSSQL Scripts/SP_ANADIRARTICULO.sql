CREATE PROC PROC SP_ANADIRARTICULO
	@SKU VARCHAR(20),
	@Nombre VARCHAR(30),
	@Cantidad INT,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(150) OUTPUT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		INSERT INTO Inventario 
		VALUES(@SKU, @Nombre, @Cantidad);

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
END