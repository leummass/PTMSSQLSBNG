CREATE PROC SP_ELIMINARPOLIZA
	@IdPolizas INT
AS
BEGIN
	DECLARE @CantidadArticuloPoliza INT;
	DECLARE @SKUArticuloPoliza VARCHAR(20);

	SELECT @CantidadArticuloPoliza = Cantidad, @SKUArticuloPoliza = SKU
	FROM Polizas 
	WHERE IdPolizas = @IdPolizas;

	UPDATE Inventario 
	SET Cantidad = Cantidad + @CantidadArticuloPoliza 
	WHERE SKU = @SKUArticuloPoliza;

	DELETE FROM Polizas WHERE IdPolizas = @IdPolizas;
END;