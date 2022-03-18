window.app_saku3_transaksi_produk_fGarLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fGarLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_produk_fGarLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Anggaran", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		 
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Tahun Anggaran",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.e_total = new saiLabelEdit(this,{bound:[700,13,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,380],caption:"Data Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:16,
				colTitle:["Kode Akun","Kode PP","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Valid Akun","Valid PP"],
				colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,100,100,100,100,100,100,100,100,100,80,80]],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true,
				nilaiChange:[this,"doNilaiChange"],pasteEnable:true,autoPaging:true,rowPerPage:20,
				autoAppend:true,defaultRow:1, afterPaste:[this,"doAfterPaste"]
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1,pager:[this,"doPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_produk_fGarLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_produk_fGarLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {	
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();

			this.doCekData();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doCekData: function() {
		var strSQL = "select kode_akun from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0' ";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataAkun = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(14,i,"INVALID");
			for (var j=0;j < this.dataAkun.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataAkun.rs.rows[j].kode_akun) {
					this.sg1.cells(14,i,"VALID");				
				}
			}	
			if (this.sg1.cells(14,i) == "INVALID") this.inValid = true;									
		}

		var strSQL = "select kode_pp from pp where kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataPP = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(15,i,"INVALID");
			for (var j=0;j < this.dataPP.rs.rows.length;j++){
				if (this.sg1.cells(1,i) == this.dataPP.rs.rows[j].kode_pp) {
					this.sg1.cells(15,i,"VALID");				
				}
			}	
			if (this.sg1.cells(15,i) == "INVALID") this.inValid = true;									
		}			
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
					this.doClick(this.i_gen);
				} else setTipeButton(tbSimpan);	
				break;
			case "simpan" :		
					if (this.inValid) {
						system.alert(this,"Data tidak valid.","Ditemukan data Akun/PP tidak valid.");
						return false;	
					}		
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","0000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							
							sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_tahun.getText()+"','IDR',"+parseNilai(this.e_tahun.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.app._userLog+"','LOAD')");

							
							sql.add("delete from anggaran_d where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_tahun.getText()+"%'");
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){									
									sql.add("insert into anggaran_load(no_agg,kode_lokasi,tahun,kode_akun,kode_pp,kode_drk,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','-',"+
											parseNilai(this.sg1.cells(2,i)) +","+parseNilai(this.sg1.cells(3,i)) +","+parseNilai(this.sg1.cells(4,i))+", "+
											parseNilai(this.sg1.cells(5,i)) +","+parseNilai(this.sg1.cells(6,i)) +","+parseNilai(this.sg1.cells(7,i))+", "+
											parseNilai(this.sg1.cells(8,i)) +","+parseNilai(this.sg1.cells(9,i)) +","+parseNilai(this.sg1.cells(10,i))+","+
											parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(13,i))+")");									
								}
							}
							
							sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',0,kode_pp,kode_akun,kode_drk,1,tahun+'01',sum(jan),sum(jan),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where jan <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'02',sum(feb),sum(feb),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where feb <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',2,kode_pp,kode_akun,kode_drk,1,tahun+'03',sum(mar),sum(mar),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where mar <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',3,kode_pp,kode_akun,kode_drk,1,tahun+'04',sum(apr),sum(apr),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where apr <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',4,kode_pp,kode_akun,kode_drk,1,tahun+'05',sum(mei),sum(mei),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where mei <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',5,kode_pp,kode_akun,kode_drk,1,tahun+'06',sum(jun),sum(jun),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where jun <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',6,kode_pp,kode_akun,kode_drk,1,tahun+'07',sum(jul),sum(jul),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where jul <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',7,kode_pp,kode_akun,kode_drk,1,tahun+'08',sum(agu),sum(agu),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where agu <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',8,kode_pp,kode_akun,kode_drk,1,tahun+'09',sum(sep),sum(sep),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where sep <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',9,kode_pp,kode_akun,kode_drk,1,tahun+'10',sum(okt),sum(okt),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where okt <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',10,kode_pp,kode_akun,kode_drk,1,tahun+'11',sum(nov),sum(nov),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where nov <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',11,kode_pp,kode_akun,kode_drk,1,tahun+'12',sum(des),sum(des),'D','-','"+this.app._userLog+"',getdate(),'LOAD' from anggaran_load where des <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,kode_pp,kode_drk,tahun "+
									"");
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tahun.setText(y);
		this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);				
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},			
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){ 
				if (this.sg1.rowValid(i) && this.sg1.cells(2,i) != ""  && this.sg1.cells(3,i) != ""  && this.sg1.cells(4,i) != ""  && this.sg1.cells(5,i) != "" &&
										    this.sg1.cells(6,i) != ""  && this.sg1.cells(7,i) != ""  && this.sg1.cells(8,i) != ""  && this.sg1.cells(9,i) != "" && 
										    this.sg1.cells(10,i) != "" && this.sg1.cells(11,i) != "" && this.sg1.cells(12,i) != "" && this.sg1.cells(13,i) != "") {
					
					tot += nilaiToFloat(this.sg1.cells(2,i))  + nilaiToFloat(this.sg1.cells(3,i))  + nilaiToFloat(this.sg1.cells(4,i))  + nilaiToFloat(this.sg1.cells(5,i)) + 
						   nilaiToFloat(this.sg1.cells(6,i))  + nilaiToFloat(this.sg1.cells(7,i))  + nilaiToFloat(this.sg1.cells(8,i))  + nilaiToFloat(this.sg1.cells(9,i)) + 
						   nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(13,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;				
			}
		}		
	}
});
