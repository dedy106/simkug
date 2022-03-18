window.app_saku3_transaksi_siaga_hris_gaji_fAkunNik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fAkunNik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fAkunNik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Akun Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);	
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Akun"]});						
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.cb_gaji = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"COA Gaji",maxLength:10,multiSelection:false,tag:1});
		this.cb_pot = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"COA Potongan",maxLength:10,multiSelection:false,tag:1});
		this.cb_pph = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"COA PPh",maxLength:10,multiSelection:false,tag:1});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);

		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_gaji.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('030') where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pot.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('030') where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('030') where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fAkunNik.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fAkunNik.implement({
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
					sql.add("insert into gr_gaji_akun(nik, kode_lokasi, akun_gaji,akun_pph,akun_pot) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_gaji.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_pot.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
					sql.add("delete from gr_gaji_akun where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			

					sql.add("insert into gr_gaji_akun(nik, kode_lokasi, akun_gaji,akun_pph,akun_pot) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_gaji.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_pot.getText()+"')");
							
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
					sql.add("delete from gr_gaji_akun where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
			if (this.cb_nik.getText() != ""){
				this.standarLib.clearByTag(this, new Array("1"),this.cb_nik);
				var data = this.dbLib.getDataProvider(
				            "select a.akun_gaji,a.akun_pph,a.akun_pot "+
							"from gr_gaji_akun a "+
							"where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_gaji.setText(line.akun_gaji);	
						this.cb_pph.setText(line.akun_pph);	
						this.cb_pot.setText(line.akun_pot);						
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_nik.setText(this.sg.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){		
		var strSQL = "select a.nik,b.nama,a.akun_gaji+' | '+c.nama as akun_gaji "+
						"from gr_gaji_akun a "+
						"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_masakun c on a.akun_gaji=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik";
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.nik,line.nama,line.akun_gaji]);
		}
		this.sg.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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