window.app_saku3_transaksi_investasi_invest2_fRoiDepo = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fRoiDepo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fRoiDepo";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data ROI Deposito", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,text:"201701"});
		//this.c_jenis = new saiCB(this,{bound:[20,10,200,20],caption:"Jenis",items:["DEPOSITO","DOC"], readOnly:true,tag:2});
		this.bHitung = new button(this,{bound:[120,13,100,18],caption:"Hitung",click:[this,"doGen"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["ROi Deposito","Data Rekap"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:16,tag:9,
		            colTitle:["Tanggal","SAwal","Masuk","Keluar","SAkhir","Bunga","Pajak","Beban", "Bunga Net", "ROI Net","Harian","Hari n+1","Kumulatif", "Jenis","Kode Kelola","Dana"],
					colWidth:[[15,14,13, 12,11,10,9,8,  7,6,5,4,3,2,1,0],[100,100,100,80,80,80,80,80,  100,100,100,100,100,100,100,100]],
					colFormat:[[1,2,3,4,5,6,7, 8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai  ,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				    readOnly:true, 
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fRoiDepo.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fRoiDepo.implement({
	
	doGen: function(sender) {
		//if (this.e_periode.getText() <= "201506") this.doHitungAwal();
		//else 

		this.doHitung();
	},	
	doHitung: function(sender) {
		try {
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			var data1 = this.dbLib.getDataProvider("select kode_kelola from inv_kelola where flag_aktif='1'",true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg3.clear();
				for (var n in data1.rs.rows){
					line1 = data1.rs.rows[n];																																							
					for (var i = 0; i < tglAkhir;i++){
						var k = i+1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "0"+idx;
						if (idx.length == 2) var nu = idx;
			
						var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
						this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DOC",line1.kode_kelola,"DAKES"]);						
					}
					
					if (line1.kode_kelola == "YKT") {
						for (var i = 0; i < tglAkhir;i++){
							var k = i+1;
							var idx = k.toString();
							if (idx.length == 1) var nu = "0"+idx;
							if (idx.length == 2) var nu = idx;
			
							var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
							this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DOC",line1.kode_kelola,"DAKEM"]);						
						}
					}
				
					for (var i = 0; i < tglAkhir;i++){
						var k = i+1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "0"+idx;
						if (idx.length == 2) var nu = idx;
			
						var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
						this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DEPOSITO",line1.kode_kelola,"DAKES"]);						
					}	
					
					if (line1.kode_kelola == "YKT") {
						for (var i = 0; i < tglAkhir;i++){
							var k = i+1;
							var idx = k.toString();
							if (idx.length == 1) var nu = "0"+idx;
							if (idx.length == 2) var nu = idx;
			
							var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
							this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DEPOSITO",line1.kode_kelola,"DAKEM"]);						
						}
					}
						
				}
					
			}
		
			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {
					//sawal
					var strSQL = "select a.tanggal,SUM( case a.dc when 'D' then a.nilai else -a.nilai end) as sawal "+
								 "from ( "+
								 "   "+
								 "select 'D' as dc,'"+this.sg3.cells(0,i)+"' as tanggal,sum(nilai) as nilai "+
								 "from inv_depo2_m "+
								 "where tanggal < '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola ='"+this.sg3.cells(14,i)+"' and status_dana='"+this.sg3.cells(15,i)+"' "+
								 " "+
								 "union all "+
								 " "+
								 "select 'C','"+this.sg3.cells(0,i)+"' as tanggal,SUM(nilai) as nilai "+
								 "from ( "+
								 "select sum(b.nilai) as nilai "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "	 inner join kas_m c on a.no_kas=c.no_kas "+
								 "where c.tanggal < '"+this.sg3.cells(0,i)+"' and b.jenis ='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"' and a.jenis in ('TUTUP','SEBAGIAN') and b.status_dana='"+this.sg3.cells(15,i)+"' "+
								 "union all "+
								 "select sum(b.nilai) as nilai "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "where b.jenis='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"' and a.jenis in ('TTPPECAH','PERPANJANG','PINDAHJNS') and b.status_dana='"+this.sg3.cells(15,i)+"' "+
								 "and a.tanggal < '"+this.sg3.cells(0,i)+"' "+
								 ") a "+
								 " "+
								 ") a group by a.tanggal ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(1,i,floatToNilai(line.sawal));
						}
					}
					
					
					//masuk
					var strSQL = "select isnull(sum(nilai),0)  as masuk "+
								 "from inv_depo2_m "+
								 "where tanggal = '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana='"+this.sg3.cells(15,i)+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(2,i,floatToNilai(line.masuk));
						}
					}
					
					
					//keluar
					var strSQL = "select sum(a.nilai) as keluar from ("+
								 "select sum(b.nilai) as nilai "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "	 inner join kas_m c on a.no_kas=c.no_kas "+
								 "where c.tanggal = '"+this.sg3.cells(0,i)+"' and b.jenis ='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"' and a.jenis in ('TUTUP','SEBAGIAN') and b.status_dana='"+this.sg3.cells(15,i)+"' "+								 							 
								 "union all "+
								 "select sum(b.nilai) as nilai "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "where a.tanggal = '"+this.sg3.cells(0,i)+"' and b.jenis='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"' and a.jenis in ('TTPPECAH','PERPANJANG','PINDAHJNS') and b.status_dana='"+this.sg3.cells(15,i)+"' "+
								 ") a";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(3,i,floatToNilai(line.keluar));
							var sak = nilaiToFloat(this.sg3.cells(1,i)) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(3,i));
							this.sg3.cells(4,i,floatToNilai(sak));
						}
					}

					
					//bunga dan pajak
					var strSQL = "select round(sum( a.nilai * (p_bunga/100) / basis),0) as bruto, "+
					             "       round(sum( a.nilai * (p_bunga/100) / basis) * 0.2,0) as pajak, "+
					             "       round(sum( a.nilai * (p_bunga/100) / basis) * 0.8,0) as neto "+
								 "from inv_depo2_m a "+
								 "left join ( "+
								 "select b.no_depo "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "	 inner join kas_m c on a.no_kas=c.no_kas "+
								 "where (c.tanggal < '"+this.sg3.cells(0,i)+"' or b.tgl_selesai < '"+this.sg3.cells(0,i)+"') and b.jenis ='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"' and a.jenis in ('TUTUP','SEBAGIAN') and b.status_dana='"+this.sg3.cells(15,i)+"' "+
								 "union "+
								 "select b.no_depo "+
								 "from inv_depotutup_m a "+
								 "	 inner join inv_depo2_m b on a.no_depo=b.no_depo "+
								 "where b.jenis='"+this.sg3.cells(13,i)+"' and b.kode_kelola='"+this.sg3.cells(14,i)+"'  and a.jenis in ('TTPPECAH','PERPANJANG','PINDAHJNS') and b.status_dana='"+this.sg3.cells(15,i)+"' "+
								 "and (a.tanggal < '"+this.sg3.cells(0,i)+"' or b.tgl_selesai < '"+this.sg3.cells(0,i)+"') "+
								 "	"+
								 ") b on a.no_depo=b.no_depo "+
								 "where a.tanggal < '"+this.sg3.cells(0,i)+"' and a.jenis='"+this.sg3.cells(13,i)+"' and a.kode_kelola='"+this.sg3.cells(14,i)+"'  and b.no_depo is null and a.status_dana='"+this.sg3.cells(15,i)+"' ";								
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(5,i,floatToNilai(line.bruto));
							this.sg3.cells(6,i,floatToNilai(line.pajak));
							this.sg3.cells(8,i,floatToNilai(line.neto));
							
							if ( nilaiToFloat(this.sg3.cells(1,i)) == 0) var roiHarian = 0; 
							else var roiHarian = Math.round( nilaiToFloat(this.sg3.cells(8,i)) / nilaiToFloat(this.sg3.cells(1,i)) * 10000 ) / 10000;
							this.sg3.cells(10,i,roiHarian);
							this.sg3.cells(11,i,1+roiHarian);
							
							
							
							if ( (i == 0) || (this.sg3.cells(13,i) != this.sg3.cells(13,i-1)) || (this.sg3.cells(14,i) != this.sg3.cells(14,i-1)) || (this.sg3.cells(15,i) != this.sg3.cells(15,i-1)))  
								var roiKum = roiHarian + 1;
							else 
								var roiKum = (roiHarian+1) * nilaiToFloat(this.sg3.cells(12,i-1));
							
							this.sg3.cells(12,i,roiKum);
							
						}
					}
					
				}
			}
			

			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {
					if (this.sg3.cells(12,i) != "0") this.sg3.cells(12,i,nilaiToFloat(this.sg3.cells(12,i)) - 1);
				}
			}
			
			
		}
		catch(e) {
			alert(e);
		}
		
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_depo_roi where periode='"+this.e_periode.getText()+"' ");
					
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)) {	      
							sql.add("insert into inv_depo_roi (periode,tanggal,jenis,kode_kelola,status_dana,sawal,masuk,keluar,sakhir,bunga,pajak,beban,bunga_net,roi_hari,roi_kinerja,roi_kum) values "+
									"('"+this.e_periode.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(13,i)+"','"+this.sg3.cells(14,i)+"','"+this.sg3.cells(15,i)+"',"+nilaiToFloat(this.sg3.cells(1,i))+","+nilaiToFloat(this.sg3.cells(2,i))+","+nilaiToFloat(this.sg3.cells(3,i))+","+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+","+nilaiToFloat(this.sg3.cells(6,i))+","+nilaiToFloat(this.sg3.cells(7,i))+","+nilaiToFloat(this.sg3.cells(8,i))+","+nilaiToFloat(this.sg3.cells(10,i))+","+nilaiToFloat(this.sg3.cells(11,i))+","+nilaiToFloat(this.sg3.cells(12,i))+")");
					
						}
					}
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbSimpan);
					this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;											
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_mitra,nama from inv_mitra order by kode_mitra";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			this.page = 1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.kode_mitra,line.nama]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));								
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select * from inv_mitra where kode_mitra ='"+this.cb_kode.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);											
						this.cb_spi.setText(line.akun_spi);						
						setTipeButton(tbUbah);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}			
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},

	/*
	//jan-juni 2015
	doHitungAwal: function(sender) {
		try {
			var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					var tglAkhir = parseInt(line.tglakhir);
				}
			}
		
			var data1 = this.dbLib.getDataProvider("select kode_kelola from inv_kelola where flag_aktif='1'",true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg3.clear();
				for (var n in data1.rs.rows){
					line1 = data1.rs.rows[n];																																							
					for (var i = 0; i < tglAkhir;i++){
						var k = i+1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "0"+idx;
						if (idx.length == 2) var nu = idx;
			
						var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
						this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DOC",line1.kode_kelola,"DAKES"]);						
					}
					
					
					if (line1.kode_kelola == "YKT") {
						for (var i = 0; i < tglAkhir;i++){
							var k = i+1;
							var idx = k.toString();
							if (idx.length == 1) var nu = "0"+idx;
							if (idx.length == 2) var nu = idx;
			
							var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
							this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DOC",line1.kode_kelola,"DAKEM"]);						
						}
					}
				
					for (var i = 0; i < tglAkhir;i++){
						var k = i+1;
						var idx = k.toString();
						if (idx.length == 1) var nu = "0"+idx;
						if (idx.length == 2) var nu = idx;
			
						var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
						this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DEPOSITO",line1.kode_kelola,"DAKES"]);						
					}	
					
					if (line1.kode_kelola == "YKT") {
						for (var i = 0; i < tglAkhir;i++){
							var k = i+1;
							var idx = k.toString();
							if (idx.length == 1) var nu = "0"+idx;
							if (idx.length == 2) var nu = idx;
			
							var tgl = this.e_periode.getText().substr(0,4) +"-"+ this.e_periode.getText().substr(4,2) +"-"+ nu;
							this.sg3.appendData([tgl,"0","0","0","0","0","0","0"  ,"0","0","0","0","0","DEPOSITO",line1.kode_kelola,"DAKEM"]);						
						}
					}
					
				}
					
			}
		
			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {
					//sawal
					var strSQL = "select '"+this.sg3.cells(0,i)+"', isnull(SUM(case when dc = 'D' then nilai else -nilai end),0) as sawal "+
								 "from "+
								 "( "+
								 "select 'D' as dc,isnull(SUM(nilai),0) as nilai "+
								 "from z_deporoi_sawal "+
								 "where tgl_mulai < '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' "+

								 "union all "+

								 "select 'D' as dc,isnull(SUM(nilai),0) as nilai "+
								 "from z_deporoi_mutasi "+
								 "where tanggal < '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' "+
								 "and dc = 'D' "+

								 "union all "+

								 "select 'C' as dc,isnull(SUM(nilai),0) as nilai "+
								 "from z_deporoi_mutasi "+
								 "where tanggal < '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' "+
								 "and dc = 'C' "+

								 ") a ";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(1,i,floatToNilai(line.sawal));
						}
					}
					
					
					//masuk
					var strSQL = "select sum(nilai)  as masuk "+
								 "from z_deporoi_mutasi "+
								 "where dc = 'D' and tanggal = '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana='"+this.sg3.cells(15,i)+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(2,i,floatToNilai(line.masuk));
						}
					}
					
					
					//keluar
					var strSQL = "select sum(nilai)  as keluar "+
								 "from z_deporoi_mutasi "+
								 "where dc = 'C' and tanggal = '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana='"+this.sg3.cells(15,i)+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(3,i,floatToNilai(line.keluar));
							var sak = nilaiToFloat(this.sg3.cells(1,i)) + nilaiToFloat(this.sg3.cells(2,i)) - nilaiToFloat(this.sg3.cells(3,i));
							this.sg3.cells(4,i,floatToNilai(sak));
						}
					}

					
					//bunga dan pajak
						
					var strSQL = "select "+
								"isnull(SUM(bruto),0) as bruto,"+
								"isnull(SUM(pajak),0) as pajak,"+
								"isnull(SUM(neto),0) as neto "+

								"from (	"+						 

								"select "+
								"round(sum( nilai * (p_bunga) / basis),0) as bruto, "+
								"round(sum( nilai * (p_bunga) / basis) * 0.2,0) as pajak, "+
								"round(sum( nilai * (p_bunga) / basis) * 0.8,0) as neto "+
								"from z_deporoi_sawal "+
								"where tgl_mulai < '"+this.sg3.cells(0,i)+"' and tgl_selesai >= '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and "+ 
								"kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' "+

								"union all "+
							 
								"select "+
								"round(sum( nilai * (p_bunga) / basis),0) as bruto,"+
								"round(sum( nilai * (p_bunga) / basis) * 0.2,0) as pajak,  "+
								"round(sum( nilai * (p_bunga) / basis) * 0.8,0) as neto  "+
								"from z_deporoi_mutasi  "+
								"where tanggal  < '"+this.sg3.cells(0,i)+"'  and tgl_selesai >= '"+this.sg3.cells(0,i)+"' and jenis='"+this.sg3.cells(13,i)+"' and  "+ 
								"kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' and dc = 'D'  "+

								"union all "+

								"select "+
								"-round(sum( nilai * (p_bunga) / basis),0) as bruto,"+
								"-round(sum( nilai * (p_bunga) / basis) * 0.2,0) as pajak,  "+
								"-round(sum( nilai * (p_bunga) / basis) * 0.8,0) as neto  "+
								"from z_deporoi_mutasi  "+
								"where tanggal  < '"+this.sg3.cells(0,i)+"' and tgl_selesai >= '"+this.sg3.cells(0,i)+"'  and jenis='"+this.sg3.cells(13,i)+"' and  "+ 
								"kode_kelola='"+this.sg3.cells(14,i)+"' and status_dana = '"+this.sg3.cells(15,i)+"' and dc = 'C'  "+

								") a ";
					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg3.cells(5,i,floatToNilai(line.bruto));
							this.sg3.cells(6,i,floatToNilai(line.pajak));
							this.sg3.cells(8,i,floatToNilai(line.neto));
							
							if ( nilaiToFloat(this.sg3.cells(1,i)) == 0) var roiHarian = 0; 
							else var roiHarian = Math.round( nilaiToFloat(this.sg3.cells(8,i)) / nilaiToFloat(this.sg3.cells(1,i)) * 10000 ) / 10000;
							this.sg3.cells(10,i,roiHarian);
							this.sg3.cells(11,i,1+roiHarian);
							
							
							
							if ( (i == 0) || (this.sg3.cells(13,i) != this.sg3.cells(13,i-1)) || (this.sg3.cells(14,i) != this.sg3.cells(14,i-1)) || (this.sg3.cells(15,i) != this.sg3.cells(15,i-1)))  
								var roiKum = roiHarian + 1;
							else 
								var roiKum = (roiHarian+1) * nilaiToFloat(this.sg3.cells(12,i-1));
							
							this.sg3.cells(12,i,roiKum);
							
						}
					}
					
				}
			}
			

			for (var i=0;i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i)) {
					if (this.sg3.cells(12,i) != "0") this.sg3.cells(12,i,nilaiToFloat(this.sg3.cells(12,i)) - 1);
				}
			}
			
			
		}
		catch(e) {
			alert(e);
		}
		
	}
	*/
});