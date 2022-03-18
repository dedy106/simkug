window.app_saku3_transaksi_sju16_fAkruTagih = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sju16_fAkruTagih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fAkruTagih";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Tagihan", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Periode","Deskripsi","NIK Approve"],
					colWidth:[[4,3,2,1,0],[200,400,80,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[785,12,100,18],caption:"Jth Tempo Bayar", underline:true, visible:false});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[885,12,100,18], visible:false}); 				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[785,14,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.bKurs = new button(this.pc2.childPage[0],{bound:[578,17,90,18],caption:"Get Kurs",click:[this,"doGetkurs"]});
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[678,17,90,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[785,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,305], childPage:["Filter Data","Data Kurs","Data Polis","Jurnal Akru","Otorisasi","File Dok"]});					
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_up = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"UP", maxLength:50});						
		this.cb_vendor = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Penanggung [Opsi]", multiSelection:false, maxLength:10, tag:9});									
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,18,90,18],caption:"Tampil",click:[this,"doTampil"]});			

		this.sgCurr = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:2,
				colTitle:["Kode Curr","Nama","Kurs"],
				colWidth:[[2,1,0],[80,200,80]],
				columnReadOnly:[true,[0,1],[2]],
				colFormat:[[2],[cfNilai]],defaultRow:1,autoAppend:false});					
		this.sgnCurr = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgCurr});		
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:17,tag:0,
				colTitle:["Status","No Register","No Polis | Sertifikat","Tgl Inv.","Unit","Penanggung","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total","ID","Tgl Jth Tempo"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,60,80,80,80,80,80,80,80,50,150,150,150,70,200,80,70]],
				readOnly:true,
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["JURNAL","INPROG"]})]],
				colFormat:[[8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","No Register","Segmen","COB","Penanggung","Tertanggung","Acc.Ex"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,300,50,150,80]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[4],{bound:[20,11,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc1.childPage[4],{bound:[20,12,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[4],{bound:[20,13,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_otorisasi = new saiCBBL(this.pc1.childPage[4],{bound:[20,14,220,20],caption:"Otorisasi Oleh", multiSelection:false, maxLength:10, tag:2});

		this.sgUpld = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[5],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});	

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);			
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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select kode_curr,nama,case when kode_curr = 'IDR' then 1 else 0 end as kurs from curr order by kode_curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgCurr.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sgCurr.appendData([line.kode_curr,line.nama,floatToNilai(line.kurs)]);
				}
			} else this.sgCurr.clear(1);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;
				}
			}	

			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama from sju_dokumen a "+
								"inner join sju_dokumen_form b on a.no_dokumen=b.no_dokumen and b.kode_form = 'SJ022' "+
								"inner join sju_dokumen_pp c on a.no_dokumen=c.no_dokumen and a.kode_lokasi=c.kode_lokasi "+
								"inner join karyawan_pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+
								"where d.nik='"+this.app._userLog+"' and d.kode_lokasi='"+this.app._lokasi+"' ",["a.no_dokumen","a.nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);						

			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
			this.cb_cust.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_periksa.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_otorisasi.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_buat.setText(this.app._userLog);
			this.cb_periksa.setText("-");
			this.cb_fiat.setText("-");
			this.cb_otorisasi.setText("-");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fAkruTagih.extend(window.childForm);
window.app_saku3_transaksi_sju16_fAkruTagih.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doTampil:function(sender){		
		if (this.e_periode.getText() != "" && this.cb_cust.getText() != "") {
			uses("server_util_arrayList");				
			var sql = new server_util_arrayList();				
			this.dataJU = {rs:{rows:[]}};			
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
						
			if (this.cb_vendor.getText() != "") var pVendor = " a.kode_vendor='"+this.cb_vendor.getText()+"' and ";
			else var pVendor = "";
			var strSQL = "select 'INPROG' as status,a.no_polis,a.nu,b.no_dok+' | '+b.no_dok2 as no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+' | '+d.nama as pp,e.kode_cust+' | '+e.nama as cust,f.kode_vendor+' | '+f.nama as vendor, "+
						 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,round((a.premi - a.diskon + a.p_cost + a.materai),2) as total, convert(varchar,a.due_date,103) as due_date "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+							 
						 "inner join sju_polis_vendor ee on b.no_polis=ee.no_polis and b.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+					 
						 "inner join sju_vendor f on f.kode_vendor=ee.kode_vendor and f.kode_lokasi=ee.kode_lokasi "+
						 "left join (		select a.no_polis,a.kode_lokasi,a.nu,sum(case a.dc when 'D' then a.premi else -a.premi end) as nilai_akru "+
						 "                  from sju_bill_d a inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
						 "					where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_cust='"+this.cb_cust.getText()+"' "+
						 "                  group by a.no_polis,a.kode_lokasi,a.nu "+
						 "          ) g on a.no_polis=g.no_polis and a.nu=g.nu and a.kode_lokasi=g.kode_lokasi "+
						 "where  "+pVendor+" isnull(g.nilai_akru,0) = 0 and b.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='-' and a.tgl_bill <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
						 "order by a.no_polis"; 						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);							
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.status.toUpperCase(),line.no_polis,line.no_dok,line.tgl_bill,line.pp,line.vendor,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total),floatToNilai(line.nu),line.due_date]);
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	simpan: function(){			
		try{												
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					 										
					this.stsIns = 1;
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_polis_termin set no_bill='-',kurs=0,akun_piutang='-',akun_hutang='-'  where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}															
					else {
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
					}
					
					if (this.e_periode.getText().substr(2,4) != this.e_nb.getText().substr(3,4)) {
						system.alert(this,"Transaksi tidak valid.","No Bukti tidak sesuai periode-nya.");
						return false;
					}

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3, due_date) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','PR','BILL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_debet.getText())+",0,0,'"+this.cb_app.getText()+"','-','-','-','-','"+this.e_up.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_vendor.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d2.getDateString()+"')");
					
					for (var i=0;i<this.dataJU2.rs.rows.length;i++){
						var line = this.dataJU2.rs.rows[i];			
						if (parseFloat(line.nilai) != 0) {							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.no_polis+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+line.dc.toUpperCase()+"',"+parseFloat(line.nilai)+","+
									parseFloat(line.nilai)+",'"+line.keterangan+"','PR','"+line.jenis.toUpperCase()+"','IDR',1,'"+line.kode_pp+"','-','"+line.kode_cust+"','"+line.kode_vendor+"','-','-','"+line.kode_tipe+"','"+line.kode_pic+"','-')");
						}
					}	

					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];													
						if (line.status.toUpperCase() == "JURNAL") {						
							sql.add("update sju_polis_termin set no_bill='"+this.e_nb.getText()+"' "+
									"where kode_lokasi='"+this.app._lokasi+"' and no_polis='"+line.no_polis+"' and nu="+nilaiToFloat(line.nu));
						}
					}

					sql.add("update a set a.kurs=b.kurs,a.akun_piutang=d.akun_piutang,a.akun_hutang=e.akun_hutang "+
							"from sju_polis_termin a "+
							"     inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							"     inner join sju_curr_tmp b on a.kode_curr=b.kode_curr and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+ 							
							"     inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+							
							"     inner join sju_cust dd on aa.kode_cust=dd.kode_cust and aa.kode_lokasi=dd.kode_lokasi "+
							"     inner join sju_cust_klp d on dd.kode_klp=d.kode_klp and dd.kode_lokasi=d.kode_lokasi "+							
							"where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("insert into sju_bill_d (no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,dc,kode_vendor,ke,no_billseb,nilai_hutang) "+
							"select no_polis,kode_lokasi,nu,keterangan,kode_curr,premi,fee,diskon,p_cost,tipe,tgl_bill,no_bill,kurs,akun_piutang,akun_hutang,ppn,pph,due_date,materai,no_tagih,'D',kode_vendor,ke,'-',(premi+p_cost+materai-fee-diskon-ppn) "+
							"from sju_polis_termin where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("delete from sju_curr_tmp where nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");				
					
					sql.add("insert into sju_ttd (no_bukti,kode_lokasi,nik_buat,nik_periksa,nik_fiat,nik_oto) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_otorisasi.getText()+"')");
					
					//dokumen											
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','BILL','"+this.e_nb.getText()+"')");															
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
					this.sg.clear(1);this.sg2.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					this.e_debet.setText("0");this.e_kredit.setText("0");
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);								
					this.stsSimpan = 1;			
					this.dataJU = {rs:{rows:[]}};
					this.dataJU2 = {rs:{rows:[]}};				
				break;
			case "simpan" :	
			case "ubah" :	
				if (this.stsSimpan == 0) {
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];													
						var strSQL = "select no_polis from sju_bill_d where no_polis = '"+line.no_polis+"' and kode_lokasi='"+this.app._lokasi+"' and dc='C'";						
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								system.alert(this,"Transaksi tidak valid.","No Register "+line.no_polis+" sudah pernah dijurnal pembatalan (tidak dapat dikoreksi).");
								return false;
							}
						}
					}
				}
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

				if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					 system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :		
					this.preView="0";
					for (var i=0;i<this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];													
						var strSQL = "select no_polis from sju_bill_d where no_polis = '"+line.no_polis+"' and kode_lokasi='"+this.app._lokasi+"' and dc='C'";						
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								system.alert(this,"Transaksi tidak valid.","No Register "+line.no_polis+" sudah pernah dibatalkan (tidak dapat dikoreksi).");
								return false;
							}
						}
					}
					if (this.standarLib.doCekPeriode(this.dbLib,"PR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
						system.alert(this,"Periode transaksi modul tidak valid (PR - LOCKED).","Hubungi Administrator Sistem.");
						return false;
					}	
					else {	
						this.stsIns = 1;
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_polis_termin set no_bill='-',kurs=0,akun_piutang='-',akun_hutang='-'  where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.sg.clear(1);			
			this.sg2.clear(1);		
			this.sgUpld.clear(1);
			this.sgFile.clear(1);		
			
			if (this.stsSimpan == 1) {
				var d = new Date();					
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d1.DateAdd("d",14);
				this.dp_d2.setText(d2.getDateStr());
			}
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
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"JURNAL");
		else this.sg.cells(0,row,"INPROG");
	},
	doChangeCell: function(sender, col , row) {
		if (col == 0) {						
			this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status = this.sg.cells(0,row);
		}
	},	
	doJurnal:function(sender){		
		try {			
			if (this.e_periode.getText() != "") {				
				var strSQL = "select kode_curr from sju_curr_tmp where nik_user='"+this.app._userLog+"' and kurs = 0 and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						system.alert(this,"Kurs transaksi tidak valid.","Ditemukan Kurs bernilai nol.");
						return false;	
					}
				}
				
				this.dataJU2 = {rs:{rows:[]}};			
				var noReg = "";
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];													
					if (line.status.toUpperCase() == "JURNAL") {																		
						noReg += ",'"+line.no_polis+line.nu+"'";
					}
				}
				noReg = noReg.substr(1);	

				if (noReg == "") {
					system.alert(this,"Tidak ada data POLIS yang berstatus JURNAL","Pilih data polis yang akan dijurnal dengan mengubah statusnya.");
					return false;
				}

				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.keterangan,a.no_polis,a.kode_pp,a.kode_tipe,a.kode_vendor,a.kode_cust,a.kode_pic,a.jenis "+
							 "from "+
							 "( "+
							 "select 1 as nu,a.kode_lokasi,d.akun_piutang as kode_akun,'D' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai) * c.kurs) as nilai, 'piutang atas '+f.nama+'- polis: '+aa.no_dok as keterangan,a.no_polis,'AR' as jenis "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+							 
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='-' and a.tgl_bill <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) and a.no_polis+cast(a.nu as varchar) in ("+noReg+") "+							 
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_piutang,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis "+
							 "union all "+
							 							 
							 "select 2 as nu,a.kode_lokasi,d.akun_fee as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+
							 "sum(a.fee * c.kurs) as nilai, 'brokerage atas '+f.nama+'- polis: '+aa.no_dok as keterangan,a.no_polis,'FEE' as jenis "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='-' and a.tgl_bill <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) and a.no_polis+cast(a.nu as varchar) in ("+noReg+") "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_fee,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis "+						 							 
							 "union all "+
							 
							 "select 3 as nu, a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+						 
							 "sum(a.ppn * c.kurs) as nilai, 'hutang ppn atas '+f.nama+'- polis: '+aa.no_dok,a.no_polis,'HPPN' as jenis "+						 
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='-' and a.tgl_bill <=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) and a.no_polis+cast(a.nu as varchar) in ("+noReg+") "+ 
							 "group by a.kode_lokasi,aa.kode_pp,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis "+							 
							 "union all "+						 
							 
							 "select 4 as nu,a.kode_lokasi,e.akun_hutang as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+						 
							 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * c.kurs) as nilai,'hutang premi atas '+e.nama+'- polis: '+aa.no_dok,a.no_polis,'AP' as jenis "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+
							 "inner join sju_curr_tmp c on aa.kode_curr=c.kode_curr and aa.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.app._userLog+"' "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='-' and a.tgl_bill <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) and a.no_polis+cast(a.nu as varchar) in ("+noReg+") "+
							 "group by a.kode_lokasi,aa.kode_pp,e.akun_hutang,e.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis "+
							 
							 ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi order by a.no_polis,a.nu";							 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU2 = data;
					this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
					this.sgn2.rearrange();					
					this.doTampilData2(1);
				} else this.sg2.clear(1);
			}
			else system.alert(this,"Data tidak valid.","Periode harus diisi.");
			this.pc1.setActivePage(this.pc1.childPage[3]);			
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},		
	doTampilData2: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU2.rs.rows[i];													
			var nilai = Math.round(line.nilai * 100)/100;			
			this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan.toUpperCase(),floatToNilai(nilai),line.no_polis,line.kode_pp,line.kode_tipe,line.kode_vendor,line.kode_cust,line.kode_pic]);
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender,page){
		this.doTampilData2(page);
	},	
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan == 1) this.doClick();
		if(sender == this.cb_cust && this.cb_cust.getText() && this.stsSimpan == 1) {
			var strSQL = "select pic from sju_cust where kode_cust = '"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_up.setText(line.pic);					
				}
			}	
		}
	},	
	doClick:function(sender){				
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {			
			this.stsSimpan = 1;
			this.bKurs.setVisible(true);
			this.bJurnal.setVisible(true);
			this.bTampil.setVisible(true);
			this.sg.clear(1); this.sg2.clear(1);
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
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.stsIns == 1) {
								if (this.preView == "1") {								
									this.nama_report="server_report_saku3_sju16_rptPrTagihan";
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
			this.sgUpld.clear(1);
			this.sgFile.clear(1);		
			this.e_debet.setText("0");this.e_kredit.setText("0");
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);						
			this.stsSimpan = 1;			
			this.dataJU = {rs:{rows:[]}};
			this.dataJU2 = {rs:{rows:[]}};
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.periode,a.keterangan,a.nik1+' - '+b.nama as nik_app "+
		             "from trans_m a "+
					 "inner join karyawan b on a.nik1=b.nik and a.kode_lokasi=b.kode_lokasi "+		
					 "inner join karyawan_pp q on b.kode_pp=q.kode_pp and b.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+			 
					 "left join (select distinct kode_lokasi,no_bill from sju_polisbayar_d where kode_lokasi='"+this.app._lokasi+"') f on a.no_bukti=f.no_bill and a.kode_lokasi=f.kode_lokasi "+					 
					 "where f.no_bill is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PR' and form = 'BILL' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.periode,line.keterangan,line.nik_app]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.bKurs.setVisible(false);
				this.bJurnal.setVisible(false);
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));				
				
				var strSQL = "select a.kode_curr,a.nama,b.kurs from curr a left join (select distinct kode_curr,kurs from sju_polis_termin where kode_lokasi='"+this.app._lokasi+"' and no_bill='"+this.e_nb.getText()+"') b on a.kode_curr=b.kode_curr order by a.kode_curr";				
				var data = this.dbLib.getDataProvider(strSQL,true);
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

				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.param3);
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.e_ket.setText(line.keterangan);					
						this.cb_app.setText(line.nik1);
						this.cb_cust.setText(line.param1);		
						this.e_up.setText(line.no_ref3);					
					}
				}	
				
				var strSQL = "select * from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
										
						this.cb_buat.setText(line.nik_buat);
						this.cb_periksa.setText(line.nik_periksa);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_otorisasi.setText(line.nik_oto);
						
					}
				}	
				
				var strSQL = "select 'JURNAL' as status,a.no_polis,a.nu,b.no_dok+' | '+b.no_dok2 as no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
							 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,(a.premi - a.diskon + a.p_cost + a.materai) as total, convert(varchar,a.due_date,103) as due_date "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_polis_vendor ee on b.no_polis=ee.no_polis and b.kode_lokasi=ee.kode_lokasi and ee.status='LEADER' "+
							 "inner join sju_vendor f on f.kode_vendor=a.kode_vendor and f.kode_lokasi=a.kode_lokasi "+
							 "inner join sju_bill_d ff on ff.no_polis=a.no_polis and ff.nu=a.nu and ff.kode_lokasi=a.kode_lokasi "+
							 "where ff.kode_lokasi='"+this.app._lokasi+"' and ff.no_bill='"+this.e_nb.getText()+"'";
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);							
				
				var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.keterangan,a.no_polis,a.kode_pp,a.kode_tipe,a.kode_vendor,a.kode_cust,a.kode_pic,a.jenis "+
							 "from "+
							 "( "+
							 "select 1 as nu,a.kode_lokasi,d.akun_piutang as kode_akun,'D' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+
							 "sum((a.premi-a.diskon+a.p_cost+a.materai) * ff.kurs) as nilai, 'piutang atas '+f.nama+'- polis: '+aa.no_dok as keterangan,a.no_polis,'AR' as jenis   "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+				
							 "inner join sju_bill_d ff on ff.no_polis=a.no_polis and ff.nu=a.nu and ff.kode_lokasi=a.kode_lokasi "+							 
							 "where ff.kode_lokasi='"+this.app._lokasi+"' and ff.no_bill='"+this.e_nb.getText()+"'  "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_piutang,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis  "+
							 "union all "+
							 							 
							 "select 2 as nu,a.kode_lokasi,d.akun_fee as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+
							 "sum(a.fee * ff.kurs) as nilai, 'brokerage atas '+f.nama+'- polis: '+aa.no_dok as keterangan,a.no_polis,'FEE' as jenis   "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_bill_d ff on ff.no_polis=a.no_polis and ff.nu=a.nu and ff.kode_lokasi=a.kode_lokasi "+							 
							 "where ff.kode_lokasi='"+this.app._lokasi+"' and ff.no_bill='"+this.e_nb.getText()+"' "+
							 "group by a.kode_lokasi,aa.kode_pp,d.akun_fee,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis  "+						 							 
							 "union all "+
							 
							 "select 3 as nu, a.kode_lokasi,'"+this.akunPPN+"' as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+						 
							 "sum(a.ppn * ff.kurs) as nilai, 'hutang ppn atas '+f.nama+'- polis: '+aa.no_dok,a.no_polis,'HPPN' as jenis   "+						 
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_cust_klp d on f.kode_klp=d.kode_klp and f.kode_lokasi=d.kode_lokasi "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_bill_d ff on ff.no_polis=a.no_polis and ff.nu=a.nu and ff.kode_lokasi=a.kode_lokasi "+							 
							 "where ff.kode_lokasi='"+this.app._lokasi+"' and ff.no_bill='"+this.e_nb.getText()+"'  "+ 
							 "group by a.kode_lokasi,aa.kode_pp,f.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis  "+							 
							 "union all "+						 
							 
							 "select 4 as nu,a.kode_lokasi,e.akun_hutang as kode_akun,'C' as dc,aa.kode_pp, f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic, "+						 
							 "sum(  (a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn) * ff.kurs) as nilai,'hutang premi atas '+e.nama+'- polis: '+aa.no_dok,a.no_polis,'AP' as jenis   "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m aa on a.no_polis=aa.no_polis and a.kode_lokasi=aa.kode_lokasi and aa.flag_aktif='1' "+							 
							 "inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
							 "inner join sju_cust f on aa.kode_cust=f.kode_cust and aa.kode_lokasi=f.kode_lokasi "+
							 "inner join sju_bill_d ff on ff.no_polis=a.no_polis and ff.nu=a.nu and ff.kode_lokasi=a.kode_lokasi "+							 
							 "where ff.kode_lokasi='"+this.app._lokasi+"' and ff.no_bill='"+this.e_nb.getText()+"'  "+
							 "group by a.kode_lokasi,aa.kode_pp,e.akun_hutang,e.nama,aa.no_dok,f.kode_cust,e.kode_vendor,aa.kode_tipe,aa.kode_pic,a.no_polis  "+
							 
							 ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi order by a.kode_cust,a.nu";							 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU2 = data;
					this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn2.rearrange();
					this.doTampilData2(1);
				} else this.sg2.clear(1);							
				this.pc1.setActivePage(this.pc1.childPage[2]);	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
			}			
		} catch(e) {alert(e);}
	}
});
