window.app_saku2_transaksi_kopeg_kbitt_fFinalKB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fFinalKB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fFinalKB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Penerimaan KasBank : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data KasBank","Detail KasBank","Item Jurnal","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["No KasBank","Tanggal","Akun","Uraian","Nominal","Tgl Input","User","Periode"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,150,70,100,250,150,60,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Fiat",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No KasBank", readOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", readOnly:true});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Tanggal", readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", readOnly:true});								
		this.e_periode2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"Periode", readOnly:true});												
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,100,50,100,250,40,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});		
		this.e_nilaikb = new saiLabelEdit(this.sgn1,{bound:[770,1,200,20],caption:"Total Lawan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No KasBank",tag:9});
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});				
		this.bCari = new button(this.pc1.childPage[3],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		setTipeButton(tbSimpan);
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
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fFinalKB.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fFinalKB.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fiat_m","no_fiat",this.app._lokasi+"-FKB"+this.e_periode.getText().substr(2,4)+".","000"));		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					sql.add("update a set no_fiatseb ='"+this.e_nb.getText()+"' "+
					        "from fiat_m a inner join fiat_d b on a.no_fiat=b.no_fiat and a.kode_lokasi=b.kode_lokasi and a.no_fiatseb='-' "+
							"where b.no_bukti ='"+this.e_noaju.getText()+"' and b.modul='ITKBFINAL' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update kas_m set periode='"+this.e_periode.getText()+"',posted='F',no_link='"+this.e_nb.getText()+"' where no_kas='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into fiat_m (no_fiat,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_fiatseb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','ITKBFINAL','-')");					
					sql.add("insert into fiat_d (no_fiat,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','A','ITKBFINAL','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','-')");					
																				
					if (this.sg1.getRowValidCount() > 0){						
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								var j = i+1;								
								var tgl = this.e_tgl.getText().substr(6,4)+"-"+this.e_tgl.getText().substr(3,2)+"-"+this.e_tgl.getText().substr(0,2);
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_noaju.getText()+"','-','"+tgl+"',"+j+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','"+this.sg1.cells(7,i)+"','-','-','"+this.app._lokasi+"','KBITTRM','FINAL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);										
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.sg1.validasi();				
				if (nilaiToFloat(this.e_nilaikb.getText()) + nilaiToFloat(this.e_total.getText()) != 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Jurnal tidak balance.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' union select '-','-' ");
		this.dbLib.getMultiDataProviderA(sql);		
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fiat_m","no_fiat",this.app._lokasi+"-FKB"+this.e_periode.getText().substr(2,4)+".","000"));		
	},		
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);									
			this.e_noaju.setText(this.sg.cells(0,row));						
			this.e_akun.setText(this.sg.cells(2,row));						
			this.e_ket.setText(this.sg.cells(3,row));			
			this.e_tgl.setText(this.sg.cells(1,row));			
			this.e_tglinput.setText(this.sg.cells(5,row));			
			this.e_user.setText(this.sg.cells(6,row));			
			this.e_total.setText(this.sg.cells(4,row));									
			this.e_periode2.setText(this.sg.cells(7,row));						
		}
	},
	doLoad:function(sender){				
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tanggal,a.akun_kb+' - '+isnull(c.nama,'-') as akun,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,d.nik+' - '+d.nama as nik_user,a.periode "+
		             "from kas_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join hakakses d on d.nik=a.nik_user and a.kode_lokasi=d.kode_lokasi "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.posted='X' and a.kode_lokasi='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doCari:function(sender){				
		var filter = "";		
		if (this.e_nobukti.getText()!="") filter = " where a.posted in ('X') and a.no_kas='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where a.posted in ('X') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";		
		
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tanggal,a.akun_kb+' - '+isnull(c.nama,'-') as akun,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,d.nik+' - '+d.nama as nik_user,a.periode "+
		             "from kas_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join hakakses d on d.nik=a.nik_user and a.kode_lokasi=d.kode_lokasi "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+filter;					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.no_kas,line.tanggal,line.akun,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.periode]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_noaju.getText()+"' ";
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
						}else system.info(this,result,"");	    			
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCell1: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg1.cells(2,row) != "" && this.sg1.cells(4,row) != "") {
				this.sg1.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var drk = this.dataDRK.get(sender.cells(7,row));
				if (drk) sender.cells(8,row,drk);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode DRK "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell1");			
	},	
	doNilaiChange1: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg1.cells(4,i));
					else tot += nilaiToFloat(this.sg1.cells(4,i));
				}
			}						
			this.e_nilaikb.setText(floatToNilai(tot));									
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg1.cells(4,row) == ""){
						if (row == 0) this.sg1.setCell(4,row,this.e_total.getText());						
					}
				break;
			case 5 : 
					if ((this.sg1.cells(5,row) == "") && (row > 0)) {
						this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
						this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
					}
					else {
						this.sg1.setCell(5,row,this.app._kodePP);
						this.sg1.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg1.cells(0,row)+"' and b.kode_pp = '"+this.sg1.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}				
			}
		}catch(e){
			systemAPI.alert(e);
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			this.doClick();
			this.doLoad();			
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});