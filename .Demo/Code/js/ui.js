/*
 * Sln.ClubComex (DEMO) - Capa UI
 * Pantallas, formularios, navegación y presentación. Sin dependencias externas; funciona con file://.
 */
(function (root) {
  'use strict';
  var CC = root.ClubComex = root.ClubComex || {};
  var C = CC.Common, esc = C.escapar, $m = C.formatoMXN, $f = C.formatoFecha;

  var VISTAS = [
    { id: 'inicio', texto: 'Inicio', icono: '⌂' },
    { id: 'clientes', texto: 'Clientes', icono: '☺' },
    { id: 'ventas', texto: 'Ventas', icono: '＄' },
    { id: 'consulta', texto: 'Saldo e historial', icono: '★' },
    { id: 'verificacion', texto: 'Verificación', icono: '✔' },
    { id: 'demo', texto: 'Ajustes de demo', icono: '⚙' }
  ];

  function iniciar(opts) {
    opts = opts || {};
    var contenedor = opts.contenedor || document.getElementById('app');
    var adaptador = opts.adaptador || CC.Data.crearAdaptadorLocalStorage();
    var almacenSesion = null;
    if (opts.almacenSesion !== null) {
      try { almacenSesion = opts.almacenSesion || root.sessionStorage; } catch (e) { almacenSesion = null; }
    }
    if (typeof opts.latenciaMs === 'number') CC.Config.SIM_LATENCY_MS = opts.latenciaMs;

    var repo = CC.Data.crearRepositorio(adaptador);
    var esNuevo = repo.cargar();
    var svc = CC.Business.crearServicios(repo, { almacenSesion: almacenSesion });
    if (esNuevo && opts.sinEjemplos !== true) CC.Business.cargarDatosEjemplo(svc);
    repo.guardar();

    var st = { vista: 'inicio', clienteConsulta: '', resultadosPruebas: null, ocupado: false };

    /* ------------------------- utilidades de UI ------------------------- */
    function el(sel, ctx) { return (ctx || contenedor).querySelector(sel); }
    function nombreCliente(id) {
      if (!id) return '<span class="muted">—</span>';
      var c = svc.obtenerCliente(id); return c ? esc(c.nombre) + ' <span class="muted">(' + esc(c.id) + ')</span>' : esc(id);
    }
    function toast(mensaje, tipo) {
      var z = el('#toasts'); if (!z) return;
      var t = document.createElement('div');
      t.className = 'toast toast-' + (tipo || 'ok'); t.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
      t.textContent = mensaje; z.appendChild(t);
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, tipo === 'error' ? 7000 : 4500);
    }
    function limpiarErrores(form) {
      [].forEach.call(form.querySelectorAll('[data-err]'), function (s) { s.textContent = ''; });
      [].forEach.call(form.querySelectorAll('[aria-invalid]'), function (i) { i.removeAttribute('aria-invalid'); });
      var b = form.querySelector('.form-banner'); if (b) { b.className = 'form-banner'; b.textContent = ''; }
    }
    function mostrarErrores(form, res) {
      var errs = res.errores || {};
      Object.keys(errs).forEach(function (k) {
        var s = form.querySelector('[data-err="' + k + '"]'); if (s) s.textContent = errs[k];
        var i = form.querySelector('[name="' + k + '"]'); if (i) i.setAttribute('aria-invalid', 'true');
      });
      var b = form.querySelector('.form-banner');
      if (b) { b.className = 'form-banner form-banner-error'; b.textContent = res.mensaje; }
      var primero = form.querySelector('[aria-invalid="true"]'); if (primero && primero.focus) primero.focus();
    }
    /** Simula el tiempo de respuesta de un servicio (solo DEMO) para mostrar el estado de carga. */
    function conCarga(boton, fn) {
      if (st.ocupado) return;
      st.ocupado = true;
      var texto = boton ? boton.textContent : '';
      if (boton) { boton.disabled = true; boton.classList.add('loading'); boton.textContent = 'Procesando…'; }
      setTimeout(function () {
        try { fn(); }
        finally {
          st.ocupado = false;
          if (boton && boton.isConnected) { boton.disabled = false; boton.classList.remove('loading'); boton.textContent = texto; }
        }
      }, CC.Config.SIM_LATENCY_MS);
    }
    function confirmar(titulo, texto, textoOk) {
      return new Promise(function (resolve) {
        var dlg = el('#dlg');
        el('#dlg-titulo').textContent = titulo; el('#dlg-texto').textContent = texto;
        var bOk = el('#dlg-ok'); bOk.textContent = textoOk || 'Confirmar';
        function fin(v) { bOk.onclick = null; el('#dlg-cancel').onclick = null; dlg.onclose = null; if (dlg.open) dlg.close(); resolve(v); }
        bOk.onclick = function () { fin(true); };
        el('#dlg-cancel').onclick = function () { fin(false); };
        dlg.onclose = function () { fin(false); };
        if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      });
    }

    /* ------------------------- plantillas ------------------------- */
    function plantillaLogin() {
      return '' +
        '<main class="login-wrap"><section class="card login-card" aria-labelledby="t-login">' +
        '<div class="brand-lg"><span class="logo" aria-hidden="true">CC</span><div><h1 id="t-login">Sln.ClubComex</h1><p class="muted">Programa de puntos de lealtad · DEMO</p></div></div>' +
        '<form data-form="login" novalidate>' +
        '<div class="form-banner" role="alert"></div>' +
        campo('usuario', 'Usuario', '<input id="f-usuario" name="usuario" autocomplete="username" autofocus>') +
        campo('contrasena', 'Contraseña', '<input id="f-contrasena" name="contrasena" type="password" autocomplete="current-password">') +
        '<button class="btn btn-primary btn-block" type="submit">Iniciar sesión</button></form>' +
        '<aside class="hint"><strong>Cuentas de la demo (simuladas)</strong>' +
        '<table class="mini"><tr><th>Usuario</th><th>Contraseña</th><th>Rol</th></tr>' +
        '<tr><td>cajero</td><td>cajero123</td><td>Cajero</td></tr>' +
        '<tr><td>visitante</td><td>visitante123</td><td>Sin rol Cajero (para probar EU03)</td></tr></table>' +
        '<p class="muted small">El mecanismo real de autenticación y almacenamiento de contraseñas está pendiente de definir en el diseño técnico; aquí es solo una simulación.</p></aside>' +
        '</section></main>';
    }

    function campo(nombre, etiqueta, control, ayuda) {
      return '<div class="field"><label for="f-' + nombre + '">' + etiqueta + '</label>' + control +
        (ayuda ? '<small class="help">' + ayuda + '</small>' : '') +
        '<span class="field-error" data-err="' + nombre + '" role="alert"></span></div>';
    }

    function plantillaShell(contenido) {
      var s = svc.sesionActual();
      var rol = svc.esCajero() ? 'Cajero' : 'Sin rol Cajero';
      var nav = VISTAS.map(function (v) {
        return '<button class="nav-item' + (st.vista === v.id ? ' active' : '') + '" data-action="ir" data-vista="' + v.id + '"' +
          (st.vista === v.id ? ' aria-current="page"' : '') + '><span aria-hidden="true">' + v.icono + '</span> ' + v.texto + '</button>';
      }).join('');
      return '' +
        '<div class="shell">' +
        '<header class="topbar"><div class="brand"><span class="logo" aria-hidden="true">CC</span><strong>Sln.ClubComex</strong><span class="tag-demo">DEMO</span></div>' +
        '<div class="userbox"><span class="user-name">' + esc(s.nombre) + '</span><span class="badge ' + (svc.esCajero() ? 'badge-ok' : 'badge-warn') + '">' + rol + '</span>' +
        '<button class="btn btn-ghost" data-action="salir">Cerrar sesión</button></div></header>' +
        '<div class="body"><nav class="sidenav" aria-label="Principal">' + nav + '</nav>' +
        '<main class="content" id="contenido" tabindex="-1">' + contenido + '</main></div>' +
        '<footer class="demo-banner" role="note"><strong>Modo DEMO:</strong> los datos se guardan solo en el <em>' + esc(adaptador.nombre) + '</em> de este equipo; no es la base de datos SQL Server del diseño. Sin integraciones externas.</footer>' +
        '</div>';
    }

    function vistaInicio() {
      var cl = svc.listarClientes(), vt = svc.listarVentas();
      var puntos = cl.reduce(function (a, c) { return a + repo.obtenerSaldo(c.id); }, 0);
      var rev = vt.filter(function (v) { return v.estado !== CC.EstadoVenta.REGISTRADA; }).length;
      return '<h2>Inicio</h2>' +
        '<section class="kpis" aria-label="Resumen">' +
        kpi('Clientes registrados', cl.length) + kpi('Ventas registradas', vt.length) + kpi('Puntos en saldos', puntos) + kpi('Ventas canceladas / devueltas', rev) + '</section>' +
        '<section class="card"><h3>Flujo de funcionamiento</h3><ol class="steps">' +
        paso('clientes', '1. Registrar o consultar al cliente', 'RF01') +
        paso('ventas', '2. Registrar la venta vinculada al cliente', 'RF02') +
        '<li><span>3. El sistema calcula los puntos: 1 por cada $10 MXN completos sobre el subtotal sin IVA y después de descuentos</span> <span class="tag">RF03 · NE01–NE03</span></li>' +
        '<li><span>4. El sistema acumula los puntos; consulte saldo e historial</span> <button class="link" data-action="ir" data-vista="consulta">Abrir</button> <span class="tag">RF04–RF06</span></li>' +
        paso('ventas', '5. Al cancelar o devolver la venta, se revierten los puntos', 'RF07 · NE05') +
        '</ol></section>' +
        '<section class="card"><h3>Alcance de esta demo</h3><p>Implementa RF01–RF07 y NE01–NE05 con las capas objetivo LCommon, LData, LBusiness y UI simuladas en JavaScript. ' +
        'Canje de puntos, promociones y transferencias de puntos están <strong>fuera de alcance</strong> (según 02_ReqsDefinition.md).</p></section>';
    }
    function kpi(t, v) { return '<div class="kpi"><span class="kpi-v">' + v + '</span><span class="kpi-t">' + t + '</span></div>'; }
    function paso(vista, texto, ref) {
      return '<li><span>' + texto + '</span> <button class="link" data-action="ir" data-vista="' + vista + '">Abrir</button> <span class="tag">' + ref + '</span></li>';
    }

    function vistaClientes() {
      var filas = svc.listarClientes().slice().reverse().map(function (c) {
        return '<tr><td>' + esc(c.id) + '</td><td>' + esc(c.nombre) + '</td><td>' + esc(c.rfc) + '</td><td>' + esc(c.direccion) + '</td>' +
          '<td class="num">' + repo.obtenerSaldo(c.id) + '</td><td><button class="btn btn-small" data-action="consultar" data-id="' + esc(c.id) + '">Ver saldo e historial</button></td></tr>';
      }).join('');
      return '<h2>Clientes <span class="tag">RF01</span></h2>' +
        '<section class="card"><h3>Registrar cliente</h3>' +
        '<form data-form="cliente" novalidate><div class="form-banner" role="alert"></div><div class="grid-2">' +
        campo('nombre', 'Nombre(s) *', '<input id="f-nombre" name="nombre" maxlength="120" autocomplete="off">') +
        campo('rfc', 'RFC *', '<input id="f-rfc" name="rfc" maxlength="13" autocomplete="off" style="text-transform:uppercase">', 'No se valida el formato (regla pendiente de definir).') +
        '</div>' + campo('direccion', 'Dirección *', '<input id="f-direccion" name="direccion" maxlength="200" autocomplete="off">') +
        '<button class="btn btn-primary" type="submit">Guardar cliente</button></form></section>' +
        '<section class="card"><h3>Clientes registrados</h3>' +
        (filas ? '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Nombre</th><th>RFC</th><th>Dirección</th><th class="num">Saldo (pts)</th><th></th></tr></thead><tbody>' + filas + '</tbody></table></div>'
          : '<p class="empty">Aún no hay clientes registrados.</p>') + '</section>';
    }

    function vistaVentas() {
      var cl = svc.listarClientes();
      var opciones = '<option value="">— Seleccione un cliente —</option>' +
        cl.map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.id) + ' · ' + esc(c.nombre) + '</option>'; }).join('');
      var filas = svc.listarVentas().slice().reverse().map(function (v) {
        var acciones = v.estado === CC.EstadoVenta.REGISTRADA
          ? '<button class="btn btn-small btn-danger" data-action="revertir" data-id="' + esc(v.id) + '" data-tipo="Cancelada">Cancelar</button> ' +
            '<button class="btn btn-small" data-action="revertir" data-id="' + esc(v.id) + '" data-tipo="Devuelta">Devolver</button>' : '';
        return '<tr><td>' + esc(v.id) + '</td><td>' + $f(v.fecha) + '</td><td>' + nombreCliente(v.clienteId) + '</td>' +
          '<td class="num">' + $m(v.subtotalCent) + '</td><td class="num">' + $m(v.descuentoCent) + '</td><td class="num">' + $m(v.ivaCent) + '</td>' +
          '<td class="num">' + $m(v.totalCent) + '</td><td class="num">' + $m(v.baseCent) + '</td><td class="num"><strong>' + v.puntos + '</strong></td>' +
          '<td><span class="estado estado-' + v.estado.toLowerCase() + '">' + v.estado + '</span></td><td class="acciones">' + acciones + '</td></tr>';
      }).join('');
      return '<h2>Ventas <span class="tag">RF02 · RF03 · RF04 · RF07</span></h2>' +
        '<section class="card"><h3>Registrar venta</h3>' +
        '<form data-form="venta" novalidate><div class="form-banner" role="alert"></div>' +
        campo('clienteId', 'Cliente *', '<select id="f-clienteId" name="clienteId">' + opciones + '</select>') +
        '<div class="grid-3">' +
        campo('subtotal', 'Subtotal sin IVA (MXN) *', '<input id="f-subtotal" name="subtotal" inputmode="decimal" autocomplete="off" placeholder="0.00">') +
        campo('descuento', 'Descuento (MXN)', '<input id="f-descuento" name="descuento" inputmode="decimal" autocomplete="off" placeholder="0.00">') +
        campo('iva', 'IVA (monto MXN)', '<input id="f-iva" name="iva" inputmode="decimal" autocomplete="off" placeholder="0.00">', 'Se captura el monto: la tasa de IVA no está definida en los documentos.') +
        '</div><div class="preview" id="preview" aria-live="polite"></div>' +
        '<button class="btn btn-primary" type="submit">Registrar venta</button></form></section>' +
        '<section class="card"><h3>Ventas registradas</h3>' +
        (filas ? '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Fecha</th><th>Cliente</th><th class="num">Subtotal</th><th class="num">Desc.</th><th class="num">IVA</th><th class="num">Total</th><th class="num">Base puntos</th><th class="num">Puntos</th><th>Estado</th><th></th></tr></thead><tbody>' + filas + '</tbody></table></div>'
          : '<p class="empty">Aún no hay ventas registradas.</p>') + '</section>';
    }

    function vistaConsulta() {
      var cl = svc.listarClientes();
      var opciones = '<option value="">— Seleccione un cliente —</option>' + cl.map(function (c) {
        return '<option value="' + esc(c.id) + '"' + (c.id === st.clienteConsulta ? ' selected' : '') + '>' + esc(c.id) + ' · ' + esc(c.nombre) + '</option>';
      }).join('');
      var detalle = '<p class="empty">Seleccione un cliente para consultar su saldo e historial.</p>';
      if (st.clienteConsulta) {
        var s = svc.consultarSaldo(st.clienteConsulta), h = svc.consultarHistorial(st.clienteConsulta);
        if (s.ok && h.ok) {
          var movPorVenta = {};
          h.data.movimientos.forEach(function (m) { (movPorVenta[m.ventaId] = movPorVenta[m.ventaId] || []).push(m); });
          var filasV = h.data.ventas.map(function (v) {
            var movs = (movPorVenta[v.id] || []).slice().reverse().map(function (m) {
              return '<span class="mov ' + (m.puntos < 0 ? 'mov-neg' : 'mov-pos') + '">' + esc(m.tipo) + ': ' + (m.puntos > 0 ? '+' : '') + m.puntos + '</span>';
            }).join(' ') || '<span class="muted">Sin movimientos (0 puntos)</span>';
            return '<tr><td>' + esc(v.id) + '</td><td>' + $f(v.fecha) + '</td><td class="num">' + $m(v.baseCent) + '</td><td class="num">' + $m(v.totalCent) + '</td>' +
              '<td><span class="estado estado-' + v.estado.toLowerCase() + '">' + v.estado + '</span></td><td>' + movs + '</td></tr>';
          }).join('');
          var filasM = h.data.movimientos.map(function (m) {
            return '<tr><td>' + esc(m.id) + '</td><td>' + $f(m.fecha) + '</td><td>' + esc(m.ventaId) + '</td><td>' + esc(m.tipo) + '</td><td class="num ' + (m.puntos < 0 ? 'neg' : 'pos') + '">' + (m.puntos > 0 ? '+' : '') + m.puntos + '</td></tr>';
          }).join('');
          detalle = '<div class="saldo-card" aria-live="polite"><span class="muted">Saldo de puntos de ' + esc(s.data.cliente.nombre) + '</span><span class="saldo" id="saldo-valor">' + s.data.saldo + '</span><span class="muted">puntos</span></div>' +
            '<h3>Historial de ventas</h3>' + (filasV ? '<div class="table-wrap"><table><thead><tr><th>Venta</th><th>Fecha</th><th class="num">Base puntos</th><th class="num">Total</th><th>Estado</th><th>Movimientos de puntos</th></tr></thead><tbody>' + filasV + '</tbody></table></div>'
              : '<p class="empty" id="hist-vacio">Este cliente aún no tiene ventas.</p>') +
            '<h3>Movimientos de puntos</h3>' + (filasM ? '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Fecha</th><th>Venta</th><th>Tipo</th><th class="num">Puntos</th></tr></thead><tbody>' + filasM + '</tbody></table></div>'
              : '<p class="empty" id="mov-vacio">Sin movimientos de puntos.</p>');
        }
      }
      return '<h2>Saldo e historial <span class="tag">RF05 · RF06</span></h2><section class="card">' +
        '<div class="field"><label for="f-clienteConsulta">Cliente</label><select id="f-clienteConsulta" data-change="consulta">' + opciones + '</select></div>' + detalle + '</section>';
    }

    function vistaVerificacion() {
      var r = st.resultadosPruebas, cuerpo = '<p class="empty">Aún no se han ejecutado las pruebas. Se ejecutan sobre un almacenamiento en memoria aislado: no alteran los datos de la demo.</p>';
      if (r) {
        var ok = r.filter(function (x) { return x.ok; }).length;
        cuerpo = '<p class="resumen ' + (ok === r.length ? 'res-ok' : 'res-fail') + '" id="resumen-pruebas">' + ok + ' de ' + r.length + ' pruebas cumplen</p>' +
          '<div class="table-wrap"><table><thead><tr><th>ID</th><th>Trazabilidad</th><th>Criterio verificado</th><th>Resultado</th></tr></thead><tbody>' +
          r.map(function (x) {
            return '<tr><td>' + esc(x.id) + '</td><td>' + esc(x.trazabilidad) + '</td><td>' + esc(x.descripcion) + '</td><td><span class="estado ' + (x.ok ? 'estado-registrada' : 'estado-cancelada') + '">' + (x.ok ? 'Cumple' : 'Falla') + '</span>' + (x.ok ? '' : '<br><small>' + esc(x.detalle) + '</small>') + '</td></tr>';
          }).join('') + '</tbody></table></div>';
      }
      return '<h2>Verificación de criterios de aceptación</h2><section class="card">' +
        '<p>Ejecuta los escenarios EH01–EH10 y EU01–EU07 de <code>03_AcceptCriteria.md</code>, además de casos límite de las reglas NE01–NE05.</p>' +
        '<button class="btn btn-primary" data-action="pruebas">Ejecutar pruebas</button><div id="res-pruebas">' + cuerpo + '</div></section>' +
        '<section class="card"><h3>No verificables con esta demo</h3><ul><li><strong>CR06</strong>: requerimientos no funcionales (disponibilidad, escalabilidad, seguridad, trazabilidad): pendientes de definir en 02_ReqsDefinition.md.</li>' +
        '<li><strong>CR07</strong>: la suficiencia de la evidencia de pruebas la determina el usuario/revisor.</li>' +
        '<li>Persistencia en SQL Server, .NET Framework 4.5 y mecanismo real de autenticación: fuera del alcance de una demo web sin servidor.</li></ul></section>';
    }

    function vistaDemo() {
      var falla = svc.fallaSimuladaPendiente();
      return '<h2>Ajustes de demo</h2>' +
        '<section class="card"><h3>Ventas sin cliente</h3>' +
        '<p>Decisión del usuario, conforme a 04_TecDesign.md: <strong>no existen ventas sin cliente</strong>. El cliente es siempre obligatorio y una venta sin cliente se rechaza sin guardar datos ni generar puntos.</p></section>' +
        '<section class="card"><h3>Simulación de falla técnica</h3><p>Fuerza una falla durante la próxima venta o reversión para comprobar que no quedan operaciones parciales (el estado se restaura).</p>' +
        '<label class="check"><input type="checkbox" id="chk-falla" data-change="falla"' + (falla ? ' checked' : '') + '> Simular falla técnica en la próxima operación</label></section>' +
        '<section class="card"><h3>Datos de la demo</h3><p>Persistencia simulada en <em>' + esc(adaptador.nombre) + '</em>' + (adaptador.real ? '' : ' (el navegador no permite localStorage: los datos se pierden al recargar)') + '.</p>' +
        '<div class="btn-row"><button class="btn" data-action="restablecer">Restablecer datos de ejemplo</button> <button class="btn btn-danger" data-action="vaciar">Borrar todos los datos</button></div>' +
        '<p class="small muted">Latencia simulada de servicios: ' + CC.Config.SIM_LATENCY_MS + ' ms (solo para mostrar estados de carga).</p></section>';
    }

    /* ------------------------- render ------------------------- */
    function render() {
      var s = svc.sesionActual();
      var html;
      if (!s) html = plantillaLogin();
      else {
        var cont = { inicio: vistaInicio, clientes: vistaClientes, ventas: vistaVentas, consulta: vistaConsulta, verificacion: vistaVerificacion, demo: vistaDemo }[st.vista]();
        html = plantillaShell(cont);
      }
      html += '<div id="toasts" class="toasts" aria-live="polite"></div>' +
        '<dialog id="dlg" aria-labelledby="dlg-titulo"><h3 id="dlg-titulo"></h3><p id="dlg-texto"></p><div class="btn-row"><button class="btn" id="dlg-cancel" type="button">Volver</button> <button class="btn btn-primary" id="dlg-ok" type="button">Confirmar</button></div></dialog>';
      contenedor.innerHTML = html;
      if (st.vista === 'ventas' && s) actualizarVistaPrevia();
    }

    function actualizarVistaPrevia() {
      var f = el('form[data-form="venta"]'), p = el('#preview'); if (!f || !p) return;
      var sub = f.subtotal.value;
      if (!String(sub).trim()) { p.innerHTML = '<span class="muted">Capture el subtotal para ver el cálculo de puntos.</span>'; return; }
      var m = svc.evaluarMontos({ subtotal: sub, descuento: f.descuento.value, iva: f.iva.value });
      if (!m.valido) { p.innerHTML = '<span class="muted">Revise los montos capturados para calcular los puntos.</span>'; return; }
      var cid = f.clienteId.value, saldo = cid ? repo.obtenerSaldo(cid) : null;
      var pts = m.puntos;
      p.innerHTML = '<div><span>Base de puntos (subtotal − descuento)</span><strong>' + $m(m.baseCent) + '</strong></div>' +
        '<div><span>Importe total (con IVA)</span><strong>' + $m(m.totalCent) + '</strong></div>' +
        '<div><span>Puntos a generar</span><strong id="pv-puntos">' + pts + '</strong></div>' +
        '<div><span>Saldo resultante</span><strong>' + (cid ? saldo + ' → ' + (saldo + pts) : 'Seleccione un cliente (obligatorio)') + '</strong></div>';
    }

    function ir(v) { st.vista = v; render(); var c = el('#contenido'); if (c) c.focus(); }

    /* ------------------------- eventos ------------------------- */
    contenedor.addEventListener('submit', function (ev) {
      var form = ev.target.closest('form[data-form]'); if (!form) return;
      ev.preventDefault();
      var tipo = form.getAttribute('data-form'), btn = form.querySelector('button[type="submit"]');
      limpiarErrores(form);
      if (tipo === 'login') {
        conCarga(btn, function () {
          var r = svc.iniciarSesion(form.usuario.value, form.contrasena.value);
          if (!r.ok) { mostrarErrores(form, r); return; }
          st.vista = 'inicio'; render(); toast('Bienvenido, ' + r.data.nombre + '.');
        });
      } else if (tipo === 'cliente') {
        conCarga(btn, function () {
          var r = svc.registrarCliente({ nombre: form.nombre.value, direccion: form.direccion.value, rfc: form.rfc.value });
          if (!r.ok) { mostrarErrores(form, r); toast(r.mensaje, 'error'); return; }
          st.clienteConsulta = r.data.id; render(); toast(r.mensaje + ' Saldo inicial: 0 puntos.');
        });
      } else if (tipo === 'venta') {
        conCarga(btn, function () {
          var r = svc.registrarVenta({ clienteId: form.clienteId.value, subtotal: form.subtotal.value, descuento: form.descuento.value, iva: form.iva.value });
          if (!r.ok) { mostrarErrores(form, r); toast(r.mensaje, 'error'); return; }
          if (r.data.venta.clienteId) st.clienteConsulta = r.data.venta.clienteId;
          render(); toast(r.mensaje);
        });
      }
    });

    contenedor.addEventListener('input', function (ev) {
      var f = ev.target.closest('form[data-form="venta"]'); if (f) actualizarVistaPrevia();
    });

    contenedor.addEventListener('change', function (ev) {
      var t = ev.target;
      if (t.closest('form[data-form="venta"]')) { actualizarVistaPrevia(); return; }
      var k = t.getAttribute('data-change');
      if (k === 'consulta') { st.clienteConsulta = t.value; render(); var s = el('#f-clienteConsulta'); if (s) s.focus(); }
      else if (k === 'falla') { svc.simularFallaProximaOperacion(t.checked); toast(t.checked ? 'La próxima venta o reversión fallará de forma simulada.' : 'Simulación de falla desactivada.'); }
    });

    contenedor.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-action]'); if (!b) return;
      var a = b.getAttribute('data-action');
      if (a === 'ir') ir(b.getAttribute('data-vista'));
      else if (a === 'salir') { svc.cerrarSesion(); st.vista = 'inicio'; render(); }
      else if (a === 'consultar') { st.clienteConsulta = b.getAttribute('data-id'); ir('consulta'); }
      else if (a === 'revertir') {
        var id = b.getAttribute('data-id'), tipo = b.getAttribute('data-tipo'), v = repo.obtenerVenta(id);
        var verbo = tipo === CC.TipoReversion.CANCELACION ? 'cancelar' : 'devolver';
        var aviso = v && v.puntos > 0 && v.clienteId ? ' Se restarán ' + v.puntos + ' puntos del saldo del cliente.' : ' La venta no generó puntos: el saldo no cambia.';
        confirmar('¿' + verbo.charAt(0).toUpperCase() + verbo.slice(1) + ' la venta ' + id + '?', aviso.trim(), 'Sí, ' + verbo).then(function (si) {
          if (!si) return;
          conCarga(null, function () {
            var r = svc.revertirVenta(id, tipo);
            render(); toast(r.mensaje, r.ok ? 'ok' : 'error');
          });
        });
      }
      else if (a === 'pruebas') { conCarga(b, function () { st.resultadosPruebas = CC.Acceptance.ejecutar(); render(); }); }
      else if (a === 'restablecer') {
        confirmar('Restablecer datos de ejemplo', 'Se reemplazarán todos los datos actuales por los datos de ejemplo.', 'Restablecer').then(function (si) {
          if (!si) return;
          repo.reiniciar(); CC.Business.cargarDatosEjemplo(svc);
          svc.iniciarSesion('cajero', 'cajero123'); st.clienteConsulta = ''; render(); toast('Datos de ejemplo restablecidos.');
        });
      }
      else if (a === 'vaciar') {
        confirmar('Borrar todos los datos', 'Se eliminarán clientes, ventas y movimientos de la demo.', 'Borrar todo').then(function (si) {
          if (!si) return;
          repo.reiniciar();
          svc.iniciarSesion('cajero', 'cajero123'); st.clienteConsulta = ''; render(); toast('Datos eliminados.');
        });
      }
    });

    render();
    return { servicios: svc, repositorio: repo, estado: st, render: render };
  }

  CC.UI = { iniciar: iniciar };
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
