window.app_saku3_transaksi_tu_proyekbaru_fIniJoinCostMulti = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fIniJoinCostMulti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fIniJoinCostMulti";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Join Cost Proyek [Multi Agenda]", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});	
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,420], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","No Jurnal","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,410,100,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,550,20],caption:"Keterangan", maxLength:200});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,996,341], childPage:["Data Proyek", "Item JoinCost"]});	
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"ID Proyek", multiSelection:false, tag:1,change:[this,"doChange"]});		
		this.e_uraianproyek = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi Proyek", readOnly:true});				
		this.cb_ppproyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP/Unit Proyek",  tag:1,readOnly:true});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun Beban",  tag:1,readOnly:true});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"DRK Proyek",  tag:1,readOnly:true});		
		this.e_saldoor = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Saldo OR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_periodeSch = new saiCB(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"Periode Schedule", readOnly:true,tag:1,change:[this,"doChange"]});		
		this.e_saldosch = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Saldo Beban Sch", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Sharing", tag:1,  tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.sg6 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:10,tag:9,
					colTitle:["No Agenda","Keterangan","ID Kegiatan","Deskripsi","Nilai Agenda","Tot JoinCost","Saldo Agenda","Ni JoinCost","Akun Beban","DRK Beban"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,90,90,90,90,190,100,200,100]],
					readOnly:true,					
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});
		this.sgn6 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg6});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();	

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);																
			this.cb_proyek.setSQL("select kode_proyek, nama from prb_proyek where versi='PRO20' and progress in ('1','2') and modul='PROYEK' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																				

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fIniJoinCostMulti.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fIniJoinCostMulti.implement({
	isiGridCost: function(no_rab,kode_proyek,pp_rab) {
		var tot = 0;
		var strSQL = "select a.no_bukti,a.keterangan,a.kode_proyek,d.nama,a.nilai as ni_agenda, isnull(c.joincost,0) as joincost, a.nilai - isnull(c.joincost,0) as sisa_agenda,isnull(e.nilai_join,0) as nilai_join, f.akun_beban,f.kode_drkb "+
					"from prb_prbeban_d a "+
					"inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					"inner join prb_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi and d.versi='PRO20' "+
					"inner join prb_proyek_jenis f on d.kode_jenis=f.kode_jenis and d.kode_lokasi=f.kode_lokasi "+

					"left join ( "+
					"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as joincost "+
					"			from prb_prbeban_d "+
					"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek not in ('"+no_rab+"','"+kode_proyek+"') group by no_ref1,kode_lokasi "+
					") c on a.no_bukti=c.no_ref1 and a.kode_lokasi=c.kode_lokasi "+

					"left join ( "+
					"			select no_ref1,kode_lokasi,sum(case dc when 'D' then nilai else 0 end) as nilai_join "+
					"			from prb_prbeban_d "+
					"			where kode_lokasi = '"+this.app._lokasi+"' and kode_proyek in ('"+no_rab+"','"+kode_proyek+"') group by no_ref1,kode_lokasi "+
					") e on a.no_bukti=e.no_ref1 and a.kode_lokasi=e.kode_lokasi "+

					"where d.kode_pp ='"+pp_rab+"' and b.form in ('INISIASI','ISPJPTG') and dc='D' and a.kode_lokasi='"+this.app._lokasi+"' "+
					"      and a.nilai > isnull(c.joincost,0) order by a.no_bukti";						

		var data2 = this.dbLib.getDataProvider(strSQL,true);							
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2;
			this.sg6.clear();
			for (var i in data2.rs.rows){
				line2 = data2.rs.rows[i];		
				tot += parseFloat(line2.nilai_join);								
				this.sg6.appendData([line2.no_bukti,line2.keterangan,line2.kode_proyek,line2.nama,floatToNilai(line2.ni_agenda),floatToNilai(line2.joincost),floatToNilai(line2.sisa_agenda),floatToNilai(line2.nilai_join),line2.akun_beban,line2.kode_drkb]);
			}
		} else this.sg6.clear(1);	

		this.e_nilai.setText(floatToNilai(tot));
	},
	doChange: function(sender){	
		try {			
			if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
				if (this.stsSimpan == 1) {
					this.c_periodeSch.items.clear();
					//harus sama dgn periode aktif, supaya tidak masalh di akru distribusi beban
					var data = this.dbLib.getDataProvider("select distinct a.periode as periode, b.no_rab, b.kode_pp from prb_proyek_d a inner join prb_rabapp_m b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi where a.periode ='"+this.app._periode+"' and a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.c_periodeSch.addItem(i,line.periode);							
						}
						this.noRAB = line.no_rab;
						this.ppRAB = line.kode_pp;
					}
				}

				//semua jenis AJUBEBAN+BDD sebagai pengurang nilai OR
				var strSQL = "select b.akun_beban,b.akun_bdd,b.kode_drkb,a.nama,(a.nilai_or - a.pph42) -isnull(c.totbeban,0) as saldo_or,a.kode_pp "+
							 "from prb_proyek a "+
							 "inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+

							 "left join ("+
							 "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as totbeban "+
							 "		from prb_prbeban_d "+
							 "		where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_proyek.getText()+"' and no_bukti not in ('"+this.noRAB+"','"+this.e_nb.getText()+"')  "+
							 "		group by kode_proyek,kode_lokasi "+
							 ") c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+

							 "where a.versi='PRO20' and a.kode_proyek='"+this.cb_proyek.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					this.e_saldoor.setText(floatToNilai(line.saldo_or));				
					this.e_uraianproyek.setText(line.nama);	
					this.cb_ppproyek.setText(line.kode_pp);
					this.cb_akun.setText(line.akun_beban);
					this.cb_drk.setText(line.kode_drkb);	
					this.akunBDD = line.akun_bdd;				
				}
				this.isiGridCost(this.noRAB,this.cb_proyek.getText(),this.ppRAB);
			}
			
			if ((sender==this.c_periodeSch || sender==this.cb_proyek) && this.c_periodeSch.getText()!="" && this.cb_proyek.getText()!="") {			
				//hanya yang jenis AJUBEBAN sebagai pengurang nilai beban sch
				var strSQL = "select b.nilai_beban-isnull(c.totbeban_sch,0) as saldo_beban_sch "+
							 "from prb_proyek_d b "+

							 "left join ("+
							 "		select kode_proyek,kode_lokasi,periode_sch,sum(case dc when 'D' then nilai else -nilai end) as totbeban_sch "+
							 "		from prb_prbeban_d "+
							 "		where modul = 'AJUBEBAN' and kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_proyek.getText()+"' and no_bukti not in ('"+this.noRAB+"','"+this.e_nb.getText()+"') "+
							 "		group by kode_proyek,kode_lokasi,periode_sch "+
							 ") c on b.kode_proyek=c.kode_proyek and b.periode=c.periode_sch and b.kode_lokasi=c.kode_lokasi "+

							 "where b.kode_proyek='"+this.cb_proyek.getText()+"' and b.periode='"+this.c_periodeSch.getText()+"' and b.kode_lokasi ='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					this.e_saldosch.setText(floatToNilai(line.saldo_beban_sch));									
				}
			}

		}
		catch(e){
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if (this.stsSimpan == 0) {						
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 						
						sql.add("update prb_prbeban_d set no_bukti ='"+this.noRAB+"' where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MJC','JC','F','-','-','"+this.ppRAB+"','"+this.dp_d1.getDateString()+"','"+this.cb_proyek.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','"+this.cb_proyek.getText()+"','-','-','-','-','MULTIJC')");
					
					sql.add("delete from prb_prbeban_d where no_bukti='"+this.noRAB+"' and kode_lokasi='"+this.app._lokasi+"'"); 							
					var nilaiSCH = nilaiToFloat(this.e_saldosch.getText());
					for (var i=0;i < this.sg6.getRowCount();i++) {
						if (this.sg6.rowValid(i)) {							
							if (nilaiToFloat(this.sg6.cells(7,i)) != 0) {	
								sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg6.cells(8,i)+"','"+this.ppRAB+"','"+this.sg6.cells(9,i)+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.sg6.cells(2,i)+"','AJUBEBAN','-','NONITAJU')");

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg6.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg6.cells(8,i)+"','C',"+parseNilai(this.sg6.cells(7,i))+","+
										parseNilai(this.sg6.cells(7,i))+",'"+this.e_ket.getText()+"','MIJC','BBN_INI','IDR',1,'"+this.ppRAB+"','"+this.sg6.cells(9,i)+"','-','-','-','-','-','-','-')");			

								var j=1000+i;		
								var nilaiBeban = nilaiBDD = 0;
								if (nilaiToFloat(this.sg6.cells(7,i)) > nilaiSCH) {
									nilaiBeban = nilaiSCH;
									nilaiBDD = nilaiToFloat(this.sg6.cells(7,i)) - nilaiSCH;
									nilaiSCH = 0;

									sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.c_periodeSch.getText()+"','"+this.dp_d1.getDateString()+"','"+this.akunBDD+"','"+this.cb_ppproyek.getText()+"','-','"+this.e_ket.getText()+"','D',"+nilaiBDD+",getdate(),'"+this.cb_proyek.getText()+"','BDD','"+this.sg6.cells(0,i)+"','NONITAJU')");									
						
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunBDD+"','D',"+nilaiBDD+","+
											nilaiBDD+",'"+this.e_ket.getText()+"','MIJC','BDD','IDR',1,'"+this.cb_ppproyek.getText()+"','-','-','-','-','-','-','-','-')");
								}
								else {
									nilaiBeban = nilaiToFloat(this.sg6.cells(7,i));
									nilaiSCH = nilaiSCH - nilaiBeban;
								}

								if (nilaiBeban != 0) {
									sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.cb_akun.getText()+"','D',"+nilaiBeban+","+
											nilaiBeban+",'"+this.e_ket.getText()+"','MIJC','BBN_PR','IDR',1,'"+this.cb_ppproyek.getText()+"','-','-','-','-','-','-','-','-')");

									//noref1 diisi dgn nomor agenda utk kontrol saldo agenda terpakai		
									sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.c_periodeSch.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_akun.getText()+"','"+this.cb_ppproyek.getText()+"','"+this.cb_drk.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiBeban+",getdate(),'"+this.cb_proyek.getText()+"','AJUBEBAN','"+this.sg6.cells(0,i)+"','NONITAJU')");		
									
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
					this.sg3.clear(1); this.sg6.clear(1); 						
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbAllFalse);
					this.doClick();					
				break;
			case "simpan" :
			case "ubah" :	
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoor.getText())) {
					system.alert(this,"Transaksi JoinCost tidak valid.","Total Sharing melebihi Saldo OR Proyek.");
					return false;						
				}
				if (parseFloat(this.e_periode.getText()) != parseFloat(this.c_periodeSch.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus sama dengan Periode Schedule");
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
				else
				this.simpan();
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
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 					
					sql.add("update prb_prbeban_d set no_bukti ='"+this.noRAB+"' where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
				
		if (this.stsSimpan == 1) {
			this.cb_drk.setSQL("select a.kode_drk, a.nama from drk a inner join prb_proyek_jenis b on a.kode_drk=b.kode_drkb and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);
			this.doClick();
		}	
	},		
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg6.clear(1); 						
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-MJC"+this.e_periode.getText().substr(2,4)+".","0000"));									
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
								this.nama_report="server_report_saku3_tu_proyek_rptJurnalJoinCostM";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1); 	this.sg6.clear(1); 						
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);	
			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai1 "+
		             "from trans_m a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'MJC' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1),"Pilih"]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from trans_m a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						this.cb_proyek.setSQL("select kode_proyek, nama from prb_proyek where kode_proyek='"+line.no_ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																
						this.cb_proyek.setText(line.no_ref1);							
						
						this.c_periodeSch.items.clear();
						this.c_periodeSch.addItem(i,line.periode);						
						this.c_periodeSch.setText(line.periode);	
						
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai1));
					}
				}								
			}									
		} catch(e) {alert(e);}
	}
});