package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Empleado;

import java.util.List;

public interface IEmpleadoService {
    public List<Empleado> findAll();
    public int save(Empleado empleado);
    public int deleteById(int id);
}