package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    @Override
    public Map<String, Object> actualizarEmpleado(Empleado empleado){
        String procedimientoAlmacenado = "SP_ACTUALIZAEMPLEADO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);


        // Crear un mapa con los parámetros
        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdEmpleado", empleado.getIdEmpleado())
                .addValue("Nombre",empleado.getNombre())
                .addValue("Apellido", empleado.getApellido())
                .addValue("Puesto", empleado.getPuesto());

        // Ejecutar el procedimiento almacenado y recuperar los resultados

        // Procesar los resultados si es necesario
        return jdbcCall.execute(parametros);
    }
}
