<?php 
   header('Content-Type:text/html; charset=iso-8859-1');
   header("Cache-Control: no-store, no-cache, must-revalidate");
   header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
   header("Cache-Control: post-check=0, pre-check=0", false); 
   header("Pragma: no-cache");     
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Sistema de Bloqueio de Documentos</title>
	<style type="text/css" media="screen">
      	@import url('lib/extjs/resources/css/ext-all-gray.css');
		@import url('resources/icons/silk.css');
		@import url('resources/css/index.css');
		@import url('lib/extjs/examples/ux/css/CheckHeader.css');
	</style>
</head>
<body>

	<!-- Load screen -->
	<div id="loading-mask">&#160;</div>
	<div id="loading">
		<div class="loading-indicator"></div>
		<div class="loading-status">
			<img src='resources/images/loading-gear.gif' style='float:left' alt="Loading.." width="120" height="120" style="display:block"/>
			<p id='loading-msg'>&nbsp;&nbsp;Carregando estilos e imagens...</p>
		</div>
	</div>

	
	<!-- Loading modules -->
	<script type="text/javascript">document.getElementById('loading-msg').innerHTML = '&nbsp;&nbsp;Carregando módulos...';</script>	
	<script type="text/javascript" src="lib/extjs/ext.js"></script>
    <script type="text/javascript" src="app-1.1.0.js"></script> 	
    

    <!-- Inicializing -->
    <script type="text/javascript">document.getElementById('loading-msg').innerHTML = '&nbsp;&nbsp;Inicializando...';</script>
 	<script type="text/javascript" src="lib/extjs/locale/ext-lang-pt_BR.js"></script>    


	<!-- Splash -->	
	<script type="text/javascript">
		Ext.onReady(function() {
			Ext.QuickTips.init();
			  setTimeout(function(){
				    Ext.get('loading').remove();
				    Ext.get('loading-mask').fadeOut({remove:true});
			  }, 250);
		});
	</script>  
</body>
</html>