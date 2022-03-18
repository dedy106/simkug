window.app_saku3_transaksi_kb_fKbTerima = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kb_fKbTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kb_fKbTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Droping Terima: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:4,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Penerimaan","Detail Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi","Akun KasBank"],
					colWidth:[[4,3,2,1,0],[300,250,150,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});										
		this.c_curr = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,17,200,20],caption:"Currency",readOnly:true,tag:2});										
		this.cb_akun = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"No Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[1],{bound:[680,14,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,325], childPage:["Data Pengiriman"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,285],colCount:7,tag:0,
		            colTitle:["Status","No Kirim","No Reimburse","Tanggal","Keterangan","Curr","Nilai"],					
					colWidth:[[6,5,4,3,2,1,0],[100,60,420,80,100,100,70]],
					readOnly:true,buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					colFormat:[[6],[cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HAJKIRIM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HAJKIRIM") this.akunKirim = line.flag;													
				}
			}
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join haj_akuncabang b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.modul='KB' and b.jenis='O' and b.kode_pp ='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
			this.jenis = "BM";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kb_fKbTerima.extend(window.childForm);
window.app_saku3_transaksi_kb_fKbTerima.implement({
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update haj_reim_m set no_terima='-' where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','DRTERIMA','"+this.jenis+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','DRTERIMA','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunKirim+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','DRTERIMA','KBTEMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");					
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){																
								sql.add("update haj_reim_m set no_terima='"+this.e_nb.getText()+"' where no_kas='"+this.sg.cells(1,i)+"' and no_reim='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
							if (this.sg.cells(5,i) != this.c_curr.getText()) {
								system.alert(this,"Transaksi tidak valid.","Currency yang di APP tidak sama dengan Rekening Penerima.");
								return false;						
							}							
						}
					}						
				}								
				if (nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("update haj_reim_m set no_terima='-' where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad3();
	},
	doChange:function(sender){
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {
			var strSQL = "select kode_curr from masakun where kode_akun ='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.c_curr.setText(line.kode_curr);					
				}
			}
		}				
	},
	doLoadData:function(sender){
		if (this.c_curr.getText()!="") {
			var data1 = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_kas,a.no_reim,convert(varchar,c.tanggal,103) as tgl,c.keterangan,b.kode_curr,a.nilai "+
						"from haj_reim_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+												
						"                  inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
						"where a.no_terima='-' and a.kode_pp ='"+this.app._kodePP+"' and b.kode_curr='"+this.c_curr.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];					
					this.sg.appendData([line1.status.toUpperCase(),line1.no_kas,line1.no_reim,line1.tgl,line1.keterangan,line1.kode_curr,floatToNilai(line1.nilai)]);
				}
			} else this.sg.clear(1);										
		}
		else system.alert(this,"Rekening harus dipilih.","");
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 ) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "APP"){					
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "" && this.jenis != "" && this.jenis != undefined) {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("2"),this.e_nb);
				this.sg.clear(1); 
				this.e_total.setText("0");				
				this.bTampil.setVisible(true);
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join haj_akuncabang b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.modul='KB' and b.jenis='O' and b.kode_pp ='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);			
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
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
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","2"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.akun_kb+' - '+c.nama as akun,a.tanggal "+
		             "from kas_m a "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "where a.no_del='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'DRTERIMA' and a.posted ='F' "+
					 "order by a.tanggal";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,line.akun]); 
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
				this.bTampil.setVisible(false);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,jenis,akun_kb,no_link,ref1,kode_curr "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.jenis = line.jenis;											
						this.e_ket.setText(line.keterangan);	
						this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join haj_akuncabang b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_curr='"+line.kode_curr+"' and b.modul='KB' and b.jenis='O' and b.kode_pp ='"+this.app._kodePP+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);						
						this.cb_akun.setText(line.akun_kb);						
					}
				}
				var data1 = this.dbLib.getDataProvider("select 'APP' as status,a.no_kas,a.no_reim,convert(varchar,c.tanggal,103) as tgl,c.keterangan,b.kode_curr,a.nilai "+
							"from haj_reim_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+												
							"                  inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_terima='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];					
						this.sg.appendData([line1.status.toUpperCase(),line1.no_kas,line1.no_reim,line1.tgl,line1.keterangan,line1.kode_curr,floatToNilai(line1.nilai)]);
					}
				} else this.sg.clear(1);										
			}
		} catch(e) {alert(e);}		
	}
});
