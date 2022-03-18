window.app_saku3_transaksi_tu_proyek_fBDDdis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fBDDdis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fBDDdis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Distribusi BDD - Beban", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Distribusi","Daftar Jurnal"]});
		this.sg3 = new saiGrid(this.pc3.childPage[1],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc3.childPage[1],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});														
		this.e_total = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,14,200,20],caption:"Total Beban",tipeText:ttNilai,text:"0",readOnly: true});
		
		this.cb_app = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,15,222,20],caption:"NIK Approve",tag:2,multiSelection:false}); 								
		this.e_bmhd = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[790,15,200,20],caption:"Total BYMHD",tipeText:ttNilai,text:"0",readOnly: true});		
		this.bTampil = new portalui_button(this.pc3.childPage[0],{bound:[690,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
		this.pc1 = new pageControl(this.pc3.childPage[0],{bound:[1,12,995,325], childPage:["Daftar Beban","Rekap BDD","Histori BDD"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,		            
				colTitle:["ID Proyek","Periode","Keterangan","Akun Beban","Akun BDD","Nilai Beban","PP","DRK"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,100,100,100,250,80,150]],
				colFormat:[[5],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,		            
				colTitle:["ID Proyek","Keterangan","Saldo BDD","Total Beban","Beban Dummy","PP","Akun BDD","Akun BMHD"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,100,100,100,250,120]],
				dblClick:[this,"doDoubleClick2"],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,		            
				colTitle:["No Bukti","Tanggal","Keterangan","DC","Nilai"],
				colWidth:[[4,3,2,1,0],[100,50,400,80,120]],
				colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});	
		
		this.rearrangeChild(10, 23);
		this.pc3.childPage[0].rearrangeChild(10, 23);	
		
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
				
			//this.cb_app.setSQL("select a.nik, a.nama from karyawan a  inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			//				   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fBDDdis.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyek_fBDDdis.implement({
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
					if (this.stsSimpan == 0) {
						sql.add("delete from tu_prbeban_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tu_prbeban_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from tu_prbdd_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
										
					sql.add("insert into tu_prbeban_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'GENBBN')");
													
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];
						sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_beban+"','"+this.e_ket.getText()+"','D',"+parseFloat(line.nilai_beban)+",'"+line.kode_pp+"','"+line.kode_drkb+"','"+this.app._lokasi+"','GENBBN','BEBAN','"+this.e_periode.getText()+"','"+line.periode+"','IDR',1,'"+this.app._userLog+"',getdate())");							
						sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_bdd+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.nilai_beban)+",'"+line.kode_pp+"','-','"+this.app._lokasi+"','GENBBN','BDD','"+this.e_periode.getText()+"','"+line.periode+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
				
					}		
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && nilaiToFloat(this.sg2.cells(4,i)) != 0) {
							sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.dp_d1.getDateString()+"',3,'"+this.sg2.cells(6,i)+"','BDD Rev - "+this.sg2.cells(1,i)+"','D',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','"+this.app._lokasi+"','REVBDD','BDD','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");																			
							sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.dp_d1.getDateString()+"',4,'"+this.sg2.cells(7,i)+"','BYMHD - "+this.sg2.cells(1,i)+"','C',"+nilaiToFloat(this.sg2.cells(4,i))+",'"+this.sg2.cells(5,i)+"','-','"+this.app._lokasi+"','REVBDD','BYMHD','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");																				
							
							sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
						   			"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg2.cells(6,i)+"','"+this.sg2.cells(5,i)+"','-','"+this.sg2.cells(1,i)+"','D',"+nilaiToFloat(this.sg2.cells(4,i))+",getdate(),'"+this.sg2.cells(0,i)+"','REVBDD','-')");					
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg1.clear(1); this.sg3.clear(1);
					this.bTampil.setVisible(true);		
					this.dataJU = "";			
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
					sql.add("delete from tu_prbeban_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tu_prbeban_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from tu_prbdd_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
			this.sg1.clear(1); this.sg3.clear(1); 
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prbeban_m","no_bukti",this.app._lokasi+"-DBN"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);			
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.clear(1);
				var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_bdd,c.akun_beban,c.akun_bmhd,b.kode_pp,(a.nilai_beban - isnull(d.nilai_beban,0)) as nilai_beban, b.kode_drkb "+
							 "from tu_proyek_d a "+
							 /*
							 "inner join (		 "+
							 		
							 "		select a.kode_proyek,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bdd "+
							 "      from tu_prbdd_d a inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.no_kas<>'-' "+
							 "		where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+							 		
							 "		group by a.kode_proyek,a.kode_lokasi "+
							 
							 "		) x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi "+
							*/

							 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+

							 "left join (  "+
							 
							 "	select no_dokumen,periode_beban,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_beban "+
							 "  from tu_prbeban_j "+
							 "  where jenis = 'BEBAN' "+
							 "  group by no_dokumen,periode_beban,kode_lokasi "+
							 
							 ") d "+
							 "  on a.kode_proyek=d.no_dokumen and a.periode=d.periode_beban and a.kode_lokasi=d.kode_lokasi "+
							 
							 "where a.periode <= '"+this.e_periode.getText()+"' and (a.nilai_beban - isnull(d.nilai_beban,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' "+
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
						tot = tot + parseFloat(line.nilai_beban);																	
					}
					this.e_total.setText(floatToNilai(tot));
				
				} else this.sg1.clear(1);
				
				this.doRekapBeban();				
				this.pc1.setActivePage(this.pc1.childPage[0]);				
			} 
			else {
				system.alert(this,"Periode harus valid.","Filter dari tanggal transaksi.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
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
			this.sg1.appendData([line.kode_proyek,line.periode,line.nama,line.akun_beban,line.akun_bdd,floatToNilai(line.nilai_beban),line.kode_pp,line.kode_drkb]);
		}
		this.sg1.setNoUrut(start);		
	},		
	doRekapBeban : function() {
		try {
			this.sg2.clear();
			var beban = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];
		  
				beban = parseFloat(line.nilai_beban);
				var isAda = false;
				var idx = totalBeban = 0;
		
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (line.kode_proyek == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}	
				
				if (!isAda) {
					this.sg2.appendData([line.kode_proyek,line.nama,"0",floatToNilai(beban),"0",line.kode_pp,line.akun_bdd,line.akun_bmhd]);
				} 
				else { 
					totalBeban = nilaiToFloat(this.sg2.cells(3,idx));
					totalBeban = totalBeban + beban;
					this.sg2.setCell(3,idx,totalBeban);					
				}											
			}	
			
			
			//rekap data utk hitung bmhd	
			var totBMHD = 0;		
			for (var i=0;i < this.sg2.getRowCount();i++){
				var saldoBDD = totbeban = 0;
				
				//bdd yg sudah dibayar
				/*
				var strSQL = "select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bdd "+
							 "from tu_prbdd_d a "+
							 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_proyek='"+this.sg2.cells(0,i)+"' and a.kode_lokasi ='"+this.app._lokasi+"'  and a.modul <> 'REVBDD' and a.no_bukti <>'"+this.e_nb.getText()+"' and a.no_ref1='-'";				
				*/

				var strSQL = "select sum(x.nilai) as bdd "+
							 "from ( "+
							 "select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai "+
							 "from tu_prbdd_d a inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.no_kas<>'-' "+
							 "where a.modul<>'JCOST' and a.periode<='"+this.e_periode.getText()+"' and a.kode_proyek='"+this.sg2.cells(0,i)+"' and a.kode_lokasi ='"+this.app._lokasi+
							 "'  and a.modul = 'AJUBDD' and a.no_bukti <>'"+this.e_nb.getText()+"'  "+

							 //versi 1 : "'  and a.modul <> 'REVBDD' and a.no_bukti <>'"+this.e_nb.getText()+"' and a.no_ref1='-' "+
							 
							/* 
							 "union "+

							 "select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai "+
							 "from tu_prbdd_d a "+
							 "where a.modul='JCOST' and a.periode<='"+this.e_periode.getText()+"' and a.kode_proyek='"+this.sg2.cells(0,i)+"' and a.kode_lokasi ='"+this.app._lokasi+"'  and a.modul <> 'REVBDD' and a.no_bukti <>'"+this.e_nb.getText()+"' and a.no_ref1='-' "+
							
							*/

							 ") x " ;
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						saldoBDD = parseFloat(line.bdd);																					
					}
				}
				
				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as beban "+
							 "from tu_prbeban_j "+
							 "where periode<='"+this.e_periode.getText()+"' and no_dokumen='"+this.sg2.cells(0,i)+"' and jenis='BEBAN' and kode_lokasi ='"+this.app._lokasi+"' and no_bukti <>'"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						totBeban = parseFloat(line.beban);																					
					}					
				}
			
				saldoBDD = saldoBDD - totBeban;
				
				this.sg2.cells(2,i,saldoBDD);
				
				if (nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
					var nilaiBMHD = nilaiToFloat(this.sg2.cells(3,i)) - nilaiToFloat(this.sg2.cells(2,i));
					this.sg2.cells(4,i,nilaiBMHD);
					
					totBMHD = totBMHD +	nilaiBMHD;
				}
				
			}
			this.e_bmhd.setText(floatToNilai(totBMHD));
		}
		catch (e) {
			alert(e);
		}				
	},	
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[2]);	

				var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.dc,a.nilai "+							
							 "from tu_prbdd_d a "+
							 "		inner join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and b.no_kas<>'-' "+
							 "where a.modul<>'JCOST' and a.periode<='"+this.e_periode.getText()+"' and a.kode_proyek='"+this.sg2.cells(0,row)+"' "+
							 //"and a.kode_lokasi ='"+this.app._lokasi+"'  and a.modul <> 'REVBDD' and a.no_bukti <>'"+this.e_nb.getText()+"'  and a.no_ref1='-' ";
							 "and a.kode_lokasi ='"+this.app._lokasi+"'  and a.modul = 'AJUBDD' and a.no_bukti <>'"+this.e_nb.getText()+"'  ";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg4.appendData([line.no_bukti,line.tgl,line.keterangan,line.dc,floatToNilai(line.nilai)]);
					}
				} 																				
				
			}									
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {															
								this.nama_report="server_report_saku3_tm_rptBddDisJurnal";
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
								this.pc3.hide();
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
			this.sg1.clear(1); this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.bTampil.setVisible(true);			
			this.stsSimpan = 1;	
			this.dataJU = "";		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from tu_prbeban_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='GENBBN'";				
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
		var line3;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line3 = this.dataJU3.rs.rows[i];		
			this.sg3.appendData([line3.no_bukti,line3.tgl,line3.keterangan,floatToNilai(line3.nilai)]); 			
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc3.setActivePage(this.pc3.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.bTampil.setVisible(false);
											
				var strSQL = "select * from tu_prbeban_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);								
					}
				}												
											
				
				this.sg1.clear(1);				
				var strSQL = "select a.kode_proyek,a.periode,b.nama,c.akun_bdd,c.akun_beban,c.akun_bmhd,b.kode_pp,(a.nilai_beban - isnull(d.nilai_beban,0)) as nilai_beban, b.kode_drkb "+
							 "from tu_proyek_d a "+
							/*
							 "inner join (		 "+
							 		
							 "		select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
							 "      from tu_prbdd_d "+
							 "		where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+							 		
							 "		group by kode_proyek,kode_lokasi "+
							 
							 "		) x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi "+
							 */
							
							 "inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+
							 
							 "inner join (  "+
							 
							 "	select no_bukti,no_dokumen,periode_beban,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_beban "+
							 "  from tu_prbeban_j "+
							 "  where jenis = 'BEBAN' and no_bukti= '"+this.e_nb.getText()+"' "+
							 "  group by no_bukti,no_dokumen,periode_beban,kode_lokasi "+
							 
							 ") e "+							 
							 "  on a.kode_proyek=e.no_dokumen and a.periode=e.periode_beban and a.kode_lokasi=e.kode_lokasi "+
							 
							 "left join (  "+
							 
							 "	select no_dokumen,periode_beban,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) nilai_beban "+
							 "  from tu_prbeban_j "+
							 "  where jenis = 'BEBAN' and no_bukti<> '"+this.e_nb.getText()+"' "+
							 "  group by no_dokumen,periode_beban,kode_lokasi "+
							 
							 ") d "+
							 "  on a.kode_proyek=d.no_dokumen and a.periode=d.periode_beban and a.kode_lokasi=d.kode_lokasi "+
							 
							 "where e.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
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
						tot = tot + parseFloat(line.nilai_beban);																	
					}
					this.e_total.setText(floatToNilai(tot));
				
				} else this.sg1.clear(1);
				
				this.doRekapBeban();	
				this.pc1.setActivePage(this.pc1.childPage[0]);										
				
			}									
		} catch(e) {alert(e);}
	}	
});