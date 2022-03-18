window.app_saku2_transaksi_siaga_fTecc = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fTecc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fTecc";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter TeCC", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,11,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		
		this.cb_akunar = new saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});
		this.cb_akunpdpt = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:2});
		this.cb_akundiskon = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Diskon", multiSelection:false, maxLength:10, tag:2});
		this.cb_akunppn = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun PPN", multiSelection:false, maxLength:10, tag:2});
		this.cb_akunbiaya = new saiCBBL(this,{bound:[20,16,200,20],caption:"Akun Biaya", multiSelection:false, maxLength:10, tag:2});
		this.cb_akunmaterai = new saiCBBL(this,{bound:[20,17,200,20],caption:"Akun Materai", multiSelection:false, maxLength:10, tag:2});
		this.cb_oi = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Pdpt Lainnya", multiSelection:false, maxLength:10, tag:2});
		this.cb_oe = new saiCBBL(this,{bound:[20,19,200,20],caption:"Akun Beban Lainnya", multiSelection:false, maxLength:10, tag:2});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select a.kode_cabang, a.nama from gr_cabang a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_cabang","a.nama"],false,["Kode","Nama"],"and","Daftar Cabang",true);
			this.cb_akunar.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_akunpdpt.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_akundiskon.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_akunppn.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_akunbiaya.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_akunmaterai.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_oi.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			this.cb_oe.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fTecc.extend(window.childForm);
window.app_saku2_transaksi_siaga_fTecc.implement({
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
					sql.add("insert into gr_tecc(kode_cabang,akun_ar,akun_pend,akun_pot_pend,akun_ppn,akun_biaya,akun_materai,akun_oi,akun_oe) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_akunar.getText()+"','"+this.cb_akunpdpt.getText()+"','"+this.cb_akundiskon.getText()+"','"+this.cb_akunppn.getText()+"','"+this.cb_akunbiaya.getText()+"','"+this.cb_akunmaterai.getText()+"','"+this.cb_oi.getText()+"','"+this.cb_oe.getText()+"')");
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
					sql.add("update gr_tecc set akun_ar='"+this.cb_akunar.getText()+"',akun_pend='"+this.cb_akunpdpt.getText()+"',akun_pot_pend='"+this.cb_akundiskon.getText()+"',akun_ppn='"+this.cb_akunppn.getText()+"',akun_biaya='"+this.cb_akunbiaya.getText()+"',akun_materai='"+this.cb_akunmaterai.getText()+"',akun_oi='"+this.cb_oi.getText()+"',akun_oe='"+this.cb_oe.getText()+"' "+
					        "where kode_cabang = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from gr_tecc where kode_cabang = '"+this.cb_kode.getText()+"'");			
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
				var strSQL = "select  b.kode_cabang,b.nama as nama_cabang,a.akun_ar,a.akun_pend,a.akun_pot_pend,a.akun_ppn,a.akun_biaya,a.akun_materai,a.akun_oi,a.akun_oe,  "+
							 "c.nama as nama_ar,d.nama as nama_pend,e.nama as nama_diskon,f.nama as nama_ppn,g.nama as nama_biaya,h.nama as nama_materai, "+
							 "i.nama as nama_oi,j.nama as nama_oe "+
							 "from gr_tecc a inner join gr_cabang b on a.kode_cabang=b.kode_cabang "+
							 "               inner join masakun c on a.akun_ar=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun d on a.akun_pend=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun e on a.akun_pot_pend=e.kode_akun and e.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun f on a.akun_ppn=f.kode_akun and f.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun g on a.akun_biaya=g.kode_akun and g.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun h on a.akun_materai=h.kode_akun and h.kode_lokasi='"+this.app._lokasi+"'  "+
						     "               inner join masakun i on a.akun_oi=i.kode_akun and i.kode_lokasi='"+this.app._lokasi+"'  "+
							 "               inner join masakun j on a.akun_oe=j.kode_akun and j.kode_lokasi='"+this.app._lokasi+"'  "+
						     "where a.kode_cabang ='"+this.cb_kode.getText()+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_akunar.setText(line.akun_ar,line.nama_ar);
						this.cb_akunpdpt.setText(line.akun_pend,line.nama_pend);
						this.cb_akundiskon.setText(line.akun_pot_pend,line.nama_diskon);
						this.cb_akunppn.setText(line.akun_ppn,line.nama_ppn);
						this.cb_akunbiaya.setText(line.akun_biaya,line.nama_biaya);
						this.cb_akunmaterai.setText(line.akun_materai,line.nama_materai);
						this.cb_oi.setText(line.akun_oi,line.nama_oi);
						this.cb_oe.setText(line.akun_oe,line.nama_oe);						
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