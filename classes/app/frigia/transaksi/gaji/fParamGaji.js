window.app_frigia_transaksi_gaji_fParamGaji = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_gaji_fParamGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_transaksi_gaji_fParamGaji";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Param",btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"],maxLength:20});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama Param", maxLength:100});			
		this.c_dc = new saiCB(this,{bound:[20,12,150,20],caption:"D/C",items:["D","C"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,13,150,20],caption:"Jenis",items:["I","R","L"], readOnly:true,tag:2});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Gaji", multiSelection:false,tag:1});
		this.bTampil = new portalui_button(this,{bound:[729,15,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,800,430],caption:"Daftar Parameter Gaji"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,795,400],colCount:6,tag:9,
		            colTitle:["Kode Param","Nama","D/C","Jenis","Kode Akun","Nama Akun"],
					colWidth:[[5,4,3,2,1,0],[200,80,50,50,330,100]],
					readOnly:true,defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,425,899,25],buttonStyle:3,grid:this.sg});	
			
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
					
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_transaksi_gaji_fParamGaji.extend(window.portalui_childForm);
window.app_frigia_transaksi_gaji_fParamGaji.implement({
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
					sql.add("insert into fri_gaji_param(kode_param,kode_lokasi,nama,dc,kode_akun,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_dc.getText()+"','"+this.cb_akun.getText()+"','"+this.c_jenis.getText()+"')");										
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update fri_gaji_param set jenis='"+this.c_jenis.getText()+"',dc='"+this.c_dc.getText()+"',nama='"+this.e_nama.getText()+"',kode_akun='"+this.cb_akun.getText()+"' "+
						    "where kode_param = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fri_gaji_param "+
						    "where kode_param = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				setTipeButton(tbAllFalse);
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
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.dc,a.kode_akun,b.nama as nama_akun,a.jenis "+
				           "from fri_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.c_dc.setText(line.dc);
						this.c_jenis.setText(line.jenis);
						this.cb_akun.setText(line.kode_akun,line.nama_akun);
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
											  "select kode_param, nama  from fri_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_param) from fri_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_param","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){		
		var data = this.dbLib.getDataProvider("select a.kode_param, a.nama, a.dc, a.kode_akun, b.nama as nama_akun,a.jenis "+
			           "from fri_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "where a.kode_lokasi = '"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,line.dc,line.jenis,line.kode_akun,line.nama_akun]);
			}
		} else this.sg.clear(1);									
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});