window.app_saku3_transaksi_tarbak_simak_fAkruBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fAkruBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fAkruBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Billing Siswa", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
				
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kode PP", readOnly:true, tag:2, change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal - Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,50,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,427], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,400,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});		
		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this.pc2.childPage[0],{bound:[650,14,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,348], childPage:["Jurnal Billing","Daftar Billing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
				colTitle:["PP / Unit","Kode Param","Nama Parameter","Akun Piutang/PYT","Akun Pdpt","Nilai"],
				colWidth:[[5,4,3,2,1,0],[100,100,100,300,100,120]],
				columnReadOnly:[true,[0,1,2,3,4,5],[]],
				nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDblClick"],colFormat:[[5],[cfNilai]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
				colTitle:["NIS","Nama","Kode Kelas","Kode Param","Nilai"],
				colWidth:[[4,3,2,1,0],[100,100,100,200,100]],
				columnReadOnly:[true,[0,1,2,3,4],[]],
				nilaiChange:[this,"doNilaiChange"],colFormat:[[4],[cfNilai]],defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);	


			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.kode_ta = line3.kode_ta;	
				}
			}
			
			this.dp_d1.setText("01/"+this.dp_d1.month+"/"+this.dp_d1.year+"");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fAkruBill.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fAkruBill.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.stsSimpan == 0) {
						sql.add("delete from sis_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sis_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sis_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update sis_bill_d set flag_pyt='-' where flag_pyt='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("update sis_bill_d set flag_pyt='"+this.e_nb.getText()+"' where periode='"+this.e_periode.getText()+"' and flag_pyt='-' and kode_lokasi='"+this.app._lokasi+"'");						

					sql.add("insert into sis_bill_m(no_bill,kode_lokasi,periode,tanggal,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_app,posted,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','PIUSIS','BILL','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F',getdate(),'"+this.app._userLog+"')");
					var j = 0;
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(5,i) != "0"){
								sql.add("insert into sis_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(3,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(0,i)+"','-','"+this.app._lokasi+"','PIUSIS','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
								j = i+1000;
								sql.add("insert into sis_bill_j(no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(0,i)+"','-','"+this.app._lokasi+"','PIUSIS','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
							}
						}
					}		
					
					sql.add("insert into sis_bill_d (no_bill,kode_lokasi,nis,kode_kelas,kode_param,nilai,dc,periode,akun_piutang,modul,kode_pp,kode_ta,kode_sem,flag_pyt) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',a.nis,b.kode_kelas,b.kode_param,b.tarif,'D','"+this.e_periode.getText()+"',c.akun_piutang,'BILL','"+this.app._kodePP+"', '"+this.kode_ta+"','"+this.sem+"','REGULAR' "+
							"from sis_siswa a "+
							
							"inner join sis_siswa_tarif b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"inner join sis_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi and c.sts_param in ('1','2') "+
							"inner join sis_siswa_status xx on a.flag_aktif=xx.kode_ss and a.kode_pp=xx.kode_pp and a.kode_lokasi=xx.kode_lokasi  "+
							
							"left join (select nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as nilai"+
							"           from sis_bill_d "+
							"           where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and kode_pp='"+this.app._kodePP+"'"+
							"           group by nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp "+
							"			) f on b.nis=f.nis and f.kode_pp=b.kode_pp and f.kode_param=b.kode_param and f.periode='"+this.e_periode.getText()+"' and b.kode_lokasi=f.kode_lokasi "+

							"where b.tarif<>0 and xx.flag_aktif = '1' and a.kode_pp='"+this.app._kodePP+"' and (f.nilai is null or f.nilai = 0) and a.kode_lokasi='"+this.app._lokasi+"' "+
							"	   and '"+this.e_periode.getText()+"' between b.per_awal and b.per_akhir");
					
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
					this.sg.clear(1);this.sg4.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.sg.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.dp_d1.getText().substr(0,2) != "01") {
					system.alert(this,"Transaksi tidak valid.","Tanggal Billing harus di tanggal 01.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from sis_bill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sis_bill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sis_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update sis_bill_d set flag_pyt='-' where flag_pyt='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
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

		if(m >= 1 && m <= 6) this.sem = "GENAP";
		if(m >= 7 && m <= 12) this.sem = "GANJIL";
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doTampil:function(sender){		
		if (this.e_periode.getText() != "") {
			var strSQL = "select a.kode_pp,c.kode_param,c.nama,c.akun_piutang,c.akun_pdpt,SUM(b.tarif) as nilai "+
						 "from sis_siswa a "+
						 
						 "inner join sis_siswa_tarif b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "inner join sis_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi and c.sts_param in ('1','2') "+
						 "inner join sis_siswa_status xx on a.flag_aktif=xx.kode_ss and a.kode_pp=xx.kode_pp and a.kode_lokasi=xx.kode_lokasi  "+

						 "left join (select nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as nilai"+
						 "           from sis_bill_d "+
						 "           where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and kode_pp='"+this.app._kodePP+"' "+
						 "           group by nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp "+
						 "			 ) f on b.nis=f.nis and b.kode_pp=f.kode_pp and f.kode_param=b.kode_param and f.periode='"+this.e_periode.getText()+"' and b.kode_lokasi=f.kode_lokasi "+						
						 
						 "where b.tarif<>0 and xx.flag_aktif = '1' and (f.nilai is null or f.nilai = 0) and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "		and '"+this.e_periode.getText()+"' between b.per_awal and b.per_akhir and a.kode_pp='"+this.app._kodePP+"' "+
						 "group by a.kode_pp,c.kode_param,c.nama,c.akun_piutang,c.akun_pdpt "+
						 
						 "union all "+ 
						 
						 //jurnal balik pyt pada pdpt bulan ini yg di akru bulan sebelumnya
						 "select a.kode_pp,c.kode_param,c.nama,c.akun_pyt,c.akun_pdpt,SUM(f.nilai) as nilai "+
						 "from sis_siswa a "+
						
						 "inner join (select nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "           from sis_bill_d "+
						 "           where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and kode_pp='"+this.app._kodePP+"' and flag_pyt = '-' "+
						 "           group by nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp "+
						 " 			 ) f on a.nis=f.nis and a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+					

						 "inner join sis_param c on f.kode_param=c.kode_param and f.kode_lokasi=c.kode_lokasi and c.sts_param in ('1','2') "+
									 
						 "where f.nilai<>0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' "+
						 "group by a.kode_pp,c.kode_param,c.nama,c.akun_pyt,c.akun_pdpt ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];		
					if (parseFloat(line.nilai) > 0) {																				
						this.sg.appendData([line.kode_pp,line.kode_param,line.nama,line.akun_piutang,line.akun_pdpt,floatToNilai(line.nilai)]);
					}
				}
			} else this.sg.clear(1);
			this.sg.validasi();
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_bill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));
			//this.cb_app.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doDblClick: function(sender, col, row){
		if (this.sg.cells(0,row) != "") {	
			var strSQL = "select a.nis,a.nama, a.kode_kelas,c.kode_param,b.tarif "+
						 "from sis_siswa a "+
						 "inner join sis_siswa_tarif b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_kelas=b.kode_kelas "+
						 "inner join sis_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi and c.sts_param in ('1','2') "+
						 "left join (select nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						            "from sis_bill_d "+
						            "where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and kode_pp='"+this.sg.cells(0,row)+"' "+
						            "group by nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp) f on b.nis=f.nis and f.kode_kelas=b.kode_kelas and f.kode_param=b.kode_param and f.periode='"+this.e_periode.getText()+"' and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp "+
						 "where a.flag_aktif = '1' and (f.nilai is null or f.nilai = 0) and a.kode_lokasi='"+this.app._lokasi+"' and '"+this.e_periode.getText()+"' between b.per_awal and b.per_akhir and a.kode_pp='"+this.sg.cells(0,row)+"' and c.kode_param='"+this.sg.cells(1,row)+"' "+
						 "order by a.kode_kelas,a.nis";
			
			var data = this.dbLib.getDataProvider(strSQL,true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
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
			this.sg1.appendData([line.nis,line.nama,line.kode_kelas,line.kode_param,floatToNilai(line.tarif)]);
		}
		this.sg1.setNoUrut(start);		
	},
   	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_siswa_rptSisJurnalPiutangYpt";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doClick(this.i_gen);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad4:function(sender){																				
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
					 "from sis_bill_m a "+
					 "   left join (select distinct no_bill,kode_lokasi from sis_rekon_d "+
					 "				where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' "+
					 "			    ) b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
					 "where b.no_bill is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' and a.kode_pp='"+this.app._kodePP+"' and a.modul='PIUSIS'";						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);			
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbHapus);
				this.bTampil.hide();
				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select keterangan,tanggal,nik_app "+
							 "from sis_bill_m "+							 
							 "where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);																		
						//this.cb_app.setText(line.nik_app);						
					}					
				}					
				var strSQL = "select a.kode_pp,c.kode_param,c.nama,c.akun_piutang,c.akun_pdpt,SUM(b.tarif) as nilai "+
							 "from sis_siswa a inner join sis_siswa_tarif b on a.nis=b.nis and a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp "+
							 "inner join sis_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi and c.sts_param in ('1','2') "+
							 "inner join sis_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp "+
							 "inner join (select nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp,sum(case dc when 'D' then nilai else -nilai end) as nilai"+
							 "            from sis_bill_d "+
							 "            where no_bill='"+this.e_nb.getText()+"' "+
							 "            group by nis,kode_lokasi,kode_kelas,kode_param,periode,kode_pp) f on b.nis=f.nis and f.kode_kelas=b.kode_kelas and f.kode_param=b.kode_param and f.periode='"+this.e_periode.getText()+"' and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp "+						
							 "where a.kode_lokasi='"+this.app._lokasi+"' "+
							 "group by a.kode_pp,d.kode_tingkat,c.kode_param,c.nama,c.akun_piutang,c.akun_pdpt";	 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_pp,line.kode_param,line.nama,line.akun_piutang,line.akun_pdpt,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);				
			}									
		} catch(e) {alert(e);}
	}	
});