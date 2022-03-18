/**
 * @author dweexfuad,mr
 */
window.app_budget_master_fBandProgramTrans = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBandProgramTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBandProgramTrans";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Transport Program SPPD per Band : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("saiCBBL;datePicker;checkBox;util_standar");
			this.eTahun = new saiLabelEdit(this,{bound:[20,19,180,20], caption:"Tahun",tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eBidang = new saiCBBL(this,{bound:[20,24,200,20],caption:"Bidang", multiSelection:false,change:[this,"doEditChange"]});				
			this.eBand = new saiCBBL(this,{bound:[20,20,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"]});				
			this.eProgram = new saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Program", multiSelection:false,change:[this,"doEditChange"]});				
			this.eKoTar = new saiCBBL(this,{bound:[20,22,200,20],caption:"Kode Tarif", multiSelection:false,change:[this,"doEditChange"],readOnly:true});				
			this.eTarif = new saiLabelEdit(this,{bound:[20,23,180,20], caption:"Tarif", tipeText:ttNilai, text:"0",readOnly:true});
			this.eJml = new saiLabelEdit(this,{bound:[20,24,180,20], caption:"Frekuensi", tipeText:ttNilai, text:"0"});
			
			this.bTampil = new button(this,{bound:[529,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new panel(this,{bound:[10,25,600,323],caption:"Daftar"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,600,280],colCount:8,defaultRow:1,
								colTitle: ["Kode Bidang","Band","Kode Program","Nama Program","Kode Rute","Keterangan","Tarif","Frekuensi","Tahun"],
								colFormat:[[6,7],[cfNilai,cfNilai]], 
								colWidth:[[0,1,2,3,4,5,6,7],[60,80,120,60,110,80,80,60]]});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,300,600,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
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
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],false,["Kode Band","Nama"],"where","Data Band",true);			
			if (this.app._userStatus == "A")
				this.eBidang.setSQL("select kode_bidang, nama from agg_bidang ",["kode_bidang","nama"],false,["Kode","Nama"],"where","Data Bidang",true);			
			else this.eBidang.setSQL("select kode_bidang, nama from agg_bidang where kode_bidang = '"+this.app._kodeBidang+"' ",["kode_bidang","nama"],false,["Kode","Nama"],"and","Data Bidang",true);			
			this.eBidang.setText(this.app._kodeBidang);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBandProgramTrans.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBandProgramTrans.implement({
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
					this.eTarif.setText("0");
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_program_trans(kode_bidang,kode_band, kode_lokasi,kode_tarif, kode_program, tahun, tarif,jumlah) values "+
							    "('"+this.eBidang.getText()+"','"+this.eBand.getText()+"','"+this.app._lokasi+"','"+this.eKoTar.getText()+"','"+this.eProgram.getText()+"','"+this.eTahun.getText()+"',"+parseNilai(this.eTarif.getText())+",'"+parseNilai(this.eJml.getText())+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_program_trans where kode_bidang='"+this.kodebidang+"' and kode_band='"+this.kodeband+"' and kode_lokasi = '"+this.app._lokasi+"' and kode_tarif ='"+this.kodetarif+"'  and kode_program ='"+this.kodeprogram+"' and tahun = '"+this.eTahun.getText()+"' ");
						sql.add("insert into agg_program_trans(kode_bidang,kode_band, kode_lokasi,kode_tarif, kode_program, tahun, tarif,jumlah) values "+
							    "('"+this.eBidang.getText()+"','"+this.eBand.getText()+"','"+this.app._lokasi+"','"+this.eKoTar.getText()+"','"+this.eProgram.getText()+"','"+this.eTahun.getText()+"',"+parseNilai(this.eTarif.getText())+",'"+parseNilai(this.eJml.getText())+"') ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_program_trans where kode_bidang='"+this.eBidang.getText()+"' and kode_band='"+this.eBand.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and kode_tarif ='"+this.eKoTar.getText()+"'  and kode_program ='"+this.eProgram.getText()+"' and tahun = '"+this.eTahun.getText()+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eBand.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun || sender == this.eBand) {
			if (this.eTahun.getText() != "" && this.eBand.getText() != "") {
				this.eProgram.setSQL("select a.kode_program, a.nama from agg_program a inner join agg_program_band b on a.kode_program=b.kode_program and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
									 "where b.kode_band = '"+this.eBand.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun = '"+this.eTahun.getText()+"' ",["a.kode_program","a.nama"],false,["Kode Program","Nama"],"and","Data Program SPPD / Band",true);										
				this.eKoTar.setSQL("select a.kode_tarif, b.nama, cast (a.nilai as decimal) as nilai "+
							       "from agg_norma_trans a inner join agg_rute b on a.kode_rute=b.kode_rute "+
							       "where a.tahun = '"+this.eTahun.getText()+"' and a.kode_band='"+this.eBand.getText()+"' ",["a.kode_tarif","b.nama","a.nilai"],true,["Kode Tarif","Rute","Nilai"],"and","Data Tarif per Band",true);
			}
		}
		if (sender == this.eKoTar && this.eKoTar.getText() != "") {
			this.eTarif.setText(this.eKoTar.dataFromList[2]);
		}		
		if (sender == this.eBand || sender == this.eProgram || sender == this.eKoTar || sender == this.eBidang){
			if (this.eBand.getText() != "" && this.eProgram.getText() != "" && this.eKoTar.getText() != "" && this.eBidang.getText() != ""){
				try{			
					var data = this.dbLib.runSQL("select kode_bidang,kode_band,kode_program,kode_tarif,jumlah "+
												 "from agg_program_trans "+
					                             "where kode_bidang = '"+this.eBidang.getText()+"' and kode_tarif='"+this.eKoTar.getText()+"' and tahun = '"+this.eTahun.getText()+"' and kode_program='"+this.eProgram.getText()+"' and kode_band='"+this.eBand.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (data instanceof portalui_arrayMap){
						if (data.get(0) != undefined){
							this.kodebidang = data.get(0).get("kode_bidang");
							this.kodetarif = data.get(0).get("kode_tarif");
							this.kodeband = data.get(0).get("kode_band");
							this.kodeprogram = data.get(0).get("kode_program");
							this.eJml.setText(floatToNilai(data.get(0).get("jumlah")));
							setTipeButton(tbUbahHapus);
						}else setTipeButton(tbSimpan);
					}else setTipeButton(tbSimpan);
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.kode_bidang,a.kode_band,a.kode_program,d.nama as nama_prog,e.kode_rute,e.nama as nama_rute,a.tarif,a.jumlah,a.tahun "+
										"from agg_program_trans a "+
										"	inner join agg_program d on a.kode_program=d.kode_program and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun "+
										"	inner join agg_norma_trans c on a.kode_band=c.kode_band and a.kode_tarif=c.kode_tarif and a.tahun=c.tahun "+
										"	inner join agg_rute e on c.kode_rute=e.kode_rute "+
										"where a.kode_lokasi = '"+this.app._lokasi+"' and a.tahun='"+this.eTahun.getText()+"' and a.kode_bidang = '"+this.eBidang.getText()+"' ");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eBand.getText()+")");
						this.eTarif.setText("0");
						setTipeButton(tbAllFalse);
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
