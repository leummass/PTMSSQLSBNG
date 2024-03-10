package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class EmpleadoRepository implements IEmpleadoRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Empleado> findAll(){
        String SQL = "EXEC SP_CONSULTAEMPLEADOS";
        return jdbcTemplate.query(SQL, BeanPropertyRowMapper.newInstance(Empleado.class));
    }
    @Override
    public int save(Empleado empleado){
        return 1;
    }
    @Override
    public int deleteById(int id){
        return 1;
    }
}
