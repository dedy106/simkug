window.app_saku3_transaksi_yspt_sistem_fFormatFile = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_sistem_fFormatFile.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_sistem_fFormatFile";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Format File Upload", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[10,12,1000,430], childPage:["Data Format"]});						
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,
					colTitle:["Kode Form","Nama Form","Path File","Upload"],
					colWidth:[[3,2,1,0],[80,480,310,80]], 
					colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.rearrangeChild(10, 23);
		
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


			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_sistem_fFormatFile.extend(window.childForm);
window.app_saku3_transaksi_yspt_sistem_fFormatFile.implement({
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
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}	

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into sis_dok(no_bukti,no_gambar,nu,kode_menu,kode_lokasi) values "+
									"('DOKSYS','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}		

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
					this.doLoad();							
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},		
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Kode Form",sender,undefined, 
												  "select kode_form,nama_form   from m_form ",
												  "select count(kode_form) from m_form",
												  ["kode_form","nama_form"],"where",["Kode","Nama"],false);				
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
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}
						else system.info(this,result,"");

						this.fileUtil.deleteFiles(this.deletedFiles);
						this.uploadedFiles = "";
						this.deletedFiles = "";
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){	
		this.deleteFiles = [];
		this.listFiles = new arrayMap();										
					 	
		this.sgUpld.clear();
		this.deleteFiles = [];
		this.listFiles = new arrayMap();			
		var data = this.dbLib.getDataProvider("select a.kode_form,a.nama_form,b.no_gambar from m_form a inner join sis_dok b on a.kode_form = b.kode_menu where b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_form",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgUpld.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.listFiles.set(line.no_gambar,line.no_gambar); 
				this.sgUpld.appendData([line.kode_form, line.nama_form, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
			}
		} else this.sgUpld.clear(1);
	}
});