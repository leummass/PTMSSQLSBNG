package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Inventario;


import java.util.Map;

public interface IInventarioService {
    public Map<String, Object> consultaInventario();
    public Map<String, Object> actualizarInventario(Inventario inventario);
    public Map<String, Object> eliminarArticulo(int SKU);
    public Map<String, Object> consultaInventarioXSKU(int SKU);
    public Map<String, Object> anadirArticulo(Inventario inventario);
}
