package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;

import java.util.List;
import java.util.Map;

public interface IEmpleadoRepository {

    public Map<String, Object> consultaEmpleados();
    public Map<String, Object> actualizarEmpleado(Empleado empleado);
    public Map<String, Object> eliminarEmpleado(int IdEmpleado);
    public Map<String, Object> consultaEmpleadoXId(int IdEmpleado);
    public Map<String, Object> anadirEmpleado(Empleado empleado);
}
