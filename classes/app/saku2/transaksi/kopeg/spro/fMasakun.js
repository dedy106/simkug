window.app_saku2_transaksi_kopeg_spro_fMasakun = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fMasakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fMasakun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,450,20],caption:"Nama", maxLength:100, tag:1});			
		this.c_modul = new saiCB(this,{bound:[20,12,202,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,13,202,20],caption:"Jenis",items:["Neraca","Pendapatan","Beban"], readOnly:true,tag:2});
		this.c_status = new saiCB(this,{bound:[20,22,202,20],caption:"Status Aktifasi",items:["AKTIF","BLOCK"], readOnly:true,tag:2});
		this.c_gar = new saiCB(this,{bound:[20,23,202,20],caption:"Status Budget",items:["0. NON","1. BUDGET"], readOnly:true,tag:2});
		this.c_multi = new saiCB(this,{bound:[20,22,202,20],caption:"Multi Lokasi",items:["LOKAL","MULTI"], readOnly:true,tag:2});
		
		this.bTampil = new button(this,{bound:[829,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		this.p1 = new panel(this,{bound:[10,23,900,353],caption:"Daftar Master Akun"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,305],tag:9,readOnly:true,colTitle: ["Kode","Nama","Modul","Jenis","Status","Status Gar"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,328,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fMasakun.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fMasakun.implement({
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
					sql.add("insert into masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar) values "+
					        "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_modul.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','IDR','0','"+this.c_gar.getText().substring(0,1)+"')");
					
					if (this.c_multi.getText() == "MULTI") {
						sql.add("insert into masakun (kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar) "+
								"select a.kode_akun,b.kode_lokasi,a.nama,a.modul,a.jenis,a.kode_curr,a.block,a.status_gar "+
								"from masakun a cross join lokasi b where a.kode_akun='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.kode_lokasi<>'"+this.app._lokasi+"'");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var status = "";
					if (this.c_status.getText() == "AKTIF") status = "0"; else status = "1";
					if (this.c_multi.getText() == "MULTI") {
						sql.add("update masakun set nama='"+this.e_nama.getText()+"',modul='"+this.c_modul.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"',block='"+status+"',status_gar='"+this.c_gar.getText().substring(0,1)+"' "+
								"where kode_akun = '"+this.cb_kode.getText()+"' ");
					}
					else {
						sql.add("update masakun set nama='"+this.e_nama.getText()+"',modul='"+this.c_modul.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"',block='"+status+"',status_gar='"+this.c_gar.getText().substring(0,1)+"' "+
								"where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					//gak boleh hapus...
					//sql.add("delete from cust where kode_cust = '"+this.cb_kode.getText()+"'");			
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
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
				var data = this.dbLib.getDataProvider("select nama,modul,jenis,block,status_gar from masakun where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);						
						if (line.modul == "A") this.c_modul.setText("AKTIVA");
						else {
							if (line.modul == "P") this.c_modul.setText("PASIVA");
							else if (line.modul == "L") this.c_modul.setText("LABARUGI");
						}
						this.c_jenis.setText(line.jenis);						
						if (line.block == "0") this.c_status.setText("AKTIF");
						else this.c_status.setText("BLOCK");						
						if (line.status_gar == "0") this.c_gar.setText("0. NON");
						else this.c_gar.setText("1. BUDGET");						
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
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select  kode_akun, nama, modul, jenis, block, status_gar "+
			                             "from masakun where kode_lokasi = '"+this.app._lokasi+"' order by kode_akun");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
											  "select kode_akun, nama  from masakun where kode_lokasi='"+this.app._lokasi+"' ",
											  "select count(kode_akun) from masakun where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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