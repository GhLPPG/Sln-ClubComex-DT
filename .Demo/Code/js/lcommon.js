/*
 * Sln.ClubComex (DEMO) - Capa LCommon
 * Constantes, enumeraciones, validaciones genéricas y helpers compartidos.
 * Trazabilidad: NE01-NE03 (parámetros de cálculo), 04_TecDesign.md "Variables y Parámetros".
 * Compatible con ejecución directa desde file:// (sin módulos ES, sin servidor).
 */
(function (root) {
  'use strict';
  var CC = root.ClubComex = root.ClubComex || {};

  /* Parámetros de configuración (04_TecDesign.md -> Variables y Parámetros) */
  var Config = {
    MONTO_POR_PUNTO: 10,              // MXN requeridos para generar 1 punto (NE01)
    REDONDEO: 'Hacia abajo',          // NE02
    MONEDA: 'MXN',
    ROL_CAJERO: 'Cajero',             // Único rol documentado
    SIM_LATENCY_MS: 350               // Solo DEMO: simula tiempo de respuesta para mostrar estados de carga
  };

  var TipoMovimiento = { ACUMULACION: 'Acumulación', REVERSION: 'Reversión' };
  var EstadoVenta = { REGISTRADA: 'Registrada', CANCELADA: 'Cancelada', DEVUELTA: 'Devuelta' };
  var TipoReversion = { CANCELACION: 'Cancelada', DEVOLUCION: 'Devuelta' };

  /* Códigos de resultado (comportamiento esperado según "Manejo de Excepciones") */
  var Codigo = {
    OK: 'OK',
    VALIDACION: 'VALIDACION',          // Error funcional
    NO_ENCONTRADO: 'NO_ENCONTRADO',
    ACCESO_DENEGADO: 'ACCESO_DENEGADO',// Error de seguridad (EU03)
    TECNICO: 'TECNICO'                 // Error técnico (sin operaciones parciales)
  };

  function ok(data, msg) { return { ok: true, codigo: Codigo.OK, data: data, mensaje: msg || '' }; }
  function fail(codigo, mensaje, errores) {
    return { ok: false, codigo: codigo, mensaje: mensaje, errores: errores || {} };
  }

  /* ---------- Dinero: se opera en centavos enteros para evitar errores de coma flotante ---------- */
  /** Convierte texto/número a centavos. Devuelve null si el formato es inválido. */
  function aCentavos(valor) {
    if (valor === null || valor === undefined) return null;
    var s = String(valor).trim().replace(/[$\s]/g, '').replace(/,/g, '');
    if (s === '') return null;
    if (!/^\d+(\.\d{1,2})?$/.test(s)) return null;
    var partes = s.split('.');
    var enteros = parseInt(partes[0], 10);
    var dec = partes.length > 1 ? parseInt((partes[1] + '0').substring(0, 2), 10) : 0;
    return enteros * 100 + dec;
  }

  var fmtMXN = null;
  function formatoMXN(centavos) {
    var n = (centavos || 0) / 100;
    try {
      if (!fmtMXN) fmtMXN = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
      return fmtMXN.format(n);
    } catch (e) { return '$' + n.toFixed(2); }
  }

  function formatoFecha(iso) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) { return iso; }
  }

  /* ---------- Validaciones genéricas ---------- */
  function textoRequerido(v) { return typeof v === 'string' && v.trim().length > 0; }

  function clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function pad(n, len) { var s = String(n); while (s.length < len) s = '0' + s; return s; }

  function escapar(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  CC.Config = Config;
  CC.TipoMovimiento = TipoMovimiento;
  CC.EstadoVenta = EstadoVenta;
  CC.TipoReversion = TipoReversion;
  CC.Codigo = Codigo;
  CC.Common = {
    ok: ok, fail: fail, aCentavos: aCentavos, formatoMXN: formatoMXN, formatoFecha: formatoFecha,
    textoRequerido: textoRequerido, clonar: clonar, pad: pad, escapar: escapar
  };
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
