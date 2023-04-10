Ext.define('Control.util.Util', {
	alternateClassName: 'Control.util',
	statics : {
		/**
		 * 
		 */
		pageSize: 50,
		
		/**
		 * @param v {String}
		 * @return {String}
		 */
		negrito: function(v) 
		{
			return Ext.String.format('<b>{0}</b>',v);
		},
		
		/**
		 * 
		 */
		renderA1Equiv: function(v) 
		{
			return (v)? parseFloat(v).toFixed(3) : 0.000;
		},
		
		/**
		 * 
		 */
		renderMoney: function(v)
		{
			var valor = Ext.util.Format.number(v, '0,000.00/i');
			var arr = valor.split('.');
			return '<span style="width:100%; display:table"><span style="float:left">R$</span> ' + arr[0].replace(/\,/g,'.') +',' + arr[1] + '</span>';
		},
		
		renderPercent: function(v)
		{
			var valor = Ext.util.Format.number(v, '0,000.00/i');
			var arr = valor.split('.');
			return arr[0].replace(/\,/g,'.') +',' + arr[1] + ' %';
		},
		
		returnSimNao: function(v) 
		{
			return (v)? 'Sim' : 'N�o';
		},
		
		/** 
		 * Converte um valor inteiro(minutos) em string(H:i) 
		 * @param interger min Minutos
		 * @return string No formato H:i
		 * */
		m2h: function(min) 
		{
			if(min < 0){ min = Math.abs(min);}
			var num = new Number(min), //Minutes
			h = Math.floor(num/60), //Hours
			i = min%60; //Minutes
			h = (new String(h).length == 1)? '0'+h : h;
			i = (new String(i).length == 1)? '0'+i : i;
			return  h +  ':' + i ;
		},
		
		getIconExtension: function(v, m, record) {
			//console.log(record);
			var icon = record.data.extension;
			//console.log(icon);
			return Ext.String.format('<img src="resources/icons/{0}.gif" alt="{1}"/>',icon,icon) + '&nbsp;&nbsp;' + v;
		},
		
		
		getLock: function(canWrite)
		{
			var icon = canWrite == false ? 'fam/lock.png' : 'fam/lock_open.png';
			return Ext.String.format('<img src="resources/icons/{0}" alt="{1}"/>',icon,icon);
		}
		
		
		
	}
});