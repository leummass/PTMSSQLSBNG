package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Empleado;
import com.crud.crud_sql_server.repository.IEmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmpleadoService implements IEmpleadoService{
    @Autowired
    private IEmpleadoRepository iEmpleadoRepository;
    @Override
    public List<Empleado> findAll() {
        List<Empleado> listaEmpleados;
        try {
            listaEmpleados = iEmpleadoRepository.findAll();
        } catch (Exception ex) {
            throw ex;
        }
        return listaEmpleados;
    }

    @Override
    public int save(Empleado empleado) {
        return 0;
    }

    @Override
    public int deleteById(int id) {
        return 0;
    }
}
