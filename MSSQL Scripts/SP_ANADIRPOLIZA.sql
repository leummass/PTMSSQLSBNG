CREATE PROC SP_ANADIRPOLIZA
	@IdPolizas INT,
	@EmpleadoGenero INT,
	@SKU VARCHAR(20),
	@Cantidad INT,
	@Fecha DATE
AS
BEGIN
	DECLARE @Resultado INT;
	DECLARE @Mensaje VARCHAR(200);
	DECLARE @CantidadInventario INT;
	BEGIN TRY
		BEGIN TRANSACTION;
		
		SELECT @CantidadInventario = Cantidad FROM Inventario WHERE SKU = @SKU;
		IF @CantidadInventario >= @Cantidad
		BEGIN
		
			INSERT INTO Polizas
			VALUES(@IdPolizas,@EmpleadoGenero, @SKU, @Cantidad, @Fecha);
			
			UPDATE Inventario 
			SET Cantidad = Cantidad - @Cantidad
			WHERE SKU = @SKU
			

			SET @Resultado = 1;
			SET @Mensaje = 'Se guardó el registro exitosamente con el ID'+CAST(@IdPolizas AS VARCHAR(20))
		END
		ELSE
		BEGIN
			IF EXISTS(SELECT 1 FROM Inventario WHERE SKU = @SKU)
			BEGIN
				SET @Resultado = 0;
				SET @Mensaje = 'No hay cantidad suficiente en el inventario'
			END
			ELSE
			BEGIN
				SET @Resultado = 0;
				SET @Mensaje = 'No existe articulo con ID '+@SKU
			END
		END
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		
		IF ERROR_NUMBER() = 2627
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Ya hay una poliza con el mismo ID '+CAST(@IdPolizas AS VARCHAR(20))+', intente con uno diferente'
		END
		ELSE IF ERROR_NUMBER() = 547
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Una llave externa no existe'
		END
		ELSE
		BEGIN
			SET @Resultado = 0;
			SET @Mensaje = 'Error inesperado: '+ERROR_MESSAGE();
		END

	END CATCH
	
	SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
END