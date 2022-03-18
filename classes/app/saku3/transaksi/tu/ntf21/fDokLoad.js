window.app_saku3_transaksi_tu_ntf21_fDokLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fDokLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fDokLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.cb_rab = new portalui_saiCBBL(this,{bound:[20,13,250,20],caption:"No RAB",tag:1,multiSelection:false,change:[this,"doChange"]}); 				

		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Data Dokumen","Data RAB"]});			
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[0],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});

		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"PP/Unit", maxLength:50, tag:1,readOnly:true});					
		this.e_ppkelola = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,430,20],caption:"PP/Unit Kelola", maxLength:50, tag:1,readOnly:true});					
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,430,20],caption:"No Kontrak", maxLength:50, tag:1,readOnly:true});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1, readOnly:true});			
		this.e_pnj = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,430,20],caption:"Png. Jawab", maxLength:200, tag:1, readOnly:true});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_tgl1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Tgl Mulai", maxLength:200, tag:1,readOnly:true});			
		this.e_tgl2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Tgl Selesai", maxLength:200, tag:1,readOnly:true});	
		this.e_namacust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Customer", maxLength:200, tag:1, readOnly:true});			
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,430,20],caption:"Alamat", maxLength:200, tag:1, readOnly:true});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.cb_rab.setSQL("select no_rab,keterangan from prb_rab_m a where kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fDokLoad.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fDokLoad.implement({
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
							"select kode_jenis, nama  from prb_dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
							"select count(*) from prb_dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
							["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					
					sql.add("delete from prb_rab_dok where no_ref ='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}
							ix=ix+1;
							sql.add("insert into prb_rab_dok(no_rab,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.cb_rab.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','RAB','"+this.cb_rab.getText()+"')");	
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_rab);
					this.sgUpld.clear(1); this.sgFile.clear(1);				
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){					
		if (sender == this.cb_rab && this.cb_rab.getText()!="") {			
			strSQL = "select e.nik+' - '+e.nama as pnj ,a.keterangan,a.no_dok,c.kode_pp+' - '+c.nama as pp,d.kode_pp+' - '+d.nama as pp_kelola,a.nilai,b.nama as cust,b.alamat,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai "+								 
					 "from prb_rab_m a inner join prb_rab_cust b on a.no_rab=b.no_rab and a.kode_lokasi=b.kode_lokasi "+								 
					 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					 "inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					 "inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+
					 "where a.no_rab ='"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";											 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_dok.setText(line.no_dok);	
					this.e_nama.setText(line.keterangan);																	
					this.e_pp.setText(line.pp);
					this.e_ppkelola.setText(line.pp_kelola);
					this.e_pnj.setText(line.pnj);
					this.e_tgl1.setText(line.tgl_mulai);
					this.e_tgl2.setText(line.tgl_selesai);					
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_namacust.setText(line.cust);
					this.e_alamat.setText(line.alamat);							
					
					this.sgUpld.clear(); this.sgFile.clear();							
					var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar "+
								"from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_ref = '"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;					
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sgFile.appendData([line.no_gambar,"HAPUS"]);
							this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
						}
					} else this.sgUpld.clear(1);

				}							
			}	

		}					
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_rab.getText()+")","");
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