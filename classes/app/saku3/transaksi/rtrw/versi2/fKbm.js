window.app_saku3_transaksi_rtrw_versi2_fKbm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fKbm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fKbm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kendaraan Bermotor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,480], childPage:["Data KBM"]});
		
		this.cb_rumah = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"No Rumah", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_pemilik = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"Pemilik",readOnly:true, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,500,20],caption:"Alamat Pemilik",readOnly:true, tag:1});
		this.e_rt = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"RT - RW",readOnly:true, tag:1});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,2,995,352], childPage:["Detail KBM"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,345],colCount:9,tag:9,
				colTitle:["No Polisi","Jth Tempo STNK","ID Kartu","Jenis","Merk","Tipe","Nama Pemilik","Path Foto","Updload"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,150,200,100,100,80,150,100,100]],	
				columnReadOnly:[true,[7],[0,1,2,3,4,5,6]],		
				buttonStyle:[[1,3],[bsDate,bsAuto]], 				
				picklist:[[3],[new portalui_arrayMap({items:["MOTOR","MOBIL"]})]],checkItem:true,
				colFormat:[[8],[cfUpload]],
				change:[this,"doGridChange"],
				defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		this.sg2.setUploadParam([8],"uploadTo", "server/media/", "object","server/media/");		
		
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

			this.cb_rumah.setSQL("select a.kode_rumah, a.alamat from rt_rumah a inner join karyawan_pp b on a.rt=b.kode_pp and a.rw=b.kode_lokasi "+
								 "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","alamat"],false,["No Rumah","Alamat"],"and","Data Rumah",true);			
															
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fKbm.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fKbm.implement({
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sg2 && col == 8){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sg2.columns.get(8).param2 + data.tmpfile;
                this.sg2.cells(7,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from rt_kbm where kode_rumah='"+this.cb_rumah.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");;
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rt_kbm (kode_rumah,kode_lokasi,nu,id_kartu,no_polisi,tgl_stnk,jenis,merk,tipe,pemilik,tgl_input,nik_user,foto) values "+
						    			"('"+this.cb_rumah.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(6,i)+"',getdate(),'"+this.app._userLog+"','"+this.sg2.cells(8,i).tmpfile+"')");
							}
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from rt_kbm where kode_rumah='"+this.cb_rumah.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");;
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rt_kbm (kode_rumah,kode_lokasi,nu,id_kartu,no_polisi,tgl_stnk,jenis,merk,tipe,pemilik,tgl_input,nik_user,foto) values "+
						    			"('"+this.cb_rumah.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(6,i)+"',getdate(),'"+this.app._userLog+"','"+this.sg2.cells(8,i).tmpfile+"')");
							}
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from rt_kbm where kode_rumah='"+this.cb_rumah.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");;
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
				}
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
			if (sender == this.cb_rumah && this.cb_rumah.getText() != ""){
				var strSQL = "select b.nik+' | '+b.nama as pemilik, b.no_hp+' | '+b.alamat as alamat,'RT : '+a.rt+' / RW : '+a.rw as rtrw "+
							 "from rt_rumah a inner join rt_warga b on a.kode_pemilik=b.nik "+
							 "where a.kode_rumah='"+this.cb_rumah.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					this.e_pemilik.setText(line.pemilik);						
					this.e_alamat.setText(line.alamat);	
					this.e_rt.setText(line.rtrw.toUpperCase());						
				}


				this.sg2.clear();
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider("select * from rt_kbm where kode_rumah ='"+this.cb_rumah.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.foto,line.foto); 
						this.sg2.appendData([line.no_polisi, line.tgl_stnk,line.id_kartu,line.jenis,line.merk,line.tipe,line.pemilik,  line.foto, {filedest:line.foto, tmpfile:line.foto}]);
					}
				} else this.sg2.clear(1);


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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_rumah.getText()+")");	
							this.doChange(this.cb_rumah);													
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
	}
	
});