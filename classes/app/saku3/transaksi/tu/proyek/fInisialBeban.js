window.app_saku3_transaksi_tu_proyek_fInisialBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fInisialBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fInisialBeban";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Distribusi BDD Inisialisasi Proyek", 0);	
		
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
				
		this.e_nb = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc3.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new portalui_saiLabelEdit(this.pc3.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});														
		
		this.cb_app = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,16,220,20],caption:"NIK Approve",tag:2,multiSelection:false}); 								
		
		this.cb_pp = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,12,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 					
		this.cb_id = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,19,220,20],caption:"ID Kegiatan",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_uraian = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,16,550,20],caption:"Deskripsi", readOnly:true});				
		this.e_nsaldo = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,19,200,20],caption:"Saldo BDD", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_nilai = new saiLabelEdit(this.pc3.childPage[0],{bound:[20,22,200,20],caption:"Nilai Beban", tag:1, tipeText:ttNilai, text:"0"});				
		
		this.cb_bdd = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,14,220,20],caption:"Akun BDD",tag:1,readOnly:true});         				
		this.cb_beban = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,15,220,20],caption:"Akun Beban",tag:1,readOnly:true});         				
		this.cb_drk = new portalui_saiCBBL(this.pc3.childPage[0],{bound:[20,16,220,20],caption:"DRK",tag:1,readOnly:true});         				
		

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
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);

			this.cb_bdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_beban.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fInisialBeban.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_proyek_fInisialBeban.implement({
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
							"('"+this.e_nb.getText()+"','"+this.cb_id.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),'F','IDR',1,'INIBDD')");
													
					sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_id.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_beban.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','INIBDD','BEBAN','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");													
					sql.add("insert into tu_prbeban_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,periode_beban,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_id.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.cb_bdd.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','INIBDD','BDD','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																			
					
					//pengurangan bdd (---18-9-17 --> kyknya gak dipake juga gpp insert ini mah, krn hitung sado tetep dr prbeban-j)
					sql.add("insert into tu_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_bdd.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.cb_id.getText()+"','INIBDD','INIBDD')");					
					
					
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
					this.sg3.clear(1);			
					this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where no_app='INISIAL' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);																
					this.e_uraian.setText("");													
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
			    if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nsaldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo BYMHD.");
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
		try {
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		
		this.cb_drk.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='BEBAN' where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				

		if (this.stsSimpan == 1) {
				this.doClick();				
		}
		
		}
		catch(e) {
			alert(e);
		}	
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1); 	
			this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where  no_app='INISIAL' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Kegiatan","Keterangan"],"and","Data Kegiatan",true);																
			this.e_uraian.setText("");									
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prbeban_m","no_bukti",this.app._lokasi+"-INB"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);			
	},
	doChange:function(sender){
		try {
			if (sender==this.cb_pp && this.cb_pp.getText()!="" && this.stsSimpan == 1) {			
				this.cb_id.setText("","");			
				this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where no_app='INISIAL' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																
				this.e_uraian.setText("");							
			}
			if (sender==this.cb_id && this.cb_id.getText()!="") {			
				var strSQL = "select xx.kode_proyek,xx.nama,xx.akun_bdd,xx.akun_beban,xx.kode_drkb, xx.saldo_bdd - isnull(dd.nilai_beban,0) as saldo_bdd  "+
						    "from ( "+
				
							"select a.kode_proyek,b.nama,c.akun_bdd,c.akun_beban,b.kode_drkb, sum(case a.dc when 'D' then a.nilai else -a.nilai end) as saldo_bdd "+
							"from tu_prbdd_d a  "+
							"inner join it_aju_m bb on a.no_bukti=bb.no_aju and a.kode_lokasi=bb.kode_lokasi and bb.no_kas<>'-' "+
							"inner join tu_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							"inner join tu_proyek_jenis c on b.kode_jenis=c.kode_jenis "+														
							"where a.modul in ('AJUBDD') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' and a.no_bukti <> '"+this.e_nb.getText()+"' "+
							" and b.kode_proyek='"+this.cb_id.getText()+"' "+
							"group by a.kode_proyek,b.nama,c.akun_bdd,c.akun_beban,b.kode_drkb "+

							") xx "+

							"left join (  "+
							 
							 "	select no_dokumen,sum(case dc when 'D' then nilai else -nilai end) nilai_beban "+
							 "  from tu_prbeban_j "+
							 "  where jenis = 'BEBAN' and no_dokumen='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "  group by no_dokumen,kode_lokasi "+
							 
							 ") dd "+
							 "  on xx.kode_proyek=dd.no_dokumen ";



				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					this.e_nsaldo.setText(floatToNilai(line.saldo_bdd));				
					this.e_uraian.setText(line.nama);	
					this.cb_bdd.setText(line.akun_bdd);				
					this.cb_beban.setText(line.akun_beban);				
					this.cb_drk.setText(line.kode_drkb);				
				}
			}	
		}
		catch(e) {
			alert(e);
		}			
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {															
								this.nama_report="server_report_saku3_tu_proyek_rptBeban";
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
			this.sg3.clear(1);
			this.pc3.setActivePage(this.pc3.childPage[0]);			
			setTipeButton(tbAllFalse);		
			this.stsSimpan = 1;		
			this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where no_app='INISIAL' and kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																
			this.e_uraian.setText("");										
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from tu_prbeban_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' and a.modul='INIBDD'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select * from tu_prbeban_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);		
						this.e_nilai.setText(floatToNilai(line.nilai));	

						this.cb_pp.setText(line.kode_pp);		
						this.cb_id.setSQL("select kode_proyek, nama from tu_proyek where kode_proyek='"+line.no_dokumen+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["ID Project","Keterangan"],"and","Data Proyek",true);																						
						this.cb_id.setText(line.no_dokumen);																											
					}
				}												
				
				
				
			}									
		} catch(e) {alert(e);}
	}	
});