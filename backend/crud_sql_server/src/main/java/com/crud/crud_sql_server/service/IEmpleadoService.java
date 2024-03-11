package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Empleado;


import java.util.Map;

public interface IEmpleadoService {
    public Map<String, Object> consultaEmpleados();
    public Map<String, Object> actualizarEmpleadoProc(Empleado empleado);
    public Map<String, Object> eliminarEmpleado(int IdEmpleado);
    public Map<String, Object> consultaEmpleadoXId(int IdEmpleado);
    public Map<String, Object> anadirEmpleado(Empleado empleado);
}
