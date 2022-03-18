window.app_saku3_transaksi_tu_proyek_fPiuPYTdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fPiuPYTdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fPiuPYTdis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Piutang dan Distribusi Pendapatan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		this.bTampil = new portalui_button(this,{bound:[290,11,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		this.bProses = new portalui_button(this,{bound:[390,11,80,18],caption:"Proses Data",click:[this,"doProses"]});		
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Piutang","Data PYT"]});
		this.sg = new saiGrid(this.pc3.childPage[0],{bound:[1,5,this.pc3.width-5,this.pc3.height-33],colCount:11,tag:9,		            
				colTitle:["Status","ID Proyek","Keterangan","PP","Akun Piutang","Akun PYT","Nilai Piutang","PPN","PPh Ps4-2","Akun BDD","Cust"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,100,100,100,300,100,80]],
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HUTPPN','PPH42') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;	
					if (line.kode_spro == "PPH42") this.akunPPh4 = line.flag;			
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fPiuPYTdis.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyek_fPiuPYTdis.implement({
	doChangeCell: function(sender, col , row) {
		if (col == 0) {						
			this.sg1.clear(1);			
		}
	},	
	doLoadData: function(sender){
		try{			
			if (this.e_periode.getText() != "") {				
				var strSQL = "select a.kode_proyek,a.nama,a.kode_pp,c.akun_piutang,c.akun_pyt,a.nilai - isnull(b.nilai_piu,0) as nilai_piu,a.nilai_ppn,a.pph4,c.akun_bdd,a.kode_cust "+
							"from tu_proyek a 							"+
							"inner join tu_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
							
							"left join ( 								"+								
							"	select no_dokumen,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_piu "+
							"	from tu_prpiutang_m					"+
							"	where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
							"	group by no_dokumen,kode_lokasi			"+
							")	b on a.kode_proyek=b.no_dokumen and a.kode_lokasi=b.kode_lokasi 			"+

							"where a.progress='1' and  a.nilai-ISNULL(nilai_piu,0)>0 and a.kode_lokasi='"+this.app._lokasi+"' ";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg.appendData(["PENDING",line.kode_proyek,line.nama,line.kode_pp,line.akun_piutang,line.akun_pyt,floatToNilai(line.nilai_piu),floatToNilai(line.nilai_ppn),floatToNilai(line.pph4),line.akun_bdd,line.kode_cust]);
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpyt_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));		
		var idProyek = "";
		for (var i=0;i<this.sg.getRowCount();i++){
			if (this.sg.cells(0,i) == "PROSES") {																		
				idProyek += ",'"+this.sg.cells(1,i)+"'";
			}
		}
		idProyek = idProyek.substr(1);
		if (idProyek != "") {
			var piutBarangPyt = "union "+  //data proyek yg sekaligus di generate
								"select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,a.nilai_pend,b.kode_drkp "+
								"from tu_proyek_d a "+					 
								"inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
								"inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+
								"where a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek in ("+idProyek+") ";		   
		}
		else var piutBarangPyt = "";
		
		this.sg1.clear(1);		
		var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_pyt,c.akun_pdpt,b.kode_pp,(a.nilai_pend - isnull(d.nilai_pend,0)) as nilai_pend,b.kode_drkp "+
					 "from tu_proyek_d a "+
					 
					 "inner join (		 "+   //memastikan udah dijurnal piutang 						
					 "		select distinct no_dokumen,kode_lokasi from tu_prpiutang_m "+
					 "		where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+					 
					 "		) x on a.kode_proyek=x.no_dokumen and a.kode_lokasi=x.kode_lokasi "+
					
					 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
					 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+
					
					 "left join (  "+					
					 "	select kode_proyek,periode,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_pend "+
					 "  from tu_prpyt_d "+
					 "  where kode_lokasi ='"+this.app._lokasi+"' "+
					 "  group by kode_proyek,periode,kode_lokasi "+					
					 ") d on a.kode_proyek=d.kode_proyek and a.periode=d.periode and a.kode_lokasi=d.kode_lokasi "+

					 "where a.periode <= '"+this.e_periode.getText()+"' and (a.nilai_pend - isnull(d.nilai_pend,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' "+
					 piutBarangPyt+					 
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
					var nu = parseFloat(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpiutang_m","no_bukti",this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+".","0000").substr(11,4));
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES"){

								var idx = nu.toString();					
								if (idx.length == 1) idx = "000"+idx;
								if (idx.length == 2) idx = "00"+idx;
								if (idx.length == 3) idx = "0"+idx;
								if (idx.length == 3) idx = idx;				
								var noPiu = this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+"."+idx;
								nu = nu + 1;

								sql.add("insert into tu_prpiutang_m (no_bukti,no_dokumen,tanggal,keterangan,akun_piutang,akun_pyt,nik_buat,nik_app,kode_lokasi,kode_pp,modul,nilai,posted,periode,nik_user,tgl_input, kode_pp2,dc) values "+
										"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','PRPIU',"+nilaiToFloat(this.sg.cells(6,i))+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','D')")
								
								sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(5,i)+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
		
								//ppn
								if (nilaiToFloat(this.sg.cells(7,i)) != 0){	
									sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PIUPPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','HUTPPN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
								}

								//pph 4 psl 2
								if (nilaiToFloat(this.sg.cells(8,i)) != 0){										
									sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',2,'"+this.sg.cells(9,i)+"','"+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','BDD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+noPiu+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPh4+"','"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(8,i))+",'"+this.sg.cells(3,i)+"','-','"+this.app._lokasi+"','PRPIU','PPH42','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					

									sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
											"('"+noPiu+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(3,i)+"','-','"+this.sg.cells(1,i)+' | '+this.sg.cells(2,i)+"','D',"+nilaiToFloat(this.sg.cells(8,i))+",getdate(),'"+this.sg.cells(1,i)+"','AJUBDD','-')");								
								}


								//jika sudah pernah di akru tidak dapat dikoreksi (harus ke amandemen)
								sql.add("update tu_proyek set progress='2' where progress='1' and kode_proyek ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");


								//langsung buat tagihan								
								sql.add("insert into tu_prbill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,modul) values "+
										"('"+noPiu+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(10,i)+"','IDR',1,'"+this.app._userLog+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.sg.cells(4,i)+"','Z',"+nilaiToFloat(this.sg.cells(7,i))+",'BILL')");
								
							}
						}
					}

					//blok distribusi pyt					
					sql.add("insert into tu_prpyt_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','-','Distribusi PYT periode "+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENPYT')");
													
					for (var i=0;i < this.dataJU.rs.rows.length;i++) {
						var line = this.dataJU.rs.rows[i];
						sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pyt+"','"+line.nama+"','D',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','GENPYT','PYT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
						sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_pdpt+"','"+line.nama+"','C',"+parseFloat(line.nilai_pend)+",'"+line.kode_pp+"','"+line.kode_drkp+"','"+this.app._lokasi+"','GENPYT','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
				
						sql.add("insert into tu_prpyt_d(no_bukti,kode_lokasi,kode_proyek,periode,periode_dis,akun_pyt,akun_pdpt,kode_pp,kode_drk,nilai,dc,modul) values "+
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
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh kurang dari atau sama dengan nol.");
					return false;
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_prpyt_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_prpyt_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_prpyt_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpyt_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));		
		setTipeButton(tbSimpan);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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