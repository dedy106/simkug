window.app_saku3_transaksi_produk_fBarang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fBarang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fBarang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Barang","Data Barang","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Satuan","Keterangan","Harga"],
					colWidth:[[4,3,2,1,0],[100,200,60,200,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:8});			
		this.cb_klp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,30,220,20],caption:"Kode Kelompok",maxLength:20,multiSelection:false});		
		this.e_pabrik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Keterangan", maxLength:100, tag:1});					
		this.e_satkecil = new saiCB(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Satuan",tag:2,mustCheck:false});				
		this.e_hna = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Harga Jual", tag:1,  tipeText:ttNilai, text:"0", maxLength:10});			
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,24,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		this.e_ss = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,25,200,20],caption:"Safety Stock", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_sm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Slow Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_sm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[245,26,100,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_mm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,27,200,20],caption:"Medium Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_mm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[245,27,100,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_fm1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,28,200,20],caption:"Fast Moving", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_fm2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[245,28,100,20],labelWidth:0,caption:"", tipeText:ttNilai, text:"0", maxLength:10, tag:9});				
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);

		
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		

			this.cb_klp.setSQL("select kode_klp, nama from brg_barangklp where kode_lokasi = '"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);
			this.e_satkecil.items.clear();
			var data = this.dbLib.getDataProvider("select kode_satuan from brg_satuan where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_satkecil.addItem(i,line.kode_satuan.toUpperCase());
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fBarang.extend(window.childForm);
window.app_saku3_transaksi_produk_fBarang.implement({
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
					sql.add("insert into brg_barang(kode_barang,nama,kode_lokasi,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen,flag_aktif,ss,sm1,sm2,mm1,mm2,fm1,fm2,kode_klp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_satkecil.getText()+"','-',1,"+nilaiToFloat(this.e_hna.getText())+",'"+this.e_pabrik.getText()+"','-','1',"+nilaiToFloat(this.e_ss.getText())+","+nilaiToFloat(this.e_sm1.getText())+","+nilaiToFloat(this.e_sm2.getText())+","+nilaiToFloat(this.e_mm1.getText())+","+nilaiToFloat(this.e_mm2.getText())+","+nilaiToFloat(this.e_fm1.getText())+","+nilaiToFloat(this.e_fm2.getText())+",'"+this.cb_klp.getText()+"')");
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
					sql.add("delete from brg_barang where kode_barang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into brg_barang(kode_barang,nama,kode_lokasi,sat_kecil,sat_besar,jml_sat,hna,pabrik,flag_gen,flag_aktif,ss,sm1,sm2,mm1,mm2,fm1,fm2,kode_klp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_satkecil.getText()+"','-',1,"+nilaiToFloat(this.e_hna.getText())+",'"+this.e_pabrik.getText()+"','-','1',"+nilaiToFloat(this.e_ss.getText())+","+nilaiToFloat(this.e_sm1.getText())+","+nilaiToFloat(this.e_sm2.getText())+","+nilaiToFloat(this.e_mm1.getText())+","+nilaiToFloat(this.e_mm2.getText())+","+nilaiToFloat(this.e_fm1.getText())+","+nilaiToFloat(this.e_fm2.getText())+",'"+this.cb_klp.getText()+"')");
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
					sql.add("delete from brg_barang where kode_barang = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				break;
			case "simpan" :	
				var strSQL = "select kode_barang from brg_barang where nama ='"+this.e_nama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Nama Barang Duplikasi.","Duplikasi dengan Kode  ["+line.kode_barang+"]");
						return false;
					}					
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :
				var strSQL = "select kode_barang from brg_barang where kode_barang <> '"+this.cb_kode.getText()+"' and nama ='"+this.e_nama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Nama Barang Duplikasi.","Duplikasi dengan Kode  ["+line.kode_barang+"]");
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
				var strSQL = "select * from brg_barang where kode_barang ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		
						this.e_pabrik.setText(line.pabrik);	
						this.e_hna.setText(floatToNilai(line.hna));		
						this.e_ss.setText(floatToNilai(line.ss));																	
						this.e_sm1.setText(floatToNilai(line.sm1));																	
						this.e_sm2.setText(floatToNilai(line.sm2));																	
						this.e_mm1.setText(floatToNilai(line.mm1));																	
						this.e_mm2.setText(floatToNilai(line.mm2));																	
						this.e_fm1.setText(floatToNilai(line.fm1));																	
						this.e_fm2.setText(floatToNilai(line.fm2));	
						this.cb_klp.setText(line.kode_klp);															
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
		var strSQL = "select kode_barang,nama,sat_kecil,hna,pabrik "+
		             "from brg_barang "+
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
			this.sg1.appendData([line.kode_barang,line.nama,line.sat_kecil,line.pabrik,floatToNilai(line.hna)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " kode_barang like '%"+this.e_kode2.getText()+"%' ";
			else var filter = " nama like '%"+this.e_nama2.getText()+"%' ";
			
			var strSQL = "select kode_barang,nama,sat_kecil,,hna,pabrik,flag_gen "+
						"from brg_barang "+
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