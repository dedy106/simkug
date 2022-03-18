window.app_saku2_transaksi_investasi_fObligor = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fObligor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fObligor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Obligor", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		this.c_jenis = new saiCB(this,{bound:[20,12,202,20],caption:"Jenis",items:["PEMERINTAH","KORPORASI"], readOnly:true,tag:2});
		
		this.cb_obligasi = new saiCBBL(this,{bound:[20,20,200,20],caption:"Akun Obligasi", multiSelection:false, maxLength:10, tag:2});		
		this.cb_piutang = new saiCBBL(this,{bound:[20,21,200,20],caption:"Akun Piu. Obligasi", multiSelection:false, maxLength:10, tag:2});		
		this.cb_piukupon = new saiCBBL(this,{bound:[20,22,200,20],caption:"Akun Piu. Kupon", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pdpt = new saiCBBL(this,{bound:[20,11,200,20],caption:"Akun Ppdt Kupon", multiSelection:false, maxLength:10, tag:2});						
		this.cb_amor = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Ppdt Amor", multiSelection:false, maxLength:10, tag:2});						
		this.cb_spi = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun SPI", multiSelection:false, maxLength:10, tag:2});						
		this.cb_gainlos = new saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Gain/Loss", multiSelection:false, maxLength:10, tag:2});						
		
		this.bTampil = new button(this,{bound:[729,12,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,800,333],caption:"Daftar Obligor"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,795,285],tag:9,readOnly:true,colTitle: ["Kode","Nama","Jenis","Akun Obligasi","Piutang","Piutang Kupon","Akun Kupon","Pdpt Amortisasi","Akun SPI","Akun GainLoss"]}); 
		this.sgn = new sgNavigator(this.p1,{bound:[0,308,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
				
			this.cb_obligasi.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_piutang.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_piukupon.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_pdpt.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);	
			this.cb_amor.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);	
			this.cb_spi.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);	
			this.cb_gainlos.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fObligor.extend(window.childForm);
window.app_saku2_transaksi_investasi_fObligor.implement({
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
					sql.add("insert into inv_obligor(kode_obligor,nama,jenis,akun_obligasi,akun_piutang,akun_piukupon,akun_kupon,akun_amor,akun_spi,akun_gl) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_obligasi.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_piukupon.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_amor.getText()+"','"+this.cb_spi.getText()+"','"+this.cb_gainlos.getText()+"')");
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
					sql.add("update inv_obligor set nama='"+this.e_nama.getText()+"',jenis='"+this.c_jenis.getText()+"',akun_obligasi='"+this.cb_obligasi.getText()+"',akun_piutang='"+this.cb_piutang.getText()+"',akun_piukupon='"+this.cb_piukupon.getText()+"',akun_kupon='"+this.cb_pdpt.getText()+"',akun_amor='"+this.cb_amor.getText()+"',akun_spi='"+this.cb_spi.getText()+"',akun_gl='"+this.cb_gainlos.getText()+"' "+
					        "where kode_obligor='"+this.cb_kode.getText()+"'");
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
					sql.add("delete from inv_obligor where kode_obligor='"+this.cb_kode.getText()+"'");			
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
				var data = this.dbLib.getDataProvider("select a.nama,a.jenis,a.akun_obligasi,a.akun_piutang,a.akun_piukupon,a.akun_kupon,a.akun_amor,a.akun_spi,a.akun_gl from inv_obligor a "+						   
						   "where a.kode_obligor ='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.c_jenis.setText(line.jenis);												
						this.cb_obligasi.setText(line.akun_obligasi);
						this.cb_piutang.setText(line.akun_piutang);
						this.cb_piukupon.setText(line.akun_piukupon);
						this.cb_pdpt.setText(line.akun_kupon);
						this.cb_amor.setText(line.akun_amor);
						this.cb_spi.setText(line.akun_spi);
						this.cb_gainlos.setText(line.akun_gl);
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
			var temp = this.dbLib.runSQL("select kode_obligor,nama,jenis,akun_obligasi,akun_piutang,akun_piukupon,akun_kupon,akun_amor,akun_spi,akun_gl from inv_obligor order by kode_obligor");
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
			    this.standarLib.showListData(this, "Daftar Obligor",sender,undefined, 
											  "select kode_obligor, nama  from inv_obligor",
											  "select count(kode_obligor) from inv_obligor",
											  ["kode_obligor","nama"],"where",["Kode","Nama"],false);				
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