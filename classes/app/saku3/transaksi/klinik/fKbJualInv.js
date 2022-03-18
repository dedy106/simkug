window.app_saku3_transaksi_klinik_fKbJualInv = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fKbJualInv.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fKbJualInv";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pembayaran Penjualan per Invoice: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pembayaran","Detail Pembayaran"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi","Akun KasBank"],
					colWidth:[[4,3,2,1,0],[200,250,150,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[20,17,202,20],caption:"Jenis",items:["BM"], readOnly:true,tag:2,change:[this,"doChange"],visible:false});
		this.cb_akun = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"No Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});											
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,450,20],caption:"No Dokumen",maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});										
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,18,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_pic = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Penyetor", multiSelection:false, maxLength:10, tag:2});											
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,15,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	
				
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,20,990,260], childPage:["Data Invoice"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,245],colCount:8,tag:0,
				colTitle:["No Bukti","Customer","CustID","Tanggal","Akun AR","Saldo Tagihan","Nilai Bayar","Sisa"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,80,100,50,280,120]],
				colHide:[[2],[true]],				
				columnReadOnly:[true,[1,2,3,4,5,7],[0,6]],				
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],								
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
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
			this.c_jenis.setText("BM");
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);						
			this.cb_pic.setSQL("select a.kode_pic, a.nama from kli_pic a where a.kode_lokasi = '"+this.app._lokasi+"'",["a.kode_pic","a.nama"],false,["Kode","Nama"],"and","Data Penyetor",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fKbJualInv.extend(window.childForm);
window.app_saku3_transaksi_klinik_fKbJualInv.implement({
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
						sql.add("delete from kli_jualbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBJUALINV','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.cb_pic.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBJUALINV','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "0"){							
							var nilaiPiu = nilaiToFloat(this.sg1.cells(6,i));																										
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(4,i)+"','Pembayaran Piu. "+this.sg1.cells(0,i)+"','C',"+nilaiPiu+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBJUALINV','AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiPiu+")");														
							sql.add("insert into kli_jualbayar_d(no_bukti,kode_lokasi,no_jual,nu,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul,kode_cust) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+i+",'"+this.sg1.cells(4,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+",0,'"+this.e_periode.getText()+"','D','KBJUAL','"+this.sg1.cells(2,i)+"')");							
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
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				this.sg1.validasi();												
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i)){											
						if (this.sg1.cells(6,i) != "0") {
							if (nilaiToFloat(this.sg1.cells(5,i)) < nilaiToFloat(this.sg1.cells(6,i))) {
								var j = i+1;
								system.alert(this,"Transaksi tidak valid.","Nilai Bayar melebihi Saldo Tagihan. Baris : "+j);
								return false;						
							}
						}
					}
				}								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
					sql.add("delete from kli_jualbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();		
		this.doLoad3();
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) this.doClick();		
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.doClick();				
		}																									
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {				
				this.sg1.clear(1);								
				var sql = new server_util_arrayList();
				sql.add("select a.no_jual,x.nama "+						  
						"from kli_jual_m a inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
						"     left join ("+
						"          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						"          from kli_jualbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						"where (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'");									
				this.dbLib.getMultiDataProviderA(sql);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{						
			var nilai = saldo = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "" && this.sg1.cells(6,i) != "") {					
					saldo += nilaiToFloat(this.sg1.cells(5,i));					
					nilai += nilaiToFloat(this.sg1.cells(6,i));															
				}
			}			
			this.e_saldo.setText(floatToNilai(saldo));
			this.e_total.setText(floatToNilai(nilai));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 6) {	
			if (this.sg1.cells(6,row)!= "") {								
				var sisa = nilaiToFloat(this.sg1.cells(5,row)) - nilaiToFloat(this.sg1.cells(6,row));
				this.sg1.cells(7,row,parseFloat(sisa));
				this.sg1.validasi();
			}
		}		
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var nobukti = this.dataBukti.get(sender.cells(0,row));				
				if (nobukti) {
					sender.cells(1,row,nobukti);
					var strSQL = "select a.no_jual,convert(varchar,a.tanggal,103) as tgl,x.kode_cust,x.kode_cust+' - '+x.nama as keterangan,a.akun_piutang,a.nilai-isnull(b.bayar,0) as saldo,a.tanggal  "+						  
						 "from kli_jual_m a "+
						 "     inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
						 "     left join ("+
						 "          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "          from kli_jualbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						 ") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_jual ='"+this.sg1.cells(0,row)+"' and (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'";						 
						 
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {
							sender.cells(2, row, line.kode_cust);
							sender.cells(3, row, line.tgl);
							sender.cells(4, row, line.akun_piutang);
							sender.cells(5, row, floatToNilai(line.saldo));
							sender.cells(6, row, "0");
							sender.cells(7, row, floatToNilai(line.saldo));							
						}
						else {
							sender.cells(2, row, "");
							sender.cells(3, row, "");
							sender.cells(4, row, "");
							sender.cells(5, row, "");
							sender.cells(6, row, "");
							sender.cells(7, row, "");
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"No Bukti "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkRek");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell1");		
	},		
	doDoubleClick: function(sender, col , row) {
		try{			
			if (this.sg1.cells(6,row) == "0") {											
				var nilai = nilaiToFloat(this.sg1.cells(5,row));
				this.sg1.cells(6,row,parseFloat(nilai));				
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
								this.nama_report="server_report_saku3_klinik_rptKbJual";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBukti = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataBukti.set(line.no_jual, line.nama);										
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
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.akun_kb+' - '+c.nama as akun,a.tanggal "+
		             "from kas_m a "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBJUALINV' and a.posted ='F' "+
					 "order by a.tanggal";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
		
		var sql = new server_util_arrayList();
		sql.add("select a.no_jual,x.nama "+						  
				"from kli_jual_m a inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
				"     left join ("+
				"          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
				"          from kli_jualbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
				") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
				"where (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'");									
		this.dbLib.getMultiDataProviderA(sql);
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
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_link,akun_kb,no_link,no_dokumen,jenis,nik_app "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.e_dok.setText(line.no_dokumen);											
						this.e_ket.setText(line.keterangan);									
						this.cb_akun.setText(line.akun_kb);										
						this.cb_pic.setText(line.nik_app);										
					}
				}
				var sql = new server_util_arrayList();
				sql.add("select a.no_jual,x.nama "+						  
						 "from kli_jual_m a "+
						 "     inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
						 "     inner join kli_jualbayar_d c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
						 "     left join ("+
						 "          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "          from kli_jualbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						 ") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						 "where c.no_bukti='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal");									
				this.dbLib.getMultiDataProviderA(sql);
				
				var strSQL = "select a.no_jual,convert(varchar,a.tanggal,103) as tgl,x.kode_cust,x.kode_cust+' - '+x.nama as keterangan,a.akun_piutang,a.nilai-isnull(b.bayar,0) as saldo,a.tanggal,c.nilai_kas,a.nilai-isnull(b.bayar,0)-c.nilai_kas as sisa  "+						  
						 "from kli_jual_m a "+
						 "     inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
						 "     inner join kli_jualbayar_d c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
						 "     left join ("+
						 "          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						 "          from kli_jualbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						 ") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						 "where c.no_bukti='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal";						 				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_jual,line.keterangan,line.kode_cust,line.tgl,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.nilai_kas),floatToNilai(line.sisa)]);
					}
				} else this.sg1.clear(1);								
			}						
		} catch(e) {alert(e);}		
	},
	doEllipsClick: function(sender, col, row){
		try{										
			if (col == 0){				
				var str1 = "select a.no_jual,x.nama "+						  
						   "from kli_jual_m a inner join kli_cust x on a.kode_cust=x.kode_cust and a.kode_lokasi=x.kode_lokasi "+
						   "     left join ("+
						   "          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						   "          from kli_jualbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						   ") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						   "where (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'";						 
						   
				var str2 = "select count(a.no_jual) "+						  
						   "from kli_jual_m a "+
						   "     left join ("+
						   "          select no_jual,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar  "+
						   "          from kli_jualbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_jual,kode_lokasi "+
						   ") b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
						   "where (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'";
				this.standarLib.showListData(this, "Daftar Bukti",sender,undefined, str1,str2,["a.no_jual","x.nama"],"and",["No Bukti","Customer"],false);				
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	}
});