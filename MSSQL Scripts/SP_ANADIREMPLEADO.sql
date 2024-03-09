CREATE PROC SP_ANADIREMPLEADO
	@IdEmpleado INT,
	@Nombre VARCHAR(20),
	@Apellido VARCHAR(20),
	@Puesto VARCHAR(15)
AS
BEGIN
	INSERT INTO Empleado 
	VALUES (@IdEmpleado, @Nombre, @Apellido, @Puesto);
END;

