window.app_saku_inventory_transaksi_fBeligbk = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fBeligbk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fBeligbk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Pembelian [GB]: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode GB",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,13,200,20],caption:"No GB Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No GB", maxLength:100, tag:1});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,9,100,18],caption:"Tanggal Terbit", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,9,100,18],date:new Date().getDateStr()});		
		this.l2_tgl2 = new portalui_label(this,{bound:[350,9,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[422,9,100,18],date:new Date().getDateStr()});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150, tag:1});				
		this.cb_gb = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Hutang GB",btnClick:[this,"doBtnClick"],change:[this,"doChange"], tag:1});
		this.e_tothut = new portalui_saiLabelEdit(this,{bound:[723,12,200,20],caption:"Total Hutang",tipeText:ttNilai,readOnly:true,text:"0", tag:1});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Bank",btnClick:[this,"doBtnClick"],tag:1,change:[this,"doChange"]});
		this.e_totbayar = new portalui_saiLabelEdit(this,{bound:[723,16,200,20],caption:"Total Bayar",tipeText:ttNilai,text:"0",readOnly:true, tag:1});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:1});		
		this.e_totret = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total Retur",tipeText:ttNilai,text:"0",readOnly:true,tag:1});
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Vendor",readOnly:true,tag:1});
		this.e_totgb = new portalui_saiLabelEdit(this,{bound:[723,18,200,20],caption:"Total GB",tipeText:ttNilai,text:"0",readOnly:true,tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,273],caption:"Item Faktur Pembelian Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,248],colCount:8,tag:2,colTitle:["No Faktur","Akun Hut","Tanggal","Keterangan","Netto","Total Bayar","Sisa Hutang","Nilai Bayar"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,60,70,230,100,100,100,100]],colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this, "doSgChange"]});				
		this.p2 = new portalui_panel(this,{bound:[20,19,900,145],caption:"Item Faktur Retur Pembelian Barang", visible: false});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var prd = this.dbLib.getDataProvider("select distinct periode from gb_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='BELI'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_fBeligbk.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fBeligbk.implement({
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
	simpan: function(){			
		try{					
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gb_m","no_gb",this.app._lokasi+"-GB"+this.e_periode.getText().substr(2,4)+".","0000"));		
						sql.add("update inv_beliretur_m set progress='0', no_kas='-' where no_kas='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update gb_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_gb,'r') where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into gb_m (no_gb,kode_lokasi,no_dokumen,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                  periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,akun_gb,kode_bank,progress,due_date,kode_vendor,tgl_terbit,kode_cust)"+
								"      select concat(no_gb,'r'),kode_lokasi,no_dokumen,akun_kb,'"+this.dp_d1.getDateString()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F',no_gb,'-',akun_gb,kode_bank,progress,due_date,kode_vendor,tgl_terbit,kode_cust "+
								"      from gb_m where no_gb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");											
						sql.add("insert into gb_j (no_gb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"                  kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"   select concat(no_gb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
								"   from gb_j where no_gb = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");														
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("update inv_beliretur_m set progress='0', no_kas='-' where no_kas='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from gb_m where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from gb_d where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from gb_j where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
										
					sql.add("insert into gb_m (no_gb,kode_lokasi,no_dokumen,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,akun_gb,kode_bank,progress,due_date,kode_vendor,tgl_terbit,kode_cust) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.akunkb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','GB','BELI','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_totgb.getText())+",'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_gb.getText()+"','"+this.cb_akun.getText()+"','0','"+this.dp_d2.getDateString()+"','"+this.cb_vend.getText()+"','"+this.dp_d3.getDateString()+"','-')");
					
					sql.add("insert into gb_j (no_gb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_gb.getText()+
							"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_totgb.getText())+",'"+this.app._kodePP+"','-',"+
							"'"+this.app._lokasi+"','GBBELI','HUTGB',"+
							"'"+this.e_periode.getText()+"','IDR',1"+
							",'"+this.app._userLog+"',now())");
					
					var j = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.getCell(7,i)) != 0){
							    j++;
								sql.add("insert into gb_j (no_gb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
										"('"+this.nb+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(1,i)+
										"','"+this.sg.cells(3,i)+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._kodePP+"','-',"+
										"'"+this.app._lokasi+"','GBBELI','HUTBELI',"+
										"'"+this.e_periode.getText()+"','IDR',1"+
										",'"+this.app._userLog+"',now())");
								
								sql.add("insert into gb_d(no_gb,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
										"                ('"+this.nb+"','"+this.sg.cells(0,i)+"','GBBELI','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(7,i))+")");
							}
						}
					}
					if (this.e_totret.getText() != "0") {
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (this.sg2.getCell(0,i) == "OFFSET"){
								    j++;
									sql.add("insert into gb_j (no_gb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
											"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
											"('"+this.nb+"','"+this.sg2.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(2,i)+
											"','Offset retur pembelian','C',"+parseNilai(this.sg2.cells(5,i))+",'"+this.app._kodePP+"','-',"+
											"'"+this.app._lokasi+"','GBBELI','RETBELI',"+
											"'"+this.e_periode.getText()+"','IDR',1"+
											",'"+this.app._userLog+"',now())");									
									sql.add("update inv_beliretur_m set progress='1', no_kas='"+this.nb+"' where no_retur='"+this.sg2.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("insert into gb_d(no_gb,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
											"                 ('"+this.nb+"','"+this.sg2.cells(1,i)+"','RETBELI','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg2.cells(5,i))+")");
								}
							}
						}
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);
					if (this.p2.visible == true) {
					    this.sg2.setTag(9);
						this.sg2.clear(1);
						this.p2.setVisible(false);
					}
				}
				break;
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (this.progress != "0") {
					system.alert(this,"Transaksi tidak valid.","GB sudah dicairkan.");
					return false;
				}
				if (this.dp_d3.toSysDate() < this.dp_d1.toSysDate()){
					system.alert(this,"Tanggal terbit gb kurang dari tanggal transaksi.","");
					return false;
				}
				if (this.dp_d2.toSysDate() < this.dp_d3.toSysDate()){
					system.alert(this,"Tanggal jth tempo kurang dari tanggal terbit.","");
					return false;
				}
				if (this.e_totret.getText() == "0") this.e_totret.setTag("9"); else this.e_totret.setTag("0");
				if ((nilaiToFloat(this.e_totgb.getText()) <= 0) || ((nilaiToFloat(this.e_totgb.getText())+nilaiToFloat(this.e_totret.getText())) > nilaiToFloat(this.e_tothut.getText()))){
					system.alert(this,"Transaksi tidak valid.","Nilai gb dan atau retur tidak boleh kurang dari atau sama dengan nol / melebihi sisa hutang.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.getCell(7,i)) > nilaiToFloat(this.sg.getCell(6,i))){
							system.alert(this,"Nilai bayar tidak valid.","Melebihi sisa hutang. Baris["+i+"]");
							return false;   
						}
						if (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(2,i))) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl faktur. Baris["+i+"]");
							return false;   
						}
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (this.progress != "0") {
					system.alert(this,"Transaksi tidak valid.","GB sudah dicairkan.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gb_m","no_gb",this.app._lokasi+"-GB"+this.e_periode.getText().substr(2,4)+".","0000"));		
						sql.add("update inv_beliretur_m set progress='0', no_kas='-' where no_kas='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update gb_m set no_del = concat(no_gb,'r') where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						sql.add("insert into gb_m (no_gb,kode_lokasi,no_dokumen,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                  periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,akun_gb,kode_bank,progress,due_date,kode_vendor,tgl_terbit,kode_cust)"+
								"      select concat(no_gb,'r'),kode_lokasi,no_dokumen,akun_kb,'"+this.dp_d1.getDateString()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F',no_gb,'-',akun_gb,kode_bank,progress,due_date,kode_vendor,tgl_terbit,kode_cust "+
								"      from gb_m where no_gb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");											
						sql.add("insert into gb_j (no_gb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"                  kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
								"   select concat(no_gb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
								"   from gb_j where no_gb = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");														
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("update inv_beliretur_m set progress='0', no_kas='-' where no_kas='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from gb_m where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from gb_d where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from gb_j where no_gb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_akun && this.cb_akun.dataFromList !== undefined) {
				this.akunkb = this.cb_akun.dataFromList[2];
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gb_m","no_gb",this.app._lokasi+"-GB"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.kode_bank,b.nama as nama_bank,a.nik_buat,c.nama as nama_buat,a.kode_vendor,d.nama as nama_vendor,a.akun_kb,a.posted,a.periode,a.nilai,a.progress,date_format(a.due_date,'%d/%m/%Y') as due_date,date_format(a.tgl_terbit,'%d/%m/%Y') as tgl_terbit,a.akun_gb,aa.nama as nama_gb, "+												  
												  "       f.no_beli,f.akun_hutang,date_format(f.tanggal,'%d/%m/%Y') as tanggal,f.keterangan,f.nilai+f.nilai_ppn as nilai_d,ifnull(g.totgb,0)+ifnull(h.totbayar,0) as totbayar,(f.nilai+f.nilai_ppn - (ifnull(g.totgb,0)+ifnull(h.totbayar,0))) as sisahut, i.ngb "+												  
												  "from gb_m a inner join bank2 b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
												  "                  inner join masakun aa on a.akun_gb=aa.kode_akun and a.kode_lokasi=aa.kode_lokasi "+
												  "                  inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
												  "                  inner join vendor  d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
												  "                  inner join gb_d e on a.no_gb=e.no_gb and a.kode_lokasi=e.kode_lokasi and e.modul='GBBELI' "+
												  "                  inner join inv_beli_m f on e.no_bukti=f.no_beli and e.kode_lokasi=f.kode_lokasi "+
												  "					 left outer join "+
												  "                     (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totgb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
												  "                      where x.kode_lokasi='"+this.app._lokasi+"' and y.modul='GBBELI' and x.no_del='-' and x.no_gb <> '"+this.cb_nbLama.getText()+"' "+
												  "                      group by y.no_bukti,x.kode_lokasi) g on f.no_beli=g.no_bukti and f.kode_lokasi=g.kode_lokasi "+  
												  "                  left outer join "+
												  "                     (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totbayar from kas_m x inner join kas_d y on x.no_kas=y.no_kas and x.kode_lokasi=y.kode_lokasi "+
												  "                      where x.kode_lokasi='"+this.app._lokasi+"' and y.modul='INVBELI' and x.no_del='-'"+
												  "                      group by y.no_bukti,x.kode_lokasi) h on f.no_beli=h.no_bukti and f.kode_lokasi=h.kode_lokasi "+  
												  "					 left outer join "+
												  "                     (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as ngb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
												  "                      where x.kode_lokasi='"+this.app._lokasi+"' and y.modul='GBBELI' and x.no_del='-' and x.no_gb = '"+this.cb_nbLama.getText()+"' "+
												  "                      group by y.no_bukti,x.kode_lokasi) i on f.no_beli=i.no_bukti and f.kode_lokasi=i.kode_lokasi "+  
												  "where a.no_gb = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_beli,line.akun_hutang,line.tanggal,line.keterangan,floatToNilai(line.nilai_d),floatToNilai(line.totbayar),floatToNilai(line.sisahut),floatToNilai(line.ngb)]);
				}
				this.sg.validasi();
				if (line !== undefined){				
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.cb_vend.setText(line.kode_vendor, line.nama_vendor);
					this.e_totgb.setText(floatToNilai(line.nilai));
					this.cb_gb.setText(line.akun_gb, line.nama_gb);
					this.dp_d2.setText(line.due_date);
					this.dp_d3.setText(line.tgl_terbit);
					this.cb_akun.onChange.set("undefined");
					this.cb_akun.setText(line.kode_bank, line.nama_bank);
					this.cb_akun.onChange.set("doChange");
					
					this.akunkb = line.akun_kb;						
					this.posted = line.posted;						
					this.progress = line.progress;						
					this.perLama = line.periode;						
				}
			}
			var data = this.dbLib.getDataProvider("select y.no_retur, date_format(y.tanggal,'%d/%m/%Y') as tanggal,y.akun_piutang,y.keterangan,y.nilai "+
												  "from gb_d x inner join inv_beliretur_m y on y.no_retur=x.no_bukti and x.kode_lokasi=y.kode_lokasi "+
												  "where x.kode_lokasi='"+this.app._lokasi+"' and x.modul='RETBELI' and y.no_del='-' and x.no_gb = '"+this.cb_nbLama.getText()+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				if (data.rs.rows[0] !== undefined) {
					this.p2.setVisible(true);
					this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,125],colCount:6,tag:9,
								colTitle:["Status","No Retur","Akun Piutang","Tanggal","Keterangan","Nilai"],
								colWidth:[[0,1,2,3,4,5],[100,160,100,70,330,100]],colFormat:[[5],[cfNilai]],
								columnReadOnly:[true,[1,2,3,4,5],[0]],autoAppend:false,buttonStyle:[[0],[bsAuto]], 
								picklist:[[0],[new portalui_arrayMap({items:["OFFSET","INPROG"]})]],
								defaultRow:1,nilaiChange:[this, "doSgChange2"], change:[this,"doChangeCell"]});				
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData(["OFFSET",line.no_retur,line.akun_piutang,line.tanggal,line.keterangan,floatToNilai(line.nilai)]);
					}
					this.sg2.validasi();
				}
				else {
					this.p2.setVisible(false);
					this.e_totret.setText("0");
				}
			}
		}
		else {
			system.alert(this,"No GB lama tidak valid.","Bukti KB harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti GB",sender,undefined, 
											  "select no_gb, no_dokumen  from gb_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and jenis='BELI' and no_del='-'", 
											  "select count(no_gb) from gb_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and jenis='BELI' and no_del='-'",
											  ["no_gb","no_dokumen"],"and",["No Bukti","No GB"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
				if (this.p2.visible == true) this.sg2.clear(1);
			}
			if (sender == this.cb_gb) {
				this.standarLib.showListData(this, "Daftar Akun Hutang GB",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='025' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='025' ",
											  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
			}
			if (sender == this.cb_akun) {				
				this.standarLib.showListData2(this, "Daftar Rekening Bank",sender,undefined, 
									  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",										  
									  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",
									  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChangeCell: function(sender, col, row){
		if ((col == 7) && (this.sg.getCell(7,row) != "")){
			this.sg.validasi();
		}
		if (sender == this.sg2) {
			if (col == 0){
				this.sg2.validasi();
			}
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(6,i) != "")
				tot1 += nilaiToFloat(this.sg.cells(6,i));
			if (this.sg.cells(7,i) != "")
				tot2 += nilaiToFloat(this.sg.cells(7,i));
		}
		this.e_tothut.setText(floatToNilai(tot1));
		this.e_totbayar.setText(floatToNilai(tot2));
		tot2 = tot2 - nilaiToFloat(this.e_totret.getText());
		this.e_totgb.setText(floatToNilai(tot2));
	},
	doSgChange2: function(sender, col, row){
		var tot2 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(0,i) == "OFFSET")
				tot2 += nilaiToFloat(this.sg2.cells(5,i));
		}
		this.e_totret.setText(floatToNilai(tot2));
		tot2 = nilaiToFloat(this.e_totbayar.getText()) - tot2;
		this.e_totgb.setText(floatToNilai(tot2));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});