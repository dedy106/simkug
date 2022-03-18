window.app_budget_transaksi_fUploadTB = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fUploadTB.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fUploadTB";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Data TB", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],caption:"Thn Realisasi",tipeText: ttAngka,maxLength:6});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,122,500,20],caption:"Keterangan",maxLength:150});			
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,200, 20],caption:"Dibuat Oleh",readOnly:true,btnClick:[this,"doFindBtnClick"]});
								
		this.bUpload = new portalui_uploader(this,{bound:[820,188,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,360],caption:"Data Trial Balance"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,300],colCount:3,colFormat:[[2],[cfNilai]],
				colTitle:"Kode Akun, Nama, Saldo Akhir",colWidth:[[0,1,2],[80,350,100]],
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
		this.dbLib.getDataProviderA("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ");			
	}
};
window.app_budget_transaksi_fUploadTB.extend(window.portalui_childForm);
window.app_budget_transaksi_fUploadTB.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				//this.sg1.setData(data,true,20);
				var total = 0, line;
				for (var i in data.rows){
					line = data.rows[i];
					total += parseFloat(line.saldo_akhir);
				}
				alert(total);
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
		//this.sg1.selectPage(page);		
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();		
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			var nama = this.dataAkun.get(line.kode_akun);
			this.sg1.appendData([line.kode_akun, nama, floatToNilai(line.saldo_akhir)]);
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
					try{
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						var line;							
						var dc,tgl = this.ed_period.getText().substr(0,4) +"-"+this.ed_period.getText().substr(4,2)+"-01";					
						sql.add("delete from agg_gldt where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.ed_period.getText()+"' ");
						for (var i in this.dataUpload.rows){
							line = this.dataUpload.rows[i];							
							dc = parseInt(line.saldo_akhir) < 0 ? "C":"D";
                            sql.add("insert into agg_gldt (no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan, kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user  )values"+
								" ('"+this.ed_nb.getText()+"','"+i+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"', '"+tgl+"','"+line.kode_akun+"','"+(dc)+"',"+(Math.abs(parseFloat(line.saldo_akhir)))+",'"+this.ed_ket.getText()+"','-','-','-','-','-','-','-','"+this.cb_setuju.getText()+"','-','-','"+this.ed_period.getText()+"','IDR','1','1', now(), '"+this.app._userlog+"')");	
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
		this.bGen.click();
	},
	doChange: function(sender)	{
		var thn = parseFloat(this.eTahun.getText()) - 1;
		this.ed_period.setText(thn+"12");
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gldt","no_bukti","UPL/"+this.ed_period.getText().substr(2,4),"00000"));
		if (sender == this.bLoad){
			try{
				var dataProvider = this.dbLib.getDataProvider("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'  ",true);
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
				case "getDataProvider" :
					result = JSON.parse(result);
					this.dataAkun = new arrayMap();
					var line;
					for (var i in result.rs.rows){
						line = result.rs.rows[i];
						this.dataAkun.set(line.kode_akun, line.nama);
					}
				break;
			}
		}		
	}
});
