window.app_saku2_transaksi_yks_fKBHutangArea = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fKBHutangArea.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fKBHutangArea";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pembayaran Hutang Mitra Area : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BK","KK"], readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_gb = new saiLabelEdit(this,{bound:[20,13,202,20],caption:"No GB/Check", maxLength:30});		
		this.e_dok = new saiLabelEdit(this,{bound:[230,13,240,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_bank = new saiCB(this,{bound:[20,22,200,20],caption:"Jenis Bank",readOnly:true,change:[this,"doChange"]}); 
		this.i_load = new portalui_imageButton(this,{bound:[225,22,20,20],hint:"Tampil Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
		this.e_kredit = new saiLabelEdit(this,{bound:[700,22,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.bJurnal = new button(this,{bound:[600,22,80,18],caption:"Jurnal",click:[this,"doJurnal"]});
				
		this.pc1 = new pageControl(this,{bound:[20,12,900,238], childPage:["Daftar Hutang","Data Detail Transfer","Data Billing","Data Item Jurnal"]});
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
				colTitle:["Status","Lokasi","No Hutang","No App","Tanggal","Keterangan","Pegawai","Pensiun","Total"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,200,80,100,100,80,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell2"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});

		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["No Invoice","Nama Rekening","No Rekening","Bank","Cabang","Pensiun","Pegawai","Total","Kode Mitra","Nama Mitra","No Hutang"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,200,80,100,100,100,300,80,200,200,120]],
					readOnly :true,
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});		
		
		this.sg4 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:13,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,70,70,70,70,100,70,70,100,100,70,100,70]],
				colFormat:[[12],[cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,200,50,150,80]],
					colMaxLength:[[9,7,5,3,2,0],[10,10,10,150,1,20]],
					columnReadOnly:[true,[1,6,8,10],[0,2,3,4,5,7,9]],
					buttonStyle:[[0,2,5,7,9],[bsEllips,bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		this.dataCF = this.app._cf;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);						
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			this.c_bank.items.clear();
			var data = this.dbLib.getDataProvider(
						"select distinct bank_trans as bank from vendor where bank_trans <> '-'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_bank.addItem(i,line.bank);
				}
			}
			this.c_bank.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fKBHutangArea.extend(window.childForm);
window.app_saku2_transaksi_yks_fKBHutangArea.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.e_gb.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBHUTAREA','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.c_bank.getText()+"','-')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(9,i)+"','-','"+this.app._lokasi+"','KBHUTAREA','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
							}
						}
					}					
					var nobukti = noapp = "";
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP") {
							nobukti += ",'"+this.sg2.cells(1,i)+this.sg2.cells(2,i)+"'";
							noapp += ",'"+this.sg2.cells(1,i)+this.sg2.cells(3,i)+"'";
							
							sql.add("insert into yk_kashutang_d(no_kas,kode_lokkas,bank_trans,bp,cc,total,no_hutang,no_app,kode_lokhut,no_rekon,kode_lokrek,akun_tak,keterangan,periode) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_bank.getText()+"',"+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+","+parseNilai(this.sg2.cells(8,i))+",'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(1,i)+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','AREA','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"')");						
							sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,no_app,no_kas,modul,nilai_bp,nilai_cc) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_nb.getText()+"','KBHUTAREA',"+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
						}
					}
														
					nobukti = nobukti.substr(1);
					noapp = noapp.substr(1);
					sql.add("update yk_hutang_d set no_rekon='"+this.e_nb.getText()+"',kode_lokrek='"+this.app._lokasi+"',no_kas ='"+this.e_nb.getText()+"',kode_lokkas='"+this.app._lokasi+"' where bank_trans='"+this.c_bank.getText()+"' and kode_lokasi+no_hutang in ("+nobukti+") and kode_lokasi+no_app in ("+noapp+") and no_kas='-' ");
							
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;
								if (this.sg.cells(9,j) == "-") {
									k = j+1;
									system.alert(this,"Transaksi tidak valid.","Akun KasBank harus diisi kode cash flow-nya. [Baris "+k+"]");
									return false;						
								}
							}
						}
					}
				}
				if (!akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
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
				else this.simpan();
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
	doLoadData:function(sender){
		if (this.c_bank.getText()!="") {
			var data = this.dbLib.getDataProvider(
						"select a.no_hutang,a.kode_lokasi,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,isnull(b.bp,0) as bp,isnull(b.cc,0) as cc,isnull(b.nilai,0) as nilai,isnull(b.no_app,'-') as no_app "+
						"from yk_hutang_m a left outer join "+
						"           (select x.no_app,x.no_hutang,x.kode_lokasi,sum(x.nilai_bp) as bp,sum(x.nilai_cc) as cc,sum(x.nilai_bp+x.nilai_cc) as nilai "+
						"		     from yk_hutang_d x "+//inner join vendor y on x.kode_vendor=y.kode_vendor and x.kode_lokasi=y.kode_lokasi "+
						"            where x.lok_bayar = '"+this.app._lokasi+"' and x.no_app<>'-' and x.no_kas ='-' and x.bank_trans='"+this.c_bank.getText()+"' and x.periode <='"+this.e_periode.getText()+"' "+
						"			 group by x.no_app,x.no_hutang,x.kode_lokasi) b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						"where isnull(b.nilai,0) <> 0 and  a.periode<='"+this.e_periode.getText()+"' order by a.kode_lokasi,a.no_hutang",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData(["APP",line.kode_lokasi,line.no_hutang,line.no_app,line.tanggal,line.keterangan,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
		}
	},
	doChange:function(sender){
		if (sender == this.c_bank && this.c_bank.getText() != "") {
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 	
		}
	},
	doJurnal:function(sender){
		if (this.cb_akun.getText() != "") {
			var nobukti = noapp = "";
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(0,i) == "APP") {
					nobukti += ",'"+this.sg2.cells(1,i)+this.sg2.cells(2,i)+"'";
					noapp += ",'"+this.sg2.cells(1,i)+this.sg2.cells(3,i)+"'";
				}
			}
			nobukti = nobukti.substr(1);
			noapp = noapp.substr(1);
			var strSQL = "select "+
						"case f.jenis when 'PENSIUN' then "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+ 
						"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
						"		 when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
						"		 when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
						"   end "+
						"else "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
						"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
						"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
						"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
						"   end "+
						"end as kode_akun, b.nama as nama_akun,'D' as dc, "+
						"case f.jenis when 'PENSIUN' then 'PEMBYR HUTANG PENSIUN' else 'PEMBYR HUTANG PEGAWAI' end as ket, "+
						"sum(a.nilai-a.pph) as total,e.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk,'-' as kode_cf,'-' as nama_cf "+
						"from yk_bill_d a "+
						"inner join cust f on a.loker=f.kode_cust "+
						"inner join vendor y on a.kode_vendor=y.kode_vendor and a.kode_lokasi=y.kode_lokasi "+
						"inner join vendor_klp bb on bb.kode_klpvendor=y.kode_klpvendor and bb.kode_lokasi=y.kode_lokasi  "+
						"inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp = '"+this.app._kodePP+"' "+
						"inner join masakun b on b.kode_lokasi=a.kode_lokasi and b.kode_akun = (case f.jenis when 'PENSIUN' then "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
						"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
						"		 when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
						"	     when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
						"   end "+
						"else "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
						"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
						"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
						"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
						"   end "+
						"end) "+
						"where a.no_kas = '-' and y.bank_trans = '"+this.c_bank.getText()+"' and "+
						"	  a.kode_lokasi+a.no_hutang in ("+nobukti+") and a.kode_lokasi+a.no_app in ("+noapp+") "+
						"group by e.kode_pp,e.nama,b.nama,"+
						"case f.jenis when 'PENSIUN' then "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
						"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
						"	     when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
						"	     when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
						"   end "+
						"else "+
						"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
						"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
						"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
						"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
						"   end "+
						"end,case f.jenis when 'PENSIUN' then 'PEMBYR HUTANG PENSIUN' else 'PEMBYR HUTANG PEGAWAI' end "+
						"union "+
			
						"select '"+this.cb_akun.getText()+"' as kode_akun,'"+this.cb_akun.rightLabelCaption+"' as nama_akun,'C' as dc,'PEMBYR HUTANG PEGAWAI' as ket,sum(a.nilai_bp) as total,'"+this.app._kodePP+"' as kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk,c.flag as kode_cf,b.nama as nama_cf "+
						 "from yk_hutang_d a "+
						 "	   inner join spro c on c.kode_lokasi='"+this.app._lokasi+"' and c.kode_spro='CFHUTBP'    "+
						 "	   inner join neracacf b on b.kode_lokasi='"+this.app._lokasi+"' and b.kode_cf=c.flag "+
						 "	   inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp = '"+this.app._kodePP+"' "+
						 "where a.no_kas = '-' and a.bank_trans='"+this.c_bank.getText()+"' and a.kode_lokasi+a.no_hutang in ("+nobukti+") and a.kode_lokasi+a.no_app in ("+noapp+") "+
						 "group by c.flag,b.nama,e.nama "+
						 "union "+
						 
						 "select '"+this.cb_akun.getText()+"' as kode_akun,'"+this.cb_akun.rightLabelCaption+"' as nama_akun,'C' as dc,'PEMBYR HUTANG PENSIUN' as ket,sum(a.nilai_cc) as total,'"+this.app._kodePP+"' as kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk,c.flag as kode_cf,b.nama as nama_cf "+
						 "from yk_hutang_d a "+
						 "	   inner join spro c on c.kode_lokasi='"+this.app._lokasi+"' and c.kode_spro='CFHUTCC'    "+
						 "	   inner join neracacf b on b.kode_lokasi='"+this.app._lokasi+"' and b.kode_cf=c.flag "+
						 "	   inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp = '"+this.app._kodePP+"' "+
						 "where a.no_kas = '-' and a.bank_trans='"+this.c_bank.getText()+"' and a.kode_lokasi+a.no_hutang in ("+nobukti+") and a.kode_lokasi+a.no_app in ("+noapp+") "+
						 "group by c.flag,b.nama,e.nama order by dc desc";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun.toUpperCase(),line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.total),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.kode_cf,line.nama_cf]);
				}
			}
			this.sg.validasi();
			this.pc1.setActivePage(this.pc1.childPage[3]);
		} 
		else system.alert(this,"Akun KasBank harus diisi.","Akun KasBank tidak valid.");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_gb.setFocus();
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
				//sender.cells(7,row,"");
				//sender.cells(8,row,"");
			}
		}
		if (col == 5) {
			if (this.sg.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
				//sender.cells(7,row,"");
				//sender.cells(8,row,"");
			}
		}
		if (col == 7) {
			if (this.sg.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and b.kode_drk = '"+this.sg.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(8,row,line.nama);
					else {
						if (!isAda) this.sg.cells(8,row,"-");
						else {
							this.sg.cells(7,row,"");
							this.sg.cells(8,row,"");
						}
					}
				}
			}
		}
		if (col == 9) {
			var cf = this.dataCF.get(sender.cells(9,row));
			if (cf) sender.cells(10,row,cf);
			else {
				if (trim(sender.cells(9,row)) != "") 
				system.alert(this,"Kode Arus Kas "+sender.cells(9,row)+" tidak ditemukan","Inputkan kode lainnya.","checkCF");                
				sender.cells(9,row,"");
				sender.cells(10,row,"");
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doChangeCell2: function(sender, col, row){
		if (col == 0) {
			this.sg.clear(1);
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
				if (col == 9){
					this.standarLib.showListData(this, "Daftar Arus Kas",sender,undefined, 
												  "select kode_cf,nama       from neracacf where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_cf)     from neracacf where tipe='posting' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_cf","nama"],"and",["Kode","Nama"],true);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg2.cells(2,row) != "" && this.sg2.cells(3,row) != "") {
			var data = this.dbLib.getDataProvider("select a.no_inv,a.nama_rek,a.no_rek,a.bank,a.cabang,a.nilai_bp,a.nilai_cc,(a.nilai_bp+a.nilai_cc) as total, a.kode_vendor,b.nama as vendor,a.kode_lokasi+a.no_hutang as no_hutang "+
			                                      "from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
												  "where a.no_kas='-' and a.bank_trans='"+this.c_bank.getText()+"' and a.no_hutang='"+this.sg2.cells(2,row)+"' and a.no_app='"+this.sg2.cells(3,row)+"' and a.kode_lokasi='"+this.sg2.cells(1,row)+"' order by a.kode_vendor+' - '+b.nama",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.no_inv,line.nama_rek,line.no_rek,line.bank,line.cabang,floatToNilai(line.nilai_cc),floatToNilai(line.nilai_bp),floatToNilai(line.total),line.kode_vendor,line.vendor,line.no_hutang]);
				}
			}		
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doDoubleClick2: function(sender, col , row) {
		if (this.sg3.cells(0,row) != "") {
			var strSQL = "select kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,convert(varchar,tgl_masuk,103) as tgl_masuk,convert(varchar,tgl_keluar,103) as tgl_keluar,icdx,kode_produk,nilai "+
			             "from yk_bill_d "+
						 "where kode_vendor='"+this.sg3.cells(8,row)+"' and kode_lokasi+no_hutang='"+this.sg3.cells(10,row)+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn4.rearrange();
				this.doTampilData(1);
			} else this.sg4.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		} 
	},	
	doTampilData: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg4.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai)]);
		}
		this.sg4.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});