window.app_saku2_transaksi_kopeg_sju_fAkruTagihIE = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_kopeg_sju_fAkruTagihIE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fAkruTagihIE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Tagihan: Input", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		//,date:new Date().getDateStr() <---bikin error
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Jurnal","Data Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Periode","Deskripsi","Approval"],
					colWidth:[[4,3,2,1,0],[200,400,80,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.c_jenis = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[1],{bound:[785,14,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[1],{bound:[785,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bJurnal = new button(this.pc2.childPage[1],{bound:[678,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,20,990,325], childPage:["Data Kurs","Jurnal Akru","Data Invoice"]});					
		this.sgCurr = new saiGrid(this.pc1.childPage[0],{bound:[0,5,400,this.pc1.height-10],colCount:3,tag:2,
				colTitle:["Kode Curr","Nama","Kurs"],
				colWidth:[[2,1,0],[80,200,80]],
				columnReadOnly:[true,[0,1],[2]],
				colFormat:[[2],[cfNilai]],defaultRow:1,autoAppend:false});		
		this.bKurs = new button(this.pc1.childPage[0],{bound:[420,5,80,18],caption:"Get Kurs",click:[this,"doGetkurs"]});			
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode Ttg","Nama Tertanggung","Kode Png","Nama Penanggung","Kode PP","Nama PP"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,100,300,50,150,80]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:15,tag:0,
				colTitle:["No Bukti","No Polis","Tgl Inv.","Unit","Penanggung","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total","ID"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,80,80,80,80,80,50,150,150,150,70,130,100]],
				readOnly:true,
				colFormat:[[7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
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
			var data = this.dbLib.getDataProvider("select kode_curr,nama,case when kode_curr = 'IDR' then 1 else 0 end as kurs from curr order by kode_curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgCurr.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sgCurr.appendData([line.kode_curr,line.nama,floatToNilai(line.kurs)]);
				}
			} else this.sgCurr.clear(1);									
			this.stsSimpan = 1;						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'AR' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fAkruTagihIE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fAkruTagihIE.implement({		
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					 										
					this.stsIns = 1;
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_polis_termin set no_bill='-',kurs=0,akun_piutang='-',akun_hutang='-'  where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}										
					else {
						var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%";//+this.c_jenis.getText().substr(2,3);
						var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								if (line.no_ju == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
								else {
									var idx = parseFloat(line.no_ju.substr(8,3)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "00"+idx;
									if (idx.length == 2) var nu = "0"+idx;
									if (idx.length == 3) var nu = idx;
									this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
								}
							} 
						}
					}
					//untuk no bukti di simpan di ju (posted='X')
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','-','BILLAKRU','"+this.c_jenis.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','X','-','-','-',getdate(),'"+this.app._userLog+"')");					
					sql.add("insert into sju_bill_m (no_bill,kode_lokasi,tanggal,keterangan,kode_curr,kurs,nik_app,nilai,periode,nik_user,tgl_input,posted,no_dokumen,jenis,modul) values "+
							 "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,'"+this.cb_app.getText()+"',"+nilaiToFloat(this.e_debet.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'F','-','"+this.c_jenis.getText()+"','INPUT')");					
					for (var i=0;i<this.dataJU2.rs.rows.length;i++){
						line = this.dataJU2.rs.rows[i];			
						if (parseFloat(line.nilai) != 0) {
							sql.add("insert into sju_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+line.keterangan.toUpperCase()+"','"+line.dc.toUpperCase()+"',"+line.nilai+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','ASBILL','BILL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						}
					}					
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];													
						sql.add("update sju_polis_termin set no_bill='"+this.e_nb.getText()+"' "+
								"where kode_lokasi='"+this.app._lokasi+"' and no_polis='"+line.no_polis+"' and nu="+nilaiToFloat(line.nu));
					}
					sql.add("update a set a.kurs=b.kurs,a.akun_piutang=d.akun_piutang,a.akun_hutang=e.akun_hutang "+
							"from sju_polis_termin a "+
							"     inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							"     inner join sju_curr_tmp b on a.kode_curr=b.kode_curr and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+ 
							"     inner join sju_tipe d on aa.kode_tipe=d.kode_tipe and aa.kode_lokasi=d.kode_lokasi "+
							"     inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("insert into sju_bill_d (no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,dc,kode_vendor,ke) "+
							"select no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,'D',kode_vendor,ke "+
							"from sju_polis_termin where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("delete from sju_curr_tmp where nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");				
					
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
					this.sg.clear(1);this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.sgCurr.validasi();
				for (var i=0;i < this.sgCurr.getRowCount();i++){					
					if (this.sgCurr.rowValid(i)){
						if (this.sgCurr.cells(0,i) == "IDR" && this.sgCurr.cells(2,i) != "1") {
							system.alert(this,"Data Kurs tidak valid.","Kurs IDR harus 1");
							return false;						
						}
					}
				}				
				this.sg2.validasi();
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}	
					else {	
						this.stsIns = 1;
						this.preView = "0";
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_polis_termin set no_bill='-',kurs=0,akun_piutang='-',akun_hutang='-'  where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						setTipeButton(tbAllFalse);	
						this.dbLib.execArraySQL(sql);				
					}
				break								
		}
	},		
	doSelectDate: function(sender, y,m,d){		
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}															
			this.dataJU = {rs:{rows:[]}};
			this.dataJU2 = {rs:{rows:[]}};
			this.doLoad3();			
			this.sg.clear(1);			
			this.sg2.clear(1);			
			//this.pc2.setActivePage(this.pc2.childPage[0]); bolakbalik lemot
		}
		catch(e) {
			alert(e);
		}
	},
	doGetkurs:function(sender){		
		for (var i=0;i < this.sgCurr.getRowCount();i++) {
			if (this.sgCurr.cells(0,i) != "IDR") {
				var data = this.dbLib.getDataProvider("select kurs from sju_kurs where kode_curr ='"+this.sgCurr.cells(0,i)+"' and tanggal='"+this.dp_d1.getDateString()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sgCurr.cells(2,i,parseFloat(line.kurs));						
					else this.sgCurr.cells(2,i,"0");
				} else this.sgCurr.cells(2,i,"0");					
			}				
		}
	},
	doJurnal:function(sender){		
		try {			
			if (this.e_periode.getText() != "") {
				uses("server_util_arrayList");				
				var sql = new server_util_arrayList();				
				this.dataJU = {rs:{rows:[]}};
				this.dataJU2 = {rs:{rows:[]}};				
				this.stsIns = 0;
				sql.add("delete from sju_curr_tmp where nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");				
				if (this.sgCurr.getRowValidCount() > 0){
					for (var i=0;i < this.sgCurr.getRowCount();i++){
						if (this.sgCurr.rowValid(i)){
							if (this.sgCurr.cells(0,i) == "IDR") {
								sql.add("insert into sju_curr_tmp(kode_curr,kurs,nik_user,kode_lokasi) values "+
									"('"+this.sgCurr.cells(0,i)+"',1,'"+this.app._userLog+"','"+this.app._lokasi+"')");
							}
							else {
								sql.add("insert into sju_curr_tmp(kode_curr,kurs,nik_user,kode_lokasi) values "+
										"('"+this.sgCurr.cells(0,i)+"',"+nilaiToFloat(this.sgCurr.cells(2,i))+",'"+this.app._userLog+"','"+this.app._lokasi+"')");
							}
						}
					}
				}				
				this.dbLib.execArraySQL(sql);
				
				var strSQL = "select a.no_polis,b.no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
							 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,(a.premi - a.diskon + a.p_cost + a.materai) as total,a.nu "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+							 
							 "inner join sju_polis_vendor ee on b.no_polis=ee.no_polis and b.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+					 
							 "inner join sju_vendor f on f.kode_vendor=ee.kode_vendor and f.kode_lokasi=ee.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='-' and a.due_date between '"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01' and (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0)))";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);							
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.kode_pp,c.nama as nama_pp, a.keterangan,a.kode_cust,a.nama_cust,a.kode_vendor,a.nama_vendor "+
							 "from "+
							 "( "+
							 "select 1 as nu,a.kode_lokasi,d.akun_piutang as kode_akun,'D' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai) * c.kurs) as nilai, 'piutang atas '+f.nama+' polis '+aa.no_dok as keterangan "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+							 
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='-' and a.due_date between '"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01' and (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_piutang,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+
							 "union all "+
							 							 
							 "select 2 as nu,a.kode_lokasi,d.akun_fee as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+
							 "sum(a.fee * c.kurs) as nilai, 'brokerage atas '+f.nama+' polis '+aa.no_dok as keterangan "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='-' and a.due_date between '"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01' and (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_fee,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+						 							 
							 "union all "+
							 
							 "select 3 as nu, a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+						 
							 "sum(a.ppn * c.kurs) as nilai, 'hutang ppn atas '+f.nama+' polis '+aa.no_dok "+						 
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='-' and a.due_date between '"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01' and (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+ 
							 "group by a.kode_lokasi,aa.kode_pp,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+							 
							 "union all "+						 
							 
							 "select 4 as nu,a.kode_lokasi,e.akun_hutang as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+						 
							 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * c.kurs) as nilai,'hutang premi atas '+e.nama+' polis '+aa.no_dok "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='-' and a.due_date between '"+this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-01' and (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
							 "group by a.kode_lokasi,aa.kode_pp,e.akun_hutang,e.nama,aa.no_dok,f.kode_cust,f.nama,e.kode_vendor,e.nama "+
							 
							 ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi order by a.kode_cust,a.nu";							 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU2 = data;
					this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn2.rearrange();
					this.doTampilData2(1);
				} else this.sg2.clear(1);
			}
			else system.alert(this,"Data tidak valid.","Periode harus diisi.");
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
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
			this.sg.appendData([line.no_polis,line.no_dok,line.tgl_bill,line.pp,line.vendor,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total),floatToNilai(line.nu)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doTampilData2: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU2.rs.rows[i];													
			var nilai = Math.round(line.nilai * 100)/100;
			this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan.toUpperCase(),floatToNilai(nilai),line.kode_cust,line.nama_cust,line.kode_vendor,line.nama_vendor,line.kode_pp,line.nama_pp]);
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender,page){
		this.doTampilData2(page);
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan == 1) this.doClick();
	},	
	doClick:function(sender){				
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {			
			this.stsSimpan = 1;
			this.bJurnal.setVisible(true);
			this.sg.clear(1); this.sg2.clear(1);
			var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%";//+this.c_jenis.getText().substr(2,3);
			var data = this.dbLib.getDataProvider("select isnull(max(no_ju),0) as no_ju from ju_m where no_ju like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_ju == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
					else {
						var idx = parseFloat(line.no_ju.substr(8,3)) + 1;
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
	doNilaiChange: function(){
		try{			
			var totD = totC = 0;			
			for (var i=0;i<this.dataJU2.rs.rows.length;i++){
				line = this.dataJU2.rs.rows[i];													
				if (line.dc.toUpperCase() == "D") totD += parseFloat(line.nilai);
				if (line.dc.toUpperCase() == "C") totC += parseFloat(line.nilai);
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.stsIns == 1) {
								if (this.preView == "1") {								
									this.nama_report="server_report_saku2_kopeg_sju_rptPiutangJurnal";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
							}
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);this.sg2.clear(1);
			this.e_debet.setText("0");this.e_kredit.setText("0");
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);			
			this.doLoad3();
			this.stsSimpan = 1;			
			this.dataJU = {rs:{rows:[]}};
			this.dataJU2 = {rs:{rows:[]}};
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.periode,a.keterangan,a.nik_app+' - '+b.nama as nik_app "+
		             "from sju_bill_m a "+
					 "inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "left join (select distinct kode_lokasi,no_bill from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"') f on a.no_bill=f.no_bill and a.kode_lokasi=f.kode_lokasi "+
					 "where f.no_bill is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='INPUT' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bill,line.tgl,line.periode,line.keterangan,line.nik_app]); 
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
				this.bJurnal.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));				
				
				var data = this.dbLib.getDataProvider("select a.kode_curr,a.nama,b.kurs from curr a left join (select distinct kode_curr,kurs from sju_polis_termin where kode_lokasi='"+this.app._lokasi+"' and no_bill='"+this.e_nb.getText()+"') b on a.kode_curr=b.kode_curr order by a.kode_curr",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgCurr.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line.kode_curr == "IDR") this.sgCurr.appendData([line.kode_curr,line.nama,"1"]);
						else this.sgCurr.appendData([line.kode_curr,line.nama,floatToNilai(line.kurs)]);
					}
				} else this.sgCurr.clear(1);

				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					 										
				this.stsIns = 0;
				sql.add("delete from sju_curr_tmp where nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");				
				if (this.sgCurr.getRowValidCount() > 0){
					for (var i=0;i < this.sgCurr.getRowCount();i++){
						if (this.sgCurr.rowValid(i)){
							if (this.sgCurr.cells(0,i) == "IDR") {
								sql.add("insert into sju_curr_tmp(kode_curr,kurs,nik_user,kode_lokasi) values "+
									"('"+this.sgCurr.cells(0,i)+"',1,'"+this.app._userLog+"','"+this.app._lokasi+"')");
							}
							else {
								sql.add("insert into sju_curr_tmp(kode_curr,kurs,nik_user,kode_lokasi) values "+
										"('"+this.sgCurr.cells(0,i)+"',"+nilaiToFloat(this.sgCurr.cells(2,i))+",'"+this.app._userLog+"','"+this.app._lokasi+"')");
							}
						}
					}
				}				
				this.dbLib.execArraySQL(sql);

				var strSQL = "select no_bill,keterangan,nik_app,jenis "+
							 "from sju_bill_m "+							 
							 "where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_ket.setText(line.keterangan);					
						this.cb_app.setText(line.nik_app);
						this.c_jenis.setText(line.jenis);
					}
				}												
				var strSQL = "select a.no_polis,b.no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
							 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,(a.premi - a.diskon + a.p_cost + a.materai) as total,a.nu "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+							 
							 "inner join sju_vendor f on f.kode_vendor=a.kode_vendor and f.kode_lokasi=a.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='"+this.e_nb.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);							
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.kode_pp,c.nama as nama_pp, a.keterangan,a.kode_cust,a.nama_cust,a.kode_vendor,a.nama_vendor "+
							 "from "+
							 "( "+
							 "select 1 as nu,a.kode_lokasi,d.akun_piutang as kode_akun,'D' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai) * a.kurs) as nilai, 'piutang atas '+f.nama+' polis '+aa.no_dok as keterangan "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+							 
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='"+this.e_nb.getText()+"'  "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_piutang,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+
							 "union all "+
							 							 
							 "select 2 as nu,a.kode_lokasi,d.akun_fee as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+
							 "sum(a.fee * a.kurs) as nilai, 'brokerage atas '+f.nama+' polis '+aa.no_dok as keterangan "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='"+this.e_nb.getText()+"' "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_fee,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+						 							 
							 "union all "+
							 
							 "select 3 as nu, a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+						 
							 "sum(a.ppn * a.kurs) as nilai, 'hutang ppn atas '+f.nama+' polis '+aa.no_dok "+						 
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='"+this.e_nb.getText()+"'  "+ 
							 "group by a.kode_lokasi,aa.kode_pp,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,e.nama "+							 
							 "union all "+						 
							 
							 "select 4 as nu,a.kode_lokasi,e.akun_hutang as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,f.nama as nama_cust,e.kode_vendor,e.nama as nama_vendor, "+						 
							 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * a.kurs) as nilai,'hutang premi atas '+e.nama+' polis '+aa.no_dok "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih<>'-' and a.no_bill='"+this.e_nb.getText()+"'  "+
							 "group by a.kode_lokasi,aa.kode_pp,e.akun_hutang,e.nama,aa.no_dok,f.kode_cust,f.nama,e.kode_vendor,e.nama "+
							 
							 ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi order by a.kode_cust,a.nu";							 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU2 = data;
					this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn2.rearrange();
					this.doTampilData2(1);
				} else this.sg2.clear(1);							
				this.pc1.setActivePage(this.pc1.childPage[1]);				
			}			
		} catch(e) {alert(e);}
	}
});
