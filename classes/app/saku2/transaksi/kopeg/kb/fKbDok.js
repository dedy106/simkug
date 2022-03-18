window.app_saku2_transaksi_kopeg_kb_fKbDok = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kb_fKbDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kb_fKbDok";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Dokumen", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_periode = new saiCB(this,{bound:[20,22,202,20],caption:"Periode",readOnly:true,tag:9,change:[this,"doChange"]});		
		this.pc1 = new pageControl(this,{bound:[20,12,900,440], childPage:["Data Dokumen","Upload Data"]});
		this.sgFile = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:5,click:[this,"doSgBtnClick"],
		            colTitle:["Kode Akun","Nama","Dokumen","File"],colWidth:[[3,2,1,0],[80,350,300,80]],readOnly:true,autoAppend:false,defaultRow:1});						
		this.sgnFile = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgFile});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kode Akun","Nama","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}			
			this.c_periode.setText("");
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kb_fKbDok.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kb_fKbDok.implement({
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
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into kas_dok(periode,no_file,nu,kode_akun,kode_bank,kode_lokasi)values('"+this.c_periode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','-','"+this.app._lokasi+"')");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sgUpld.clear(1); this.doChange(this.c_periode);
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
		if (sender== this.c_periode && this.c_periode.getText()!="") {
			var data = this.dbLib.getDataProvider("select b.kode_akun,b.nama,a.no_file from kas_dok a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.periode='"+this.c_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgFile.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgFile.appendData([line.kode_akun,line.nama,line.no_file,"Open"]);
				}
			} else this.sgFile.clear(1);			
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			window.open("server/media/"+this.sgFile.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
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
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(*) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
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
    }
});