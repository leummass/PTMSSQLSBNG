package com.crud.crud_sql_server.controller;

import com.crud.crud_sql_server.model.Poliza;
import com.crud.crud_sql_server.model.RespuestaJSON;
import com.crud.crud_sql_server.service.IPolizaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("ptmssqlsbng/polizas")
@CrossOrigin("*")
public class PolizaController {
    Logger logger = LoggerFactory.getLogger(PolizaController.class);
    @Autowired
    private IPolizaService iPolizaService;
    @GetMapping("/consultapolizas")
    public RespuestaJSON consultaPolizas() {
        Map<String, Object> resultado = iPolizaService.consultaPoliza();
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Polizas", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @PutMapping("/actualizarpoliza")
    public RespuestaJSON actualizarPoliza(@RequestBody Poliza poliza){
        Map<String, Object> resultado = iPolizaService.actualizarPoliza(poliza);
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        Map<String, Object> resultadoTrim = resultadoResultSet.get(0);

        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> mensaje = new HashMap<>();
        if((int) resultadoTrim.get("Resultado") == 1){
            meta.put("Status", "OK");
        }else{
            meta.put("Status", "ERROR");
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ACTUALIZAPOLIZA");
            logger.error("Método ejecutado: {}", "actualizarPoliza");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @DeleteMapping("/eliminarpoliza/{IdPolizas}")
    public RespuestaJSON eliminarPoliza(@PathVariable int IdPolizas){
        Map<String, Object> resultado = iPolizaService.eliminarPoliza(IdPolizas);
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        Map<String, Object> resultadoTrim = resultadoResultSet.get(0);

        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> mensaje = new HashMap<>();
        if((int) resultadoTrim.get("Resultado") == 1){
            meta.put("Status", "OK");
        }else{
            meta.put("Status", "ERROR");
            logger.error("Error al ejecutar el procedimiento para eliminar la poliza con ID: {}", IdPolizas);
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ELIMINAPOLIZA");
            logger.error("Método ejecutado: {}", "eliminarPoliza");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @GetMapping("/consultapolizas/{IdPolizas}")
    public RespuestaJSON consultaPolizaXId(@PathVariable int IdPolizas){
        Map<String, Object> resultado = iPolizaService.consultaPolizaXId(IdPolizas);
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Poliza", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @PostMapping("/anadirpoliza")
    public RespuestaJSON anadirPoliza(@RequestBody Poliza poliza){
        Map<String, Object> resultado = iPolizaService.anadirPoliza(poliza);
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        Map<String, Object> resultadoTrim = resultadoResultSet.get(0);

        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> mensaje = new HashMap<>();
        if((int) resultadoTrim.get("Resultado") == 1){
            meta.put("Status", "OK");
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
        }else{
            meta.put("Status", "ERROR");
            logger.error("Error al ejecutar el procedimiento para la poliza: {}", poliza.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ANADIRPOLIZA");
            logger.error("Método ejecutado: {}", "anadirPoliza");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }

}
