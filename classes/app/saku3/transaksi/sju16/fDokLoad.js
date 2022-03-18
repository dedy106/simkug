window.app_saku3_transaksi_sju16_fDokLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fDokLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fDokLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});
		this.c_jenis = new saiCB(this,{bound:[20,11,200,20],caption:"Modul",items:["PB","KB","MI","BIL","FEE PREMI","BYR PREMI"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"PP/Cabang",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_bukti = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"No Bukti",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,350], childPage:["File Dokumen"]});		
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
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);		
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

			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.c_periode.items.clear();
			var str = "select a.periode from ( "+
					  "select distinct periode from sju_pb_m where kode_lokasi='"+this.app._lokasi+"' "+	
					  "union "+				  
					  "select distinct periode from trans_m where form in ('KB','MI','BILL','FEE_PREMI','BYR_PREMI') and kode_lokasi='"+this.app._lokasi+"' "+	
					  ") a order by periode desc";
			var data = this.dbLib.getDataProvider(str,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_periode.addItem(i,line.periode);
				}
			} 

			this.c_periode.setText("");
			this.c_jenis.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fDokLoad.extend(window.childForm);
window.app_saku3_transaksi_sju16_fDokLoad.implement({	
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
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
						"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
						"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
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

					sql.add("delete from pbh_dok where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.c_jenis.getText() == "PB") var modul = "PBBAU";					
					if (this.c_jenis.getText() == "KB") var modul = "KB";					
					if (this.c_jenis.getText() == "MI") var modul = "MI";					
					if (this.c_jenis.getText() == "BIL") var modul = "BILL";					
					if (this.c_jenis.getText() == "FEE PREMI") var modul = "FEE";					
					if (this.c_jenis.getText() == "BYR PREMI") var modul = "BYRPREMI";
						
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.cb_bukti.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+modul+"','"+this.cb_bukti.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_bukti);
					this.sgUpld.clear(1); this.sgFile.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.cb_bukti.setText("");					
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
		if (sender == this.cb_pp && this.cb_pp.getText()!="") {
			if (this.c_jenis.getText() == "PB") 
				this.cb_bukti.setSQL("select a.no_pb,a.keterangan from sju_pb_m a where a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_pb","a.keterangan"],false,["No PB","Deskripsi"],"and","Data PB",true);			
			if (this.c_jenis.getText() == "KB") 
				this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a where form = 'KB' and a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
			if (this.c_jenis.getText() == "MI") 
				this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a where form = 'MI' and a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
			if (this.c_jenis.getText() == "BIL") 
				this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a where form = 'BILL' and a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
			if (this.c_jenis.getText() == "FEE PREMI") 
				this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a where form ='FEE_PREMI' and a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
			if (this.c_jenis.getText() == "BYR PREMI") 
				this.cb_bukti.setSQL("select a.no_bukti,a.keterangan from trans_m a where form = 'BYR_PREMI' and a.periode='"+this.c_periode.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_bukti","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);						
		}			

		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			this.sgUpld.clear(); this.sgFile.clear();							
			var data = this.dbLib.getDataProvider(
							"select b.kode_jenis,b.nama,a.no_gambar "+
							"from pbh_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sgFile.appendData([line.no_gambar,"HAPUS"]);
					this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
				}
			} else this.sgUpld.clear(1);
		}							
	},	
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
								"select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
								"select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
								["kode_jenis","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1){

							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_bukti.getText()+")","");
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