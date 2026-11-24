/*
 * Sln.ClubComex (DEMO) - Pruebas funcionales de aceptación (03_AcceptCriteria.md)
 * Se ejecutan contra la capa LBusiness/LData con un almacenamiento en MEMORIA aislado
 * (no tocan los datos de la demo). Reutilizado por la pantalla "Verificación" y por tests/pruebas.html.
 */
(function (root) {
  'use strict';
  var CC = root.ClubComex = root.ClubComex || {};
  var TM = CC.TipoMovimiento, TR = CC.TipoReversion, Cod = CC.Codigo;

  function nuevoEntorno() {
    var repo = CC.Data.crearRepositorio(CC.Data.crearAdaptadorMemoria(), 'test');
    repo.cargar();
    var svc = CC.Business.crearServicios(repo);
    return { repo: repo, svc: svc };
  }
  function comoCajero(e) { e.svc.iniciarSesion('cajero', 'cajero123'); return e; }
  function nuevoCliente(e, n) {
    var r = e.svc.registrarCliente({ nombre: n || 'Cliente Prueba', direccion: 'Calle 1', rfc: 'abc010101aa1' });
    if (!r.ok) throw new Error('No se pudo registrar el cliente de prueba: ' + r.mensaje);
    return r.data;
  }
  function venta(e, clienteId, subtotal, descuento, iva) {
    return e.svc.registrarVenta({ clienteId: clienteId, subtotal: String(subtotal), descuento: descuento === undefined ? '0' : String(descuento), iva: iva === undefined ? '0' : String(iva) });
  }
  function igual(a, b, msg) { if (a !== b) throw new Error((msg || 'Valor inesperado') + ': esperado ' + b + ', obtenido ' + a); }
  function cierto(c, msg) { if (!c) throw new Error(msg || 'Condición no cumplida'); }

  /* [id, trazabilidad, descripción, función] */
  var casos = [
    ['EH01', 'RF01', 'Registrar un cliente lo deja disponible para asociarle ventas.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      cierto(e.svc.obtenerCliente(c.id), 'El cliente no quedó registrado');
      cierto(venta(e, c.id, 100).ok, 'No se pudo asociar una venta al cliente');
    }],
    ['EH02', 'RF02', 'La venta se guarda con su importe total y queda asociada al cliente.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var r = venta(e, c.id, 200, 0, 32); cierto(r.ok, r.mensaje);
      igual(r.data.venta.clienteId, c.id, 'Cliente asociado'); igual(r.data.venta.totalCent, 23200, 'Importe total (centavos)');
    }],
    ['EH03', 'RF03, NE01, NE02', 'Base de $10 y de $19 generan 1 punto en ambos casos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      igual(venta(e, c.id, 10).data.venta.puntos, 1, 'Puntos con base $10');
      igual(venta(e, c.id, 19).data.venta.puntos, 1, 'Puntos con base $19');
    }],
    ['EH04', 'RF04', 'El saldo pasa de N a N + M al registrar una venta que genera M puntos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      venta(e, c.id, 70); igual(e.svc.consultarSaldo(c.id).data.saldo, 7, 'Saldo N');
      venta(e, c.id, 40); igual(e.svc.consultarSaldo(c.id).data.saldo, 11, 'Saldo N+M');
    }],
    ['EH05', 'RF05', 'La consulta de saldo muestra el saldo acumulado.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e); venta(e, c.id, 123.45);
      igual(e.svc.consultarSaldo(c.id).data.saldo, 12, 'Saldo');
    }],
    ['EH06', 'RF06', 'El historial muestra las ventas y los movimientos de puntos de cada una.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var v1 = venta(e, c.id, 50).data.venta, v2 = venta(e, c.id, 80).data.venta;
      var h = e.svc.consultarHistorial(c.id).data;
      igual(h.ventas.length, 2, 'Ventas en historial'); igual(h.movimientos.length, 2, 'Movimientos en historial');
      cierto(h.movimientos.some(function (m) { return m.ventaId === v1.id && m.puntos === 5; }), 'Falta movimiento de la venta 1');
      cierto(h.movimientos.some(function (m) { return m.ventaId === v2.id && m.puntos === 8; }), 'Falta movimiento de la venta 2');
    }],
    ['EH07', 'RF07, NE05', 'Al cancelar o devolver una venta, el saldo se reduce en los puntos generados.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var v1 = venta(e, c.id, 100).data.venta, v2 = venta(e, c.id, 60).data.venta; // 10 + 6
      var r1 = e.svc.revertirVenta(v1.id, TR.CANCELACION); cierto(r1.ok, r1.mensaje);
      igual(e.svc.consultarSaldo(c.id).data.saldo, 6, 'Saldo tras cancelación');
      var r2 = e.svc.revertirVenta(v2.id, TR.DEVOLUCION); cierto(r2.ok, r2.mensaje);
      igual(e.svc.consultarSaldo(c.id).data.saldo, 0, 'Saldo tras devolución');
      igual(e.svc.verificarIntegridad().length, 0, 'Integridad saldo/movimientos');
      igual(e.repo.listarMovimientos(c.id).length, 4, 'Los movimientos previos se conservan (+ reversiones)');
    }],
    ['EH08', 'NE03', 'Subtotal $100 con IVA adicional genera 10 puntos; el IVA no genera puntos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var v = venta(e, c.id, 100, 0, 16).data.venta;
      igual(v.puntos, 10, 'Puntos'); igual(v.totalCent, 11600, 'Total con IVA');
    }],
    ['EH09', 'RF04, NE02', 'Con 3 puntos de saldo y una venta con base $25 (2 puntos), el saldo pasa a 5.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      venta(e, c.id, 30); igual(e.svc.consultarSaldo(c.id).data.saldo, 3, 'Saldo inicial');
      venta(e, c.id, 25); igual(e.svc.consultarSaldo(c.id).data.saldo, 5, 'Saldo final');
    }],
    ['EH10', 'RF01, RF05', 'Un cliente nuevo consulta su saldo antes de cualquier venta y es 0.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      igual(e.svc.consultarSaldo(c.id).data.saldo, 0, 'Saldo');
    }],
    ['EU01', 'NE04, CR03, 04_TecDesign (no existen ventas sin cliente)', 'Una venta sin cliente se rechaza (el cliente es obligatorio): no se guarda la venta, no se generan ni acumulan puntos y los saldos no cambian.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e); venta(e, c.id, 50);
      var antes = JSON.stringify(e.repo.estado);
      var r = venta(e, '', 500);
      igual(r.ok, false, 'Debe rechazarse'); igual(r.codigo, Cod.VALIDACION, 'Código');
      cierto(r.errores && r.errores.clienteId, 'Debe indicar que el cliente es obligatorio');
      igual(e.repo.estado.ventas.length, 1, 'No se guardó la venta sin cliente');
      igual(e.repo.estado.movimientos.length, 1, 'Sin movimientos nuevos');
      igual(e.svc.consultarSaldo(c.id).data.saldo, 5, 'El saldo de otros clientes no cambia');
      igual(JSON.stringify(e.repo.estado), antes, 'Los datos no deben cambiar');
      var r2 = venta(e, 'C-9999', 500); igual(r2.ok, false, 'Cliente inexistente debe rechazarse');
    }],
    ['EU02', 'NE02', 'Base de $9.50 no genera puntos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var r = venta(e, c.id, '9.50'); cierto(r.ok, r.mensaje);
      igual(r.data.venta.puntos, 0, 'Puntos'); igual(e.svc.consultarSaldo(c.id).data.saldo, 0, 'Saldo');
    }],
    ['EU03', 'RF01, RF02, CR04', 'Un usuario distinto del Cajero no puede registrar clientes ni ventas; no se modifican datos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e); venta(e, c.id, 100);
      e.svc.cerrarSesion(); cierto(e.svc.iniciarSesion('visitante', 'visitante123').ok, 'Login de usuario sin rol Cajero');
      var antes = JSON.stringify(e.repo.estado);
      var r1 = e.svc.registrarCliente({ nombre: 'X', direccion: 'Y', rfc: 'Z' });
      var r2 = venta(e, c.id, 100);
      igual(r1.codigo, Cod.ACCESO_DENEGADO, 'Cliente'); igual(r2.codigo, Cod.ACCESO_DENEGADO, 'Venta');
      igual(JSON.stringify(e.repo.estado), antes, 'Los datos no deben cambiar');
      e.svc.cerrarSesion();
      igual(venta(e, c.id, 100).codigo, Cod.ACCESO_DENEGADO, 'Sin sesión');
    }],
    ['EU04', 'RF07, NE05', 'Cancelar una venta que no generó puntos no cambia el saldo.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e); venta(e, c.id, 40);
      var v = venta(e, c.id, '9.99').data.venta; igual(v.puntos, 0, 'Puntos de la venta');
      var r = e.svc.revertirVenta(v.id, TR.CANCELACION); cierto(r.ok, r.mensaje);
      igual(e.svc.consultarSaldo(c.id).data.saldo, 4, 'Saldo');
    }],
    ['EU05', 'RF05', 'Cliente sin ventas: el saldo es 0 sin error.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var r = e.svc.consultarSaldo(c.id); cierto(r.ok, 'No debe haber error'); igual(r.data.saldo, 0, 'Saldo');
    }],
    ['EU06', 'RF07, NE05', 'Una venta ya revertida no vuelve a restar puntos.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var v = venta(e, c.id, 100).data.venta; venta(e, c.id, 50);
      cierto(e.svc.revertirVenta(v.id, TR.CANCELACION).ok, 'Primera reversión');
      var r = e.svc.revertirVenta(v.id, TR.DEVOLUCION); igual(r.ok, false, 'Segunda reversión debe rechazarse');
      igual(e.svc.consultarSaldo(c.id).data.saldo, 5, 'Saldo');
      igual(e.svc.verificarIntegridad().length, 0, 'Integridad');
    }],
    ['EU07', 'RF06', 'Cliente sin ventas ni movimientos: historial vacío sin error.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var r = e.svc.consultarHistorial(c.id); cierto(r.ok, 'No debe haber error');
      igual(r.data.ventas.length, 0, 'Ventas'); igual(r.data.movimientos.length, 0, 'Movimientos');
    }],
    ['NE02/03', 'NE02, NE03', 'Casos límite de redondeo y descuentos: 0.01→0, 9.99→0, 10.00→1, 99.99→9; $120 con $20 de descuento→10.', function () {
      var e = comoCajero(nuevoEntorno());
      [['0.01', 0], ['9.99', 0], ['10.00', 1], ['99.99', 9], ['1000', 100]].forEach(function (p) {
        igual(e.svc.evaluarMontos({ subtotal: p[0] }).puntos, p[1], 'Subtotal ' + p[0]);
      });
      igual(e.svc.evaluarMontos({ subtotal: '120', descuento: '20', iva: '16' }).puntos, 10, 'Con descuento');
    }],
    ['VAL', 'RF01, RF02', 'Validaciones: campos obligatorios del cliente y montos inválidos se rechazan sin guardar.', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e);
      var r = e.svc.registrarCliente({ nombre: ' ', direccion: '', rfc: '' });
      igual(r.codigo, Cod.VALIDACION, 'Cliente incompleto'); igual(Object.keys(r.errores).length, 3, 'Errores por campo');
      igual(e.repo.listarClientes().length, 1, 'No se guardó el cliente inválido');
      ['', 'abc', '-5', '10.999', '0'].forEach(function (s) { igual(venta(e, c.id, s).ok, false, 'Subtotal "' + s + '"'); });
      igual(venta(e, c.id, 100, 150).ok, false, 'Descuento mayor al subtotal');
      igual(e.repo.estado.ventas.length, 0, 'No se guardaron ventas inválidas');
    }],
    ['TEC', 'Manejo de excepciones (técnico)', 'Ante una falla técnica no quedan operaciones parciales (reversión de la transacción).', function () {
      var e = comoCajero(nuevoEntorno()); var c = nuevoCliente(e); venta(e, c.id, 100);
      var antes = JSON.stringify(e.repo.estado);
      e.svc.simularFallaProximaOperacion(true);
      var r = venta(e, c.id, 500); igual(r.codigo, Cod.TECNICO, 'Código'); igual(JSON.stringify(e.repo.estado), antes, 'Estado sin cambios');
      igual(e.svc.bitacoraErrores().length, 1, 'Error registrado');
    }]
  ];

  function ejecutar() {
    return casos.map(function (c) {
      var res = { id: c[0], trazabilidad: c[1], descripcion: c[2], ok: true, detalle: 'Cumple' };
      try { c[3](); } catch (e) { res.ok = false; res.detalle = String(e && e.message ? e.message : e); }
      return res;
    });
  }

  CC.Acceptance = { ejecutar: ejecutar };
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
