CREATE PROC SP_CONSULTAEMPLEADOS
AS
BEGIN
	SELECT IdEmpleado AS idempleado, Nombre AS nombre, Apellido AS apellido, Puesto AS puesto FROM Empleado;
END