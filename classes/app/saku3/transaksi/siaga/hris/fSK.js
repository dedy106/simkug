window.app_saku3_transaksi_siaga_hris_fSK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fSK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fSK";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SK", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label;checkBox");

		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["Data SK","Filter Cari","Daftar SK"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,			
			colTitle: ["No SK","Keterangan","Jenis SK","NIK","Nama","Tgl SK","Tgl Berlaku","Tgl Berakhir","Tahun Ke-"],	
			colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,80,200,80,200,300,200]],
			readOnly:true,
			dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,91,220,20],caption:"NIK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.cb_stssdm = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Status Pegawai", readOnly:true});						
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,300,20],caption:"No SK",maxLength:50,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,595,20],caption:"Keterangan", tag:1, maxLength:100});				
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal SK", underline:true});
		this.dp_d = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Berlaku", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],date:new Date().getDateStr()});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"Tgl Berakhir", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18],date:new Date().getDateStr()});		
		this.c_tahun = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Tahun Ke-",items:["NON","I","II"], readOnly:true,tag:2});
		this.ltahun = new portalui_label(this.pc1.childPage[0],{bound:[225,22,100,18],caption:"(utk Karyawan Kontrak)", labelWidth:200, underline:false});
		this.c_aktif = new saiCB(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Status",items:["1.AKTIF","0.NONAKTIF"], readOnly:true,tag:2});

		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"File SK", readOnly:true, tag:1, maxLength:200});	
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[525,16,80,20],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
				
		this.p1 = new panel(this.pc1.childPage[0],{bound:[10,23,595,207],caption:"Data Jenis SK"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,590,157],colCount:2,tag:0,
		            colTitle:["Jenis SK","Keterangan"],
					colWidth:[[1,0],[420,120]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],
					appendRow:[this,"doAppendRow"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,181,593,25],buttonStyle:2,grid:this.sg});
		
		this.cb_nik2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,9,220,20],caption:"NIK", multiSelection:false, maxLength:10, tag:9});		
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Jenis SK", multiSelection:false, maxLength:10, tag:9});				
		this.bCari = new button(this.pc1.childPage[1],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			

		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_nik2.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_jenis.setSQL("select sts_sk, nama from gr_status_sk where kode_lokasi='"+this.app._lokasi+"'",["sts_sk","nama"],false,["Kode","Nama"],"and","Data Jenis SK",true);			
			this.cb_stssdm.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status Pegawai",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fSK.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fSK.implement({
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
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
					if (this.stsSimpan == 0) {
						sql.add("delete from gr_sk where nik = '"+this.cb_nik.getText()+"' and no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
						sql.add("delete from gr_sk_d where nik = '"+this.cb_nik.getText()+"' and no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					}

					var flag_aktif = this.c_aktif.getText().substr(0,1);										
					var m = this.dp_d.month;
					if (m < 10) m = "0" + m;		
					var periode = this.dp_d.year + "" + m;

					sql.add("insert into gr_sk(no_sk,nik,kode_lokasi,tgl_masuk,tgl_awal_sk,tgl_akhir_sk,nama,file_sk,nik_user,tgl_input,flag_aktif,tahun,periode) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.dp_d.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_nama.getText()+"','"+this.e_file.getText()+"','"+this.app._userLog+"',getdate(),'"+flag_aktif+"','"+this.c_tahun.getText()+"','"+periode+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_sk_d(no_sk,kode_lokasi,nik,sts_sk) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.sg.cells(0,i)+"')");
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
					sql.add("delete from gr_sk where nik = '"+this.cb_nik.getText()+"' and no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
					sql.add("delete from gr_sk_d where nik = '"+this.cb_nik.getText()+"' and no_sk = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");	
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
					this.sg.clear(1);
				break;
			case "simpan" :	
			case "ubah" :	
				if ((this.stsSDM == "9" || this.stsSDM == "6" || this.stsSDM == "4") && this.c_tahun.getText() == "NON") {							
					system.alert(this,"Transaksi tidak valid.","Tahun Ke- tidak boleh diisi NON untuk karyawan kontrak");
					return false;						
				}
				if ((this.stsSDM == "1" || this.stsSDM == "2" || this.stsSDM == "3" || this.stsSDM == "5" || this.stsSDM == "7" || this.stsSDM == "8") && this.c_tahun.getText() != "NON") {			
					system.alert(this,"Transaksi tidak valid.","Tahun Ke- harus diisi NON untuk karyawan tetap");
					return false;						
				}		
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				if (d1 > d2) {											
					system.alert(this,"Tanggal Berlaku tidak valid.","Tanggal Berlaku harus lebih awal dari Tanggal Berakhir.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
						this.cb_stssdm.setText(line.sts_sdm);		
					}
				}			
			}
			
			if ((sender == this.cb_kode || sender == this.cb_nik) && this.cb_kode.getText() != ""  && this.cb_nik.getText() != ""){
				var data = this.dbLib.getDataProvider(
					       "select a.nama,a.nik,c.nama as nama_kar,a.tgl_masuk,a.tgl_awal_sk,a.tgl_akhir_sk,a.file_sk,a.flag_aktif,a.tahun "+
				           " from gr_sk a "+
						   "inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
						   "where a.no_sk ='"+this.cb_kode.getText()+"' and a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_nik.setText(line.nik);
						this.e_nama.setText(line.nama);
						this.dp_d.setText(line.tgl_masuk);
						this.dp_d1.setText(line.tgl_awal_sk);
						this.dp_d2.setText(line.tgl_akhir_sk);						
						this.c_tahun.setText(line.tahun);

						this.e_file.setText(line.file_sk);
						this.fileBfr = line.file_sk;
						
						if (line.flag_aktif == "1") this.c_aktif.setText("1.AKTIF");
						else this.c_aktif.setText("0.NONAKTIF");

						var data = this.dbLib.getDataProvider(
							"select a.sts_sk,b.nama "+
							"from gr_sk_d a inner join gr_status_sk b on a.sts_sk=b.sts_sk and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_sk='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik='"+this.cb_nik.getText()+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																
								this.sg.appendData([line.sts_sk,line.nama]);
							}							
						} 
						else this.sg.clear(1);
						
						this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);
					}
					else{
						this.stsSimpan = 1;
						this.e_nama.setText("");						
						this.e_file.setText("");
						this.sg.clear(1);
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
	doCari:function(sender){								
		if (this.cb_nik2.getText() != "") var filter = " and a.nik = '"+this.cb_nik2.getText()+"' ";
		else var filter = " ";

		if (this.cb_jenis.getText() != "") var filter = filter + " and cc.sts_sk = '"+this.cb_jenis.getText()+"' ";
		else var filter = filter + " ";


		var strSQL = "select distinct a.no_sk,a.nama,c.nama as jenis_sk,a.nik,b.nama as nama_kar,convert(varchar,a.tgl_masuk,103) as tgl_masuk,"+
					"convert(varchar,a.tgl_awal_sk,103) as tgl_awal,convert(varchar,tgl_akhir_sk,103) as tgl_akhir,a.tahun "+
					"from gr_sk a inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+					
					"			  inner join gr_sk_d cc on a.no_sk=cc.no_sk and a.kode_lokasi=cc.kode_lokasi and a.nik=cc.nik "+
					"             inner join gr_status_sk c on cc.sts_sk=c.sts_sk and cc.kode_lokasi=c.kode_lokasi "+
					"where a.kode_lokasi ='"+this.app._lokasi+"' "+filter;		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];					
			this.sg1.appendData([line.no_sk,line.nama,line.jenis_sk,line.nik,line.nama_kar,line.tgl_masuk,line.tgl_awal,line.tgl_akhir,line.tahun]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.cb_nik.setText(this.sg1.cells(3,row));					
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
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);


							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
