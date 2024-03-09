CREATE PROC SP_CONSULTAEMPLEADOS
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	IF EXISTS( SELECT IdEmpleado FROM Empleado )
	BEGIN
		SELECT IdEmpleado, Nombre, Apellido, Puesto FROM Empleado;
		SET @Resultado = 1;
		SET @Mensaje = '';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontraron empleados registrados';
	END
END