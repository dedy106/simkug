window.app_saku3_transaksi_ppbs_yakes_fLoadPdpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadPdpt.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadPdpt";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Jurnal Anggaran Pendapatan: Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.bUpload = new portalui_uploader(this,{bound:[820,11,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,420],caption:"Data Jurnal Anggaran Pendapatan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:0,
				colTitle:["kode_akun","dc","nama","jan","feb","mar","apr","mei","jun","jul","agu","sep","okt","nov","des","kode_cf","kode_drk"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80, 100,100,100,100,100,100,100,100,100,100,100,100, 100,50,80]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
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
		
		var tahun = parseFloat(this.dp_d1.year) +1;
		this.e_tahun.setText(tahun);
		
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi ='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Daftar PP",true);				
		this.cb_pp.setText("994000");
	}
};
window.app_saku3_transaksi_ppbs_yakes_fLoadPdpt.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadPdpt.implement({
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
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 500));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 500;
		var finish = start + 500;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.kode_akun,line.dc,line.nama,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des),line.kode_cf,line.kode_rka]);
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
					var nobukti = this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abau_m','no_abau',this.app._lokasi+"-INV"+this.e_tahun.getText()+".",'000');
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																													
							//sql.add("delete from agg_gldt where modul = 'INV' and periode like '"+this.e_tahun.getText()+"%'");
							sql.add("delete from agg_d where modul = 'INV' and tahun = '"+this.e_tahun.getText()+"'");							
							
							var idx=0;
							for (var i=0;i< this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									idx++;									
									for (var j=1;j< 13;j++){
										var k=j+2;
										if (this.sg1.cells(k,i) != "0") {
											this.periode = this.e_tahun.getText() + (j<10?"0":"")+j;
											var tgl = this.e_tahun.getText()+"-"+(j<10?"0":"")+j+"-01";
											var nilai = nilaiToFloat(this.sg1.cells(k,i));
											
											if (this.sg1.cells(1,i) == "D") {
												if (nilai < 0) {
													var dc = "C";
													nilai = nilai * -1;
												} else var dc = this.sg1.cells(1,i);
											}
											else {
												if (nilai < 0) {
													var dc = "D";
													nilai = nilai * -1;
												} else var dc = this.sg1.cells(1,i);										
											}
											/*
											sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
													"('"+nobukti+"',"+idx+",'00','INV','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+dc+"',"+nilai+",'"+this.sg1.cells(2,i)+"','-','"+this.periode+"','-','IDR',1,"+nilai+",now(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(15,i)+"')");
										
											*/
											if (this.sg1.cells(16,i) != "-" && this.sg1.cells(16,i) != "") {										
												sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
														"('99','-','"+this.sg1.cells(16,i)+"','-','"+this.sg1.cells(0,i)+"','994000','"+this.periode+"','"+this.periode.substr(4,2)+"',1,1,"+nilai+",'"+this.e_tahun.getText()+"','"+nobukti+"','INV','0','E','"+this.sg1.cells(2,i)+"') ");
											}
										}
									
									}
								}
							}							
							/*
							sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
									"select '"+nobukti+"',0,'00','INV','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','-',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
									"from agg_gldt where periode like '"+this.e_tahun.getText()+"%'  and modul ='INV' group by periode");							
							*/
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
