CREATE PROC SP_CONSULTAEMPLEADOXID
	@IdEmpleado INT,
	@Resultado INT OUTPUT,
	@Mensaje VARCHAR(60) OUTPUT
AS
BEGIN
	
	IF EXISTS ( SELECT IdEmpleado FROM Empleado WHERE IdEmpleado = @IdEmpleado)
	BEGIN
		SELECT IdEmpleado, Nombre, Apellido, Puesto FROM Empleado WHERE IdEmpleado = @IdEmpleado;
		SET @Resultado = 1;
		SET @Mensaje = 'Empleado encontrado';
	END
	ELSE
	BEGIN
		SET @Resultado = 0;
		SET @Mensaje = 'No se encontró al empleado';
	END
END