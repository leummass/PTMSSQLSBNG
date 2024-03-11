package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Poliza;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class PolizaRepository implements IPolizaRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public Map<String, Object> consultaPoliza(){
        String procedimientoAlmacenado = "SP_CONSULTAPOLIZAS";
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);
        return jdbcCall.execute();
    }
    @Override
    public Map<String, Object> actualizarPoliza(Poliza poliza){
        String procedimientoAlmacenado = "SP_ACTUALIZAPOLIZA";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdPolizas", poliza.getIdPolizas())
                .addValue("EmpleadoGenero",poliza.getEmpleadoGenero())
                .addValue("SKU", poliza.getSku())
                .addValue("Cantidad", poliza.getCantidad())
                .addValue("Fecha", poliza.getFecha());
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> eliminarPoliza(int IdPolizas){
        String procedimientoAlmacenado = "SP_ELIMINARPOLIZA";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdPolizas", IdPolizas);
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> consultaPolizaXId(int IdPolizas){
        String procedimientoAlmacenado = "SP_CONSULTAPOLIZASXID";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdPolizas", IdPolizas);
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> anadirPoliza(Poliza poliza){
        String procedimientoAlmacenado = "SP_ANADIRPOLIZA";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("IdPolizas", poliza.getIdPolizas())
                .addValue("EmpleadoGenero",poliza.getEmpleadoGenero())
                .addValue("SKU", poliza.getSku())
                .addValue("Cantidad", poliza.getCantidad())
                .addValue("Fecha", poliza.getFecha());
        return jdbcCall.execute(parametros);
    }
}
