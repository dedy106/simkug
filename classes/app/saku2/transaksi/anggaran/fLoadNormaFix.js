window.app_saku2_transaksi_anggaran_fLoadNormaFix = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fLoadNormaFix.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_anggaran_fLoadNormaFix";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Norma Fixed: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.bUpload = new portalui_uploader(this,{bound:[840,10,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,520],caption:"Data Norma Honor"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:36,tag:0,								
				colTitle:["band","gdas","tpos","tdas","tret","thr","psg","cuti","tcuti","bas","bp","jms","pa","idp","dplk","jksp","sakp","tksj","tfas","pker","pksr","lkbm","tlkbm","plth","smnr","iboh","rkr","ins","sf","sfp","jspd","bns","fkes","tht","mf","ppn"],				
				colWidth:[[35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
				          [80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80,50]],readOnly:true, defaultRow:1});		
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
window.app_saku2_transaksi_anggaran_fLoadNormaFix.extend(window.portalui_childForm);
window.app_saku2_transaksi_anggaran_fLoadNormaFix.implement({
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
			this.sg1.appendData([line.band,floatToNilai(line.gdas),floatToNilai(line.tpos),floatToNilai(line.tdas),floatToNilai(line.tret),floatToNilai(line.thr),floatToNilai(line.psg),floatToNilai(line.cuti),floatToNilai(line.tcuti),floatToNilai(line.bas),floatToNilai(line.bp),floatToNilai(line.jms),floatToNilai(line.pa),floatToNilai(line.idp),floatToNilai(line.dplk),floatToNilai(line.jksp),floatToNilai(line.sakp),floatToNilai(line.tksj),floatToNilai(line.tfas),floatToNilai(line.pker),floatToNilai(line.pksr),floatToNilai(line.lkbm),floatToNilai(line.tlkbm),floatToNilai(line.plth),floatToNilai(line.smnr),floatToNilai(line.iboh),floatToNilai(line.rkr),floatToNilai(line.ins),floatToNilai(line.sf),floatToNilai(line.sfp),floatToNilai(line.jspd),floatToNilai(line.bns),floatToNilai(line.fkes),floatToNilai(line.tht),floatToNilai(line.mf),floatToNilai(line.ppn)]);
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
							sql.add("delete from agg_norma_fix where tahun ='"+this.e_tahun.getText()+"' and kode_param in ('gdas','tpos','tdas','tret','thr','psg','cuti','tcuti','bas','bp','jms','pa','idp','dplk','jksp','sakp','tksj','tfas','pker','pksr','lkbm','tlkbm','plth','smnr','iboh','rkr','ins','sf','sfp','jspd','bns','fkes','tht','mf','ppn')");
							var line;														
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];																				
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','GDAS',0,"+line.gdas+","+line.gdas+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TPOS',0,"+line.tpos+","+line.tpos+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TDAS',0,"+line.tdas+","+line.tdas+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TRET',0,"+line.tret+","+line.tret+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','THR',0,"+line.thr+","+line.thr+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PSG',0,"+line.psg+","+line.psg+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','CUTI',0,"+line.cuti+","+line.cuti+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TCUTI',0,"+line.tcuti+","+line.tcuti+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','BAS',0,"+line.bas+","+line.bas+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','BP',0,"+line.bp+","+line.bp+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','JMS',0,"+line.jms+","+line.jms+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PA',0,"+line.pa+","+line.pa+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','IDP',0,"+line.idp+","+line.idp+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','DPLK',0,"+line.dplk+","+line.dplk+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','JKSP',0,"+line.jksp+","+line.jksp+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','SAKP',0,"+line.sakp+","+line.sakp+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TKSJ',0,"+line.tksj+","+line.tksj+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TFAS',0,"+line.tfas+","+line.tfas+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PKER',0,"+line.pker+","+line.pker+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PKSR',0,"+line.pksr+","+line.pksr+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','LKBM',0,"+line.lkbm+","+line.lkbm+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','TLKBM',0,"+line.tlkbm+","+line.tlkbm+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PLTH',0,"+line.plth+","+line.plth+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','SMNR',0,"+line.smnr+","+line.smnr+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','IBOH',0,"+line.iboh+","+line.iboh+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','RKR',0,"+line.rkr+","+line.rkr+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','INS',0,"+line.ins+","+line.ins+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','SF',0,"+line.sf+","+line.sf+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','SFP',0,"+line.sfp+","+line.sfp+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','JSPD',0,"+line.jspd+","+line.jspd+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','BNS',0,"+line.bns+","+line.bns+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','FKES',0,"+line.fkes+","+line.fkes+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','THT',0,"+line.tht+","+line.tht+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','MF',0,"+line.mf+","+line.mf+",'"+this.e_tahun.getText()+"',1,1)");
								sql.add("insert into agg_norma_fix(kode_band,kode_param,persen,nilai_sat,nilai,tahun,kali,jumlah) values "+
										"('"+line.band+"','PPN',0,"+line.ppn+","+line.ppn+",'"+this.e_tahun.getText()+"',1,1)");																										
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
