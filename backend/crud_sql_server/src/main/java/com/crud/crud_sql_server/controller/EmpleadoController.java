package com.crud.crud_sql_server.controller;

import com.crud.crud_sql_server.model.Empleado;
import com.crud.crud_sql_server.model.RespuestaJSON;
import com.crud.crud_sql_server.service.IEmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("ptmssqlsbng/empleado")
@CrossOrigin("*")
public class EmpleadoController {
    Logger logger = LoggerFactory.getLogger(EmpleadoController.class);

    @Autowired
    private IEmpleadoService iEmpleadoService;
    @GetMapping("/consultaempleados")
    public RespuestaJSON consultaEmpleados() {
        Map<String, Object> resultado = iEmpleadoService.consultaEmpleados();
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Empleados", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }

    @PutMapping("/actualizarempleado")
    public RespuestaJSON actualizarEmpleado(@RequestBody Empleado empleado){

        Map<String, Object> resultado = iEmpleadoService.actualizarEmpleadoProc(empleado);
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
            logger.error("Error al ejecutar el procedimiento para el empleado: {}", empleado.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ACTUALIZAEMPLEADO");
            logger.error("Método ejecutado: {}", "actualizarEmpleado");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }

    @DeleteMapping("/eliminarempleado/{IdEmpleado}")
    public RespuestaJSON eliminarEmpleado(@PathVariable int IdEmpleado){
        Map<String, Object> resultado = iEmpleadoService.eliminarEmpleado(IdEmpleado);
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
            logger.error("Error al ejecutar el procedimiento para eliminar el empleado con ID: {}", IdEmpleado);
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ELIMINAREMPLEADO");
            logger.error("Método ejecutado: {}", "eliminarEmpleado");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @GetMapping("/consultaempleado/{IdEmpleado}")
    public RespuestaJSON consultaEmpleadoXId(@PathVariable int IdEmpleado){
        Map<String, Object> resultado = iEmpleadoService.consultaEmpleadoXId(IdEmpleado);
        //Map<String, Object> resultados = (Map<String, Object>) resultado.get("#result-set-1");
        List<Map<String, Object>> resultadoResultSet = (List<Map<String, Object>>) resultado.get("#result-set-1");
        RespuestaJSON respuestaJSON = new RespuestaJSON();
        Map<String, Object> meta = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("Empleado", resultadoResultSet);
        meta.put("Status", "OK");

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
    @PostMapping("/anadirempleado")
    public RespuestaJSON anadirEmpleado(@RequestBody Empleado empleado){
        Map<String, Object> resultado = iEmpleadoService.anadirEmpleado(empleado);
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
            logger.error("Error al ejecutar el procedimiento para el empleado: {}", empleado.toString());
            logger.error("Fecha del error: {}", new Date().toString());
            logger.error("Procedimiento ejecutado en base de datos: {}", "SP_ANADIREMPLEADO");
            logger.error("Método ejecutado: {}", "anadirEmpleado");
            logger.error("Mensaje del error: {}", resultadoTrim.get("Mensaje"));
        }
        mensaje.put("Mensaje", resultadoTrim.get("Mensaje"));
        data.put("Mensaje",mensaje);

        respuestaJSON.setMeta(meta);
        respuestaJSON.setData(data);

        return respuestaJSON;
    }
}
