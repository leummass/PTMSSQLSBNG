package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Inventario;
import com.crud.crud_sql_server.repository.IInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class InventarioService implements IInventarioService{
    @Autowired
    private IInventarioRepository iInventarioRepository;
    @Override
    public Map<String, Object> consultaInventario(){
        return iInventarioRepository.consultaInventario();
    }
    @Override
    public Map<String, Object> actualizarInventario(Inventario inventario){
        return iInventarioRepository.actualizarInventario(inventario);
    }
    @Override
    public Map<String, Object> eliminarArticulo(String SKU){
        return iInventarioRepository.eliminarArticulo(SKU);
    }
    @Override
    public Map<String, Object> consultaInventarioXSKU(String SKU){
        return iInventarioRepository.consultaInventarioXSKU(SKU);
    }
    @Override
    public Map<String, Object> anadirArticulo(Inventario inventario){
        return iInventarioRepository.anadirArticulo(inventario);
    }
}
