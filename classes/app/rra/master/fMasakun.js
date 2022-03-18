window.app_rra_master_fMasakun = function(owner)
{
	if (owner)
	{
		window.app_rra_master_fMasakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_master_fMasakun";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.c_modul = new saiCB(this,{bound:[20,21,200,20],caption:"Modul",items:["AKTIVA","PASIVA","LABARUGI"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,23,200,20],caption:"Jenis",items:["NERACA","BEBAN","PENDAPATAN"], readOnly:true,tag:2});
		this.c_status = new saiCB(this,{bound:[20,22,200,20],caption:"Status",items:["AKTIF","BLOK"], readOnly:true,tag:2});
		
		this.bTampil = new button(this,{bound:[629,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,700,333],caption:"Daftar Master Akun"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,695,280],tag:9,readOnly:true,
			colTitle: ["Kode","Nama","Modul","Jenis","Status"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,308,700,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		this.e_cari = new saiLabelEdit(this.sgn,{bound:[308,2,220,20],caption:"Cari", labelWidth:50,tag:100, keyDown:[this,"doCariKeyDown"] } );
		this.ib_cari = new button(this.sgn,{bound:[560,2,25,20],icon:"image/cursor.gif",caption:" ", click:[this,"doFind"]});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = this.app._dbLib;
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			this.onClose.set(this,"doClose");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_master_fMasakun.extend(window.childForm);
window.app_rra_master_fMasakun.implement({
	doClose: function(){
		this.dbLib.delListener(this);
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
					var modul = this.c_modul.getText().substr(0,1);
					if (this.c_jenis.getText() == "NERACA") var jenis = "Neraca";
					if (this.c_jenis.getText() == "BEBAN") var jenis = "Beban";
					if (this.c_jenis.getText() == "PENDAPATAN") var jenis = "Pendapatan";					
					if (this.c_status.getText() == "AKTIF") var aktif = "1";
					else if (this.c_status.getText() == "BLOK") var aktif = "0";
					
					sql.add("insert into rra_masakun(kode_akun,nama,modul,jenis,kode_lokasi,kode_curr,block) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+modul+"','"+jenis+"','"+this.app._lokasi+"','IDR','"+aktif+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					var modul = this.c_modul.getText().substr(0,1);
					if (this.c_jenis.getText() == "NERACA") var jenis = "Neraca";
					else if (this.c_jenis.getText() == "BEBAN") var jenis = "Beban";
					else if (this.c_jenis.getText() == "PENDAPATAN") var jenis = "Pendapatan";										
					if (this.c_status.getText() == "AKTIF") var aktif = "1";
					else var aktif = "0";

					sql.add("update rra_masakun set nama='"+this.e_nama.getText()+"',modul='"+modul+"',jenis='"+jenis+"',block='"+aktif+"' "+
					        "where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
					sql.add("delete from rra_masakun where kode_akun = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql, undefined, this);
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
				var data = this.dbLib.getDataProvider("select nama,modul,jenis,block "+
				           " from rra_masakun where kode_akun ='"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						if (line.modul == "A") this.c_modul.setText("AKTIVA");
						else if (line.modul == "P") this.c_modul.setText("PASIVA");
						else if (line.modul == "L") this.c_modul.setText("LABARUGI");
						this.c_jenis.setText(line.jenis.toUpperCase());
						if (line.block == "1") this.c_status.setText("AKTIF");
						else this.c_status.setText("BLOK");
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
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_akun,nama,modul,jenis,block from rra_masakun where kode_lokasi='"+this.app._lokasi+"' order by kode_akun");
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
											  "select kode_akun, nama  from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_akun) from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result, callObj, conn){
		if (sender == this.dbLib && this == callObj){
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
	},	
	doFind: function(){
		try{			
			var temp = this.dbLib.runSQL("select kode_akun,nama from rra_masakun  "+
				" where ( upper(nama) like '%"+this.e_cari.getText().toUpperCase()+"%' or "+
				"   upper(kode_akun) like '%"+this.e_cari.getText().toUpperCase()+"%' "+
				" ) order by kode_akun ");
			
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
	doCariKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13){
			this.doFind();
			return false;
		}
	}
});
