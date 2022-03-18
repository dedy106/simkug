window.app_saku2_transaksi_yks_fLoadPesertaAdd = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fLoadPesertaAdd.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_fLoadPesertaAdd";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Peserta Tambahan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_data = new saiCBBL(this,{bound:[20,10,222,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});		
		this.bUpload = new portalui_uploader(this,{bound:[520,10,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,600,384],caption:"Data Peserta"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:4,
				colTitle:["NIK","Nama","Band","Loker"],
				colWidth:[[3,2,1,0],[200,50,200,80]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_yks_fLoadPesertaAdd.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_fLoadPesertaAdd.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.nik,line.nama,line.band,line.loker]);
		}
		this.sg1.setNoUrut(start);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :		
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							var line;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];
								sql.add("insert into yk_peserta_d(no_load,kode_lokasi,nik,nama,band,loker) values "+
										"	('"+this.cb_data.getText()+"','"+this.app._lokasi+"','"+line.nik+"','"+line.nama+"','"+line.band+"','"+line.loker+"')");																
								/*
								sql.add("insert into z_hrpendi(nik,nama,band,loker) values "+
										"	('"+line.nik+"','"+line.nama+"','"+line.band+"','"+line.loker+"')");								
								*/
							}							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},	
	doClick: function(sender){		
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_data.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
