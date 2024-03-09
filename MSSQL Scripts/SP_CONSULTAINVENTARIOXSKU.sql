CREATE PROC SP_CONSULTAINVENTARIOXSKU
	@SKU INT,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	IF EXISTS ( SELECT SKU FROM Inventario WHERE SKU = @SKU)
	BEGIN
		SELECT Nombre, Cantidad FROM Inventario WHERE SKU = @SKU;
		SET @Resultado = 1;
		SET @Mensaje = 'Articulo encontrado';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontró el articulo';
	END
END