window.app_saku3_transaksi_tu_proyekbaru_fPiuPYTdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fPiuPYTdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fPiuPYTdis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang dan Distribusi Pendapatan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		this.bTampil = new portalui_button(this,{bound:[290,11,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		this.bProses = new portalui_button(this,{bound:[390,11,80,18],caption:"Proses Data",click:[this,"doProses"]});		
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Piutang","Data PYT"]});
		this.sg = new saiGrid(this.pc3.childPage[0],{bound:[1,5,this.pc3.width-5,this.pc3.height-33],colCount:12,tag:9,		            
				colTitle:["Status","ID Proyek","Keterangan","PP","Akun Piutang","Akun PYT","Nilai Piutang","PPN","Nilai PPh","Akun BDD","Cust","Tgl Mulai"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,100,100,100,100,100,70,300,100,80]],
				colHide:[[7,8,9],[true,true,true]],
				buttonStyle:[[0],[bsAuto]], 
				picklist:[[0],[new portalui_arrayMap({items:["PROSES","PENDING"]})]],
				change:[this,"doChangeCell"],
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc3.childPage[0],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[1],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[1],{bound:[790,13,200,20],caption:"Total",tipeText:ttNilai,text:"0",readOnly: true});
			
		this.sg1 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-63],colCount:8,tag:9,		            
				colTitle:["ID Proyek","Periode","Keterangan","Akun PYT","Akun Pdpt","Nilai Akru","PP","DRK"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,100,100,100,300,80,100]],
				colFormat:[[5],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);
		this.pc3.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.noPiu="";
			this.array_noPIU = [];
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			// this.doProses();
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN','PPH42') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;	
					if (line.kode_spro == "PPH42") this.akunPPh4 = line.flag;			
				}
			}
			*/
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fPiuPYTdis.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyekbaru_fPiuPYTdis.implement({
	doChangeCell: function(sender, col , row) {
		if (col == 0) {						
			this.sg1.clear(1);			
		}
	},	
	doLoadData: function(sender){
		try{			
			if (this.e_periode.getText() != "") {				
				var strSQL = "select a.kode_proyek,a.nama,a.kode_pp,c.akun_piutang,c.akun_pyt,a.nilai - isnull(b.nilai_piu,0) as nilai_piu,0 as nilai_ppn,0 as pph42,c.akun_bdd,a.kode_cust,convert(varchar,a.tgl_mulai,103) as tglmulai "+ //ppn-pph di nolkan
							 "from prb_proyek a 							"+
							 "inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
							 
							 "inner join (select kode_proyek,kode_lokasi,min(periode) as periode from prb_proyek_d where kode_lokasi ='"+this.app._lokasi+"' "+
							 "			  group by kode_proyek,kode_lokasi ) d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
							
							//ref2=kode_proyek
							 "left join ( 								"+								
							 "	select no_ref2,kode_lokasi,sum(case param1 when 'D' then nilai1 else -nilai1 end) as nilai_piu "+
							 "	from trans_m					"+
							 "	where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' and param3='PRPIU' "+
							 "	group by no_ref2,kode_lokasi			"+
							 ")	b on a.kode_proyek=b.no_ref2 and a.kode_lokasi=b.kode_lokasi "+

							 "where a.versi='PRO20' and a.progress='1' and  a.nilai-ISNULL(nilai_piu,0)>0 and a.kode_lokasi='"+this.app._lokasi+"' and "+
							 "	d.periode <= '"+this.e_periode.getText()+"' ";

							 //substring(convert(varchar,a.tgl_mulai,112),1,6) <='"+this.e_periode.getText()+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		 
						this.sg.appendData(["PROSES",line.kode_proyek,line.nama,line.kode_pp,line.akun_piutang,line.akun_pyt,floatToNilai(line.nilai_piu),floatToNilai(line.nilai_ppn),floatToNilai(line.pph42),line.akun_bdd,line.kode_cust,line.tglmulai]);
					}
				} else this.sg.clear(1);				
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doProses: function(sender, page) {		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PYTN"+this.e_periode.getText().substr(2,4)+".","0000"));		
		var idProyek = "";
		for (var i=0;i<this.sg.getRowCount();i++){
			if (this.sg.cells(0,i) == "PROSES") {																		
				idProyek += ",'"+this.sg.cells(1,i)+"'";
			}
		}
		idProyek = idProyek.substr(1);
		if (idProyek != "") {
			var piutBarengPyt = "union "+  //data proyek yg sekaligus di generate
								"select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,a.nilai_pend,c.kode_drkp "+
								"from prb_proyek_d a "+					 
								"inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.versi='PRO20' "+
								"inner join prb_proyek_jenis c on b.kode_jenis=c.kode_jenis and c.kode_lokasi=b.kode_lokasi "+
								"where a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek in ("+idProyek+") ";		   
		}                                   //untuk inner join prb_proyek_jenis awalnya tidak ada perintah and a.kode_lokasi=b.kode_lokasi -> rudi 17042020 jam 9.30
		else var piutBarengPyt = "";
		
		this.sg1.clear(1);		
		var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,(a.nilai_pend - isnull(d.nilai_pend,0)) as nilai_pend,c.kode_drkp "+
					 "from prb_proyek_d a "+
					 
					 "inner join (		 "+   //memastikan udah dijurnal piutang 						
					 "		select distinct no_ref2,kode_lokasi from trans_m "+
					 "		where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and param3='PRPIU' "+					 
					 "		) x on a.kode_proyek=x.no_ref2 and a.kode_lokasi=x.kode_lokasi "+
					
					 "inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.versi='PRO20' "+
					 "inner join prb_proyek_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
					
					 "left join (  "+					
					 "	select kode_proyek,periode,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_pend "+
					 "  from prb_prpyt_d "+
					 "  where kode_lokasi ='"+this.app._lokasi+"' "+
					 "  group by kode_proyek,periode,kode_lokasi "+					
					 ") d on a.kode_proyek=d.kode_proyek and a.periode=d.periode and a.kode_lokasi=d.kode_lokasi "+

					 "where a.periode <= '"+this.e_periode.getText()+"' and (a.nilai_pend - isnull(d.nilai_pend,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' "+
					 piutBarengPyt+					 
					 "order by a.kode_proyek,a.periode";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
			
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_pend);																	
			}
			this.e_total.setText(floatToNilai(tot));
		
		} else this.sg1.clear(1);		
		this.pc3.setActivePage(this.pc3.childPage[1]);
	}, 
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.kode_proyek,line.periode,line.nama,line.akun_pyt,line.akun_pdpt,floatToNilai(line.nilai_pend),line.kode_pp,line.kode_drkp]);
		}
		this.sg1.setNoUrut(start);		
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					//blok akru piutang
					var nu = parseFloat(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PIUP"+this.e_periode.getText().substr(2,4)+".","0000").substr(12,4));
					this.array_noPIU = [];
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES"){

								var idx = nu.toString();					
								if (idx.length == 1) idx = "000"+idx;
								if (idx.length == 2) idx = "00"+idx;
								if (idx.length == 3) idx = "0"+idx;
								if (idx.length == 3) idx = idx;				
								var noPiu = this.app._lokasi+"-PIUP"+this.e_periode.getText().substr(2,4)+"."+idx;
								nu = nu + 1;

								this.noPiu=noPiu;
								this.array_noPIU.push("\'"+this.noPiu+"\'");

								//sql.add("insert into prb_prpiutang_m (no_bukti,no_dokumen,tanggal,keterangan,akun_piutang,akun_pyt,nik_buat,nik_app,kode_lokasi,kode_pp,modul,nilai,posted,periode,nik_user,tgl_input, kode_pp2,dc) values "+
								//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','PRPIU',"+nilaiToFloat(this.sg.cells(6,i))+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','D')")
								
								sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
										"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','PRPIUGAB','F','-','-','"+this.sg.cells(3,i)+"','"+this.dp_d1.getDateString()+"','-','"+this.sg.cells(2,i)+"','IDR',1,"+nilaiToFloat(this.sg.cells(6,i))+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(1,i)+"','-','D','"+this.sg.cells(5,i)+"','PRPIU')");
								//param 1 =dc,param 2= akun_pyt, param 3 = PRPIU (status jurnal), no_ref2=kode_proyek
								
					
								//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(5,i)+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
		
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(4,i)+"','D',"+nilaiToFloat(this.sg.cells(6,i))+","+
										nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(2,i)+"','PRPIU','PIU','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");				
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(5,i)+"','C',"+nilaiToFloat(this.sg.cells(6,i))+","+
										nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(2,i)+"','PRPIU','PYT','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");						

								/*		
								//ppn
								if (nilaiToFloat(this.sg.cells(7,i)) != 0){	
									//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PIUPPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','HUTPPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					

									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(4,i)+"','D',"+nilaiToFloat(this.sg.cells(7,i))+","+
											nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(2,i)+"','PRPIU','PIUPPN','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");				
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','C',"+nilaiToFloat(this.sg.cells(7,i))+","+
											nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(2,i)+"','PRPIU','HUTPPN','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");				
								}

								//pph 4 psl 2
								if (nilaiToFloat(this.sg.cells(8,i)) != 0){										
									//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(9,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','BDD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									//sql.add("insert into prb_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									//		"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPh4+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PPH42','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					

									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',4,'"+this.sg.cells(9,i)+"','D',"+nilaiToFloat(this.sg.cells(8,i))+","+
											nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(2,i)+"','PRPIU','BDD','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");				
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+noPiu+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunPPh4+"','C',"+nilaiToFloat(this.sg.cells(8,i))+","+
											nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(2,i)+"','PRPIU','PPH42','IDR',1,'"+this.sg.cells(3,i)+"','-','-','-','-','-','-','-','-')");																								
								}
								*/


								//jika sudah pernah di akru tidak dapat dikoreksi (harus ke amandemen)
								sql.add("update prb_proyek set progress='2' where progress='1' and kode_proyek ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");

								/*
								//langsung buat tagihan								
								sql.add("insert into prb_prbill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,modul,pph42) values "+
										"('"+noPiu+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(10,i)+"','IDR',1,'"+this.app._userLog+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(7,i))+",'BILL',"+nilaiToFloat(this.sg.cells(8,i))+")");
								*/
								
							}
						}
					}

					//blok distribusi pyt					
					//sql.add("insert into prb_prpyt_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
					//		"('"+this.e_nb.getText()+"','-','Distribusi PYT periode "+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENPYT')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','GENPYT','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','Distribusi PYT periode "+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','-','-','-','-','-','-')");
					//param 1 =dc,param 2= akun_pyt,no_ref2=kode_proyek								

					for (var i=0;i < this.dataJU.rs.rows.length;i++) {
						var line = this.dataJU.rs.rows[i];
						//sql.add("insert into prb_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
						//		"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pyt+"','"+line.nama+"','D',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','GENPYT','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
						//sql.add("insert into prb_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
						//		"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pdpt+"','"+line.nama+"','C',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','"+line.kode_drkp+"','"+this.app._lokasi+"','GENPYT','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
				
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pyt+"','D',"+parseFloat(line.nilai_pend)+","+parseFloat(line.nilai_pend)+",'"+line.nama+"','GENPYT','PYT','IDR',1,'"+line.kode_pp+"','-','-','-','-','-','-','-','-')");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pdpt+"','C',"+parseFloat(line.nilai_pend)+","+parseFloat(line.nilai_pend)+",'"+line.nama+"','GENPYT','PDPT','IDR',1,'"+line.kode_pp+"','"+line.kode_drkp+"','-','-','-','-','-','-','-')");

						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','GENPYT','"+this.app._lokasi+"','"+line.akun_pdpt+"','"+line.kode_pp+"','"+line.kode_drkp+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(line.nilai_pend)+")");
			
						sql.add("insert into prb_prpyt_d(no_bukti,kode_lokasi,kode_proyek,periode,periode_dis,akun_pyt,akun_pdpt,kode_pp,kode_drk,nilai,dc,modul) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_proyek+"','"+line.periode+"','"+this.e_periode.getText()+"','"+line.akun_pyt+"','"+line.akun_pdpt+"','"+line.kode_pp+"','"+line.kode_drkp+"',"+parseFloat(line.nilai_pend)+",'D','PYTDIS')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); this.sg.clear(1);
					this.pc3.setActivePage(this.pc3.childPage[0]);
					setTipeButton(tbAllFalse);							
					this.stsSimpan = 1;	
					this.doClick();
				}
				break;
			case "simpan" :					
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
			
		this.sg1.clear(1);	
		this.e_total.setText("0");
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); this.sg.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-PYTN"+this.e_periode.getText().substr(2,4)+".","0000"));		
		setTipeButton(tbSimpan);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){									
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_proyek_rptPiutangPYT";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti in ('"+this.e_nb.getText()+"','"+this.array_noPIU[0]+"','"+this.array_noPIU[1]+"') ";
								this.array_noPIU.push("\'"+this.e_nb.getText()+"\'");
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti in ("+this.array_noPIU+") ";
								this.filter2 = this.filter;
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
								this.allBtn = false									
								this.pc3.hide(); 
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
				this.pc3.show(); 			
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
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.sg.clear(1); this.sg1.clear(1); 
			if (this.stsSimpan == 1) this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});