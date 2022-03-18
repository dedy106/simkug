window.app_hris_konten_fKontenE = function(owner)
{
	if (owner)
	{
		window.app_hris_konten_fKontenE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_konten_fKontenE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Konten : Input", 0);	
		
		uses("saiCBBL;saiCB;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;uploader;util_file;image;tinymceCtrl;checkBox;");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Konten", multiSelection:false,rightLabelVisible:false,maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.cb_aktif = new portalui_checkBox(this,{bound:[270,12,100,20],caption:"Status Aktif", selected:false});
		this.pc1 = new pageControl(this,{bound:[20,13,800, 400], childPage:["Konten","Detail Konten"]}); 									    
		this.cb_klp = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Kelompok", multiSelection:false, maxLength:10, tag:1});
		this.e_judul = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,600,20],caption:"Judul", maxLength:200});		
		this.e_gambar = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,400,20],caption:"Gambar", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[420,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,400,20],caption:"File", readOnly:true, maxLength:100, tag:9});		
		this.uploader2 = new uploader(this.pc1.childPage[0],{bound:[420,17,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad2"]});				

		this.cb_loker = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.mDesk = new tinymceCtrl(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		
		this.rearrangeChild(10, 25);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.img = new image(this.pc1.childPage[0],{bound:[20,180,150,200]});		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.fileUtil = new util_file();
			this.rootDir = this.app._rootDir;
			this.e_nb.setSQL("select no_konten, judul from gr_konten where  kode_lokasi='"+this.app._lokasi+"'",["no_konten","judul"],false,["No Konten","Keterangan"],"and","Data Konten",true);					
			this.cb_klp.setSQL("select kode_klp, nama from gr_klpkonten where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);	
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_loker.setText(this.app._kodeLoker);
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_konten_fKontenE.extend(window.childForm);
window.app_hris_konten_fKontenE.implement({
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					var flag_aktif="0";
					if (this.cb_aktif.isSelected())
					{
						flag_aktif="1";
					}
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_konten where no_konten='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into gr_konten(no_konten,kode_lokasi,periode,tanggal,kode_loker,kode_klp,nik_buat,nik_app,keterangan,judul,file_gambar,file_dok,tgl_input,nik_user,flag_aktif) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.e_judul.getText()+"','"+this.e_gambar.getText()+"','"+this.e_file.getText()+"',getdate(),'"+this.app._userLog+"','"+flag_aktif+"')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbSimpan);
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from gr_konten where no_konten='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		//this.e_nb.setText("");
	},
	
	doChange:function(sender){
		if (this.cb_loker.getText()!="") {
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select a.kode_klp,b.nama as nama_klp,a.judul,a.keterangan,a.tanggal,a.file_gambar,a.file_dok,a.flag_aktif,a.nik_buat,a.nik_app,e.nama as nama_buat,f.nama as nama_app "+					   
					   "from gr_konten a "+
					   "inner join gr_klpkonten b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+	  
					   "inner join gr_karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "inner join gr_karyawan f on a.nik_app=f.nik and a.kode_lokasi=f.kode_lokasi "+		
					   "where a.no_konten='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){			
					if (line.flag_aktif=="1")
					{
						this.cb_aktif.setSelected(true);
					}
					this.dp_d1.setText(line.tanggal);									
					this.e_judul.setText(line.judul);
					this.cb_klp.setText(line.kode_klp,line.nama_klp);
					this.e_gambar.setText(line.file_gambar);
					this.e_file.setText(line.file_dok);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.mDesk.setCode(urldecode(line.keterangan));
				} 
				setTipeButton(tbUbahHapus);
			}	
				
		}
		if (this.cb_loker.getText()!="") {			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_konten","no_konten",this.app._lokasi+"-KTN"+this.e_periode.getText().substr(2,4)+".","000"));
		this.dp_d2.setFocus();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{	
							
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_gambar.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							if (this.fileBfr && this.dataUpload2) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}		
							if (this.dataUpload2) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload2.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload2.filedest);

							system.info(this,"Data Sukses Tersimpan",".");
							
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
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_gambar.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
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