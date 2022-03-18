window.app_saku3_transaksi_dago_fBayarFee = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fBayarFee.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fBayarFee";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Komisi Agen", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Total"],
					colWidth:[[4,3,2,1,0],[100,250,150,80,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});

		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Rekening KasBank", multiSelection:false, tag:2});												
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Komisi", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[290,16,200,22],caption:"Kurs", tag:3, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_totalIDR = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[680,16,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,990,300], childPage:["Daftar Komisi","Detail"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Status","No Akru","Kode Agen","Nama Agen","Bank","Rekening","Total Komisi","Tot Komisi IDR"],										
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,150,150,170,80,100,80]],					
					readOnly:true,					
					colFormat:[[6,7],[cfNilai,cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],	
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],		
					dblClick:[this,"doDoubleClick"],						
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "LKURS") this.lKurs = line.flag;
					if (line.kode_spro == "RKURS") this.rKurs = line.flag;
				}
			}

			this.dataJU = {rs:{rows:[]}};				
			this.c_curr.setText("USD");

			this.cb_akun.setSQL("select a.kode_akun, a.nama "+
								 "from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_flag in ('001','009') ",
								 ["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fBayarFee.extend(window.childForm);
window.app_saku3_transaksi_dago_fBayarFee.implement({
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update dgw_komisi_d set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 										
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBFEE','BK','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_totalIDR.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBFEE','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");										

					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase()=="APP"){
							sql.add("update dgw_komisi_d set no_kas='"+this.e_nb.getText()+"' where no_akru='"+line.no_akru+"' and no_agen='"+line.no_agen+"' and kode_lokasi='"+this.app._lokasi+"'");							
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_hutang+"','Pembayaran a.n "+line.nama_agen+"','D',"+parseFloat(line.nilai_idr)+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBFEE','HUTANG','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+parseFloat(line.nilai)+")");										
						 
							if (parseFloat(line.kurs) != nilaiToFloat(this.e_kurs.getText()))  {
								var sls = (nilaiToFloat(this.e_kurs.getText()) - parseFloat(line.kurs)) * parseFloat(line.nilai);
								if (sls !=0 ) {
									if (sls < 0){ 
										var akunKurs = this.lKurs;
										var dc = "C";
										var dcHutang = "D";
									}
									else {
										var akunKurs = this.rKurs;
										var dc = "D";
										var dcHutang = "C";
									}
									sls = Math.abs(sls);

									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
											"('"+this.e_nb.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',0,'"+akunKurs+"','Selisih Kurs Akru Komisi','"+dc+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBFEE','SKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
											"('"+this.e_nb.getText()+"','"+line.no_akru+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_hutang+"','Selisih Kurs a.n "+line.nama_agen+"','"+dcHutang+"',"+sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBFEE','SLSHUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+sls+")");
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
					this.sg.clear(1); 
					setTipeButton(tbAllFalse);		
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.dataJU = {rs:{rows:[]}};						
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
												
				if (nilaiToFloat(this.e_totalIDR.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total komisi tidak boleh nol atau kurang.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("update dgw_komisi_d set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange: function(sender){
		try{
			if (sender == this.c_curr && this.c_curr.getText() != "") {
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));	
					}					
				}
			}
			if (sender == this.e_kurs && this.e_kurs.getText() != "") {
				this.sg.clear(1);
				this.dataJU = {rs:{rows:[]}};					
				thi.e_total.setText("0");
				this.e_totalIDR.setText("0");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doLoadData:function(sender){	
		if (this.e_kurs.getText()!="" && this.e_kurs.getText()!="0") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			var strSQL = "select 'NON' as status,a.no_akru,a.no_agen,b.nama_agen,b.bank+' | '+b.cabang as bank,b.norek+' | '+b.namarek as rek,a.nilai,a.nilai * "+nilaiToFloat(this.e_kurs.getText())+" as nilai_idr,a.akun_hutang,a.kurs "+
						 "from dgw_komisi_d a inner join dgw_agent b on a.no_agen=b.no_agen and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='-' and a.periode<='"+this.e_periode.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);										
			} else this.sg.clear(1);																		
		}	
		else system.alert(this,"Kurs tidak valid.","");
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_akru,line.no_agen,line.nama_agen,line.bank,line.rek,floatToNilai(line.nilai),floatToNilai(line.nilai_idr)]);		
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
			this.sg.validasi();
		}
	},
	doDoubleClick: function(sender, col , row) {
		if(this.sg.cells(0,row) == "NON") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"NON");
	},
	doNilaiChange: function(){
		var tot = totidr = 0;
			for (var i = 0;i < this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "APP"){			
					tot += parseFloat(line.nilai);
					totidr += parseFloat(line.nilai_idr);	
				}
			}			
		this.e_total.setText(floatToNilai(tot));
		this.e_totalIDR.setText(floatToNilai(totidr));			
	},
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1);		
				this.e_total.setText("0"); this.e_totalIDR.setText("0"); 
				this.bTampil.setVisible(true);
				this.dataJU = {rs:{rows:[]}};											
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.dataJU = {rs:{rows:[]}};				
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBFEE' "+
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));								
									
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_akun.setText(line.akun_kb);								
						this.e_ket.setText(line.keterangan);	
						this.c_curr.setText(line.kode_curr);	
						this.e_kurs.setText(floatToNilai(line.kurs));						
					}
				}				
				
				var strSQL = "select 'APP' as status,a.no_akru,a.no_agen,b.nama_agen,b.bank+' | '+b.cabang as bank,b.norek+' | '+b.namarek as rek,a.nilai,a.nilai * "+nilaiToFloat(this.e_kurs.getText())+" as nilai_idr,a.akun_hutang,a.kurs "+
							 "from dgw_komisi_d a inner join dgw_agent b on a.no_agen=b.no_agen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);										
				} else this.sg.clear(1);
			}						
		} catch(e) {alert(e);}		
	}
});



