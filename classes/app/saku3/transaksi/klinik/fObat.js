window.app_saku3_transaksi_klinik_fObat = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fObat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fObat";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Obat", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Obat","Data Obat","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Kode","Nama","Sat Kecil","Sat Besar","Jml Sat","Pabrik","HNA","Sts Generik"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,150,60,60,60,300,60]],
					colFormat:[[4,6],[cfNilai,cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_pabrik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Pabrikasi", maxLength:100, tag:1});					
		this.e_satkecil = new saiCB(this.pc1.childPage[1],{bound:[20,24,180,20],caption:"Sat Kecil",tag:2,mustCheck:false});
		this.e_satbesar = new saiCB(this.pc1.childPage[1],{bound:[20,21,180,20],caption:"Sat besar",tag:2,mustCheck:false});		
		this.e_jmlsat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,180,20],caption:"Jml Sat Besar", tipeText:ttNilai, text:"0", maxLength:10, tag:2});				
		this.e_hna = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,180,20],caption:"HNA/SatKecil", tag:1,  tipeText:ttNilai, text:"0", maxLength:10});			
		this.c_gen = new saiCB(this.pc1.childPage[1],{bound:[20,23,180,20],caption:"Status Generik",items:["Y","T"], readOnly:true,tag:2});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,24,180,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		this.e_ss = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,25,180,20],caption:"Safety Stock", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_sm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,26,180,20],caption:"Slow Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_sm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[225,26,80,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_mm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,180,20],caption:"Medium Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_mm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[225,27,80,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_fm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,28,180,20],caption:"Fast Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_fm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[225,28,80,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();			
			
			this.e_satkecil.items.clear();
			var data = this.dbLib.getDataProvider("select distinct sat_kecil as sat_kecil from kli_obat where kode_lokasi='"+this.app._lokasi+"' order by sat_kecil",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.e_satkecil.addItem(i,line.sat_kecil);
				}
			}
			this.e_satbesar.items.clear();
			var data = this.dbLib.getDataProvider("select distinct sat_besar as sat_besar from kli_obat where kode_lokasi='"+this.app._lokasi+"' order by sat_besar",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.e_satbesar.addItem(i,line.sat_besar);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fObat.extend(window.childForm);
window.app_saku3_transaksi_klinik_fObat.implement({
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
					sql.add("insert into kli_obat(kode_obat,nama,kode_lokasi,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen,flag_aktif,ss,sm1,sm2,mm1,mm2,fm1,fm2) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_satkecil.getText()+"','"+this.e_satbesar.getText()+"',"+nilaiToFloat(this.e_jmlsat.getText())+","+nilaiToFloat(this.e_hna.getText())+",'"+this.e_pabrik.getText()+"','"+this.c_gen.getText()+"','1',"+nilaiToFloat(this.e_ss.getText())+","+nilaiToFloat(this.e_sm1.getText())+","+nilaiToFloat(this.e_sm2.getText())+","+nilaiToFloat(this.e_mm1.getText())+","+nilaiToFloat(this.e_mm2.getText())+","+nilaiToFloat(this.e_fm1.getText())+","+nilaiToFloat(this.e_fm2.getText())+")");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from kli_obat where kode_obat = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into kli_obat(kode_obat,nama,kode_lokasi,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen,flag_aktif,ss,sm1,sm2,mm1,mm2,fm1,fm2) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_satkecil.getText()+"','"+this.e_satbesar.getText()+"',"+nilaiToFloat(this.e_jmlsat.getText())+","+nilaiToFloat(this.e_hna.getText())+",'"+this.e_pabrik.getText()+"','"+this.c_gen.getText()+"','1',"+nilaiToFloat(this.e_ss.getText())+","+nilaiToFloat(this.e_sm1.getText())+","+nilaiToFloat(this.e_sm2.getText())+","+nilaiToFloat(this.e_mm1.getText())+","+nilaiToFloat(this.e_mm2.getText())+","+nilaiToFloat(this.e_fm1.getText())+","+nilaiToFloat(this.e_fm2.getText())+")");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kli_obat where kode_obat = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				var strSQL = "select kode_obat from kli_obat where nama ='"+this.e_nama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Nama Obat Duplikasi.","Duplikasi dengan Kode  ["+line.kode_obat+"]");
						return false;
					}					
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :
				var strSQL = "select kode_obat from kli_obat where kode_obat <> '"+this.cb_kode.getText()+"' and nama ='"+this.e_nama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Nama Obat Duplikasi.","Duplikasi dengan Kode  ["+line.kode_obat+"]");
						return false;
					}					
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select nama from kli_obat where kode_obat ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);																		
						setTipeButton(tbUbahHapus);
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
				this.e_nama.setText(this.sg1.cells(1,row));									
				this.e_pabrik.setText(this.sg1.cells(5,row));					
				this.e_satkecil.setText(this.sg1.cells(2,row));					
				this.e_satbesar.setText(this.sg1.cells(3,row));					
				this.e_jmlsat.setText(this.sg1.cells(4,row));					
				this.e_hna.setText(this.sg1.cells(6,row));					
				this.c_gen.setText(this.sg1.cells(7,row));					
				
				var data = this.dbLib.getDataProvider("select ss,sm1,sm2,mm1,mm2,fm1,fm2 from kli_obat "+
				           "where kode_lokasi='"+this.app._lokasi+"' and kode_obat ='"+this.cb_kode.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ss.setText(floatToNilai(line.ss));																	
						this.e_sm1.setText(floatToNilai(line.sm1));																	
						this.e_sm2.setText(floatToNilai(line.sm2));																	
						this.e_mm1.setText(floatToNilai(line.mm1));																	
						this.e_mm2.setText(floatToNilai(line.mm2));																	
						this.e_fm1.setText(floatToNilai(line.fm1));																	
						this.e_fm2.setText(floatToNilai(line.fm2));																	
					}					
				}
				
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){						
		var strSQL = "select kode_obat,nama,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen "+
		             "from kli_obat "+
					 "where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_obat,line.nama,line.sat_kecil,line.sat_besar,floatToNilai(line.jml_sat),line.pabrik,floatToNilai(line.hna),line.flag_gen]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " kode_obat like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select kode_obat,nama,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen "+
						"from kli_obat "+
						"where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and "+filter;		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	}
});