window.app_saku3_transaksi_sinergi_fInvCustBatal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sinergi_fInvCustBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sinergi_fInvCustBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Invoice", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["JU"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,300,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,315], childPage:["Data Invoice"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Status","No Bill","No SO","Akun AR","Curr","Kurs","Tagihan","Tagihan IDR"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,60,60,80,200,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BATAL","INPROG"]})]],
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
						
			this.cb_cust.setSQL("select kode_cust, nama from si_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sinergi_fInvCustBatal.extend(window.childForm);
window.app_saku3_transaksi_sinergi_fInvCustBatal.implement({
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
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from si_billbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 
																				
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','JU','SOBATAL','IDR',1,0,'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.cb_cust.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BATAL"){
							sql.add("update si_so_d set no_bill='-' where no_bill='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("insert into si_billbayar_d(no_bukti,kode_lokasi,no_bill,akun_piutang,nilai_kas,nilai_lain,nilai_sk,periode,dc,modul,kode_curr,kurs,kode_cust)  values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+",0,0,'"+this.e_periode.getText()+"','D','JU','"+this.sg1.cells(4,i)+"',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.cb_cust.getText()+"')");
									
							sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) "+
									"select '"+this.e_nb.getText()+"',no_bill,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,'"+this.cb_cust.getText()+"','-','-','-','-','-',kode_lokasi,'JU','SOBATAL','"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate(),'-','-' "+
									"from si_bill_j where no_bill='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				
				var adaBatal = 0;
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(0,i) == "BATAL"){
						adaBatal = 1;
					}
				}
				if (adaBatal == 0){
					system.alert(this,"Transaksi tidak valid.","Tidak ada status BATAL.");
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
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from si_billbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			this.doClick();			
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1) {			
			var strSQL = "select a.no_bill,a.no_dokumen as no_so,a.akun_piutang,a.kode_curr,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo, round((a.total-isnull(b.bayar,0))* a.kurs,2) as saldo_idr "+
			             "from ( "+						 
						 "select a.kode_cust,a.no_bill,a.no_dokumen,a.akun_piutang,a.kurs,a.kode_curr,a.kode_lokasi, "+
						 "sum(a.nilai+a.ppn) as total  "+ 
						 "from si_bill_m a "+
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.nilai+a.ppn > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "group by a.kode_cust,a.no_bill,a.no_dokumen,a.akun_piutang,a.kurs,a.kode_curr,a.kode_lokasi "+
						 ")a  "+						 
						 "left join ( "+
						 "    select no_bill,kode_lokasi,sum(case dc when 'D' then nilai_kas else -nilai_kas end) as bayar  "+
						 "    from si_billbayar_d where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_bill,kode_lokasi) b "+
						 "on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_bill";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg1.appendData(["INPROG",line.no_bill,line.no_so,line.akun_piutang,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.saldo_idr)]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
		}		
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.doClick();				
		}																					
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
			}
			this.stsSimpan = 1;			
			this.cb_cust.setSQL("select kode_cust, nama from si_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},			
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "INPROG") this.sg1.cells(0,row,"BATAL");
		else this.sg1.cells(0,row,"INPROG");
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'JU' and jenis='SOBATAL' and a.posted ='F'";
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
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan]); 
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
								
				var strSQL = "select * from ju_m "+
							 "where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText("JU");					
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_cust.setText(line.ref1);				
						this.cb_cust.setSQL("select kode_cust, nama from si_cust where kode_cust='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
					}
				}
				
				var strSQL = "select a.no_bill,a.no_dokumen as no_so,a.akun_piutang,a.kode_curr,a.kurs,round(a.total-isnull(b.bayar,0),2) as saldo, round((a.total-isnull(b.bayar,0))* a.kurs,2) as saldo_idr "+
			             "from ( "+						 
						 "select a.no_bill,a.no_dokumen,a.akun_piutang,a.kurs,a.kode_curr,a.kode_lokasi, "+
						 "sum(a.nilai+a.ppn) as total  "+ 
						 "from si_bill_m a "+
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.nilai+a.ppn > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "group by a.no_bill,a.no_dokumen,a.akun_piutang,a.kurs,a.kode_curr,a.kode_lokasi "+
						 ")a  "+						 
						 "inner join si_billbayar_d c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+						 
						 "left join ( "+
						 "    select no_bill,kode_lokasi,sum(case dc when 'D' then nilai_kas else -nilai_kas end) as bayar  "+
						 "    from si_billbayar_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_bill,kode_lokasi) b "+
						 "on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+						 
						 "where c.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_bill";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["BATAL",line.no_bill,line.no_so,line.akun_piutang,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.saldo),floatToNilai(line.saldo_idr)]);
					}
				} else this.sg1.clear(1);				
								
			}						
		} catch(e) {alert(e);}
	}
});