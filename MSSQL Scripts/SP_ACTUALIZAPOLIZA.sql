CREATE PROC SP_ACTUALIZAPOLIZA
	@IdPoliza INT,
	@EmpleadoGenero INT,
	@SKU VARCHAR(20),
	@Cantidad INT,
	@Fecha DATE,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	
	BEGIN TRY
		
		BEGIN TRANSACTION;

		DECLARE @SKUAnterior INT;
		DECLARE @CantidadAnterior INT;

		SELECT @SKUAnterior = SKU, @CantidadAnterior = Cantidad
		FROM Polizas
		WHERE IdPolizas = @IdPoliza;

		IF @SKUAnterior != @SKU
		BEGIN
		--CASO 1: SON DISTINTOS ARTICULOS
			DECLARE @CantidadInventario INT;
			SELECT @CantidadInventario = Cantidad FROM Inventario WHERE SKU = @SKU;

			IF @CantidadInventario > @Cantidad 
			BEGIN
				UPDATE Polizas 
				SET EmpleadoGenero = @EmpleadoGenero, SKU = @SKU, Cantidad = @Cantidad, Fecha = @Fecha
				WHERE IdPolizas = @IdPoliza;
				UPDATE Inventario SET Cantidad = @CantidadInventario - @Cantidad WHERE SKU = @SKU;
				UPDATE Inventario SET Cantidad = Cantidad + @CantidadAnterior WHERE SKU = @SKUAnterior;

				COMMIT;
				SET @Resultado = 1;
				SET @Mensaje = 'Se ha actualizado la poliza';
			END
			ELSE
			BEGIN
				ROLLBACK;
				SET @Resultado = 0
				SET @Mensaje = 'No se pudo actualizar la poliza ya que no hay cantidad suficiente en inventario';
			END
		END
		ELSE
		BEGIN
		--CASO 2: MISMO ARTICULO
			DECLARE @CantidadInventario2 INT;
			DECLARE @CantidadPreviaPoliza INT;
			DECLARE @DiferenciaInventario INT;
			
			SELECT @CantidadPreviaPoliza = Cantidad FROM Polizas WHERE IdPolizas = @IdPoliza;
			SELECT @DiferenciaInventario = @Cantidad - @CantidadPreviaPoliza;
			SELECT @CantidadInventario2 = Cantidad FROM Inventario WHERE SKU = @SKU;

			IF @CantidadInventario2 > @DiferenciaInventario
			BEGIN
				UPDATE Polizas 
				SET EmpleadoGenero = @EmpleadoGenero, SKU = @SKU, Cantidad = @Cantidad, Fecha = @Fecha
				WHERE IdPolizas = @IdPoliza;
				UPDATE Inventario SET Cantidad = @CantidadInventario2 - @DiferenciaInventario WHERE SKU = @SKU;

				COMMIT;
				SET @Resultado = 1;
				SET @Mensaje = 'Se ha actualizado la poliza';
			END
			ELSE
			BEGIN
				ROLLBACK;
				SET @Resultado = 0
				SET @Mensaje = 'No se pudo actualizar la poliza ya que no hay cantidad suficiente en inventario';
			END
		END
	END TRY
	BEGIN CATCH

		ROLLBACK TRANSACTION;

		SET @Resultado = 0;
		SET @Mensaje = 'No se pudo actualizar la poliza ya que hubo un error: '+ERROR_MESSAGE();

	END CATCH
END