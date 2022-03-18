window.app_saku3_transaksi_tm_fKirimBareg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fKirimBareg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fKirimBareg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Kirim Penyelesaian Piutang Region", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Lok Tujuan","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Akun Titipan", multiSelection:false, maxLength:10, tag:2});
		this.cb_tak = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Akun Mutasi", multiSelection:false, maxLength:10, tag:2});		
		this.e_tagih = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,21,202,20],caption:"Tot Tagih", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.cb_batm = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No BATM", multiSelection:false, maxLength:10, change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,202,20],caption:"Tot Piutang", readOnly:true,tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this.pc2.childPage[0],{bound:[550,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[640,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[668,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,275], childPage:["Daftar Piutang","Item Jurnal"]});								
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,		            
					colTitle:["Status","Lokasi","No Bukti","Periode","Keterangan","Nilai","Kunj","CS","Total"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,80,80,100,250,70,120,70,70]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
					colFormat:[[5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});		

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK","Lokasi"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5,6,7,8],[3]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		
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
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun ",true);
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                   "where b.kode_flag = '016' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fKirimBareg.extend(window.childForm);
window.app_saku3_transaksi_tm_fKirimBareg.implement({
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
						sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from takterima_m where no_dokumen = '"+this.e_nb.getText()+"'");
						sql.add("delete from takterima_j where no_dokumen = '"+this.e_nb.getText()+"'");						
						sql.add("update yk_bill_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"'");
						sql.add("update yk_billkunj_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"'");
						sql.add("update yk_batm_m set no_final='-' where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
										
					sql.add("update yk_batm_m set no_final='"+this.e_nb.getText()+"' where no_selesai='"+this.cb_batm.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKAPP','PIU','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','"+this.cb_batm.getText()+"','"+this.cb_titip.getText()+"','"+this.cb_tak.getText()+"',getdate(),'"+this.app._userLog+"','"+this.app._lokasi+"','1','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"')");
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKAPP','TITIP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKAPP','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
								if (nilaiToFloat(this.sg.cells(5,i)) != 0) {
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_bill_d a inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
											"where a.no_piutang='-' and a.no_selesai = '"+this.cb_batm.getText()+"' and b.no_batch='"+this.sg.cells(2,i)+"'");					 
								}
								if (nilaiToFloat(this.sg.cells(6,i)) + nilaiToFloat(this.sg.cells(7,i)) != 0) {
									sql.add("update a set a.no_piutang='"+this.e_nb.getText()+"' "+
											"from yk_billkunj_d a inner join yk_billkunj_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
											"where a.no_piutang='-' and a.no_selesai = '"+this.cb_batm.getText()+"' and b.no_batch='"+this.sg.cells(2,i)+"'");					 
								}
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){								
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(8,i)+"1000','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','TTAPP','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
							}
						}
					}
					sql.add("insert into takterima_m (no_terima,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,kode_lokkirim,no_kirim) "+
					        "select no_terima,kode_lokasi,no_terima,'"+this.dp_d1.getDateString()+"','TAK PIUTANG '+no_terima,kode_pp,'TTAPP','TTAPP',periode,'IDR',1,sum(case dc when 'D' then nilai else 0 end),nik_user,nik_user,getdate(),nik_user,'X','-','-','"+this.app._lokasi+"','"+this.e_nb.getText()+"' "+
							"from takterima_j where no_terima='"+this.e_nb.getText()+"' group by no_terima,kode_lokasi,kode_pp,periode,nik_user");							
							
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
					this.sg.clear(1); this.sg3.clear(1); this.sg2.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :					
				var totD = totC = 0;
				for (var i = 0; i < this.sg2.rows.getLength();i++){
					if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
						if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
						if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
					}
				}
				if (totD != totC) {
					system.alert(this,"Transaksi tidak valid.","Item Jurnal tidak balance.");
					return false;						
				}
				if (totD == 0) {
					system.alert(this,"Transaksi tidak valid.","Jurnal bernilai nol.");
					return false;						
				}
				
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) != nilaiToFloat(this.e_tagih.getText())) {
					system.alert(this,"Transaksi tidak valid.","Tot Tagih dan Piutang tidak sama.");
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
					sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from takterima_m where no_dokumen = '"+this.e_nb.getText()+"'");
					sql.add("delete from takterima_j where no_dokumen = '"+this.e_nb.getText()+"'");						
					sql.add("update yk_bill_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"'");
					sql.add("update yk_billkunj_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"'");
					sql.add("update yk_batm_m set no_final='-' where no_final='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.cb_batm.setSQL("select no_selesai, keterangan from yk_batm_m where periode<='"+this.e_periode.getText()+"' and no_final = '-' and kode_lokasi='"+this.app._lokasi+"'",["no_selesai","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar BA",true); //and no_kb<>'-'  kalo yg gak yakes gak bisa
		if (this.stsSimpan == 1) this.doClick(this.i_gen);				
	},
	doChange:function(sender){
		if (sender == this.cb_batm && this.cb_batm.getText() != "") {
			var data = this.dbLib.getDataProvider("select nilai_tagih from yk_batm_m where no_selesai='"+this.cb_batm.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];												
				this.e_tagih.setText(floatToNilai(line.nilai_tagih));
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
				this.e_nilai.setText("0");				
				this.bTampil.show();
				this.i_appAll.show();
				this.bJurnal.show();
				this.cb_batm.setSQL("select no_selesai, keterangan from yk_batm_m where periode<='"+this.e_periode.getText()+"' and no_kb<>'-' and no_final = '-' and kode_lokasi='"+this.app._lokasi+"'",["no_selesai","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar BA",true);
			}			
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TPIU"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.stsSimpan = 1;
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
			if (sender == this.i_appAll) {
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							this.sg.cells(0,i,"APP");
						}
					}
				}
				this.sg.validasi();
			}
		}
	},
	doLoadData:function(sender){				
		if (this.cb_batm.getText() != "") {
			var strSQL = "select a.no_bareg,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0) as nilai,isnull(c.kunj,0) as kunj,isnull(c.cs,0) as cs,isnull(b.nilai,0)+isnull(c.kunj,0)-isnull(c.cs,0) as total "+
						 "	from yk_bareg_m a "+
						 "left join ( "+
						 "			select b.no_batch,a.kode_lokasi,sum(a.nilai) as nilai "+
						 "			from yk_bill_d a inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "			where a.no_piutang='-' and a.no_selesai = '"+this.cb_batm.getText()+"' group by b.no_batch,a.kode_lokasi) b on a.kode_lokasi=b.kode_lokasi and a.no_bareg=b.no_batch "+					 
						 "left join ( "+
						 "			select b.no_batch,a.kode_lokasi,sum(case when d.jenis = 'TMMC' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj,sum(a.cs) as cs "+
						 "			from yk_billkunj_d a inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
						 "                           	 inner join yk_loker c on a.loker=c.loker "+
						 "                               inner join cust d on c.kode_cust=d.kode_cust and d.jenis <> 'PENSIUN' "+
						 "			where a.no_piutang='-' and a.no_selesai = '"+this.cb_batm.getText()+"' group by b.no_batch,a.kode_lokasi) c on a.kode_lokasi=c.kode_lokasi and a.no_bareg=b.no_batch "+					 
						 "	where a.kode_loktuj='"+this.app._lokasi+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (parseFloat(line.nilai) + parseFloat(line.kunj) + parseFloat(line.cs) != 0)
						this.sg.appendData(["INPROG",line.kode_lokasi,line.no_bareg,line.periode,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),floatToNilai(line.total)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"No BATM tidak valid.","No BATM harus diisi.");
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doJurnal:function(sender){			
		if (this.cb_batm.getText()!="" && this.cb_tak.getText()!="") {
			var strSQL ="select a.kode_lokasi,d.nama as ket,"+
						"       case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                    when 'PEGAWAI' then b.akun_bp "+
						"                    when 'GROUP' then b.akun_ap "+						
						"                    when 'TMMC' then b.akun_tmmc "+						
						"       end as kode_akun,d.nama as nama_akun,'C' as dc,"+
						"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
						"from yk_bill_d a  "+
						"           inner join yk_loker ff on a.loker=ff.loker "+
						"           inner join cust f on ff.kode_cust=f.kode_cust "+						
						"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
						"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                             			          when 'PEGAWAI' then b.akun_bp "+
						"                             				      when 'GROUP' then b.akun_ap "+					
						"                             				      when 'TMMC' then b.akun_ap "+					
						"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
						"  			inner join drk g on (case f.jenis when 'PENSIUN' then b.kode_drkcc else b.kode_drkbp end)=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun=b.tahun "+
						"where a.no_selesai = '"+this.cb_batm.getText()+"' and a.nilai<>0 "+						
						"group by a.kode_lokasi,d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
						"                    						when 'PEGAWAI' then b.akun_bp "+
						"                    						when 'GROUP' then b.akun_ap "+
						"                    						when 'TMMC' then b.akun_tmmc "+
						"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+
						"union all "+																			
						
						"select a.kode_lokasi,'TAK PIUTANG BPCC' as ket,"+
						"       '"+this.cb_tak.getText()+"' as kode_akun,d.nama as nama_akun,'D' as dc,"+
						"       sum(a.nilai) as nilai,'TAKPIU' as jenis,'-' as kode_drk,'-' as nama_drk "+
						"from yk_bill_d a  "+
						"  			inner join masakun d on '"+this.cb_tak.getText()+"'=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+					
						"where a.no_selesai = '"+this.cb_batm.getText()+"' and a.nilai<>0 "+						
						"group by a.kode_lokasi,d.nama "+																			
						"union all "+													
			
						//KUNJUNGAN	& PDPT					
						"select a.kode_lokasi,'PIU KUNJUNGAN' as ket,c.akun_pku as kode_akun,d.nama as nama_akun,'C' as dc, "+
						"sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'PIUKUNJ' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a "+
						"                     inner join yk_loker bb on a.loker=bb.loker "+
						"                     inner join cust b on bb.kode_cust=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_pku=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
						"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis = 'TMMC' and a.no_selesai = '"+this.cb_batm.getText()+"' "+
						"group by  a.kode_lokasi,c.akun_pku,d.nama,c.drk_kunj,e.nama "+																							
						"union all "+												
						
						"select a.kode_lokasi,'TAK PIUTANG KUNJ' as ket,"+
						"       '"+this.cb_tak.getText()+"' as kode_akun,d.nama as nama_akun,'D' as dc,"+
						"       sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai,'TAKKUNJ' as jenis,'-' as kode_drk,'-' as nama_drk "+
						"from yk_billkunj_d a  "+
						"                     inner join yk_loker bb on a.loker=bb.loker "+
						"                     inner join cust b on bb.kode_cust=b.kode_cust "+
						"  			inner join masakun d on '"+this.cb_tak.getText()+"'=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+					
						"where a.umum+a.gigi+a.kbia+a.matkes<> 0 and b.jenis = 'TMMC' and a.no_selesai = '"+this.cb_batm.getText()+"' "+						
						"group by a.kode_lokasi,d.nama "+																			
						"union all "+													
						
						//CS						
						"select a.kode_lokasi,'TAK PIUTANG CS' as ket,"+
						"       '"+this.cb_tak.getText()+"' as kode_akun,d.nama as nama_akun,'C' as dc,"+
						"       sum(a.cs) as nilai,'TAKCS' as jenis,'-' as kode_drk,'-' as nama_drk "+
						"from yk_billkunj_d a  "+
						"  			inner join masakun d on '"+this.cb_tak.getText()+"'=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+					
						"where a.cs<> 0 and a.no_selesai = '"+this.cb_batm.getText()+"' "+						
						"group by a.kode_lokasi,d.nama "+													
						"union all "+													
								
						"select a.kode_lokasi,'PIUTANG COST SHARING ' as ket,c.akun_piucs as kode_akun,d.nama as nama_akun,'D' as dc, "+
						"sum(a.cs) as nilai,'PIUCS' as jenis, c.drk_kunj as kode_drk,e.nama as nama_drk "+
						"from yk_billkunj_d a "+
						"                     inner join yk_loker bb on a.loker=bb.loker "+
						"                     inner join cust b on bb.kode_cust=b.kode_cust "+
						"		 	          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						"		 	          inner join masakun d on c.akun_piucs=d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+
						"		 	          inner join drk e on c.drk_kunj=e.kode_drk and e.kode_lokasi='"+this.app._lokasi+"' and e.tahun=c.tahun "+
						"where a.cs<> 0 and b.jenis <> 'PENSIUN' and a.no_selesai = '"+this.cb_batm.getText()+"' "+
						"group by  a.kode_lokasi,c.akun_piucs,d.nama,c.drk_kunj,e.nama "+
						
						"order by kode_lokasi,dc desc,kode_akun";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (parseFloat(line.nilai) != 0)
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk,line.kode_lokasi]);
				}
			}
			this.sg2.validasi();								
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"No BATM atau Akun Mutasi tidak valid.","No BATM dan Akun Mutasi harus diisi.");
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nb.getText()+"' ";
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
			this.sg2.clear(1); this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select distinct a.no_kirim,convert(varchar,a.tanggal,103) as tgl,a.kode_loktuj,a.no_dokumen,a.keterangan,a.nilai "+
		             "from takkirim_m a left join takterima_m b on a.no_kirim=b.no_dokumen and b.posted <> 'X' "+
					 "where b.no_terima is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'TAKAPP' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_kirim,line.tgl,line.kode_loktuj,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.i_appAll.hide();
				this.bJurnal.hide();				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select keterangan,no_dokumen,tanggal,no_del,no_link,ref1 "+
							 "from takkirim_m "+							 
							 "where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);													
						this.cb_titip.setText(line.no_link);													
						this.cb_tak.setText(line.ref1);							
						this.cb_batm.setSQL("select no_selesai, keterangan from yk_batm_m where no_final = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_selesai","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar BA",true);
						this.cb_batm.setText(line.no_del);												
					}
				}								
				var strSQL = "select a.no_bareg,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0) as nilai,isnull(c.kunj,0) as kunj,isnull(c.cs,0) as cs,isnull(b.nilai,0)+isnull(c.kunj,0)-isnull(c.cs,0) as total "+
							 "	from yk_bareg_m a "+
							 "left join ( "+
							 "			select b.no_batch,a.kode_lokasi,sum(a.nilai) as nilai "+
							 "			from yk_bill_d a inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
							 "			where a.no_piutang='"+this.e_nb.getText()+"' group by b.no_batch,a.kode_lokasi) b on a.kode_lokasi=b.kode_lokasi and a.no_bareg=b.no_batch "+					 
							 "left join ( "+
							 "			select b.no_batch,a.kode_lokasi,sum(case when d.jenis = 'TMMC' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj,sum(a.cs) as cs "+
							 "			from yk_billkunj_d a inner join yk_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
							 "                           	 inner join yk_loker c on a.loker=c.loker "+
							 "                               inner join cust d on c.kode_cust=d.kode_cust and d.jenis <> 'PENSIUN' "+
							 "			where a.no_piutang='"+this.e_nb.getText()+"' group by b.no_batch,a.kode_lokasi) c on a.kode_lokasi=c.kode_lokasi and a.no_bareg=b.no_batch "+					 
							 "	where a.kode_loktuj='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (parseFloat(line.nilai) + parseFloat(line.kunj) + parseFloat(line.cs) != 0)
							this.sg.appendData(["APP",line.kode_lokasi,line.no_bareg,line.periode,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);
				
				var strSQL = "select a.no_urut,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_lokasi "+
							 "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							 "where a.no_dokumen = '"+this.e_nb.getText()+"' "+
							 "order by no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk,line.kode_lokasi]);
					}
				} else this.sg2.clear(1);
			}									
		} catch(e) {alert(e);}
	}	
});