CREATE PROC SP_CONSULTAEMPLEADOXID
	@IdEmpleado INT
AS
BEGIN
	SELECT IdEmpleado, Nombre, Apellido, Puesto FROM Empleado WHERE IdEmpleado = @IdEmpleado;
END;