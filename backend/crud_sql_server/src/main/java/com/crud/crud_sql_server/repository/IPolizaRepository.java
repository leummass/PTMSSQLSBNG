package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Poliza;

import java.util.Map;

public interface IPolizaRepository {
    public Map<String, Object> consultaPoliza();
    public Map<String, Object> actualizarPoliza(Poliza poliza);
    public Map<String, Object> eliminarPoliza(int IdPolizas);
    public Map<String, Object> consultaPolizaXId(int IdPolizas);
    public Map<String, Object> anadirPoliza(Poliza poliza);
}
