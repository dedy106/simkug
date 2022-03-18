window.app_saku3_transaksi_haji_fKbTitip = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_haji_fKbTitip.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_haji_fKbTitip";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Titipan Penerimaan: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,420], childPage:["List Pembayaran","Detail Pembayaran","Histori"]});		
		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi","Peserta","Akun KasBank"],
					colWidth:[[5,4,3,2,1,0],[200,200,250,150,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.cb_akun = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"No Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.cb_peserta = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Peserta",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_reg = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"No Registrasi",multiSelection:false,tag:1,change:[this,"doChange"]});		
		
		this.e_jadwal = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,470,20],caption:"Jadwal",tag:3, readOnly:true});						
		this.e_curr = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,12,200,20],caption:"Currency",readOnly:true,tag:3});										
		this.e_neto = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,12,200,20],caption:"Harga (Neto) Curr", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"Tanggal",tag:3, readOnly:true});				
		this.e_duedate = new saiLabelEdit(this.pc2.childPage[1],{bound:[290,13,200,20],caption:"Due Date (Hari)",tag:3, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,13,200,20],caption:"Saldo Curr", tag:3, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_bayar = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,13,200,20],caption:"Nilai Bayar Curr", tag:3, tipeText:ttNilai, text:"0",readOnly:true});			
		this.e_kelas = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,470,20],caption:"Kelas - Produk",tag:3, readOnly:true});					
		this.c_curr = new saiLabelEdit(this.pc2.childPage[1],{bound:[520,18,140,20],caption:"Curr Bayar - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});										
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[1],{bound:[670,18,50,20],caption:"", tag:3, labelWidth:0, readOnly:true, tipeText:ttNilai, text:"1",tag:2,change:[this,"doChange"]});						
		this.e_bayarIDR = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,18,200,20],caption:"Nilai Bayar", tag:3, tipeText:ttNilai, text:"0", change:[this,"doChange"]});					
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,200], childPage:["Biaya Tambahan"]});				
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,190],colCount:7,tag:9,
		            colTitle:["Kode","Nama Biaya","Tarif","Volume","Nilai","Saldo","Bayar"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,80,80,80,400,100]],
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],					
					colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange4"],
					autoAppend:false,defaultRow:1});		
					
		this.sg1 = new saiGrid(this.pc2.childPage[2],{bound:[0,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,
				colTitle:["No Bukti","Tanggal","Keterangan","Curr","Nilai Bayar","Curr Bayar","Kurs","Nilai Bayar"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,100,80,300,80,100]],
				readOnly:true,
				colFormat:[[4,6,7],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		this.e_totBiaya = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,195,200,20],caption:"Total Biaya", tag:3, tipeText:ttNilai, text:"0", readOnly:true});					
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join haj_akuncabang b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.modul='KB' and b.jenis='I' and b.kode_pp ='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
			this.cb_peserta.setSQL("select no_peserta, nama from haj_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",true);
			this.jenis = "BM";
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_haji_fKbTitip.extend(window.childForm);
window.app_saku3_transaksi_haji_fKbTitip.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from haj_titipbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from haj_titipbayar_tambah where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 					
					
					if (this.c_curr.getText() == "IDR") var bayar = nilaiToFloat(this.e_bayar.getText()) + nilaiToFloat(this.e_totBiaya.getText());
					else var bayar = nilaiToFloat(this.e_bayar.getText());					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_reg.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBTITIP','"+this.jenis+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+bayar+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_peserta.getText()+"','"+this.cb_reg.getText()+"','-')");
										
					if (this.c_curr.getText() != "IDR") { 
						var nilaiKasIDR = Math.round(nilaiToFloat(this.e_bayarIDR.getText()) * nilaiToFloat(this.e_kurs.getText())) + nilaiToFloat(this.e_totBiaya.getText());
						var kurs = nilaiToFloat(this.e_kurs.getText());												
						var nilaiTitipIDR = Math.round(nilaiToFloat(this.e_bayarIDR.getText()) * nilaiToFloat(this.e_kurs.getText()));
					}
					else {												
						var nilaiKasIDR = nilaiToFloat(this.e_bayarIDR.getText()) + nilaiToFloat(this.e_totBiaya.getText());												
						var kurs = 1;
						var nilaiTitipIDR = nilaiToFloat(this.e_bayarIDR.getText());
					}
					
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_reg.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiKasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_peserta.getText()+"','"+this.app._lokasi+"','KBTITIP','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+kurs+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_bayarIDR.getText())+")");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_reg.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunTitip+"','"+this.e_ket.getText()+"','C',"+nilaiTitipIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_peserta.getText()+"','"+this.app._lokasi+"','KBTITIP','TITIP','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+kurs+",'"+this.app._userLog+"',getdate(),'-',"+nilaiTitipIDR+")");
					
					sql.add("insert into haj_titipbayar_d(no_bukti,kode_lokasi,no_reg,nu,akun_titip,nilai_kas,nilai_lain,periode,dc,modul,no_peserta,kode_curr,curr_bayar,kurs,bayar_orgi,no_setor,akun_kb,kode_pp) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_reg.getText()+"',1,'"+this.akunTitip+"',"+nilaiToFloat(this.e_bayar.getText())+",0,'"+this.e_periode.getText()+"','D','KBTITIP','"+this.cb_peserta.getText()+"','"+this.e_curr.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_bayarIDR.getText())+",'-','"+this.cb_akun.getText()+"','"+this.app._kodePP+"')");																																																			
					if (this.e_totBiaya.getText() != "0") {
						if (this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg4.rowValid(i)){
									var k = i+2;
									if (nilaiToFloat(this.sg4.cells(6,i)) != 0) {
										sql.add("insert into haj_titipbayar_tambah(no_bukti,kode_lokasi,no_reg,kode_biaya,nilai,periode,no_setor,akun_kb,akun_titip,kode_pp,no_peserta) values "+
												"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_reg.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(6,i))+",'"+this.e_periode.getText()+"','-','"+this.cb_akun.getText()+"','"+this.akunTitip+"','"+this.app._kodePP+"','"+this.cb_peserta.getText()+"')");																		
										sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
												"('"+this.e_nb.getText()+"','"+this.cb_reg.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.akunTitip+"','"+this.sg4.cells(1,i).substr(0,150)+"','C',"+nilaiToFloat(this.sg4.cells(6,i))+",'"+this.app._kodePP+"','-','-','"+this.cb_peserta.getText()+"','"+this.app._lokasi+"','KBTITIP','TAMBAH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg4.cells(6,i))+")");
									}
								}
							}						
						}
					}
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
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				this.sg4.validasi();
				if (this.sg4.getRowValidCount() > 0){
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i) && (nilaiToFloat(this.sg4.cells(5,i)) < nilaiToFloat(this.sg4.cells(6,i))) ){			
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai Bayar melebihi Saldo (Baris "+k+").");
							return false;						
						}
					}						
				}
				//biaya dalam rupiah gak mungkin gabung kalo beda curr dgn bayar paketnya
				if (this.c_curr.getText() != "IDR" && nilaiToFloat(this.e_totBiaya.getText()) != 0) {
					system.alert(this,"Transaksi tidak valid.","Total Biaya harus dalam currency IDR.");
					return false;						
				}
				if (nilaiToFloat(this.e_bayar.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar melebihi Saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_bayar.getText()) == 0 || nilaiToFloat(this.e_kurs.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar atau Kurs tidak boleh nol.");
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
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from haj_titipbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from haj_titipbayar_tambah where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad3();
	},	
	doChange:function(sender){		
		if (sender == this.cb_akun && this.cb_akun.getText()!= "") {
			var data = this.dbLib.getDataProvider("select kode_curr from masakun where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);		
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.c_curr.setText(line.kode_curr);						
				} 
			}
		}
		if ((sender == this.e_periode) && this.stsSimpan==1 && this.jenis !="") this.doClick();		
		if (sender == this.c_curr && this.stsSimpan==1) {
			if (this.c_curr.getText() == this.e_curr.getText()) {
				if (this.e_curr.getText() == "IDR") {
					this.e_kurs.setReadOnly(true); 
					this.e_kurs.setText("1"); 			
				}
				else {
					this.e_kurs.setReadOnly(false); 
					this.e_kurs.setText("0"); 			
				}
			}
			else {
				if (this.stsSimpan == 1) this.e_kurs.setText("0"); 
				this.e_kurs.setReadOnly(false); 				
			}
		}						
		if (sender == this.e_bayarIDR || sender == this.e_kurs) {
			if (this.e_bayarIDR.getText() != "" && this.e_kurs.getText() != "") {				
				if (this.c_curr.getText() != this.e_curr.getText()) {
					if (nilaiToFloat(this.e_kurs.getText()) == 0) this.e_bayar.setText("0");
					else this.e_bayar.setText(floatToNilai(Math.round(nilaiToFloat(this.e_bayarIDR.getText()) / nilaiToFloat(this.e_kurs.getText()) * 100)/100));					
				}
				else {										
					this.e_bayar.setText(floatToNilai(nilaiToFloat(this.e_bayarIDR.getText())));					
				}
			}
		}
		if (sender == this.cb_peserta && this.cb_peserta.getText()!="" && this.stsSimpan==1) {
			this.cb_reg.setSQL("select a.no_reg, b.nama from haj_reg a inner join haj_jadwal b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
			                   "where a.no_peserta='"+this.cb_peserta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_reg","nama"],false,["No Reg","Nama"],"and","Data Registrasi",true);
		}
		if (sender == this.cb_reg && this.cb_reg.getText()!="" && this.stsSimpan==1) {
			var data = this.dbLib.getDataProvider(
					   "select a.nama as jadwal,convert(varchar,a.tanggal,103) as tgl,b.nama+' - '+c.nama as nama, a.harga-a.diskon as neto, round(a.harga-a.diskon-isnull(e.bayar,0),2) as saldo, a.kode_curr,datediff(day,getdate(),a.tanggal) as due_date,c.akun_titip "+
					   "from haj_jadwal a "+
					   "inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+
					   "inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi "+
					   "inner join haj_reg d on a.no_jadwal=d.no_jadwal and a.kode_lokasi=d.kode_lokasi "+
					   "left join (select no_reg,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar "+
					   "           from haj_titipbayar_d where no_reg='"+this.cb_reg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					   "           group by no_reg,kode_lokasi) e on d.no_reg=e.no_reg and d.kode_lokasi=e.kode_lokasi "+
					   "where d.no_reg='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];					
				this.akunTitip = line.akun_titip;
				this.e_tgl.setText(line.tgl);					
				this.e_curr.setText(line.kode_curr);						
				this.e_kelas.setText(line.nama);										
				this.e_jadwal.setText(line.jadwal);														
				this.e_neto.setText(floatToNilai(line.neto));																
				this.e_saldo.setText(floatToNilai(line.saldo));												
				this.e_duedate.setText(floatToNilai(line.due_date));															
			}						
			var data1 = this.dbLib.getDataProvider("select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,a.kode_curr,a.curr_bayar,a.kurs,a.nilai_kas+a.nilai_lain as nilai,a.bayar_orgi,b.tanggal "+
			            "from haj_titipbayar_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
			            "where a.no_reg='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by b.tanggal",true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg1.appendData([line1.no_bukti,line1.tgl,line1.keterangan,line1.kode_curr,floatToNilai(line1.nilai),line1.curr_bayar,floatToNilai(line1.kurs),floatToNilai(line1.bayar_orgi)]);
				}
			} else this.sg1.clear(1);																
			
			var strSQL = "select a.kode_biaya,a.nama,b.tarif,b.vol,b.nilai,b.nilai-isnull(c.bayar,0) as saldo "+
			             "from haj_biaya a inner join haj_reg_d b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi "+
						 "     left join ("+
						 "        select kode_biaya,no_reg,kode_lokasi,sum(nilai) as bayar from haj_titipbayar_tambah "+
						 "        where kode_lokasi='"+this.app._lokasi+"' and no_reg='"+this.cb_reg.getText()+"' "+
						 "        group by kode_biaya,no_reg,kode_lokasi "+
						 "     ) c on b.kode_biaya=c.kode_biaya and b.no_reg=c.no_reg and b.kode_lokasi=c.kode_lokasi "+
						 "where b.no_reg='"+this.cb_reg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_biaya";				
			var data1 = this.dbLib.getDataProvider(strSQL,true);												
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg4.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg4.appendData([line1.kode_biaya,line1.nama,floatToNilai(line1.tarif),floatToNilai(line1.vol),floatToNilai(line1.nilai),floatToNilai(line1.saldo),"0"]);
				}
				this.sg4.validasi();
			} else this.sg4.clear(1);																
			
		}																	
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.jenis != "" && this.jenis != undefined) {
			if (this.stsSimpan == 0) {
				this.cb_peserta.setText("","");
				this.cb_reg.setText("","");
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg1.clear(1);				
				this.sg4.clear(1);				
			}			
			this.stsSimpan = 1;			
			this.cb_peserta.setSQL("select no_peserta, nama from haj_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",true);
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.cb_akun.setFocus();
			setTipeButton(tbSimpan);
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();   
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
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg1.clear(1); this.sg4.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																					
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.no_link+' - '+b.nama as cust,a.akun_kb+' - '+c.nama as akun,a.tanggal "+
		             "from kas_m a "+
					 "inner join haj_peserta b on a.no_link=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 
					 "inner join haj_titipbayar_d d on a.no_kas=d.no_bukti and a.kode_lokasi=d.kode_lokasi "+					 
					 "where a.kode_pp='"+this.app._kodePP+"' and d.no_setor='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBTITIP' and a.posted ='F' "+
					 "order by a.tanggal";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,line.cust,line.akun]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_link,akun_kb,no_link,no_dokumen,jenis,ref1 "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.jenis = line.jenis;											
						this.e_ket.setText(line.keterangan);									
						this.cb_akun.setText(line.akun_kb);										
						this.cb_peserta.setSQL("select no_peserta, nama from haj_peserta where no_peserta='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["no_peserta","nama"],false,["Kode","Nama"],"and","Data Peserta",true);									
						this.cb_peserta.setText(line.no_link);									
						this.cb_reg.setSQL("select a.no_reg, b.nama from haj_reg a inner join haj_jadwal b on a.no_jadwal=b.no_jadwal and a.kode_lokasi=b.kode_lokasi "+
										   "where a.no_reg='"+line.ref1+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_reg","nama"],false,["No Reg","Nama"],"and","Data Registrasi",true);
						this.cb_reg.setText(line.ref1);																
					}
				}
								
				var data = this.dbLib.getDataProvider(
						   "select a.nama as jadwal,convert(varchar,a.tanggal,103) as tgl,b.nama+' - '+c.nama as nama, a.harga-a.diskon as neto, round(a.harga-a.diskon-isnull(e.bayar,0),2) as saldo, a.kode_curr,datediff(day,getdate(),a.tanggal) as due_date,c.akun_titip, "+
						   "       f.curr_bayar,f.nilai_kas,f.bayar_orgi,f.kurs "+
						   "from haj_jadwal a "+
						   "inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+
						   "inner join haj_produk c on b.kode_produk=c.kode_produk and b.kode_lokasi=c.kode_lokasi "+
						   "inner join haj_reg d on a.no_jadwal=d.no_jadwal and a.kode_lokasi=d.kode_lokasi "+
						   "inner join haj_titipbayar_d f on d.no_reg=f.no_reg and f.kode_lokasi=d.kode_lokasi "+
						   "left join (select no_reg,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar "+
						   "           from haj_titipbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and no_reg='"+this.cb_reg.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						   "           group by no_reg,kode_lokasi) e on d.no_reg=e.no_reg and d.kode_lokasi=e.kode_lokasi "+
						   "where f.no_setor='-' and f.no_bukti='"+this.e_nb.getText()+"' and f.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.akunTitip = line.akun_titip;
					this.e_tgl.setText(line.tgl);					
					this.e_curr.setText(line.kode_curr);											
					this.e_kelas.setText(line.nama);										
					this.e_jadwal.setText(line.jadwal);														
					this.e_neto.setText(floatToNilai(line.neto));																
					this.e_saldo.setText(floatToNilai(line.saldo));																	
					this.c_curr.setText(line.curr_bayar);											
					this.e_kurs.setText(floatToNilai(line.kurs));							
					this.e_duedate.setText(floatToNilai(line.due_date));										
					this.e_bayar.setText(floatToNilai(line.nilai_kas));																	
					this.e_bayarIDR.setText(floatToNilai(line.bayar_orgi));							
					this.e_kurs.setReadOnly(false);
				}
								
				var data1 = this.dbLib.getDataProvider("select a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,a.kode_curr,a.curr_bayar,a.kurs,a.nilai_kas+a.nilai_lain as nilai,a.bayar_orgi,b.tanggal "+
							"from haj_titipbayar_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_bukti <> '"+this.e_nb.getText()+"' and a.no_reg='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by b.tanggal",true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg1.appendData([line1.no_bukti,line1.tgl,line1.keterangan,line1.kode_curr,floatToNilai(line1.nilai),line1.curr_bayar,floatToNilai(line1.kurs),floatToNilai(line1.bayar_orgi)]);
					}
				} else this.sg1.clear(1);
				
				var strSQL = "select a.kode_biaya,a.nama,b.tarif,b.vol,b.nilai,b.nilai-isnull(c.bayar,0) as saldo,isnull(d.nilai,0) as bayar "+
							 "from haj_biaya a inner join haj_reg_d b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi "+
							 "                 left join haj_titipbayar_tambah d on d.kode_biaya=b.kode_biaya and d.kode_lokasi=b.kode_lokasi and b.no_reg=d.no_reg "+
							 "     left join ("+
							 "        select kode_biaya,no_reg,kode_lokasi,sum(nilai) as bayar from haj_titipbayar_tambah "+
							 "        where kode_lokasi='"+this.app._lokasi+"' and no_reg='"+this.cb_reg.getText()+"' and no_bukti<>'"+this.e_nb.getText()+"' "+
							 "        group by kode_biaya,no_reg,kode_lokasi "+
							 "     ) c on b.kode_biaya=c.kode_biaya and b.no_reg=c.no_reg and b.kode_lokasi=c.kode_lokasi "+
							 "where b.no_reg='"+this.cb_reg.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' order by a.kode_biaya";				
				var data1 = this.dbLib.getDataProvider(strSQL,true);												
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg4.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg4.appendData([line1.kode_biaya,line1.nama,floatToNilai(line1.tarif),floatToNilai(line1.vol),floatToNilai(line1.nilai),floatToNilai(line1.saldo),floatToNilai(line1.bayar)]);
					}
					this.sg4.validasi();
				} else this.sg4.clear(1);																
					
			}						
		} catch(e) {alert(e);}		
	},
	doChangeCell4: function(sender, col, row){		
		if (col == 6 ) this.sg4.validasi();
	},
	doNilaiChange4: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg4.cells(6,i));					
				}
			}
			this.e_totBiaya.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	}
});