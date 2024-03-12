CREATE PROC SP_CONSULTAEMPLEADOXID
	@IdEmpleado INT
AS
BEGIN
	SELECT IdEmpleado AS idempleado, Nombre AS nombre, Apellido AS apellido, Puesto AS puesto FROM Empleado WHERE IdEmpleado = @IdEmpleado;
END