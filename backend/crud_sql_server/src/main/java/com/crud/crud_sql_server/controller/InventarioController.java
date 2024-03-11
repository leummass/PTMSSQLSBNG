package com.crud.crud_sql_server.controller;

import com.crud.crud_sql_server.model.Inventario;
import com.crud.crud_sql_server.model.RespuestaJSON;
import com.crud.crud_sql_server.service.IInventarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("ptmssqlsbng/inventario")
@CrossOrigin("*")
public class InventarioController {
    Logger logger = LoggerFactory.getLogger(InventarioController.class);

    @Autowired
    private IInventarioService iInventarioService;

    @GetMapping("/consultainventario")
    public RespuestaJSON consultaInventario() {
        Map<String, Object> resultado = iInventarioService.consultaInventario();
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Inventario", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @PutMapping("/actualizarinventario")
    public RespuestaJSON actualizarInventario(@RequestBody Inventario inventario){
        Map<String, Object> resultado = iInventarioService.actualizarInventario(inventario);
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
            logger.error("Error al ejecutar el procedimiento para el inventario: {}", inventario.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ACTUALIZAINVENTARIO");
            logger.error("Método ejecutado: {}", "actualizarInventario");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @DeleteMapping("/eliminarinventario/{SKU}")
    public RespuestaJSON eliminarArticulo(@PathVariable String SKU){
        Map<String, Object> resultado = iInventarioService.eliminarArticulo(SKU);
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
            logger.error("Error al ejecutar el procedimiento para eliminar el articulo con SKU: {}", SKU);
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ELIMINARARTICULO");
            logger.error("Método ejecutado: {}", "eliminarArticulo");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @GetMapping("/consultainventario/{SKU}")
    public RespuestaJSON consultaInventarioXSKU(@PathVariable String SKU){
        Map<String, Object> resultado = iInventarioService.consultaInventarioXSKU(SKU);
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Inventario", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @PostMapping("/anadirinventario")
    public RespuestaJSON anadirArticulo(@RequestBody Inventario inventario){
        Map<String, Object> resultado = iInventarioService.anadirArticulo(inventario);
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
            logger.error("Error al ejecutar el procedimiento para el articulo: {}", inventario.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ANADIRARTICULO");
            logger.error("Método ejecutado: {}", "anadirArticulo");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
}
