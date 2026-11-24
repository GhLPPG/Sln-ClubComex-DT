/*
 * Sln.ClubComex (DEMO) - Capa LData
 * Entidades (Cliente, Venta, MovimientoPuntos, SaldoPuntos, Usuario), repositorio y persistencia.
 *
 * IMPORTANTE (DEMO): la persistencia usa localStorage del navegador (o memoria si no está disponible).
 * NO representa la base de datos SQL Server del diseño técnico; es una simulación local.
 */
(function (root) {
  'use strict';
  var CC = root.ClubComex = root.ClubComex || {};
  var C = CC.Common;

  var STORAGE_KEY = 'ClubComex.Demo.v1';

  /* ---- Adaptadores de almacenamiento ---- */
  function crearAdaptadorMemoria() {
    var mem = {};
    return {
      nombre: 'Memoria (volátil)',
      real: false,
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
      setItem: function (k, v) { mem[k] = String(v); },
      removeItem: function (k) { delete mem[k]; }
    };
  }

  function crearAdaptadorLocalStorage() {
    try {
      var ls = root.localStorage;
      var t = '__cc_test__';
      ls.setItem(t, '1'); ls.removeItem(t);
      return {
        nombre: 'localStorage del navegador',
        real: true,
        getItem: function (k) { return ls.getItem(k); },
        setItem: function (k, v) { ls.setItem(k, v); },
        removeItem: function (k) { ls.removeItem(k); }
      };
    } catch (e) {
      return crearAdaptadorMemoria();
    }
  }

  /* Usuarios de DEMO. Mecanismo real de autenticación/almacenamiento de contraseña: pendiente en 04_TecDesign.md. */
  function usuariosIniciales() {
    return [
      { usuario: 'cajero', contrasena: 'cajero123', nombre: 'Cajero Demo', roles: [CC.Config.ROL_CAJERO] },
      // Cuenta de prueba SIN rol Cajero, necesaria solo para verificar EU03 / CR04.
      { usuario: 'visitante', contrasena: 'visitante123', nombre: 'Usuario sin rol Cajero (prueba)', roles: [] }
    ];
  }

  function estadoInicial() {
    return {
      version: 1,
      contadores: { cliente: 0, venta: 0, movimiento: 0 },
      usuarios: usuariosIniciales(),
      clientes: [],
      ventas: [],
      movimientos: [],
      saldos: {},
      ajustes: {}   // reservado para ajustes de demo (ninguno activo)
    };
  }

  function crearRepositorio(adaptador, clave) {
    var adapter = adaptador || crearAdaptadorMemoria();
    var key = clave || STORAGE_KEY;
    var estado = null;

    function cargar() {
      var raw = null;
      try { raw = adapter.getItem(key); } catch (e) { raw = null; }
      if (raw) {
        try {
          var parsed = JSON.parse(raw);
          if (parsed && parsed.version === 1) { estado = parsed; return false; }
        } catch (e2) { /* datos corruptos: se reinicia */ }
      }
      estado = estadoInicial();
      return true; // estado nuevo
    }

    function guardar() { adapter.setItem(key, JSON.stringify(estado)); }

    function siguienteId(tipo) {
      estado.contadores[tipo] += 1;
      var prefijo = { cliente: 'C-', venta: 'V-', movimiento: 'M-' }[tipo];
      return prefijo + C.pad(estado.contadores[tipo], 4);
    }

    var repo = {
      adaptador: adapter,
      claveAlmacenamiento: key,
      cargar: cargar,
      guardar: guardar,
      reiniciar: function () { estado = estadoInicial(); guardar(); },
      get estado() { return estado; },
      instantanea: function () { return C.clonar(estado); },
      restaurar: function (snap) { estado = snap; },

      /* Transacción: o se aplican todos los cambios o ninguno (sin operaciones parciales). */
      transaccion: function (fn) {
        var snap = C.clonar(estado);
        try {
          var r = fn();
          guardar();
          return r;
        } catch (e) {
          estado = snap;
          try { guardar(); } catch (e2) { /* el estado en memoria ya se restauró */ }
          throw e;
        }
      },

      buscarUsuario: function (usuario) {
        var u = (usuario || '').trim().toLowerCase();
        for (var i = 0; i < estado.usuarios.length; i++) {
          if (estado.usuarios[i].usuario.toLowerCase() === u) return estado.usuarios[i];
        }
        return null;
      },

      /* Clientes */
      agregarCliente: function (datos) {
        var cli = {
          id: siguienteId('cliente'),
          nombre: datos.nombre, direccion: datos.direccion, rfc: datos.rfc,
          fechaAlta: new Date().toISOString(), registradoPor: datos.registradoPor
        };
        estado.clientes.push(cli);
        estado.saldos[cli.id] = 0; // EH10: saldo inicial 0
        return cli;
      },
      obtenerCliente: function (id) {
        for (var i = 0; i < estado.clientes.length; i++) if (estado.clientes[i].id === id) return estado.clientes[i];
        return null;
      },
      listarClientes: function () { return estado.clientes.slice(); },

      /* Ventas */
      agregarVenta: function (datos) {
        var v = {
          id: siguienteId('venta'),
          clienteId: datos.clienteId || null,
          subtotalCent: datos.subtotalCent, descuentoCent: datos.descuentoCent, ivaCent: datos.ivaCent,
          baseCent: datos.baseCent, totalCent: datos.totalCent,
          puntos: datos.puntos,
          estado: CC.EstadoVenta.REGISTRADA,
          fecha: new Date().toISOString(), registradaPor: datos.registradaPor,
          fechaReversion: null, revertidaPor: null
        };
        estado.ventas.push(v);
        return v;
      },
      obtenerVenta: function (id) {
        for (var i = 0; i < estado.ventas.length; i++) if (estado.ventas[i].id === id) return estado.ventas[i];
        return null;
      },
      listarVentas: function (clienteId) {
        return estado.ventas.filter(function (v) { return clienteId === undefined || v.clienteId === clienteId; });
      },

      /* Movimientos de puntos (nunca se eliminan; la reversión agrega un movimiento negativo) */
      agregarMovimiento: function (datos) {
        var m = {
          id: siguienteId('movimiento'), clienteId: datos.clienteId, ventaId: datos.ventaId,
          tipo: datos.tipo, puntos: datos.puntos, fecha: new Date().toISOString()
        };
        estado.movimientos.push(m);
        return m;
      },
      listarMovimientos: function (clienteId) {
        return estado.movimientos.filter(function (m) { return m.clienteId === clienteId; });
      },

      /* Saldo de puntos */
      obtenerSaldo: function (clienteId) { return estado.saldos[clienteId] || 0; },
      fijarSaldo: function (clienteId, n) { estado.saldos[clienteId] = n; },

      /* Ajustes de demo */
      obtenerAjuste: function (k) { return estado.ajustes[k]; },
      fijarAjuste: function (k, v) { estado.ajustes[k] = v; guardar(); }
    };
    return repo;
  }

  CC.Data = {
    STORAGE_KEY: STORAGE_KEY,
    crearAdaptadorMemoria: crearAdaptadorMemoria,
    crearAdaptadorLocalStorage: crearAdaptadorLocalStorage,
    crearRepositorio: crearRepositorio
  };
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
