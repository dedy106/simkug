/**
 * @author dweexfuad,mr
 */
window.app_budget_transaksi_fGajiPmbn = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fGajiPmbn.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fGajiPmbn";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Beban Penyelenggaraan YAKES", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiCBBL;util_standar;saiTable;datePicker");
			this.eTahun = new saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});
			this.ed_nb = new saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			
			this.cbPP = new saiCBBL(this,{bound:[20,28,200, 20],caption:"PP",multiSelection:false});						
			this.cbPph = new saiCBBL(this,{bound:[20,29,200, 20],caption:"Parameter PPh21",multiSelection:false});						
			this.eVol = new saiLabelEdit(this,{bound:[20,26,180,20],caption:"Volume (Default)",tipeText:ttNilai,text:"0",tag:2});
			this.ePph = new saiLabelEdit(this,{bound:[20,27,180,20],caption:"% PPh 21 (Default)",tipeText:ttNilai,text:"0",tag:2});
			
			this.bTampil = new button(this,{bound:[829,27,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new panel(this,{bound:[10,28,900,323],caption:"Daftar"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,900,280],colCount:12,
						colTitle : "NIK, Nama, Kode Jab, Nama Jabatan, Band, Kode Param, Nama Parameter, Nilai, Volume, Total, PPh21, Jns Periode",
						colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,80,100,80,100,120,80,80,150,80,120,80]],
						colFormat:[[10,9,8,7],[cfNilai, cfNilai, cfNilai, cfNilai]],
						buttonStyle:[[11],[bsAuto]],
						picklist:[[11],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01,07","C. 01-12"]})]],
						columnReadOnly:[true,[0,1,2,3,4,5,7],[]],change:[this,"doChangeCell"],defaultRow:1
						});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,300,900,25],buttonStyle:2, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}

			this.cbPP.setSQL("select kode_pp, nama from agg_pp where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'posting'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Bisnis Unit",true);
			this.cbPph.setSQL("select kode_param, nama from agg_param where kode_param = 'PPH21' ",["kode_param","nama"],false,["Kode","Nama"],"and","Parameter PPH21",true);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fGajiPmbn.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fGajiPmbn.implement({
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
																	
					break;
				case "simpan" :
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();												
							this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gajipmbn_m","no_gaji","GJPMBN-"+this.eTahun.getText(),"000"));
							
							sql.add("delete from agg_gajipmbn_m where kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"'");
							sql.add("delete from agg_gajipmbn_d where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.eTahun.getText()+"%'");
							sql.add("delete from agg_d where modul='BPMBN' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");

							sql.add("insert into agg_gajipmbn_m(no_gaji,kode_lokasi,keterangan,tahun,jenis,tgl_input,nik_user) values "+
									"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','-','"+this.eTahun.getText()+"','X',now(),'"+this.app._userLog+"')");					
							
							//for (var i=0; i < this.sg1.getRowCount();i++){			
							var line;
							for (var i in this.dataPmbn){
								line = this.dataPmbn[i];
								//if (this.sg1.rowValid(i)) 
								{
									if (line.jns_periode.substr(0,1) == "A") {
										var nilai = Math.round(nilaiToFloat(line.total)/4);
										var pph = Math.round(nilaiToFloat(line.total)/4);
										
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'01'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'04'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'07'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'10'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'01'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'04'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'07'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
										sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
												"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'10'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
									} 
									else {
										if (line.jns_periode.substr(0,1) == "B") {
											var nilai = Math.round(parseFloat(line.total)/2);
											var pph = Math.round(parseFloat(line.total)/2);
											
											sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
													"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'01'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
											sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
													"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+'07'+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");											
											
											sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
													"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'01'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
											sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
													"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+'07'+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");																					
										}
										else {
											if (line.jns_periode.substr(0,1) == "C") {
												var nilai = Math.round(parseFloat(line.total)/12);
												var pph = Math.round(parseFloat(line.total)/12);
												for (var j=1; j <= 12; j++){
													sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
															"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+(j<10?"0":"")+j+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
												}
												for (var j=1; j <= 12; j++){
													sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
															"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+(j<10?"0":"")+j+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
												}
											}
											else {												
												var prd = line.jns_periode.split(",");
												var nilai = Math.round(parseFloat(line.total)/prd.length);
												var pph = Math.round(parseFloat(line.total)/prd.length);
												for (var p in prd){
													sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
															"('"+line.nik+"','"+line.kode_param+"',"+this.eTahun.getText()+(parseFloat(prd[p]) < 10 ? "0":"")+prd[p]+",'E','F','"+this.cbPP.getText()+"',"+nilai+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
													sql.add("insert into agg_gajipmbn_d(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi) values "+
															"('"+line.nik+"','"+this.cbPph.getText()+"',"+this.eTahun.getText()+(parseFloat(prd[p]) < 10 ? "0":"")+prd[p]+",'E','F','"+this.cbPP.getText()+"',"+pph+",'"+this.ed_nb.getText()+"','"+this.app._lokasi+"')");
												}
											}
										}
									}
								}
							}
							sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress,jenis_agg) "+
									"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai,substring(a.periode,1,4),a.nik,'BPMBN',b.nama as nama_rka,'0','E' "+  
									"		from agg_gajipmbn_d a "+
									"					   inner join agg_param	x on a.kode_param=x.kode_param and substring(a.periode,1,4)=x.tahun "+
									"					   inner join agg_rka b on x.kode_rka=b.kode_rka and x.tahun=b.tahun "+
									"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+						
									"		where a.nilai<> 0 and substring(a.periode,1,4)='"+this.eTahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
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
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gajipmbn_m","no_gaji","GJPMBN-"+this.eTahun.getText(),"000"));
	},
	doTampilClick: function(sender){
		try{			
			/*
			var temp = this.dbLib.runSQL("select a.nik,b.nama,c.nama as jabatan,b.kode_band,a.tarif,a.vol,a.total,a.pph "+
										 "from agg_gaji_pmbn a inner join agg_pmbn b on a.nik=b.nik "+
										 "					   inner join agg_jab c on b.kode_jab=c.kode_jab ");
			*/
			var data = this.dbLib.getDataProvider("select c.nik,c.nama,c.kode_jab,d.nama as nama_jab,c.kode_band, b.kode_param,b.nama as nama_param,b.jns_periode,"+
										"a.nilai, "+this.eVol.getText()+" as vol, a.nilai * "+parseNilai(this.eVol.getText())+" as total,round(cast("+parseNilai(this.ePph.getText())+" as float)/100* a.nilai* "+parseNilai(this.eVol.getText())+",0) as pph "+
										"from agg_norma_fix a "+
										"	inner join agg_param b on a.kode_param=b.kode_param "+
										"	inner join agg_pmbn c on a.kode_band=c.kode_band "+
										"	inner join agg_jab d on c.kode_jab=d.kode_jab "+
										"where a.tahun = '"+this.eTahun.getText()+"' and b.jenis = 'PMBN' and c.kode_lokasi = '"+this.app._lokasi+"' ", true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				this.rowPerPage = 15;
				this.dataPmbn = data.rs.rows;				
				this.doSelectPage(1);
				/*for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.nik,line.nama,line.kode_jab,line.nama_jab,line.kode_band,line.kode_param,line.nama_param,floatToNilai(line.nilai),line.vol,floatToNilai(line.total),floatToNilai(line.pph),line.jns_periode]);
				}*/
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectPage: function(page){
		try{
			this.sg1.clear();
			var line,start = (page - 1) * this.rowPerPage;
			var finish = (start + this.rowPerPage > this.dataPmbn.length ? this.dataPmbn.length : start + this.rowPerPage);
			for (var i = start ; i < finish; i++){
				line = this.dataPmbn[i];
				this.sg1.appendData([line.nik,line.nama,line.kode_jab,line.nama_jab,line.kode_band,line.kode_param,line.nama_param,floatToNilai(line.nilai),line.vol,floatToNilai(line.total),floatToNilai(line.pph),line.jns_periode]);
			}			
			this.sg1.setNoUrut(start);
			this.page = page;
		}catch(e){
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 8) {			
			
			this.dataPmbn[(this.page - 1)* this.rowPerPage + row ].vol = parseFloat(nilaiToFloat(sender.cells(8,row)));
			this.dataPmbn[(this.page - 1)* this.rowPerPage + row ].total = parseFloat(nilaiToFloat(sender.cells(8,row))) * parseFloat(line.nilai);
			this.dataPmbn[(this.page - 1)* this.rowPerPage + row ].pph = this.dataPmbn[(this.page - 1)* this.rowPerPage + row ].total * nilaiToFloat(this.ePph.getText()) / 100;
			if (this.sg1.cells(7,row)!=""  && this.sg1.cells(8,row)!="") {
				
				this.sg1.setCell(9,row,floatToNilai(nilaiToFloat(this.sg1.cells(7,row)) * nilaiToFloat(this.sg1.cells(8,row))));
				this.sg1.setCell(10,row,floatToNilai(nilaiToFloat(this.sg1.cells(9,row)) * nilaiToFloat(this.ePph.getText())/100));
			}
		}
	},
	doPager: function(sender, page){
		//this.sg1.selectPage(page);
		this.doSelectPage(page);
	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						system.info(this,"Transaksi Sukses ("+ this.ed_nb.getText()+")","");
					else system.alert(this, result,""); 
					break;
			}
		}
	}
});
