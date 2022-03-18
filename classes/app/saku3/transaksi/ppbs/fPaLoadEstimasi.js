window.app_saku3_transaksi_ppbs_fPaLoadEstimasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaLoadEstimasi.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_fPaLoadEstimasi";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Anggaran Akun", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		 
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Tahun Anggaran",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,380],caption:"Data Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:18,
				colTitle:["Kode Akun","Nama","Kode PP","Nama","Kode DRK","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,200,80,200,80,200,80]],
				colFormat:[[6,7,8,9,10,11,12,13,14,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				columnReadOnly:[true,[1,3,5],[0,2,4,6,7,8,9,10,11,12,13,14,15,16,17]],
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
		this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);		
		var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.cb_app.setText(line.flag,line.nama);
		} else this.cb_app.setText("","");
		this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		this.cb_pp.setText(this.pp);
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_ppbs_fPaLoadEstimasi.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_fPaLoadEstimasi.implement({	
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
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_estimasi_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							sql.add("insert into agg_estimasi_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis,kode_pp) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_tahun.getText()+"','IDR',"+parseNilai(this.e_tahun.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.app._userLog+"','LOAD','"+this.cb_pp.getText()+"')");

							sql.add("delete from agg_estimasi where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_tahun.getText()+"%' and kode_pp='"+this.cb_pp.getText()+"'");
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){									
									sql.add("insert into agg_estimasi_load(no_agg,kode_lokasi,tahun,kode_akun,kode_pp,kode_drk,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(6,i))+","+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(13,i))+","+parseNilai(this.sg1.cells(14,i))+","+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+","+parseNilai(this.sg1.cells(17,i))+")");									
								}
							}
							
							sql.add("insert into agg_estimasi (no_agg,kode_lokasi,kode_akun,periode,nilai,dc,kode_pp) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'01',sum(jan),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where jan <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'02',sum(feb),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where feb <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'03',sum(mar),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where mar <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'04',sum(apr),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where apr <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'05',sum(mei),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where mei <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'06',sum(jun),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where jun <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'07',sum(jul),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where jul <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'08',sum(agu),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where agu <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'09',sum(sep),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where sep <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'10',sum(okt),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where okt <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'11',sum(nov),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where nov <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_akun,tahun+'12',sum(des),'D','"+this.cb_pp.getText()+"' from agg_estimasi_load where des <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,tahun "+
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
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_estimasi_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);				
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},			
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){ 
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "" && this.sg1.cells(7,i) != "" && this.sg1.cells(8,i) != "" && this.sg1.cells(9,i) != "" &&
										   this.sg1.cells(10,i) != "" && this.sg1.cells(11,i) != "" && this.sg1.cells(12,i) != "" && this.sg1.cells(13,i) != "" && 
										   this.sg1.cells(14,i) != "" && this.sg1.cells(15,i) != "" && this.sg1.cells(16,i) != "" && this.sg1.cells(17,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + 
						  nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(13,i)) + 
						  nilaiToFloat(this.sg1.cells(14,i)) + nilaiToFloat(this.sg1.cells(15,i)) + nilaiToFloat(this.sg1.cells(16,i)) + nilaiToFloat(this.sg1.cells(17,i));
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
