window.app_saku3_transaksi_yakes21_aktap_fFaAkun = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_aktap_fFaAkun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_aktap_fFaAkun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Akun Aktap", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datecpker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Klp Akun","Data Klp Akun"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Klp","Nama","Umur","Kode Akun","Akun BP","Akun Deps","Akun Opex","Pilih"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,100,100,100,100,100,250,100]],
					readOnly:true,
					colFormat:[[7],[cfButton]],
					click:[this,"doPilihClick"], colAlign:[[7],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Kelompok",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:1});							
		this.e_umur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Umur (Bulan)", maxLength:100, tag:1});			
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kode Akun",maxLength:20,multiSelection:false});		
		this.cb_beban = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Beban Susut",maxLength:20,multiSelection:false});		
		this.cb_deprs = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akumulasi Susut",maxLength:20,multiSelection:false});				
		this.cb_opex = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Opex",maxLength:20,multiSelection:false});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();

			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '006' where a.block='0' and a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);							
			this.cb_beban.setSQL("select a.kode_akun,a.nama from masakun a where a.block='0' and a.jenis='BEBAN' and a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);							
			this.cb_deprs.setSQL("select a.kode_akun,a.nama from masakun a where a.block='0' and a.modul='A' and a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);							
			this.cb_opex.setSQL("select a.kode_akun,a.nama from masakun a where a.block='0' and a.jenis='BEBAN' and a.kode_lokasi = '"+this.app._lokasi+"' ",["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_aktap_fFaAkun.extend(window.childForm);
window.app_saku3_transaksi_yakes21_aktap_fFaAkun.implement({
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
					sql.add("insert into fa_klpakun(kode_klpakun,nama,umur,kode_akun,akun_bp,akun_deprs,akun_opex,tgl_input,nik_user) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_umur.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_beban.getText()+"','"+this.cb_deprs.getText()+"','"+this.cb_opex.getText()+"',getdate(),'"+this.app._userLog+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"")
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
					sql.add("delete from fa_klpakun where kode_klpakun = '"+this.cb_kode.getText()+"'");
					sql.add("insert into fa_klpakun(kode_klpakun,nama,umur,kode_akun,akun_bp,akun_deprs,akun_opex,tgl_input,nik_user) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_umur.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_beban.getText()+"','"+this.cb_deprs.getText()+"','"+this.cb_opex.getText()+"',getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from fa_klpakun where kode_klpakun = '"+this.cb_kode.getText()+"' ");			
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from fa_klpakun where kode_klpakun ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nama.setText(line.nama);							
						this.cb_akun.setText(line.kode_akun);									
						this.e_umur.setText(line.umur);																	
						this.cb_beban.setText(line.akun_bp);									
						this.cb_deprs.setText(line.akun_deprs);	
						this.cb_opex.setText(line.akun_opex);						
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
	doPilihClick: function(sender, col, row){
		try{
			if (col === 7) {
				this.doDoubleClick(this.sg1,0,row);
			}
		}catch(e){
			alert(e);
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
		var strSQL = "select a.kode_klpakun,a.nama,a.umur,a.kode_akun,a.akun_bp,a.akun_deprs,a.akun_opex "+
		             "from fa_klpakun a order by a.kode_klpakun";		
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
			this.sg1.appendData([line.kode_klpakun,line.nama,line.umur,line.kode_akun,line.akun_bp,line.akun_deprs,line.akun_opex,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
