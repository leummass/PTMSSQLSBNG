package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Empleado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;


import java.util.Map;


@Repository
public class EmpleadoRepository implements IEmpleadoRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public Map<String, Object> consultaEmpleados(){
        String procedimientoAlmacenado = "SP_CONSULTAEMPLEADOS";
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);
        return jdbcCall.execute();
    }
    @Override
    public Map<String, Object> actualizarEmpleado(Empleado empleado){
        String procedimientoAlmacenado = "SP_ACTUALIZAEMPLEADO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdEmpleado", empleado.getIdEmpleado())
                .addValue("Nombre",empleado.getNombre())
                .addValue("Apellido", empleado.getApellido())
                .addValue("Puesto", empleado.getPuesto());
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> eliminarEmpleado(int IdEmpleado){
        String procedimientoAlmacenado = "SP_ELIMINAREMPLEADO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdEmpleado", IdEmpleado);
        return jdbcCall.execute(parametros);
    }
    public Map<String, Object> consultaEmpleadoXId(int IdEmpleado){
        String procedimientoAlmacenado = "SP_CONSULTAEMPLEADOXID";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdEmpleado", IdEmpleado);
        return jdbcCall.execute(parametros);
    }
    public Map<String, Object> anadirEmpleado(Empleado empleado){
        String procedimientoAlmacenado = "SP_ANADIREMPLEADO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdEmpleado", empleado.getIdEmpleado())
                .addValue("Nombre",empleado.getNombre())
                .addValue("Apellido", empleado.getApellido())
                .addValue("Puesto", empleado.getPuesto());
        return jdbcCall.execute(parametros);
    }
}
