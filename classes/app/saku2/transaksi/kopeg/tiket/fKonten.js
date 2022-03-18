window.app_saku2_transaksi_kopeg_tiket_fKonten = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_tiket_fKonten.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_tiket_fKonten";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Konten", 0);	
		
		//uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;uploader;util_file;image;tinymceCtrl;checkBox;");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,500], childPage:["Daftar Konten","Data Konten"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["No Konten","Kelompok","Tanggal","Judul","Gambar","File"],
					colWidth:[[5,4,3,2,1,0],[100,100,400,110,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		//this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		//this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Konten",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_aktif = new portalui_checkBox(this.pc1.childPage[1],{bound:[270,12,100,20],caption:"Status Aktif", selected:true});
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Kelompok", multiSelection:false, maxLength:10, tag:1});
		this.e_judul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,600,20],caption:"Judul", maxLength:200});		
		this.e_gambar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"Gambar", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[420,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,400,20],caption:"File", readOnly:true, maxLength:100, tag:9});		
		this.uploader2 = new uploader(this.pc1.childPage[1],{bound:[420,17,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad2"]});				
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.mDesk = new tinymceCtrl(this.pc1.childPage[1],{bound:[20,10,this.pc1.width-40,this.pc1.height-160], withForm:false});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.fileUtil = new util_file();
			this.rootDir = this.app._rootDir;
			this.cb_klp.setSQL("select kode_klp, nama from sai_klpkonten where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);	
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
			this.cb_buat.setText(this.app._userLog);
			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_tiket_fKonten.extend(window.childForm);
window.app_saku2_transaksi_kopeg_tiket_fKonten.implement({
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
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					
					var sql = new server_util_arrayList();					
					sql.add("insert into sai_konten(no_konten,kode_lokasi,periode,tanggal,kode_klp,nik_buat,keterangan,judul,file_gambar,file_dok,tgl_input,flag_aktif) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',dbo.fnPeriode(getdate()),getdate(),'"+this.cb_klp.getText()+"','"+this.cb_buat.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_judul.getText()+"','"+this.e_gambar.getText()+"','"+this.e_file.getText()+"',getdate(),'"+flag_aktif+"')");

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
					var periode="201309";
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					sql.add("delete from sai_konten where no_konten = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("insert into sai_konten(no_konten,kode_lokasi,periode,tanggal,kode_klp,nik_buat,keterangan,judul,file_gambar,file_dok,tgl_input,flag_aktif) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+periode+"',getdate(),'"+this.cb_klp.getText()+"','"+this.cb_buat.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_judul.getText()+"','"+this.e_gambar.getText()+"','"+this.e_file.getText()+"',getdate(),'"+flag_aktif+"')");

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
					sql.add("delete from sai_konten where no_konten = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sai_konten","no_konten",this.app._lokasi+"-KTN.","000"));
		setTipeButton(tbSimpan);
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
				var strSQL = "select nama from sai_klpkonten where kode_klp ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);												
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				var sql="select a.no_konten,a.kode_klp,b.nama as nama_klp,a.judul,a.keterangan,a.tanggal,a.file_gambar,a.file_dok,a.flag_aktif,a.nik_buat,c.nama as nama_buat "+					   
					   "from sai_konten a "+
					   "inner join sai_klpkonten b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+	
					   "inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_konten='"+this.sg1.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						if (line.flag_aktif=="1")
						{
							this.cb_aktif.setSelected(true);
						}
						this.e_nb.setText(line.no_konten);
						this.e_judul.setText(line.judul);
						this.cb_klp.setText(line.kode_klp,line.nama_klp);
						this.e_gambar.setText(line.file_gambar);
						this.e_file.setText(line.file_dok);
						this.cb_buat.setText(line.nik_buat,line.nama_buat);
						this.mDesk.setCode(urldecode(line.keterangan));
					} 
					setTipeButton(tbUbahHapus);
				}				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");		
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_gambar.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							if (this.fileBfr && this.dataUpload2) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							if (this.dataUpload2) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload2.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload2.filedest);

							//this.app._mainForm.bClear.click();
							this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb.getText());
							this.doLoad();
							this.pc1.setActivePage(this.pc1.childPage[0]);
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_konten,b.nama as nama_klp,a.tanggal,a.judul,a.file_gambar,a.file_dok "+
					"from sai_konten a "+
					"inner join sai_klpkonten b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
					" where a.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal desc";	
			
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_konten,line.nama_klp,line.tanggal,line.judul,line.file_gambar,line.file_dok]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_gambar.setText(data.filedest);
			this.dataUpload = data;
			
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad2:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload2 = data;
			if (this.dataUpload2.temporary !== undefined) this.dataUpload2.temporary += ";";
			else this.dataUpload2.temporary = "";
			this.dataUpload2.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload2.tmpfile;
		}catch(e){
			alert(e);
		}
	}
});