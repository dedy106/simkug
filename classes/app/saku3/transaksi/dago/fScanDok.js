window.app_saku3_transaksi_dago_fScanDok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fScanDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fScanDok";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Dokumen", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.cb_peserta = new saiCBBL(this,{bound:[20,11,220,20],caption:"No Jamaah", maxLength:20, multiSelection:false, tag:2});						
		this.bTampil = new button(this,{bound:[120,18,80,18],caption:"Tampil",click:[this,"doLoad"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,415], childPage:["List Data","Detail"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,				
				colTitle:["No Reg","Alamat","Paket","Jadwal"],
				colWidth:[[3,2,1,0],[100,300,400,100]],
				columnReadOnly:[true,[0,1,2,3],[]],
				dblClick:[this,"doDoubleClick"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.e_nobukti = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No Reg", readOnly:true});				
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,450,20],caption:"Jamaah", readOnly:true});				
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,12,450,20],caption:"Alamat", readOnly:true});				
		this.e_paket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,450,20],caption:"Paket", readOnly:true});				
		this.e_tanggal = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,17,200,20],caption:"Jadwal", tag:1, readOnly:true});						
		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,100,18]}); 
		this.cb_jenis = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"Jenis Dokumen", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_jenis = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,17,200,20],caption:"Tipe Dokumen", readOnly:true,tag:1});

		this.e_file = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:8});		
		this.uploader = new uploader(this.pc2.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc2.childPage[1],{bound:[580,15,80,18],caption:"Download File",click:[this,"doLihat"]});			
		
		this.sg5 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,240],colCount:5,tag:9,
					colTitle:["Kode Dok","Nama","Jenis","Tgl_terima","File"],
					colWidth:[[4,3,2,1,0],[300,100,100,250,100]],
					readOnly:true,
					autoAppend:false,defaultRow:1 });
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.rootDir = this.app._rootDir;
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_peserta.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Jamaah","Nama"],"and","Data Jamaah",false);
			this.cb_jenis.setSQL("select no_dokumen, deskripsi from dgw_dok where kode_lokasi='"+this.app._lokasi+"' ",["no_dokumen","deskripsi"],false,["Kode","Nama"],"and","Jenis Dokumen",false);
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fScanDok.extend(window.childForm);
window.app_saku3_transaksi_dago_fScanDok.implement({
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
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
	doDoubleClick: function(sender,col,row) {		
		try{
			this.pc2.setActivePage(this.pc2.childPage[1]);			
			this.e_nobukti.setText(sender.cells(0,row));
			this.e_nama.setText(this.cb_peserta.getText() + ' - ' + this.cb_peserta.rightLabelCaption);
			this.e_tanggal.setText(sender.cells(3,row));
			this.e_alamat.setText(sender.cells(1,row));
			this.e_paket.setText(sender.cells(2,row));


			var strSQL = "select a.no_dokumen,a.deskripsi,a.jenis,isnull(convert(varchar,b.tgl_terima,111),'-') as tgl_terima,isnull(c.no_gambar,'-') as fileaddres "+
						 "from dgw_dok a "+
						 "left join dgw_reg_dok b on a.no_dokumen=b.no_dok and b.no_reg='"+this.e_nobukti.getText()+"' "+
						 "left join dgw_scan c on a.no_dokumen=c.modul and c.no_bukti ='"+this.e_nobukti.getText()+"' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_dokumen";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg5.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg5.appendData([line.no_dokumen,line.deskripsi,line.jenis,line.tgl_terima,line.fileaddres]);
				}
			}	
		}
		catch(e) {alert(e);}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dgw_scan where modul='"+this.cb_jenis.getText()+"' and no_bukti = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into dgw_scan(no_bukti,modul,no_gambar,kode_lokasi) values ('"+this.e_nobukti.getText()+"','"+this.cb_jenis.getText()+"','"+this.e_file.getText()+"','"+this.app._lokasi+"')");					
					sql.add("update dgw_reg_dok set tgl_terima='"+this.dp_d1.getDateString()+"' where no_reg='"+this.e_nobukti.getText()+"' and no_dok='"+this.cb_jenis.getText()+"' "); 					
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);					
					this.sg.clear(1); 
					this.sg5.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doLoad:function(sender){		
		if (this.cb_peserta.getText() != "") {			
			var strSQL = "select a.no_reg,b.alamat,c.nama as nama_paket,convert(varchar,d.tgl_berangkat,103) as tgl "+
						 "from dgw_reg a inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
						 "				 inner join dgw_paket c on a.no_paket=c.no_paket and a.kode_lokasi=c.kode_lokasi "+
						 "				 inner join dgw_jadwal d on a.no_paket=d.no_paket and a.no_jadwal=d.no_jadwal and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_peserta='"+this.cb_peserta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_reg";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_reg,line.alamat,line.nama_paket,line.tgl]);
				}				
			}
			else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Data tidak valid.","Jamaah harus diisi.");
		}
	},	
	doChange: function(sender){
		try{
			if (this.cb_jenis.getText() != ""){
				var strSQL = "select jenis from dgw_dok where no_dokumen ='"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jenis.setText(line.jenis);																							
					}
				}


				var data = this.dbLib.getDataProvider("select isnull(no_gambar,'') as no_gambar   "+
						"from dgw_scan "+					   
						"where modul='"+this.cb_jenis.getText()+"' and no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_file.setText(line.no_gambar);
						this.fileBfr = line.no_gambar;
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
						if (result.toLowerCase().search("error") == -1) {
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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