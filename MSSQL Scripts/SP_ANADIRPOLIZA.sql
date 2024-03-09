CREATE PROC SP_ANADIRPOLIZA
	@IdPolizas INT,
	@EmpleadoGenero INT,
	@SKU VARCHAR(20),
	@Cantidad INT,
	@Fecha DATE
AS
BEGIN
	INSERT INTO Polizas
	VALUES(@IdPolizas,@EmpleadoGenero, @SKU, @Cantidad, @Fecha);
END;