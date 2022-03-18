window.app_hris_transaksi_karyawan_fRwySanksi = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_karyawan_fRwySanksi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_karyawan_fRwySanksi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Riwayat Sanksi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		this.cb_nik = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false, change:[this,"doChange"]});
		this.cb_sk = new saiCBBL(this,{bound:[20,11,300,20],caption:"No SK",maxLength:10,multiSelection:false, change:[this,"doChange"]});
		this.e_tgl = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Tanggal SK", readOnly:true, text:""});		
		this.cb_sanksi = new saiCBBL(this,{bound:[20,12,200,20],caption:"Sanksi",maxLength:10,multiSelection:false,tag:1});		
		this.e_lama = new saiLabelEdit(this,{bound:[20,21,180,20],caption:"Lama", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Berlaku", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,14,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Berakhir", underline:true});		
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,15,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Keterangan", maxLength:150});	
		this.bTampil = new button(this,{bound:[629,15,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,700,330],caption:"Daftar Riwayat Sanksi"});		
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,695,280],tag:9,readOnly:true,colTitle: ["No SK","Tanggal","Kode Sanksi","Keterangan","Lama","Tgl Berlaku","Tgl Berakhir"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,305,700,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});
		
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
			this.cb_sanksi.setSQL("select sts_sanksi, nama from gr_status_sanksi where kode_lokasi='"+this.app._lokasi+"'",["sts_sanksi","nama"],false,["Kode","Nama"],"and","Data Daftar Sanksi",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_karyawan_fRwySanksi.extend(window.childForm);
window.app_hris_transaksi_karyawan_fRwySanksi.implement({
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
					sql.add("insert into gr_rwysanksi(nik,no_sk,kode_lokasi,sts_sanksi,lama,tgl_mulai,tgl_selesai,nik_user,tgl_input,keterangan) values "+
						    "	('"+this.cb_nik.getText()+"','"+this.cb_sk.getText()+"','"+this.app._lokasi+"','"+this.cb_sanksi.getText()+"',"+parseNilai(this.e_lama.getText())+",'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"')");					
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
					sql.add("update gr_rwysanksi set tgl_selesai='"+this.dp_d2.getDateString()+"',tgl_mulai='"+this.dp_d1.getDateString()+"',sts_sanksi='"+this.cb_sanksi.getText()+"',lama="+parseNilai(this.e_lama.getText())+",nik_user='"+this.app._userLog+"',tgl_input=getdate(),keterangan='"+this.e_ket.getText()+"' "+
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
					sql.add("delete from gr_rwysanksi  where no_sk = '"+this.cb_sk.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
	doSelectDate: function(sender, d,m,y){
		if (sender == this.dp_d1){
			this.dp_d2.dateAdd('d',parseFloat(this.e_lama.getText()), this.dp_d1.toSysDate());
			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.e_lama){
				this.dp_d2.dateAdd('d',parseFloat(this.e_lama.getText()), this.dp_d1.toSysDate());
			}
			if (sender == this.cb_nik){
				if (this.cb_nik.getText() != "") {
					this.sg1.clear(1);
					this.cb_sk.setSQL("select a.no_sk,a.nama,convert(varchar,a.tgl_masuk,103) as tanggal,convert(varchar,a.tgl_awal_sk,103) as tgl_mulai,convert(varchar,a.tgl_akhir_sk,103) as tgl_selesai "+
					                  "from gr_sk a left join (select no_sk,kode_lokasi from gr_dinas union select no_sk,kode_lokasi from gr_rwyharga) b on a.no_sk=b.no_sk and a.kode_lokasi=b.kode_lokasi where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_sk is null ",
									  ["a.no_sk","a.nama","a.tanggal","a.tgl_mulai","a.tgl_selesai"],false,["No SK","Keterangan","Tgl SK","Tgl Mulai","Tgl Selesai"],"and","Data SK Karyawan",true);
				}
			}
			if (sender == this.cb_sk){
				if (this.cb_sk.getText() != ""){
					this.e_tgl.setText(this.cb_sk.dataFromList[2]);
					this.dp_d1.setText(this.cb_sk.dataFromList[3]);
					this.dp_d2.setText(this.cb_sk.dataFromList[4]);
					
					var data = this.dbLib.getDataProvider(
					           "select a.sts_sanksi,a.lama,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.nama,a.keterangan  "+
					           "from gr_rwysanksi a inner join gr_status_sanksi b on a.sts_sanksi=b.sts_sanksi and a.kode_lokasi=b.kode_lokasi "+
							   "where a.no_sk ='"+this.cb_sk.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_sanksi.setText(line.sts_sanksi,line.nama);
							this.dp_d1.setText(line.tgl_mulai);
							this.dp_d2.setText(line.tgl_selesai);
							this.e_lama.setText(floatToNilai(line.lama));
							this.e_ket.setText(line.keterangan);
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
				var temp = this.dbLib.runSQL("select a.no_sk,convert(varchar,a.tgl_masuk,103) as tanggal,b.sts_sanksi,c.nama,b.lama,convert(varchar,b.tgl_mulai,103) as tgl_mulai,convert(varchar,b.tgl_selesai,103) as tgl_selesai "+
											 "from gr_sk a inner join gr_rwysanksi b on a.no_sk=b.no_sk and a.kode_lokasi=b.kode_lokasi "+
											 "             inner join gr_status_sanksi c on b.sts_sanksi=c.sts_sanksi and c.kode_lokasi=b.kode_lokasi "+
											 "where b.nik='"+this.cb_nik.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_masuk desc");
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
