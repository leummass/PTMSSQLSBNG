package com.crud.crud_sql_server.service;

import com.crud.crud_sql_server.model.Poliza;
import com.crud.crud_sql_server.repository.IPolizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PolizaService implements IPolizaService{

    @Autowired
    private IPolizaRepository iPolizaRepository;
    @Override
    public Map<String, Object> consultaPoliza(){
        return iPolizaRepository.consultaPoliza();
    }
    @Override
    public Map<String, Object> actualizarPoliza(Poliza poliza){
        return iPolizaRepository.actualizarPoliza(poliza);
    }
    @Override
    public Map<String, Object> eliminarPoliza(int IdPolizas){
        return iPolizaRepository.eliminarPoliza(IdPolizas);
    }
    @Override
    public Map<String, Object> consultaPolizaXId(int IdPolizas){
        return iPolizaRepository.consultaPolizaXId(IdPolizas);
    }
    @Override
    public Map<String, Object> anadirPoliza(Poliza poliza){
        return iPolizaRepository.anadirPoliza(poliza);
    }
}
