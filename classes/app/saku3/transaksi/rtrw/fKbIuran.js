window.app_saku3_transaksi_rtrw_fKbIuran = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_fKbIuran.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_fKbIuran";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Iuran", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pembayaran","List Pembayaran"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["BM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Saldo Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Pos Penerimaan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_bayar = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Nilai Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_rumah = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"No Rumah", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,315], childPage:["Data Billing"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Status","No Bill","No Rumah","Deskripsi","Periode Bill","Nilai RW","Nilai RT","Total"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,80,250,100,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
						
			this.cb_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where rt='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","keterangan"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
			                    "inner join relakun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' "+
			                    "inner join flag_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
			                    "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			
			//akun dipotong dan ditambah pp sesuai pp (rt) user login	
			var data = this.dbLib.getDataProvider("select kode_spro,substring(flag,1,4)+'"+this.app._kodePP.substr(1,1)+"'  as flag from spro where kode_spro in ('IURPIURW','IURPIURT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "IURPIURW") this.akunPiuRW = line.flag;	
					if (line.kode_spro == "IURPIURT") this.akunPiuRT = line.flag;																			
				}
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_fKbIuran.extend(window.childForm);
window.app_saku3_transaksi_rtrw_fKbIuran.implement({
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
						sql.add("delete from rt_angs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBIUR','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_bayar.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_rumah.getText()+"','-','-')");
															
							
					var kasIDR = nilaiToFloat(this.e_bayar.getText());
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_rumah.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.app._kodePP+"','-','-','"+this.cb_rumah.getText()+"','"+this.app._lokasi+"','KBIUR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_bayar.getText())+")");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_rumah.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPiuRW+"','"+this.e_ket.getText()+"','C',"+this.bayarRW+",'"+this.app._kodePP+"','-','-','"+this.cb_rumah.getText()+"','"+this.app._lokasi+"','KBIUR','PIURW','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+this.bayarRW+")");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_rumah.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPiuRT+"','"+this.e_ket.getText()+"','C',"+this.bayarRT+",'"+this.app._kodePP+"','-','-','"+this.cb_rumah.getText()+"','"+this.app._lokasi+"','KBIUR','PIURT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+this.bayarRT+")");
																
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BAYAR"){
							sql.add("insert into rt_angs_d (no_angs,kode_rumah,no_bill,periode_bill,akun_piurw,akun_piurt,nilai_rw,nilai_rt,kode_lokasi,dc,periode_angs,modul,jenis,no_setor,no_terima) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(4,i)+"', '"+this.akunPiuRW+"','"+this.akunPiuRT+"', "+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.app._lokasi+"','D','"+this.e_periode.getText()+"','KBIUR','-','-','-')");																							
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
					this.sg1.clear(1); 					
					setTipeButton(tbSimpan);
					this.e_ket.setText("Penerimaan Iuran ");
					this.cb_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where rt='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","keterangan"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();								
				
				
				if (nilaiToFloat(this.e_bayar.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
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
					sql.add("delete from rt_angs_d where no_angs='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.e_ket.setText("Penerimaan Iuran ");
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){		
		try	{
			if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
				this.doClick();			
			}			
			if (sender == this.cb_rumah && this.cb_rumah.getText()!="" && this.stsSimpan==1) {			
				var strSQL = "select a.no_bill,a.kode_rumah,b.keterangan,a.periode,a.nilai_rw,a.nilai_rt,a.nilai_rw+a.nilai_rt as total "+
				             "from rt_bill_d a "+
				             "    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
				             "    left join "+
				             "(   "+
				             "   select kode_rumah,periode_bill,kode_lokasi,sum(case dc when 'D' then nilai_rw+nilai_rt else -(nilai_rw+nilai_rt) end) as bayar  "+
				             "	 from rt_angs_d where kode_lokasi='"+this.app._lokasi+"' group by  kode_rumah,periode_bill,kode_lokasi "+
				             ") c on a.kode_rumah=c.kode_rumah and a.periode=c.periode_bill and a.kode_lokasi=c.kode_lokasi "+
				             "where a.kode_rumah ='"+this.cb_rumah.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai_rw+a.nilai_rt > isnull(c.bayar,0) "+
				             "order by a.periode";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData(["INPROG",line.no_bill,line.kode_rumah,line.keterangan,line.periode,floatToNilai(line.nilai_rw),floatToNilai(line.nilai_rt),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
			}		
			if (sender == this.c_jenis && this.stsSimpan==1) {
				this.doClick();				
			}																								
				
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
			}
			this.stsSimpan = 1;			
			this.cb_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where rt='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","keterangan"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = bayar = 0;
			this.bayarRW = this.bayarRT = 0;
						
			for (var i = 0; i < this.sg1.getRowCount();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(7,i));
					if (this.sg1.cells(0,i)=="BAYAR") {
						bayar += nilaiToFloat(this.sg1.cells(7,i));
						
						this.bayarRW += nilaiToFloat(this.sg1.cells(5,i));
						this.bayarRT += nilaiToFloat(this.sg1.cells(6,i));
					}
				}
			}			
			this.e_total.setText(floatToNilai(saldo));	
			this.e_bayar.setText(floatToNilai(bayar));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 0) {				
			this.sg1.validasi();
		}
	},	
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"BAYAR");
		else this.sg1.cells(0,row,"INPROG");
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "X") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.e_ket.setText("Penerimaan Iuran ");
			this.cb_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where rt='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","keterangan"],false,["No Rumah","Nama"],"and","Data Rumah",true);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBIUR' and a.posted ='F'";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan]); 
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
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.akun_kb);				
						this.e_bayar.setText(floatToNilai(line.nilai));				
						this.cb_rumah.setText(line.no_link);				
						this.cb_rumah.setSQL("select kode_rumah, keterangan from rt_rumah where kode_rumah='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","nama"],false,["No Rumah","Keterangan"],"and","Data Rumah",true);									
					}
				}
				
				var strSQL = "select a.no_bill,a.kode_rumah,b.keterangan,a.periode,d.nilai_rw,d.nilai_rt,d.nilai_rw+d.nilai_rt as total "+
				             "from rt_bill_d a "+
				             "    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi "+
				             "	  inner join rt_angs_d d on a.kode_rumah=d.kode_rumah and a.kode_lokasi=d.kode_lokasi and a.periode=d.periode_bill "+
				             "where d.no_angs ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData(["BAYAR",line.no_bill,line.kode_rumah,line.keterangan,line.periode,floatToNilai(line.nilai_rw),floatToNilai(line.nilai_rt),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();
												
			}						
		} catch(e) {alert(e);}
	}
});