window.app_saku2_transaksi_yks_fRevBill = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fRevBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fRevBill";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Data Billing: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick2"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BILL","KUNJCS","TAKBILL","TAKKUNJCS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_bill = new saiCBBL(this,{bound:[20,15,210,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.c_status = new saiCB(this,{bound:[20,22,202,20],caption:"Status Rev.",items:["REVNONAKTIF"], readOnly:true,tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[720,22,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Range Tgl Keluar", underline:true});		
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this,{bound:[240,11,100,18]}); 
		this.i_load = new portalui_imageButton(this,{bound:[345,11,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bJurnal = new button(this,{bound:[615,11,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		this.e_kredit = new saiLabelEdit(this,{bound:[720,11,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Detail Billing","Jurnal Reverse"]});		
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
				colTitle:["Kode Mitra","Tgl Keluar","NIK","Nama","Loker","Loker Valid","Area Host","Band","NIKKES","Nama Pasien","Kode Biaya","Nama Biaya","Total Nilai"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,70,100,70,70,70,80,70,100,70,100,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]],
				colFormat:[[12],[cfNilai]],autoAppend:false,defaultRow:1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
	
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			
			this.c_jenis.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fRevBill.extend(window.childForm);
window.app_saku2_transaksi_yks_fRevBill.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-ARREV"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','ARREV','X','F')");	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','ARREV','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								if (this.sg2.cells(6,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','ARREV','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}								
							}
						}
					}
					
					var tgl = "";					
					if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL") {
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];									
							tgl = line.no_ref.substr(6,4)+"-"+line.no_ref.substr(3,2)+"-"+line.no_ref.substr(0,2);
							if (this.c_status.getText() == "REVNONAKTIF") var status = "X"; else var status = "0";
							sql.add("update yk_bill_d set flag_aktif='"+status+"' where tgl_keluar='"+tgl+"' and nik='"+line.nik+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("insert into yk_bill_rev(no_rev,no_bill,kode_lokasi,nik,tgl_keluar,nilai,jenis,kode_produk,nikkes,icdx,loker_valid,kode_vendor) values "+
							        "('"+this.e_nb.getText()+"','"+this.cb_bill.getText()+"','"+this.app._lokasi+"','"+line.nik+"','"+tgl+"',"+line.nilai+",'BILL','"+line.kode_produk+"','"+line.nikkes+"','"+line.icdx+"','"+line.loker_valid+"','"+line.kode_vendor+"')");		
						}
					}
					if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS") {
						for (var i=0;i < this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.loker_bast != line.loker_scan) {
								tgl = line.no_ref.substr(6,4)+"-"+line.no_ref.substr(3,2)+"-"+line.no_ref.substr(0,2);
								if (this.c_status.getText() == "REVNONAKTIF") var status = "X"; else var status = "0";
								sql.add("update yk_billkunj_d set flag_aktif='"+status+"'  where tgl_keluar='"+tgl+"' and nik='"+line.nik+"' and no_bill='"+this.cb_bill.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("insert into yk_bill_rev(no_rev,no_bill,kode_lokasi,nik,tgl_keluar,nilai,jenis,kode_produk,nikkes,icdx,loker_valid,kode_vendor) values "+
							            "('"+this.e_nb.getText()+"','"+this.cb_bill.getText()+"','"+this.app._lokasi+"','"+line.nik+"','"+tgl+"',"+line.nilai+",'KUNJ','"+line.kode_produk+"','"+line.nikkes+"','-','"+line.loker_valid+"','-')");		

							}
						}
					}
					sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,no_app,no_kas,modul,nilai_bp,nilai_cc) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',a.kode_vendor,a.kode_vendor,'"+this.e_nb.getText()+"','REVBILL',"+
							"sum(case when b.jenis <> 'PENSIUN' then a.nilai else 0 end) as nilai_bp, "+
							"sum(case when b.jenis = 'PENSIUN' then a.nilai else 0 end) nilai_cc "+
							"from yk_bill_rev a inner join cust b on a.loker_valid = b.kode_cust "+
							"where a.jenis = 'BILL' and a.no_rev='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by a.kode_vendor");
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick2:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-ARREV"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doChange : function(sender) {
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {						 
			if (this.c_jenis.getText() == "BILL")   this.cb_bill.setSQL("select no_bill, keterangan from yk_bill_m where progress='2' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Billing",true);
			if (this.c_jenis.getText() == "KUNJCS") this.cb_bill.setSQL("select no_bill, keterangan from yk_billkunj_m where progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Keterangan"],"and","Data Bill Kunj - Cost Sharing",true);			
			if (this.c_jenis.getText() == "TAKBILL" || this.c_jenis.getText() == "TAKKUNJJCS")   
			   this.cb_bill.setSQL("select no_valid, keterangan from yk_valid_m where modul = 'TAKTERIMA' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_valid","keterangan"],false,["No Tak Terima","Keterangan"],"and","Data Billing TAK TRM",true);			
		}				
		if (sender == this.cb_bill || sender == this.cb_loker) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1);
			this.sg2.clear(1);
		}
	},	
	doClick:function(sender){
		this.sg2.clear(1);
		if (sender == this.i_load && this.cb_bill.getText()!="") {					
			if (this.c_jenis.getText() == "BILL" || this.c_jenis.getText() == "TAKBILL")
				var data = this.dbLib.getDataProvider("select a.kode_vendor,convert(varchar,a.tgl_keluar,103) as no_ref,a.nik,a.nama,a.loker,a.loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.nilai,a.icdx  "+
						  "from yk_bill_d a inner join cust b on a.loker_valid=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
						  "where a.flag_aktif ='1' and a.tgl_keluar between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and a.no_valid<>'-' and a.no_piutang = '-' order by a.nik,a.tgl_keluar",true);
			if (this.c_jenis.getText() == "KUNJCS" || this.c_jenis.getText() == "TAKKUNJCS")
				var data = this.dbLib.getDataProvider("select '-' as kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker,a.loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.umum+a.gigi+a.kbia+a.matkes+a.cs as nilai,'-' as icdx "+
						  "from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						  "where a.flag_aktif ='1' and a.tgl_masuk between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and no_valid<>'-'  and a.no_piutang = '-' order by a.nik,a.tgl_keluar",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}		
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.loker_valid,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.kode_produk,line.nama_produk,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doJurnal:function(sender){		
		this.pc1.setActivePage(this.pc1.childPage[0]);
		this.sg2.clear(); 		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";		
		var strSQL ="select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.kode_drk "+
					"from "+
					"( "+	
					"select "+
					"case f.jenis when 'PENSIUN' then b.akun_cc "+
					"             when 'PEGAWAI' then b.akun_unbill  "+
					"             when 'GROUP' then b.akun_ap  "+
					"             when 'MITRA' then b.akun_mitra "+
					"end as kode_akun,'C' as dc, "+
					"sum(a.nilai) as nilai, "+
					"case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis, "+
					"case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a  "+
					"      inner join cust f on a.loker=f.kode_cust  "+
					"      inner join yk_produk b on a.kode_produk=b.kode_produk "+
					"where a.flag_aktif ='1' and a.tgl_keluar between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and  "+
					"            a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and no_valid<>'-' and no_piutang='-' "+
					"group by "+
					"case f.jenis when 'PENSIUN' then b.akun_cc "+
					"             when 'PEGAWAI' then b.akun_unbill  "+
					"             when 'GROUP' then b.akun_ap "+
					"             when 'MITRA' then b.akun_mitra "+ 
					"end, "+
					"case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,a.kode_lokasi, "+
					"case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end "+
					"union "+
					"select "+
					"case f.jenis when 'PENSIUN' then "+
					"  case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
					"       when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
					"       when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
					"       when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
					"  end "+
					"else "+
					"  case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
					"       when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
					"       when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
					"       when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
					"  end "+
					"end as kode_akun,'D' as dc, sum(a.nilai - a.pph) as nilai,  "+
					"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a "+
					"     inner join cust f on a.loker=f.kode_cust "+
					"     inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi  "+
					"     inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi   "+
					"where a.flag_aktif ='1' and a.tgl_keluar between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and  "+
					"            a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bill='"+this.cb_bill.getText()+"' and a.no_tak='-' and no_valid<>'-' and no_piutang='-' "+
					"group by "+
					"case f.jenis when 'PENSIUN' then "+
					"  case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
					"       when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
					"       when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
					"       when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
					"  end "+
					"else "+
					"  case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
					"       when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
					"       when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
					"       when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
					"  end "+
					"end, "+
					"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end,a.kode_lokasi "+
				    ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun ";							
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),ket,floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
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