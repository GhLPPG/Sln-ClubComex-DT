/*
 * Sln.ClubComex (DEMO) - Capa LBusiness
 * Casos de uso y reglas de negocio: RF01-RF07, NE01-NE05, autorización (Cajero).
 * No depende de la UI ni del DOM; puede ejecutarse en pruebas automatizadas.
 */
(function (root) {
  'use strict';
  var CC = root.ClubComex = root.ClubComex || {};
  var C = CC.Common, Codigo = CC.Codigo, ok = C.ok, fail = C.fail;

  function crearServicios(repo, opciones) {
    var sesion = null;
    var bitacoraErrores = [];       // "Registrar el error" (Manejo de Excepciones - técnico)
    var estado = { fallaSimulada: false };
    var storageSesion = (opciones && opciones.almacenSesion) || null;

    function cargarSesion() {
      if (!storageSesion) return;
      try {
        var raw = storageSesion.getItem('ClubComex.Demo.sesion');
        if (raw) {
          var s = JSON.parse(raw);
          if (repo.buscarUsuario(s.usuario)) sesion = s;
        }
      } catch (e) { sesion = null; }
    }
    function guardarSesion() {
      if (!storageSesion) return;
      try {
        if (sesion) storageSesion.setItem('ClubComex.Demo.sesion', JSON.stringify(sesion));
        else storageSesion.removeItem('ClubComex.Demo.sesion');
      } catch (e) { /* ignorar */ }
    }

    /* ---------- Autenticación y autorización ---------- */
    function iniciarSesion(usuario, contrasena) {
      var errores = {};
      if (!C.textoRequerido(usuario)) errores.usuario = 'Ingrese el usuario.';
      if (!C.textoRequerido(contrasena)) errores.contrasena = 'Ingrese la contraseña.';
      if (Object.keys(errores).length) return fail(Codigo.VALIDACION, 'Complete los datos de acceso.', errores);
      var u = repo.buscarUsuario(usuario);
      if (!u || u.contrasena !== contrasena) {
        return fail(Codigo.VALIDACION, 'Usuario o contraseña incorrectos.');
      }
      sesion = { usuario: u.usuario, nombre: u.nombre, roles: u.roles.slice() };
      guardarSesion();
      return ok(sesion, 'Sesión iniciada.');
    }
    function cerrarSesion() { sesion = null; guardarSesion(); }
    function sesionActual() { return sesion; }
    function esCajero() { return !!sesion && sesion.roles.indexOf(CC.Config.ROL_CAJERO) >= 0; }

    function exigirSesion() {
      if (!sesion) return fail(Codigo.ACCESO_DENEGADO, 'Acceso denegado: inicie sesión.');
      return null;
    }
    /** Autorización: solo el rol Cajero puede registrar clientes y ventas (RF01, RF02, EU03, CR04). */
    function exigirCajero() {
      var s = exigirSesion(); if (s) return s;
      if (!esCajero()) return fail(Codigo.ACCESO_DENEGADO, 'Acceso denegado: solo el rol Cajero puede realizar esta operación. No se modificó ningún dato.');
      return null;
    }

    function envolverTecnico(fn) {
      try { return fn(); }
      catch (e) {
        bitacoraErrores.push({ fecha: new Date().toISOString(), error: String(e && e.message ? e.message : e) });
        return fail(Codigo.TECNICO, 'Ocurrió un error técnico. La operación se canceló y no se guardaron cambios parciales.');
      }
    }

    /* ---------- Reglas de negocio: cálculo de puntos (RF03, NE01-NE03) ---------- */
    /** 1 punto por cada bloque completo de MONTO_POR_PUNTO MXN; el remanente no genera puntos. */
    function calcularPuntos(baseCent) {
      if (!(baseCent > 0)) return 0;
      return Math.floor(baseCent / (CC.Config.MONTO_POR_PUNTO * 100));
    }

    /** Valida montos y calcula base/total/puntos sin guardar nada. */
    function evaluarMontos(datos) {
      var errores = {};
      var sub = C.aCentavos(datos.subtotal);
      var desc = (datos.descuento === undefined || String(datos.descuento).trim() === '') ? 0 : C.aCentavos(datos.descuento);
      var iva = (datos.iva === undefined || String(datos.iva).trim() === '') ? 0 : C.aCentavos(datos.iva);
      if (sub === null) errores.subtotal = 'Ingrese un subtotal válido (máx. 2 decimales).';
      else if (sub <= 0) errores.subtotal = 'El subtotal debe ser mayor a $0.00.';
      if (desc === null) errores.descuento = 'Descuento inválido (monto con máx. 2 decimales).';
      if (iva === null) errores.iva = 'IVA inválido (monto con máx. 2 decimales).';
      if (!errores.subtotal && !errores.descuento && desc > sub) errores.descuento = 'El descuento no puede exceder el subtotal.';
      if (Object.keys(errores).length) return { valido: false, errores: errores };
      var base = sub - desc;                       // NE03: subtotal sin IVA y después de descuentos
      return {
        valido: true, errores: {}, subtotalCent: sub, descuentoCent: desc, ivaCent: iva,
        baseCent: base, totalCent: base + iva,     // el IVA se suma al total, pero no a la base de puntos
        puntos: calcularPuntos(base)
      };
    }

    /* ---------- RF01: Registro de clientes ---------- */
    function registrarCliente(datos) {
      var d = exigirCajero(); if (d) return d;
      var errores = {};
      if (!C.textoRequerido(datos && datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
      if (!C.textoRequerido(datos && datos.direccion)) errores.direccion = 'La dirección es obligatoria.';
      if (!C.textoRequerido(datos && datos.rfc)) errores.rfc = 'El RFC es obligatorio.';
      if (Object.keys(errores).length) return fail(Codigo.VALIDACION, 'Revise los datos del cliente.', errores);
      return envolverTecnico(function () {
        var cli = repo.transaccion(function () {
          return repo.agregarCliente({
            nombre: datos.nombre.trim(), direccion: datos.direccion.trim(),
            rfc: datos.rfc.trim().toUpperCase(), registradoPor: sesion.usuario
          });
        });
        return ok(cli, 'Cliente ' + cli.id + ' registrado.');
      });
    }

    /* ---------- RF02-RF04: Registro de venta, cálculo y acumulación ---------- */
    function registrarVenta(datos) {
      var d = exigirCajero(); if (d) return d;
      var m = evaluarMontos(datos || {});
      var errores = m.errores || {};
      var clienteId = datos && datos.clienteId ? datos.clienteId : null;
      // Decisión del usuario / 04_TecDesign.md: NO existen ventas sin cliente; el cliente es siempre obligatorio.
      if (!clienteId) errores.clienteId = 'La venta debe asociarse a un cliente registrado.';
      else if (!repo.obtenerCliente(clienteId)) errores.clienteId = 'El cliente seleccionado no existe.';
      if (Object.keys(errores).length) return fail(Codigo.VALIDACION, 'Revise los datos de la venta. No se registró la venta.', errores);

      return envolverTecnico(function () {
        var res = repo.transaccion(function () {
          // NE04: los puntos se generan y acumulan siempre sobre un cliente registrado (cliente obligatorio)
          var puntos = m.puntos;
          var venta = repo.agregarVenta({
            clienteId: clienteId, subtotalCent: m.subtotalCent, descuentoCent: m.descuentoCent, ivaCent: m.ivaCent,
            baseCent: m.baseCent, totalCent: m.totalCent, puntos: puntos, registradaPor: sesion.usuario
          });
          var mov = null;
          if (clienteId && puntos > 0) {
            mov = repo.agregarMovimiento({ clienteId: clienteId, ventaId: venta.id, tipo: CC.TipoMovimiento.ACUMULACION, puntos: puntos });
            repo.fijarSaldo(clienteId, repo.obtenerSaldo(clienteId) + puntos);
          }
          if (estado.fallaSimulada) { estado.fallaSimulada = false; throw new Error('Falla técnica simulada (DEMO)'); }
          return { venta: venta, movimiento: mov };
        });
        var msg = 'Venta ' + res.venta.id + ' registrada. ';
        if (res.venta.puntos === 0) msg += 'La base de puntos no alcanza $' + CC.Config.MONTO_POR_PUNTO + ': no genera puntos.';
        else msg += 'Puntos generados: ' + res.venta.puntos + '.';
        return ok(res, msg);
      });
    }

    /* ---------- RF07: Reversión por cancelación o devolución (NE05) ---------- */
    function revertirVenta(ventaId, tipo) {
      var d = exigirCajero(); if (d) return d;
      var venta = repo.obtenerVenta(ventaId);
      if (!venta) return fail(Codigo.NO_ENCONTRADO, 'La venta no existe.');
      if (tipo !== CC.TipoReversion.CANCELACION && tipo !== CC.TipoReversion.DEVOLUCION) {
        return fail(Codigo.VALIDACION, 'Tipo de operación inválido.');
      }
      if (venta.estado !== CC.EstadoVenta.REGISTRADA) {
        // EU06: no se revierte dos veces
        return fail(Codigo.VALIDACION, 'La venta ' + venta.id + ' ya está ' + venta.estado.toLowerCase() + '; el saldo no se modificó.');
      }
      return envolverTecnico(function () {
        var res = repo.transaccion(function () {
          venta.estado = tipo === CC.TipoReversion.CANCELACION ? CC.EstadoVenta.CANCELADA : CC.EstadoVenta.DEVUELTA;
          venta.fechaReversion = new Date().toISOString();
          venta.revertidaPor = sesion.usuario;
          var mov = null;
          if (venta.clienteId && venta.puntos > 0) {   // EU04: sin puntos generados, el saldo no cambia
            mov = repo.agregarMovimiento({ clienteId: venta.clienteId, ventaId: venta.id, tipo: CC.TipoMovimiento.REVERSION, puntos: -venta.puntos });
            repo.fijarSaldo(venta.clienteId, repo.obtenerSaldo(venta.clienteId) - venta.puntos);
          }
          if (estado.fallaSimulada) { estado.fallaSimulada = false; throw new Error('Falla técnica simulada (DEMO)'); }
          return { venta: venta, movimiento: mov };
        });
        var msg = 'Venta ' + venta.id + ' ' + venta.estado.toLowerCase() + '. ';
        msg += res.movimiento ? ('Se restaron ' + venta.puntos + ' puntos del saldo.') : 'No generó puntos: el saldo no cambia.';
        return ok(res, msg);
      });
    }

    /* ---------- RF05 / RF06: Consultas ---------- */
    function consultarSaldo(clienteId) {
      var d = exigirSesion(); if (d) return d;
      var cli = repo.obtenerCliente(clienteId);
      if (!cli) return fail(Codigo.NO_ENCONTRADO, 'Seleccione un cliente registrado.');
      return ok({ cliente: cli, saldo: repo.obtenerSaldo(clienteId) });
    }
    function consultarHistorial(clienteId) {
      var d = exigirSesion(); if (d) return d;
      var cli = repo.obtenerCliente(clienteId);
      if (!cli) return fail(Codigo.NO_ENCONTRADO, 'Seleccione un cliente registrado.');
      return ok({
        cliente: cli,
        ventas: repo.listarVentas(clienteId).slice().reverse(),
        movimientos: repo.listarMovimientos(clienteId).slice().reverse()   // vacío => estado vacío, sin error (EU07)
      });
    }

    /** Verificación de integridad: saldo almacenado = suma de movimientos. */
    function verificarIntegridad() {
      var problemas = [];
      repo.listarClientes().forEach(function (c) {
        var suma = repo.listarMovimientos(c.id).reduce(function (a, m) { return a + m.puntos; }, 0);
        if (suma !== repo.obtenerSaldo(c.id)) problemas.push(c.id + ': saldo ' + repo.obtenerSaldo(c.id) + ' ≠ movimientos ' + suma);
      });
      return problemas;
    }

    cargarSesion();

    return {
      iniciarSesion: iniciarSesion, cerrarSesion: cerrarSesion, sesionActual: sesionActual, esCajero: esCajero,
      calcularPuntos: calcularPuntos, evaluarMontos: evaluarMontos,
      registrarCliente: registrarCliente, registrarVenta: registrarVenta, revertirVenta: revertirVenta,
      consultarSaldo: consultarSaldo, consultarHistorial: consultarHistorial,
      verificarIntegridad: verificarIntegridad,
      listarClientes: function () { return repo.listarClientes(); },
      listarVentas: function () { return repo.listarVentas(); },
      obtenerCliente: function (id) { return repo.obtenerCliente(id); },
      simularFallaProximaOperacion: function (v) { estado.fallaSimulada = !!v; },
      fallaSimuladaPendiente: function () { return estado.fallaSimulada; },
      bitacoraErrores: function () { return bitacoraErrores.slice(); },
      repositorio: repo
    };
  }

  /** Datos de ejemplo cargados vía servicios (así saldos y movimientos son consistentes). */
  function cargarDatosEjemplo(svc) {
    svc.cerrarSesion();
    svc.iniciarSesion('cajero', 'cajero123');
    var a = svc.registrarCliente({ nombre: 'María Fernanda López Ruiz', direccion: 'Av. Reforma 120, Col. Centro, CDMX', rfc: 'LORM850312AB1' }).data;
    var b = svc.registrarCliente({ nombre: 'Juan Carlos Herrera Soto', direccion: 'Calle Hidalgo 45, Monterrey, N.L.', rfc: 'HESJ790925XY2' }).data;
    svc.registrarCliente({ nombre: 'Cliente Nuevo Demostración', direccion: 'Calle Juárez 8, Puebla, Pue.', rfc: 'CND010101AA0' });
    svc.registrarVenta({ clienteId: a.id, subtotal: '250.00', descuento: '0', iva: '40.00' });          // 25 pts
    svc.registrarVenta({ clienteId: a.id, subtotal: '119.00', descuento: '0', iva: '19.04' });          // 11 pts
    var v3 = svc.registrarVenta({ clienteId: b.id, subtotal: '19.00', descuento: '0', iva: '3.04' });   // 1 pt
    svc.registrarVenta({ clienteId: b.id, subtotal: '9.50', descuento: '0', iva: '1.52' });             // 0 pts
    var v5 = svc.registrarVenta({ clienteId: b.id, subtotal: '500.00', descuento: '50.00', iva: '72.00' }); // base 450 -> 45 pts
    svc.revertirVenta(v5.data.venta.id, CC.TipoReversion.DEVOLUCION);
    svc.cerrarSesion();
  }

  CC.Business = { crearServicios: crearServicios, cargarDatosEjemplo: cargarDatosEjemplo };
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
