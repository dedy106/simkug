window.app_budget_transaksi_fUploadTpkk = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fUploadTpkk.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fUploadTpkk";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data TPKK Eksisting", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],caption:"Thn Angg[n-1] + Bln",tipeText:ttAngka,maxLength:6});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Keterangan",maxLength:150});			
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,200, 20],caption:"Dibuat Oleh",readOnly:true,btnClick:[this,"doFindBtnClick"]});
								
		this.bUpload = new portalui_uploader(this,{bound:[820,188,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,360],caption:"Data TPKK Eksisting"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,300],colCount:8,
				colTitle:"Kamar Periksa, Nama, Tgl Operasi, Status, Kode Band, Kode Loker, Kode Kota, Jumlah Dokter",
				colWidth:[[0,1,2,3,4,5,6,7],[100,240,60,100,80,80,80,100]], 
				colFormat:[[2,6],[cfDate,cfNilai]], 
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,335,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.eTahun.setText('2010');
		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fUploadTpkk.extend(window.portalui_childForm);
window.app_budget_transaksi_fUploadTpkk.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			if (result) {				
				this.dataUpload = data;
				this.sg1.setData(data,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		this.sg1.selectPage(page);		
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
					try{
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						var line;												
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];
                            sql.add("insert into agg_dokter (kode_dokter, kode_lokasi,  kode_band, kode_loker, kode_kota, nama,  status,vol,tahun,jenis_agg,tgl_operasi) values "+ 
									"('"+line.kode_dokter+"','"+line.app._lokasi+"','"+line.kode_band+"','"+line.kode_loker+"','"+line.kode_kota+"','"+line.nama+"','"+line.status+"','"+line.vol+"','"+line.tahun+"','E','"+line.tgl_operasi+"')");					 
						}
						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
		this.dp_tgl1.setFocus();
	},
	doSelectDate: function(sender, y, m, d){						
		this.ed_period.setText(y+( m < 10 ? "0":"")+m);		
		this.bGen.click();
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ed_period.setText(thn+"12");
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gaji_load_pdpt_m","no_bukti","UPL/"+this.ed_period.getText().substr(2,4),"00000"));
		if (sender == this.bLoad){
			try{
				var dataProvider = this.dbLib.getDataProvider("select kode_dokter, nama from agg_dokter where kode_lokasi = '"+this.app._lokasi+"'  and tahun = '"+this.eTahun.getText()+"' ",true);
				if (typeof dataProvider != "string"){
					var line,data = [];
					this.sg1.clear();				
					for (var i in dataProvider.rs.rows){
						line = dataProvider.rs.rows[i];
						data = [line.nik, line.nama];
						for (var c in this.colTitle) data.push(0);					
						this.sg1.appendData(data);
					}
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this,"Data Karyawan",sender, undefined,
			"select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			"select count(*) from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
			["nik","nama"],"and",["NIK","Nama"],false);
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
