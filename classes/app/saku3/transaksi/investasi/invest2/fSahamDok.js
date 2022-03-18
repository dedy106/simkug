window.app_saku3_transaksi_investasi_invest2_fSahamDok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fSahamDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fSahamDok";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Dokumen Saham", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_periode = new saiCB(this,{bound:[20,17,200,20],caption:"Periode",readOnly:true,tag:2});
		this.c_modul = new saiCB(this,{bound:[20,18,200,20],caption:"Modul",items:["SHMBELI","SHMJUAL","SHMSPI","SHMDEV","SHMBONUS","SHMSPLIT","SHMREV","JPINDAH"], readOnly:true,tag:2});
		this.bTampil = new button(this,{bound:[235,18,80,18],caption:"Tampil",click:[this,"doLoad"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,415], childPage:["List Transaksi","Detail"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,				
				colTitle:["No Bukti","Keterangan","Tanggal","Nilai"],
				colWidth:[[3,2,1,0],[100,80,400,100]],
				columnReadOnly:[true,[0,1,2,3],[]],
				colFormat:[[3],[cfNilai]],
				dblClick:[this,"doDoubleClick"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.e_nobukti = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No Bukti", readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,450,20],caption:"Keterangan", readOnly:true});				
		this.e_tanggal = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"Tanggal", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_file = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:8});		
		this.uploader = new uploader(this.pc2.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc2.childPage[1],{bound:[580,15,80,18],caption:"Download File",click:[this,"doLihat"]});			
		
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
			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' union select distinct periode from inv_shmbeli_m order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fSahamDok.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fSahamDok.implement({
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
			this.e_ket.setText(sender.cells(1,row));
			this.e_tanggal.setText(sender.cells(1,row));
			this.e_nilai.setText(sender.cells(2,row));
						
			var data = this.dbLib.getDataProvider("select isnull(no_gambar,'') as no_gambar   "+
					   "from inv_dok "+					   
					   "where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = '"+this.c_modul.getText()+"' ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_file.setText(line.no_gambar);
					this.fileBfr = line.no_gambar;
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
					sql.add("delete from inv_dok where no_bukti = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into inv_dok(no_bukti,modul,no_gambar,kode_lokasi) values ('"+this.e_nobukti.getText()+"','"+this.c_modul.getText()+"','"+this.e_file.getText()+"','"+this.app._lokasi+"')");					
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
		if (this.c_periode.getText() != "") {			
			if (this.c_modul.getText()=="SHMBELI") {
				var strSQL = "select a.no_shmbeli,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai "+
							 "from inv_shmbeli_m a "+
							 "where a.modul='"+this.c_modul.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.periode='"+this.c_periode.getText()+"' order by a.no_shmbeli desc";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_shmbeli,line.keterangan,line.tanggal,floatToNilai(line.nilai)]);
					}				
				}
				else this.sg.clear(1);
			}
			
			if (this.c_modul.getText()=="SHMJUAL") {
				var strSQL = "select a.no_shmbeli,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai "+
							 "from inv_shmbeli_m a "+
							 "where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode='"+this.c_periode.getText()+"' order by a.no_shmbeli desc";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_shmbeli,line.keterangan,line.tanggal,floatToNilai(line.nilai)]);
					}				
				}
				else this.sg.clear(1);
			}
			
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
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