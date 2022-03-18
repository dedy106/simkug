window.app_saku2_transaksi_kopeg_sju_fGarLoadNet = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fGarLoadNet.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_kopeg_sju_fGarLoadNet";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Anggaran", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		 
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Tahun Anggaran",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,380],caption:"Data Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:18,
				colTitle:["COB","Nama","Tertanggung","Nama","Account","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
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
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_kopeg_sju_fGarLoadNet.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_sju_fGarLoadNet.implement({	
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_gar_m","no_gar",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							
							sql.add("delete from sju_gar_net where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.e_tahun.getText()+"%'");														
							sql.add("insert into sju_gar_m(no_gar,kode_lokasi,tahun,tanggal,keterangan,nik_app,tgl_input,nik_user) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"')");
														
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									//kalo tidak di replace ---> sql.add("delete from sju_gar_d where kode_lokasi='"+this.app._lokasi+"' and kode_tipe='"+this.sg1.cells(0,i)+"' and kode_cust='"+this.sg1.cells(2,i)+"' and kode_pic='"+this.sg1.cells(4,i)+"' and periode like '"+this.e_tahun.getText()+"%'");
									sql.add("insert into sju_gar_load(no_gar,kode_lokasi,tahun,kode_tipe,kode_cust,kode_pic,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(6,i))+","+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(13,i))+","+parseNilai(this.sg1.cells(14,i))+","+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+","+parseNilai(this.sg1.cells(17,i))+")");									
								}
							}
							
							sql.add("insert into sju_gar_net (no_gar,kode_lokasi,kode_tipe,kode_cust,kode_pic,periode,nilai) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'01',sum(jan) from sju_gar_load where jan <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'02',sum(feb) from sju_gar_load where feb <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'03',sum(mar) from sju_gar_load where mar <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'04',sum(apr) from sju_gar_load where apr <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'05',sum(mei) from sju_gar_load where mei <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'06',sum(jun) from sju_gar_load where jun <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'07',sum(jul) from sju_gar_load where jul <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+	
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'08',sum(agu) from sju_gar_load where agu <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'09',sum(sep) from sju_gar_load where sep <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'10',sum(okt) from sju_gar_load where okt <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'11',sum(nov) from sju_gar_load where nov <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',kode_tipe,kode_cust,kode_pic,tahun+'12',sum(des) from sju_gar_load where des <> 0 and no_gar ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_tipe,kode_cust,kode_pic,tahun ");
									
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_gar_m","no_gar",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
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
