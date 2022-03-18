window.app_saku2_transaksi_kopeg_logistik_fSpbBAAgendaE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fSpbBAAgendaE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fSpbBAAgendaE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembuatan SPB Logistik: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_agenda = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Agenda",maxLength:30,readOnly:true});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:120});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,17,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Akru Hutang","Detail Jurnal"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","PP","Approve","Pihak Ketiga","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,200,150,200,150,200,150,150,200,60,150,150,80]],
					colFormat:[[12],[cfNilai]],
					readOnly:true,					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);																
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_logistik_fSpbBAAgendaE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fSpbBAAgendaE.implement({
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
					sql.add("delete from spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spb_d where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set modul='-',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_m where no_aju='"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
										
					sql.add("insert into spb_m (no_spb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_tahu,nik_fiat,nik_bdh,no_kas,nilai,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_tahu.getText()+"','"+this.e_agenda.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'LOGITAJU')"); 					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "SPB"){
							sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,sts_pajak) values "+
									"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','LOG','"+line.akun_hutang+"','"+this.app._kodePP+"','-','"+line.no_ba+" | "+this.e_ket.getText()+"',"+line.nilai+",getdate(),'"+this.app._userLog+"','-','-','-','A','-','-','"+this.app._namaUser.substr(0,50)+"','NON')");
							sql.add("insert into spb_d(no_spb,kode_lokasi,no_bukti,modul,nilai,bank,cabang,no_rek,nama_rek,akun_hutang) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_ba+"','LOG',"+line.nilai+",'"+line.bank+"','"+line.cabang+"','"+line.no_rek+"','"+line.nama_rek+"','"+line.akun_hutang+"')");														
						
							if (line.jenis.toUpperCase() == "NONMTN")
								sql.add("update log_po_termin set modul='SPB',no_spb='"+this.e_nb.getText()+"' where jenis <> 'MTN' and no_ba='"+line.no_ba+"' and no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'");
							else sql.add("update log_po_termin set modul='SPB',no_spb='"+this.e_nb.getText()+"' where jenis = 'MTN' and no_final='"+line.no_ba+"' and no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'");
						
							var  bank = line.bank+" - "+line.cabang;
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
									"('"+this.e_agenda.getText()+"','"+this.app._lokasi+"','"+bank+"','"+line.no_rek+"','"+line.no_rek+"','-',"+nilaiToFloat(line.nilai)+",'-')");							
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai SPB tidak boleh nol atau kurang.");
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
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spb_d where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set modul='-',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_m where no_aju='"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
	},					
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1);
			this.e_nb.setSQL("select a.no_spb, a.no_kas from spb_m a inner join it_aju_m b on a.no_kas=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.progress in ('A','R') and a.modul = 'LOGITAJU' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_spb","a.no_kas"],false,["No Bukti","No Agenda"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!= "") {			
			var strSQL = "select no_kas,tanggal,periode,due_date,keterangan,nik_buat,nik_tahu,nik_fiat,nik_bdh "+
						 "from spb_m where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.dp_d2.setText(line.due_date);										
					this.e_agenda.setText(line.no_kas);
					this.e_ket.setText(line.keterangan);					
					this.cb_buat.setText(line.nik_buat);
					this.cb_tahu.setText(line.nik_tahu);					
				} 
			}		
			this.doLoad();
		}
	},
	doLoad:function(sender){
		if (this.e_nb.getText()!="") {
			var strSQL = "select 'SPB' as status,a.no_ba,a.no_po,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,d.kode_pp+' - '+d.nama as pp,b.nik_app+' - '+e.nama as approve,f.kode_vendor+' - '+f.nama as vendor,f.bank,f.cabang,f.no_rek,f.nama_rek,b.nilai+b.nilai_ppn+b.nilai_tambah as nilai,a.akun_hutang,'NONMTN' as jenis "+
						 "from log_po_termin a "+
						 "     inner join log_ba_m b on a.no_ba=b.no_ba and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi "+						 
						 "     inner join pp d on b.kode_pp=d.kode_pp and d.kode_lokasi=b.kode_lokasi "+						 
						 "     inner join karyawan e on b.nik_app=e.nik and b.kode_lokasi=e.kode_lokasi "+
						 "     inner join vendor f on c.kode_vendor=f.kode_vendor and c.kode_lokasi=f.kode_lokasi "+						 
						 "where a.jenis<>'MTN' and a.no_spb = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "union "+
						 "select 'SPB' as status,a.no_final,a.no_po,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,d.kode_pp+' - '+d.nama as pp,b.nik_app+' - '+e.nama as approve,f.kode_vendor+' - '+f.nama as vendor,f.bank,f.cabang,f.no_rek,f.nama_rek,b.nilai+b.nilai_ppn+b.nilai_tambah as nilai,a.akun_hutang,'MTN' as jenis "+
						 "from log_po_termin a "+
						 "     inner join log_ba_m b on a.no_final=b.no_ba and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi "+						 
						 "     inner join pp d on b.kode_pp=d.kode_pp and d.kode_lokasi=b.kode_lokasi "+						 
						 "     inner join karyawan e on b.nik_app=e.nik and b.kode_lokasi=e.kode_lokasi "+
						 "     inner join vendor f on c.kode_vendor=f.kode_vendor and c.kode_lokasi=f.kode_lokasi "+						 
						 "where a.jenis='MTN' and no_final <> '-' and a.no_spb = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "order by tanggal";
			var tot = 0;			 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];				
					tot += parseFloat(line.nilai);				
				}
				this.e_total.setText(floatToNilai(tot));
				
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();				
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;		
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.status.toUpperCase(),line.no_ba,line.no_po,line.tanggal,line.keterangan,line.pp,line.approve,line.vendor,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doDoubleClick: function(sender, col , row) {	
		strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
				 "from log_ba_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
				 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
				 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
				 "where a.no_ba = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg2.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_agenda.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbUbahHapus);
			this.cb1.setSelected(true);
		} catch(e) {
			alert(e);
		}
	}
});