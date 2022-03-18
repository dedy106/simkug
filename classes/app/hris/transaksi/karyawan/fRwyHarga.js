window.app_hris_transaksi_karyawan_fRwyHarga = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_karyawan_fRwyHarga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_karyawan_fRwyHarga";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Riwayat Penghargaan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		this.cb_nik = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false, labelWidth:120,change:[this,"doChange"]});
		this.cb_sk = new saiCBBL(this,{bound:[20,11,300,20],caption:"No SK",maxLength:10,multiSelection:false, labelWidth:120,change:[this,"doChange"]});
		this.e_tgl = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Tanggal SK", readOnly:true, labelWidth:120,text:""});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,20,500,20],caption:"Bentuk Penghargaan", tag:1, labelWidth:120,maxLength:100});		
		//this.e_nilai = new saiLabelEdit(this,{bound:[20,21,180,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0", tag:99, visible:false});		
		this.bTampil = new button(this,{bound:[629,20,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,700,350],caption:"Daftar Riwayat Penghargaan"});		
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,695,300],tag:9,readOnly:true,colTitle: ["No SK","Tanggal","Keterangan","Nilai"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,325,700,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Karyawan",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_karyawan_fRwyHarga.extend(window.childForm);
window.app_hris_transaksi_karyawan_fRwyHarga.implement({
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
					sql.add("insert into gr_rwyharga(nik,no_sk,kode_lokasi,keterangan,nilai,nik_user,tgl_input) values "+//,"+parseNilai(this.e_nilai.getText())+"
						    "	('"+this.cb_nik.getText()+"','"+this.cb_sk.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"',0,'"+this.app._userLog+"',getdate())");					
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
					var sql = new server_util_arrayList();//,nilai="+parseNilai(this.e_nilai.getText())+"
					sql.add("update gr_rwyharga set keterangan='"+this.e_ket.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
						    "where no_sk='"+this.cb_sk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rwyharga  where no_sk = '"+this.cb_sk.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_nik);
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
			if (sender == this.cb_nik){
				if (this.cb_nik.getText() != "") {
					this.sg1.clear(1);
					this.cb_sk.setSQL("select a.no_sk,a.nama,convert(varchar,a.tgl_masuk,103) as tanggal "+
					                  "from gr_sk a left join (select no_sk,kode_lokasi from gr_dinas union select no_sk,kode_lokasi from gr_rwysanksi) b on a.no_sk=b.no_sk and a.kode_lokasi=b.kode_lokasi where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_sk is null ",
									  ["a.no_sk","a.nama","tanggal"],false,["No SK","Keterangan","Tgl SK"],"and","Data SK Karyawan",true);
				}
			}
			if (sender == this.cb_sk){
				if (this.cb_sk.getText() != ""){
					this.e_tgl.setText(this.cb_sk.dataFromList[2]);
					var data = this.dbLib.getDataProvider("select keterangan,nilai from gr_rwyharga where no_sk ='"+this.cb_sk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_ket.setText(line.keterangan);
							//this.e_nilai.setText(floatToNilai(line.nilai));
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doTampilClick: function(sender){
		try{			
			if (this.cb_nik.getText() != "") {
				var temp = this.dbLib.runSQL("select a.no_sk,convert(varchar,a.tgl_masuk,103) as tanggal,b.keterangan,b.nilai "+
											 "from gr_sk a inner join gr_rwyharga b on a.no_sk=b.no_sk and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_masuk desc");
				if (temp instanceof arrayMap) {
					this.sg1.setData(temp,true,20);
					this.sgn.setTotalPage(this.sg1.pageCount);				
					this.sgn.rearrange();
					this.sgn.activePage = 0;
				}else systemAPI.alert(temp);
			} 
			else {
				system.alert(this,"NIK harus dipilih","Pilih NIK dari daftar.");
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_sk.getText()+")");							
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
