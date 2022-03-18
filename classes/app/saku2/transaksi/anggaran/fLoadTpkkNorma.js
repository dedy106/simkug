window.app_saku2_transaksi_anggaran_fLoadTpkkNorma = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadTpkkNorma.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadTpkkNorma";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Norma Honor Dokter TPKK: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.bUpload = new portalui_uploader(this,{bound:[840,10,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,520],caption:"Data Norma Honor"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:15,tag:0,								
				colTitle:["band","dpser","dpor","dlatih","dibo","drek","dh","dpj","dpd","dk","di","dfa","dfasd","dtht","dmirya"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80,80,80,50]],readOnly:true, defaultRow:1});		
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
window.app_saku2_transaksi_anggaran_fLoadTpkkNorma.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadTpkkNorma.implement({
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
			//"BAND","DPSER","DPOR","DLATIH","DIBO","DREK","DH","DPJ","DPD","DK","DI","DFA","DFASD","DTHT","DMIRYA"			
			this.sg1.appendData([line.band,"0","0","0","0","0",floatToNilai(line.dh),floatToNilai(line.dpj),floatToNilai(line.dpd),floatToNilai(line.dk),floatToNilai(line.di),floatToNilai(line.dfa),floatToNilai(line.dfasd),floatToNilai(line.dtht),floatToNilai(line.dmirya)]);
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
							sql.add("delete from agg_norma_fix where tahun ='"+this.e_tahun.getText()+"' and kode_param in ('DPSER','DPOR','DLATIH','DIBO','DREK','DH','DPJ','DPD','DK','DI','DFA','DFASD','DTHT','DMIRYA')");
							var line;														
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];												
								/*
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DPSER',0,"+line.dpser+","+line.dpser+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DPOR',0,"+line.dpor+","+line.dpor+",'"+this.e_tahun.getText()+"',1,1)");								
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DLATIH',0,"+line.dlatih+","+line.dlatih+",'"+this.e_tahun.getText()+"',1,1)");								
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DIBO',0,"+line.dibo+","+line.dibo+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DREK',0,"+line.drek+","+line.drek+",'"+this.e_tahun.getText()+"',1,1)");
								*/
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DH',0,"+line.dh+","+line.dh+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DPJ',0,"+line.dpj+","+line.dpj+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DPD',0,"+line.dpd+","+line.dpd+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DK',0,"+line.dk+","+line.dk+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DI',0,"+line.di+","+line.di+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DFA',0,"+line.dfa+","+line.dfa+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DFASD',0,"+line.dfasd+","+line.dfasd+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DTHT',0,"+line.dtht+","+line.dtht+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DMIRYA',0,"+line.dmirya+","+line.dmirya+",'"+this.e_tahun.getText()+"',1,1)");
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
