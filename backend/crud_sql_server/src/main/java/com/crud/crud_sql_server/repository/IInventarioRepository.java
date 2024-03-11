package com.crud.crud_sql_server.repository;

import com.crud.crud_sql_server.model.Inventario;

import java.util.Map;

public interface IInventarioRepository {
    public Map<String, Object> consultaInventario();
    public Map<String, Object> actualizarInventario(Inventario inventario);
    public Map<String, Object> eliminarArticulo(String SKU);
    public Map<String, Object> consultaInventarioXSKU(String SKU);
    public Map<String, Object> anadirArticulo(Inventario inventario);
}
