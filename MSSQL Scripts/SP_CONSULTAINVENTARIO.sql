CREATE PROC SP_CONSULTAINVENTARIO
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	IF EXISTS( SELECT SKU FROM INVENTARIO )
	BEGIN
		SELECT SKU, Nombre, Cantidad FROM Inventario;
		SET @Resultado = 1;
		SET @Mensaje = '';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontraron articulos en el inventario';
	END
END