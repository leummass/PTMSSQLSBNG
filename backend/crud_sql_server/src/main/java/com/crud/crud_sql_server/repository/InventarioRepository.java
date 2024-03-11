package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Inventario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public class InventarioRepository implements IInventarioRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public Map<String, Object> consultaInventario(){
        String procedimientoAlmacenado = "SP_CONSULTAINVENTARIO";
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);
        return jdbcCall.execute();
    }
    @Override
    public Map<String, Object> actualizarInventario(Inventario inventario){
        String procedimientoAlmacenado = "SP_ACTUALIZAINVENTARIO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("SKU", inventario.getSKU())
                .addValue("Nombre",inventario.getNombre())
                .addValue("Cantidad", inventario.getCantidad());
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> eliminarArticulo(String SKU){
        String procedimientoAlmacenado = "SP_ELIMINARARTICULO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("SKU", SKU);
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> consultaInventarioXSKU(String SKU){
        String procedimientoAlmacenado = "SP_CONSULTAINVENTARIOXSKU";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("SKU", SKU);
        return jdbcCall.execute(parametros);
    }
    @Override
    public Map<String, Object> anadirArticulo(Inventario inventario){
        String procedimientoAlmacenado = "SP_ANADIRARTICULO";

        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName(procedimientoAlmacenado);

        MapSqlParameterSource parametros = new MapSqlParameterSource()
                .addValue("SKU", inventario.getSKU())
                .addValue("Nombre",inventario.getNombre())
                .addValue("Cantidad", inventario.getCantidad());
        return jdbcCall.execute(parametros);
    }
}
