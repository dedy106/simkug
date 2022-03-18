/**
 * @author mr
 */
window.app_budget_transaksi_fBpcccs = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fBpcccs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fBpcccs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kunjungan Sharing Cost : Input", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiCBBL;util_standar;saiTable;datePicker");
			this.eTahun = new saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});
			this.ed_nb = new saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			this.ed_ket = new saiLabelEdit(this,{bound:[20,24,400,20],caption:"Keterangan",maxLength:150});						
			this.cb_setuju = new saiCBBL(this,{bound:[20,25,200, 20],caption:"Dibuat Oleh",multiSelection:false});						
			this.cbPP = new saiCBBL(this,{bound:[20,28,200, 20],caption:"Bisnis Unit",multiSelection:false});						
			
			this.p1 = new panel(this,{bound:[10,29,900,370],caption:"Daftar Detail Kunjungan"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,900,315],colCount:8,
						colTitle : "Kd Parameter,Nama Parameter,Jenis,Status Peg,Jenis TPK,Bulan,Status,Jumlah Kunj.",
						colWidth:[[7,6,5,4,3,2,1,0],[100,100,110,80,80,60,240,80]],
						colFormat:[[7],[cfNilai]],
						buttonStyle:[[0,4,5,6],[bsEllips,bsAuto,bsAuto,bsAuto]],
						picklist:[[4,5,6],
							[
							 new portalui_arrayMap({items:["TPKK","TPKU","NON TPK"]}), 
							 new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]}),
							 new portalui_arrayMap({items:["NIK","PASANGAN","ANAK"]})
							]
						],
						columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
						change:[this,"doChangeCell"],
						ellipsClick:[this,"doEllipseClick"],
						defaultRow:1
						});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,345,900,25],buttonStyle:2, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			this.eTahun.setText("2010");
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cbPP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Bisnis Unit",true);			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fBpcccs.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fBpcccs.implement({
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
		if (modalResult != mrOk) return;
		try{
			switch (event)
			{
				case "clear" :
							this.standarLib.clearByTag(this,["0"],undefined);											
							this.sg1.clear(1);
					break;
				case "simpan" :
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_bpcc_m","no_bpcc","SC-"+this.eTahun.getText().substr(2,2),"000"));
							
							sql.add("insert into agg_bpcc_m(no_bpcc,keterangan,kode_lokasi,kode_pp,nik_app,periode) values "+
									"('"+this.ed_nb.getText()+"','"+this.ed_ket.getText()+"','"+this.app._lokasi+"','"+this.cbPP.getText()+"','"+this.cb_setuju.getText()+"','"+this.eTahun.getText()+"')");					
							
							for (var i=0; i < this.sg1.rows.getLength(); i++) {
								if (this.sg1.rowValid(i)){
									if (this.sg1.cells(5,i).substr(0,1) == "A") {
										sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'01'+"')");
										sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'04'+"')");
										sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'07'+"')");
										sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'10'+"')");
									} 
									else {
										if (this.sg1.cells(5,i).substr(0,1) == "B") {
											sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'01'+"')");
											sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+'07'+"')");
										}
										else {
											if (this.sg1.cells(5,i).substr(0,1) == "C") {
												for (var j=1; j <= 12; j++){
													sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+(j<10?"0":"")+j+"')");
												}			
											}
											else {
													sql.add("insert into agg_bpcc_d (no_bpcc,kode_lokasi,kode_param,kode_pp,jumlah,status_pst,jenis_tpk,jenis_pst,periode) values "+
															"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cbPP.getText()+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(6,i)+"','"+this.eTahun.getText()+this.sg1.cells(5,i)+"')");
											}
										}
									}									
								}
							}
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}	
								break;
				case "ubah" :					
								break;
				case "hapus" :
				    			break;
			}
			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doClick: function(sender){	
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_bpcc_m","no_bpcc","SC-"+this.eTahun.getText().substr(2,2),"000"));
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {			
			this.sg1.setCell(2,row,this.sg1.dataFromList[2]);
			this.sg1.setCell(3,row,"PEGAWAI");
		}
	},
	doPager: function(sender, page){
		this.doSelectPage(page);	
	},
	doEllipseClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
											  "select a.kode_param,a.nama,a.kode_bpcc   from agg_bpcc_param a inner join agg_bpcc_ cs b on a.kode_param=b.kode_param and a.tahun "+
											  "where a.tahun='"+this.eTahun.getText()+"'",
											  "select count(kode_param) from agg_bpcc_param where tahun='"+this.eTahun.getText()+"'",
											  ["kode_param","nama","kode_bpcc"],"and",["Kode","Nama","Jenis"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						system.info(this,"Transaksi Sukses ("+ this.ed_nb.getText()+")","");
						this.doModalResult("clear",mrOk);	
					}
					else system.alert(this, result,""); 
					break;
			}
		}
	}
});
