window.app_budget_transaksi_fUploadGaji = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fUploadGaji.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fUploadGaji";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Karyawan Eksisting", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],caption:"Periode CutOff",tipeText:ttAngka,maxLength:6});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   										
		this.bUpload = new portalui_uploader(this,{bound:[820,78,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,360],caption:"Data Karyawan Eksisting"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,300],colCount:9,
				colTitle:"NIK, Nama Karyawan, Tgl Lahir, Tgl Masuk, Status, Kode Band, Kode Jab, Kode PP, Kode Kota",
				colWidth:[[0,1,2,3,4,5,6,7,8],[80,200,80,80,80,80,80,80,80]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,335,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}

		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fUploadGaji.extend(window.portalui_childForm);
window.app_budget_transaksi_fUploadGaji.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				//this.sg1.setData(data,true,20);
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		//this.sg1.selectPage(page);		
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		//NIK, Nama Karyawan, Tgl Lahir, Tgl Masuk, Status, Kode Band, Kode Jab, Kode PP, Kode Kota
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.nik, line.nama, line.tgl_lahir, line.tgl_masuk, line.status_org, line.kode_band, line.kode_jab, line.kode_pp, line.kode_kota]);
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
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
						return false;
					}
					try{
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti","UPLKR"+this.eTahun.getText().substr(2,2)+'.',"0000"));
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						sql.add("delete from agg_karyawan where tahun = '"+this.eTahun.getText()+"' and jenis_agg = 'E' and kode_lokasi = '"+this.app._lokasi+"' ");						
						var line;												
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
                            sql.add("insert into agg_karyawan(nik,kode_lokasi,kode_jab,kode_band,kode_kota,nama,tgl_lahir,tgl_masuk,status_org,status,tahun,kode_pp,jenis_agg) values "+ 
									"('"+line.nik+"','"+this.app._lokasi+"','"+line.kode_jab+"','"+line.kode_band+"','"+line.kode_kota+"','"+line.nama+"','"+line.tgl_lahir+"','"+line.tgl_masuk+"','"+line.status_org+"','-','"+this.eTahun.getText()+"','"+line.kode_pp+"','E')");					 
						}
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doSelectDate: function(sender, y, m, d){						
		this.ed_period.setText(y+( m < 10 ? "0":"")+m);		
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ed_period.setText(thn+"12");
		var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.eTahun.getText()+"'",true);
		if (typeof data == "object"){
			this.prog = data.rs.rows[0].progress;
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti","UPLKR"+this.eTahun.getText().substr(2,2)+'.',"0000"));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
