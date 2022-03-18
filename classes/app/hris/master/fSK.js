window.app_hris_master_fSK = function(owner)
{
	if (owner)
	{
		window.app_hris_master_fSK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_fSK";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SK", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label;checkBox");
		this.cb_nik = new saiCBBL(this,{bound:[20,9,200,20],caption:"NIK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,300,20],caption:"No SK",maxLength:50,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Keterangan", tag:1, maxLength:100});		
		//this.cb_sk = new saiCBBL(this,{bound:[20,12,200,20],caption:"Jenis SK", multiSelection:false, maxLength:10, tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal SK", underline:true});
		this.dp_d = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.l_tgl1 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Berlaku", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,14,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.l_tgl2 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Berakhir", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,15,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_aktif = new portalui_checkBox(this,{bound:[300,15,100,20],caption:"Status Aktif", selected:false});
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun Ke-",items:["NON","I","II"], readOnly:true,tag:2});
		this.e_file = new saiLabelEdit(this,{bound:[20,16,500,20],caption:"File SK", tag:1, maxLength:200});	
		this.up_file = new uploader(this,{bound:[520,16,80,20],param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true,afterUpload:[this,"doAfterLoad"], tag:1});
				
		//this.bTampil = new button(this,{bound:[829,16,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		this.p1 = new panel(this,{bound:[20,23,580,203],caption:"Data Jenis SK"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,575,150],colCount:2,tag:0,
		            colTitle:["Jenis SK","Keterangan"],
					colWidth:[[1,0],[300,70]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],
					appendRow:[this,"doAppendRow"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,175,699,25],buttonStyle:2,grid:this.sg});
		/*
		this.p2 = new panel(this,{bound:[10,24,900,200],caption:"Daftar SK"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,100],readOnly:true,tag:9,
			colTitle: ["No SK","Keterangan","Jenis SK","NIK","Nama","Tgl Masuk","Tgl Berlaku","Tgl Berakhir","File SK"]});		
		this.sgn = new sgNavigator(this.p2,{bound:[0,258,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		*/
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			//this.cb_sk.setSQL("select sts_sk, nama from gr_status_sk where kode_lokasi='"+this.app._lokasi+"'",["sts_sk","nama"],false,["Kode","Nama"],"and","Data Jenis SK",true);			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_fSK.extend(window.childForm);
window.app_hris_master_fSK.implement({
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
			if ((this.stsSDM == "9" || this.stsSDM == "6" || this.stsSDM == "4") && this.c_tahun.getText() == "NON") {							
				system.alert(this,"Transaksi tidak valid.","Tahun Ke- tidak boleh diisi NON untuk karyawan kontrak");
				return false;						
			}
			if ((this.stsSDM == "1" || this.stsSDM == "2" || this.stsSDM == "3" || this.stsSDM == "5" || this.stsSDM == "7" || this.stsSDM == "8") && this.c_tahun.getText() != "NON") {			
				system.alert(this,"Transaksi tidak valid.","Tahun Ke- harus diisi NON untuk karyawan tetap");
				return false;						
			}			
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					var periode="";
					var m=this.dp_d.month;
					if (m < 10) m = "0" + m;		
					periode=this.dp_d.year+""+m;
					sql.add("insert into gr_sk(no_sk,nik,kode_lokasi,tgl_masuk,tgl_awal_sk,tgl_akhir_sk,nama,file_sk,nik_user,tgl_input,flag_aktif,tahun,periode) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.dp_d.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_nama.getText()+"','"+this.e_file.getText()+"','"+this.app._userLog+"',getdate(),'"+flag_aktif+"','"+this.c_tahun.getText()+"','"+periode+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_sk_d(no_sk,kode_lokasi,nik,sts_sk) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.sg.cells(0,i)+"')");
							}
						}
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
			if ((this.stsSDM == "9" || this.stsSDM == "6" || this.stsSDM == "4") && this.c_tahun.getText() == "NON") {							
				system.alert(this,"Transaksi tidak valid.","Tahun Ke- tidak boleh diisi NON untuk karyawan kontrak");
				return false;						
			}
			if ((this.stsSDM == "1" || this.stsSDM == "2" || this.stsSDM == "3" || this.stsSDM == "5" || this.stsSDM == "7" || this.stsSDM == "8") && this.c_tahun.getText() != "NON") {			
				system.alert(this,"Transaksi tidak valid.","Tahun Ke- harus diisi NON untuk karyawan tetap");
				return false;						
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					var periode="";
					var m=this.dp_d.month;
					if (m < 10) m = "0" + m;		
					periode=this.dp_d.year+""+m;
					alert(periode);
					sql.add("delete from gr_sk_d where no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					sql.add("update gr_sk set tahun='"+this.c_tahun.getText()+"',nik='"+this.cb_nik.getText()+"',tgl_masuk='"+this.dp_d.getDateString()+"',tgl_awal_sk='"+this.dp_d1.getDateString()+"',tgl_akhir_sk='"+this.dp_d2.getDateString()+"',nama='"+this.e_nama.getText()+"',file_sk='"+this.e_file.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate(),flag_aktif='"+flag_aktif+"',periode='"+periode+"' "+
						    "where no_sk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"'");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_sk_d(no_sk,kode_lokasi,nik,sts_sk) values "+
										"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.sg.cells(0,i)+"')");
							}
						}
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_sk where no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
			if (this.cb_nik == sender && this.cb_nik.getText() != ""){
				var data = this.dbLib.getDataProvider("select sts_sdm from gr_karyawan where nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.stsSDM = line.sts_sdm;			
					}
				}			
			}
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.nik,c.nama as nama_kar,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_awal_sk,103) as tgl_mulai,convert(varchar,a.tgl_akhir_sk,103) as tgl_selesai,a.file_sk,a.flag_aktif,a.tahun "+
				           " from gr_sk a "+
						   "inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
						   "where a.no_sk ='"+this.cb_kode.getText()+"' and a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						//this.cb_nik.setText(line.nik,line.nama_kar);
						//this.cb_sk.setText(line.sts_sk,line.nama_sk);
						this.dp_d.setText(line.tgl_masuk);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.e_file.setText(line.file_sk);
						this.c_tahun.setText(line.tahun);
						
						if (line.flag_aktif=="1")
						{
							this.cb_aktif.setSelected(true);
						}
						var data = this.dbLib.getDataProvider("select a.sts_sk,b.nama "+
						"from gr_sk_d a "+
						"inner join gr_status_sk b on a.sts_sk=b.sts_sk and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_sk='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.cb_nik.getText()+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																
								this.sg.appendData([line.sts_sk,line.nama]);
							}
							this.sg.validasi();
						} else this.sg.clear(1);
					
						setTipeButton(tbUbahHapus);
					}
					else{
						this.e_nama.setText("");
						//this.cb_nik.setText("","");
						//this.cb_sk.setText("","");
						this.e_file.setText("");
						setTipeButton(tbSimpan);
					}
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Jenis SK",this.sg, this.sg.row, this.sg.col, 
														"select a.sts_sk,a.nama from gr_status_sk a where a.kode_lokasi='"+this.app._lokasi+"'  ",
														"select count(a.sts_sk) from gr_status_sk a where a.kode_lokasi='"+this.app._lokasi+"'  ",
														 new Array("a.sts_sk","a.nama"),"and",new Array("Jenis SK","Keterangan"),false);					
						break;					
												
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL(
				"select distinct a.no_sk,a.nama,c.nama as jenis_sk,a.nik,b.nama as nama_kar,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_awal_sk,103) as tgl_awal,convert(varchar,tgl_akhir_sk,103) as tgl_akhir,a.file_sk "+
				"from gr_sk a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
				"             inner join gr_status_sk c on a.sts_sk=c.sts_sk and a.kode_lokasi=c.kode_lokasi "+
				"where a.kode_lokasi ='"+this.app._lokasi+"' and a.nik='"+this.cb_nik.getText()+"'");
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
			    this.standarLib.showListData(this, "Daftar SK",sender,undefined, 
											  "select no_sk, nama from gr_sk where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"' ",
											  "select count(no_sk) from gr_sk where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"'",
											  ["no_sk","nama"],"and",["No SK","Keterangan"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},		
	doAfterLoad: function(sender, result, data, filename){
		if (result) this.e_file.setText(data.filedest);
		this.dataUpload = data;
		if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
		else this.dataUpload.temporary = "";
		this.dataUpload.temporary += this.rootDir+"/"+this.e_file.param2 +this.dataUpload.tmpfile;
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
