window.app_saku3_transaksi_sju16_fAkruBatal = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sju16_fAkruBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fAkruBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Akru Tagihan", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Jurnal"]});		
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,500,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.c_perAkru = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Periode Akru",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Bukti Akru", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,12,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Tertanggung",readOnly:true, tag:1,change:[this,"doChange"]}); 
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,18,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,235], childPage:["Data Polis","Detail Premi","Detail Jurnal"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:15,tag:9,
				colTitle:["Status","No Bukti","No Polis | Sertifikat","Tgl Inv.","Unit","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total","Kurs"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,80,80,80,80,80,50,150,150,70,200,80,70]],
				readOnly:true, change:[this,"doChangeCell"], dblClick:[this,"doDoubleClick"],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BATAL","BILL"]})]],				
				colFormat:[[7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:15,tag:9,
				colTitle:["No Bukti","No Polis","Tgl Inv.","Unit","Penanggung","Status","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,50,150,60,150,150,70,150,150]],
				readOnly:true,
				colFormat:[[8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:12,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","No Register","Segmen","Penanggung","Tertanggung","COB","PIC","Jenis"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,100,100,100,100,100,80,   100,200,50,150,80]],										
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);				
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}

			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ026' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						

			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.c_perAkru.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from trans_m where modul = 'PR' and form='BILL' and kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_perAkru.addItem(i,line.periode);
				}
			}
			this.c_perAkru.setText("");

			}catch(e){
				systemAPI.alert(e);
			}
	}
};
window.app_saku3_transaksi_sju16_fAkruBatal.extend(window.childForm);
window.app_saku3_transaksi_sju16_fAkruBatal.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();						
					//tidak bisa pake logik dianggap dibayar- krn data termin tidak bisa di modifikasi total dan rincian mesti sama 
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PR','BTL_BILL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_debet.getText())+",0,0,'"+this.cb_app.getText()+"','-','-','"+this.e_nb2.getText()+"','-','-','-','"+this.c_perAkru.getText()+"','"+this.c_jenis.getText()+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BATAL"){								
								sql.add("insert into sju_bill_d (no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,dc,kode_vendor,ke,no_billseb,nilai_hutang) "+
										"select no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,'"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"',kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,'C',kode_vendor,ke,no_bill,(premi+p_cost+materai-fee-diskon-ppn) "+
										"from sju_polis_termin  "+										
										"where no_polis='"+this.sg1.cells(1,i)+"' and no_bill='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
								
								sql.add("update sju_polis_termin set no_bill='-',kurs=0,akun_piutang='-',akun_hutang='-' where kode_lokasi='"+this.app._lokasi+"' and no_bill='"+this.e_nb2.getText()+"' and no_polis='"+this.sg1.cells(1,i)+"'");								
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(4,i)) != 0) {
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg2.cells(5,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+
									nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(3,i)+"','PR','"+this.sg2.cells(11,i)+"','IDR',1,'"+this.sg2.cells(6,i)+"','-','"+this.sg2.cells(8,i)+"','"+this.sg2.cells(7,i)+"','-','-','"+this.sg2.cells(9,i)+"','"+this.sg2.cells(10,i)+"','-')");
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);							
					this.doClick();
				break;
			case "simpan" :								
				var stsBatal = 0;
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BATAL"){								
						stsBatal = 1;											
					}
				}
				if (stsBatal == 0) {
					system.alert(this,"Transaksi tidak valid.","Tidak ada tagihan yang berstatus BATAL.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					 system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}				
				else this.simpan();
			break;							
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		this.doClick();				
	},		
	doClick:function(sender){				
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {						
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%";
			var data = this.dbLib.getDataProvider("select isnull(max(no_bukti),0) as no_bukti from trans_m where no_bukti like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_bukti == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_bukti.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
					}
				} 
			}			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1 ) this.doClick();		
		if (sender == this.c_perAkru || sender == this.c_perAkru.getText()!="") 
			this.e_nb2.setSQL("select no_bukti,keterangan from trans_m where modul = 'PR' and form='BILL' and periode='"+this.c_perAkru.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);
		
		if (sender == this.e_nb2 && this.e_nb2.getText()!="") {
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1);			
			var strSQL =  "select distinct a.kode_cust, a.nama from sju_cust a  "+
						  "inner join sju_polis_m b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi  "+
						  "inner join sju_polis_termin c on b.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi  "+
						  "inner join karyawan_pp d on b.kode_pp=d.kode_pp and b.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"'" +
						  "where c.no_bill='"+this.e_nb2.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_cust.setText(line.kode_cust,line.nama);
				}
			}			
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			var strSQL = "select 'BILL' as status,a.no_polis,b.no_dok+' | '+b.no_dok2 as no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,"+
						 "b.kode_curr,sum(a.premi) as premi,sum(a.fee) as fee,sum(a.diskon) as diskon,sum(a.p_cost) as p_cost,sum(a.ppn) as ppn,sum(a.materai) as materai,sum(a.premi - a.diskon + a.p_cost + a.materai) as total,a.kurs "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+						 
						 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+						 
						 
						 "left join (select kode_lokasi,no_bill,no_polis,sum(nilai_kas+nilai_lain) as nilai_bayar from sju_polisbayar_d "+
						 "           where kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,no_bill,no_polis) f "+
						 "on a.no_bill=f.no_bill and a.no_polis=f.no_polis and a.kode_lokasi=f.kode_lokasi "+
						 
						 "where isnull(f.nilai_bayar,0) = 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and b.kode_cust='"+this.cb_cust.getText()+"' "+
						 "group by a.no_polis,b.no_dok,b.no_dok2,a.tgl_bill,d.kode_pp,d.nama,e.kode_cust,e.nama,b.kode_curr,a.kurs ";			

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg1.appendData([line.status.toUpperCase(),line.no_polis,line.no_dok,line.tgl_bill,line.pp,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total),floatToNilai(line.kurs)]);
				}
			} else this.sg1.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}		
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) this.doJurnal(); 
	},
	doJurnal : function(){		
		this.sg2.clear();		
		var polisTermin = ""; 
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="BATAL") {
				var data = this.dbLib.getDataProvider("select no_polis+cast(nu as varchar) as id_termin from sju_polis_termin where no_bill='"+this.e_nb2.getText()+"' and no_polis='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var j in data.rs.rows){
						line = data.rs.rows[j];	
						polisTermin += ",'"+line.id_termin+"'";						
					}
				} 
			}			
		}
		polisTermin = polisTermin.substr(1);			
		if (polisTermin == "") { 
			polisTermin = "''";
			this.sg2.clear(1);
		}
		
		var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.keterangan,a.no_polis,a.kode_pp,a.kode_vendor,a.kode_cust,a.kode_tipe,a.kode_pic,a.jenis "+
				 "from "+
				 "( "+
				 "select a.kode_lokasi,d.akun_piutang as kode_akun,'C' as dc,aa.kode_pp, "+
				 "sum((a.premi-a.diskon+a.p_cost+a.materai) * a.kurs) as nilai, 'piutang atas '+f.nama+' polis '+aa.no_dok as keterangan, a.no_polis, "+
				 "a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic, 'AR' as jenis "+						 
				 "from sju_polis_termin a "+
				 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+				 
				 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
				 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
				 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+							 
				 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and  a.no_polis+cast(a.nu as varchar) in ("+polisTermin+") "+
				 "group by a.kode_lokasi,aa.kode_pp,d.akun_piutang,f.nama,aa.no_dok, a.no_polis, "+
				 "		   a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic "+
				 "union all "+
											 
				 "select a.kode_lokasi,d.akun_fee as kode_akun,'D' as dc,aa.kode_pp, "+
				 "sum(a.fee * a.kurs) as nilai, 'brokerage atas '+f.nama+' polis '+aa.no_dok as keterangan, a.no_polis, "+
				 "a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic,'FEE' as jenis "+
				 "from sju_polis_termin a "+
				 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+				 
				 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
				 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
				 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
				 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and  a.no_polis+cast(a.nu as varchar) in ("+polisTermin+") "+
				 "group by a.kode_lokasi,aa.kode_pp,d.akun_fee,f.nama,aa.no_dok, a.no_polis, "+
				 "		   a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic "+						 							 
				 "union all "+
				 
				 "select a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'D' as dc,aa.kode_pp, "+						 
				 "sum(a.ppn * a.kurs) as nilai, 'hutangn ppn atas '+f.nama+' polis '+aa.no_dok, a.no_polis, "+
				 "a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic,'HPPN' as jenis "+						 
				 "from sju_polis_termin a "+
				 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+				 
				 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
				 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
				 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
				 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and  a.no_polis+cast(a.nu as varchar) in ("+polisTermin+") "+
				 "group by a.kode_lokasi,aa.kode_pp,f.nama,aa.no_dok, a.no_polis, "+							
				 "		  a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic "+ 
				 "union all "+						 
				 
				 "select a.kode_lokasi,e.akun_hutang as kode_akun,'D' as dc,aa.kode_pp, "+						 
				 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * a.kurs) as nilai,'hutang atas '+e.nama+' polis '+aa.no_dok, a.no_polis, "+
				 "a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic,'AP' as jenis "+
				 "from sju_polis_termin a "+
				 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+				 
				 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
				 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and  a.no_polis+cast(a.nu as varchar) in ("+polisTermin+") "+
				 "group by a.kode_lokasi,aa.kode_pp,e.akun_hutang,e.nama,aa.no_dok, a.no_polis, "+
				 "         a.kode_vendor,aa.kode_cust,aa.kode_tipe,aa.kode_pic "+
				 
				 ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
											 						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan.toUpperCase(),floatToNilai(line.nilai),line.no_polis,line.kode_pp,line.kode_vendor,line.kode_cust,line.kode_tipe,line.kode_pic,line.jenis.toUpperCase()]);
			}
		} else this.sg2.clear(1);		
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
			totD = Math.round(totD * 100)/100;
			totC = Math.round(totC * 100)/100;
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(1,row) != "" && this.e_nb2.getText()!="") {						
				var strSQL = "select a.no_polis,b.no_dok+' | '+b.no_dok2 as no_dok,convert(varchar,a.due_date,103) as due_date,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
						 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,(a.premi - a.diskon + a.p_cost + a.materai) as total,a.nu,ff.status "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+						 
						 "inner join sju_polis_vendor ff on b.no_polis=ff.no_polis and ff.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_vendor f on f.kode_vendor=ff.kode_vendor and f.kode_lokasi=ff.kode_lokasi "+						 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb2.getText()+"' and b.no_polis='"+this.sg1.cells(1,row)+"' order by a.nu";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg3.appendData([line.no_polis,line.no_dok,line.due_date,line.pp,line.vendor,line.status,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total)]);
					}
				} else this.sg3.clear(1);										
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
			else system.alert(this,"No Bukti Tagihan tidak valid.","Data harus dipilih.");
		} catch(e) {alert(e);}
	},		   
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report="server_report_saku3_sju16_rptKbRincianAkru";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);				
			this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});
