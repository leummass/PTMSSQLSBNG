package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;

import java.util.List;
import java.util.Map;

public interface IEmpleadoRepository {

    public List<Empleado> findAll();
    public int save(Empleado empleado);
    public int deleteById(int id);
    public Map<String, Object> actualizarEmpleado(Empleado empleado);
}
