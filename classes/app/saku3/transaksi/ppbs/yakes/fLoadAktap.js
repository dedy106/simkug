window.app_saku3_transaksi_ppbs_yakes_fLoadAktap = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadAktap.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadAktap";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Aktiva Tetap: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;checkBox");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.cb1 = new portalui_checkBox(this,{bound:[200,10,200,25],caption:"Hapus Data Sebelumnya",selected:false});		
		this.bUpload = new portalui_uploader(this,{bound:[840,10,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,400],caption:"Data Aktiva Tetap"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:18,tag:0,												
				colTitle:["no_fa","keterangan","kode_lokasi","kode_ppfa","kode_pp_bp","kode_pp_bpp","kode_klpfa","kode_klpakun","umur","persen_susut","nilai_perolehan","drk_pengadaan","drk_penyusutan","periode_perolehan","periode_awal_susut","status_gar","status_aktif","jumlah"], 
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]],readOnly:true, defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
				
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);		
	}
};
window.app_saku3_transaksi_ppbs_yakes_fLoadAktap.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadAktap.implement({
	doEditChange: function(sender){
		if (this.lastDataHR != this.cb_data.getText()){
			this.lastDataHR = this.cb_data.getText();			
		}
	},
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
			this.sg1.appendData([line.no_fa,line.keterangan,line.kode_lokasi,line.kode_ppfa,line.kode_pp_bp,line.kode_pp_bpp,line.kode_klpfa,line.kode_klpakun,line.umur,floatToNilai(line.persen_susut),floatToNilai(line.nilai_perolehan),line.drk_pengadaan,line.drk_penyusutan,line.periode_perolehan,line.periode_awal_susut,line.status_gar,line.status_aktif,floatToNilai(line.jumlah)]);
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
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{								
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							
							if (this.cb1.isSelected()) sql.add("delete from agg_fa_asset where tahun ='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
							var line;														
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];												
								var tgl_oleh = line.periode_perolehan.substr(0,4)+"-"+line.periode_perolehan.substr(4,2)+"-01";
								var tgl_susut = line.periode_awal_susut.substr(0,4)+"-"+line.periode_awal_susut.substr(4,2)+"-01";
								sql.add("insert into agg_fa_asset(no_fa,kode_lokasi,kode_pp,kode_klpfa,kode_klpakun,umur,persen,nama,nilai,kode_drk,tgl_perolehan,periode,tgl_susut,periode_susut,kode_akun,jenis_agg,status_aktif,tahun,kode_rka2,kode_rka3,kode_pp2,kode_pp3,jumlah) values "+
										"('"+line.no_fa+"','"+line.kode_lokasi+"','"+line.kode_ppfa+"','"+line.kode_klpfa+"','"+line.kode_klpakun+"',"+line.umur+","+line.persen_susut+",'"+line.keterangan+"',"+line.nilai_perolehan+",'"+line.drk_pengadaan+"','"+tgl_oleh+"','"+line.periode_perolehan+"','"+tgl_susut+"','"+line.periode_awal_susut+"','"+line.kode_klpakun+"','"+line.status_gar+"','"+line.status_aktif+"','"+this.e_tahun.getText()+"','"+line.drk_penyusutan+"','-','"+line.kode_pp_bp+"','"+line.kode_pp_bpp+"',"+line.jumlah+")");
							}												
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbSimpan);
						}
					}
				break;
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}	
});
