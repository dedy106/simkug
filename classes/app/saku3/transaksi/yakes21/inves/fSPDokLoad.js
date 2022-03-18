window.app_saku3_transaksi_yakes21_inves_fSPDokLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fSPDokLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fSPDokLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		

		
		this.c_periode = new saiCB(this,{bound:[20,12,200,20],caption:"Periode",tag:2,change:[this,"doChange"]});
		this.c_form = new saiCB(this,{bound:[20,20,200,20],caption:"Transaksi SP",items:["BELI","JUAL","DEVIDEN"], readOnly:true,tag:2,change:[this,"doChange"]});					

		this.pc1 = new pageControl(this,{bound:[10,18,1000,410], childPage:["Data SP","Data Dokumen"]});				
		this.cb_bukti = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,240,20],caption:"No Bukti",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,450,20],caption:"Keterangan", readOnly:true});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
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

			this.c_periode.items.clear();
			var str = "select periode from ( "+
					  "select distinct periode from inv_spbeli_m where kode_lokasi='"+this.app._lokasi+"' "+
					  "union "+
					  "select distinct periode from inv_spjual_m where kode_lokasi='"+this.app._lokasi+"' "+
					  "union "+
					  "select distinct periode from inv_spdev_m where kode_lokasi='"+this.app._lokasi+"' "+
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
			this.c_form.setText("");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fSPDokLoad.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fSPDokLoad.implement({
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
						"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SP'",
						"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SP'",
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
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {		
							var temu = false;					
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
									temu = true;
								}
							}							
							if (!temu) sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.cb_bukti.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SP','"+this.cb_bukti.getText()+"')");															
						}	
					}	

					for (var i=0;i < this.sgFile.getRowCount();i++){
						if (this.sgFile.cells(1,i) == "HAPUS") {
							sql.add("delete from inv_dok where no_gambar='"+this.sgFile.cells(0,i)+"' and no_ref='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
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
		try {

			if ((sender == this.c_periode||sender == this.c_form) && this.c_periode.getText()!="" && this.c_form.getText()!="") {
				if (this.c_form.getText() == "BELI") this.cb_bukti.setSQL("select no_spbeli,keterangan from inv_spbeli_m a where periode = '"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spbeli","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Transaksi",true);
				if (this.c_form.getText() == "JUAL") this.cb_bukti.setSQL("select no_spjual,keterangan from inv_spjual_m a where periode = '"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Transaksi",true);
				if (this.c_form.getText() == "DEVIDEN") this.cb_bukti.setSQL("select no_spdev,keterangan from inv_spdev_m a where periode = '"+this.c_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spdev","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Transaksi",true);
			}

			if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
				if (this.c_form.getText() == "BELI") {
					var strSQL = "select a.keterangan "+
								"from inv_spbeli_m a "+
								"where a.no_spbeli= '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.e_ket.setText(line.keterangan);						
						}
					}	
				}
				if (this.c_form.getText() == "JUAL") {
					var strSQL = "select a.keterangan "+
								"from inv_spjual_m a "+
								"where a.no_spjual= '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.e_ket.setText(line.keterangan);						
						}
					}	
				}if (this.c_form.getText() == "DEVIDEN") {
					var strSQL = "select a.keterangan "+
								"from inv_spdev_m a "+
								"where a.no_spdev= '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.e_ket.setText(line.keterangan);						
						}
					}	
				}

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from inv_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ref = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
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
		catch{
			alert(e);
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

							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_bukti.getText()+")","");
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