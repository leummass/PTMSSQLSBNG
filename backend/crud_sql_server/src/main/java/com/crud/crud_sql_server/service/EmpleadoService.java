package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Empleado;
import com.crud.crud_sql_server.repository.IEmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmpleadoService implements IEmpleadoService{
    @Autowired
    private IEmpleadoRepository iEmpleadoRepository;
    @Override
    public Map<String, Object> consultaEmpleados() {
        return iEmpleadoRepository.consultaEmpleados();
    }
    @Override
    public Map<String, Object> actualizarEmpleadoProc(Empleado empleado){
        return iEmpleadoRepository.actualizarEmpleado(empleado);
    }
    @Override
    public Map<String, Object> eliminarEmpleado(int IdEmpleado){
        return iEmpleadoRepository.eliminarEmpleado(IdEmpleado);
    }
    @Override
    public Map<String, Object> consultaEmpleadoXId(int IdEmpleado){
        return iEmpleadoRepository.consultaEmpleadoXId(IdEmpleado);
    }
    @Override
    public Map<String, Object> anadirEmpleado(Empleado empleado){
        return iEmpleadoRepository.anadirEmpleado(empleado);
    }
}
