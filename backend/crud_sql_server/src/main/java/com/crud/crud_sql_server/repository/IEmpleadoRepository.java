package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;

import java.util.List;

public interface IEmpleadoRepository {

    public List<Empleado> findAll();
    public int save(Empleado empleado);
    public int deleteById(int id);
}
