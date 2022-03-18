window.app_saku2_transaksi_kopeg_logistik_fDokLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fDokLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fDokLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kelengkapan Dokumen: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.c_proses = new saiCB(this,{bound:[20,22,300,20],caption:"Proses",items:["PR - Purchase Request","PO - Purchase Order","GR - Good Receive","BA - Berita Acara","FL - Finalisasi"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this,{bound:[20,17,300,20],caption:"No Bukti", multiSelection:false, tag:0,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[10,18,900,400], childPage:["Dokumen"]});
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClick"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
				
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_proses.setText("");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_logistik_fDokLoad.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fDokLoad.implement({
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
					
					if (this.c_proses.getText().substr(0,2) == "PR") {var namaTabel = "log_pesan_dok"; var noBukti = "no_pesan";}
					if (this.c_proses.getText().substr(0,2) == "PO") {var namaTabel = "log_po_dok"; var noBukti = "no_po";}
					if (this.c_proses.getText().substr(0,2) == "GR") {var namaTabel = "log_terima_dok"; var noBukti = "no_terima";}
					if (this.c_proses.getText().substr(0,2) == "BA") {var namaTabel = "log_ba_dok"; var noBukti = "no_ba";}
					if (this.c_proses.getText().substr(0,2) == "FL") {var namaTabel = "log_ba_dok"; var noBukti = "no_ba";}					
			
					sql.add("delete from "+namaTabel+" where "+noBukti+" ='"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into "+namaTabel+"("+noBukti+",no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_bukti.getText()+"','"+this.sgUpld.cells(3,i).filedest+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}	
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sgUpld.clear(1); 
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
		if (sender == this.c_proses && this.c_proses.getText()!= "") {
			this.sgUpld.clear(1);
			if (this.c_proses.getText().substr(0,2) == "PR") this.cb_bukti.setSQL("select no_pesan, keterangan from log_pesan_m where kode_lokasi='"+this.app._lokasi+"'",["no_pesan","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
			if (this.c_proses.getText().substr(0,2) == "PO") this.cb_bukti.setSQL("select no_po, keterangan from log_po_m where kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
			if (this.c_proses.getText().substr(0,2) == "GR") this.cb_bukti.setSQL("select no_terima, keterangan from log_terima_m where kode_lokasi='"+this.app._lokasi+"'",["no_terima","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
			if (this.c_proses.getText().substr(0,2) == "BA") this.cb_bukti.setSQL("select no_ba, keterangan from log_ba_m where modul <> 'MTN' and kode_lokasi='"+this.app._lokasi+"'",["no_ba","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
			if (this.c_proses.getText().substr(0,2) == "FL") this.cb_bukti.setSQL("select no_ba, keterangan from log_ba_m where modul = 'MTN' and kode_lokasi='"+this.app._lokasi+"'",["no_ba","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
		}
		if (sender == this.cb_bukti && this.cb_bukti.getText()!= "") {
			if (this.c_proses.getText().substr(0,2) == "PR") {
				var strSQL = "select b.kode_jenis,b.nama,a.no_gambar from log_pesan_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pesan = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			}
			if (this.c_proses.getText().substr(0,2) == "PO") {
				var strSQL = "select b.kode_jenis,b.nama,a.no_gambar from log_po_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_po = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			}
			if (this.c_proses.getText().substr(0,2) == "GR") {
				var strSQL = "select b.kode_jenis,b.nama,a.no_gambar from log_terima_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_terima = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			}
			if (this.c_proses.getText().substr(0,2) == "BA" || this.c_proses.getText().substr(0,2) == "FL") {
				var strSQL = "select b.kode_jenis,b.nama,a.no_gambar from log_ba_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ba = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			}				 
			this.sgUpld.clear(1);
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.listFiles.set(line.no_gambar,line.no_gambar); 
					this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
				}
			} else this.sgUpld.clear(1);						
		}		
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_bukti.getText()+")","");
							this.app._mainForm.bClear.click();							
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");	    			
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doEllipsClick: function(sender, col, row){
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
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.filedest);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});