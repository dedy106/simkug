window.app_saku2_transaksi_kopeg_sju_fPremiBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fPremiBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fPremiBatal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Premi: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,450], childPage:["Data Polis","Detail Polis","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["No Polis","Tgl Polis","Unit","Penanggung","Tertanggung","Curr","Nilai","Premi","COB"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,100,100,70,200,200,150,80,150]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[520,11,100,18],caption:"Tgl Klaim", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[620,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 										
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});						
		
		this.e_nopolis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Polis", readOnly:true});
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"COB", readOnly:true});				
		this.e_tglpolis = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"Tgl Polis", readOnly:true});		
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Placing", readOnly:true});
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"No Quotation", readOnly:true});
		this.e_unit = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,450,20],caption:"Unit", readOnly:true});		
		this.e_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,20,450,20],caption:"Curr", readOnly:true});				
		this.e_penanggung = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,450,20],caption:"Penanggung", readOnly:true});
		this.e_tertanggung = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,21,450,20],caption:"Tertanggung", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_premi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Occup. of Risk", readOnly:true});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Loc. of Risk", readOnly:true});
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Object of Risk", readOnly:true});		
		this.e_totBayar = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,200,20],caption:"Tot Premi Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,220],colCount:7,tag:0,
		            colTitle:["Tgl JthTempo","No Polis / Keterangan","Tot Premi","No Akru","No Bayar","N Bayar","ID"], //"Nilai Kembali"
					colWidth:[[6,5,4,3,2,1,0],[50,100,100,100,100,300,80]],													
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],					
					colFormat:[[2,5,6],[cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,260,20],caption:"No Dok Polis",tag:9});
		this.cb_ttg = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,13,80,18],caption:"Tampil Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select now() as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_ttg.setSQL("select kode_cust, nama from sju_cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Cust",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fPremiBatal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fPremiBatal.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_batalpolis_m","no_batal",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																									
					if (nilaiToFloat(this.e_totBayar.getText()) != 0) {
						var nokas = "-";
						var nokashut = "-";
					}
					else {
						var nokas = this.e_nb.getText();
						var nokashut = this.e_nb.getText();
					}
					sql.add("update sju_polis_m set flag_aktif='0' where no_polis='"+this.e_nopolis.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("insert into sju_batalpolis_m(no_batal,kode_lokasi,periode,tanggal,keterangan,nik_buat,nik_app,tgl_input,nik_user,no_polis,nilai,no_kas,no_kashut,akun_piutang,kode_curr) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nopolis.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','"+this.e_nopolis.getText()+"',0,'"+nokas+"','"+nokashut+"','-','"+this.e_curr.getText()+"')"); //"+nilaiToFloat(this.e_totKembali.getText())+"
					
					for (var i=0;i < this.sg2.getRowCount();i++){						
						if (nilaiToFloat(this.sg2.cells(6,i)) != 0) {
							sql.add("insert into sju_batalpolis_d(no_batal,kode_lokasi,no_polis,no_bill,nu,no_kaspremi,nilai,nilai_kembali) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nopolis.getText()+"','"+this.sg2.cells(3,i)+"',"+this.sg2.cells(6,i)+",'"+this.sg2.cells(4,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+",0)");
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
					this.sg.clear(1);  this.sg2.clear(1); 
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				/*
				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != "0"){
							if (nilaiToFloat(this.sg2.cells(6,i)) > nilaiToFloat(this.sg2.cells(5,i))) {
								var j = i+1;
								system.alert(this,"Transaksi tidak valid.","Nilai Kembali melebihi Nilai Bayar. (Baris : "+j+")");
								return false;
							}
						}
					}
				}								
				if (nilaiToFloat(this.e_totKembali.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kembali tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				*/
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
		this.doLoad();
	},				
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				this.e_nopolis.setText(this.sg.cells(0,row));
				this.e_tipe.setText(this.sg.cells(8,row));
				this.e_tglpolis.setText(this.sg.cells(1,row));
				this.e_unit.setText(this.sg.cells(2,row));
				this.e_curr.setText(this.sg.cells(5,row));
				this.e_penanggung.setText(this.sg.cells(3,row));
				this.e_tertanggung.setText(this.sg.cells(4,row));
				this.e_nilai.setText(this.sg.cells(6,row));
				this.e_premi.setText(this.sg.cells(7,row));								
			
				var strSQL = "select b.no_placing,c.no_quo,a.lokasi,a.cover,a.objek,a.occup,a.kode_curr "+
							 "from sju_polis_m a "+ 
							 "inner join sju_placing_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+					 
							 "inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+					 							 							 
							 "where a.no_polis='"+this.e_nopolis.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";							 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_noplacing.setText(line.no_placing);
						this.e_noquo.setText(line.no_quo);						
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);
						this.e_curr.setText(line.kode_curr);
					} 
				}								
				var data = this.dbLib.getDataProvider("select a.nu,a.no_polis,a.kode_lokasi,a.nu,a.keterangan,a.no_bill,convert(varchar,a.due_date,103) as due_date, a.premi-a.diskon+a.p_cost+a.materai as total,isnull(b.no_bukti,'-') as no_bayar,isnull(b.nilai_kas,0) as nilai_bayar "+
							"from sju_polis_termin a left join sju_polisbayar_d b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and a.nu=b.nu and a.no_bill=b.no_bill "+
							"where a.no_polis = '"+this.e_nopolis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.due_date,line.keterangan,floatToNilai(line.total),line.no_bill,line.no_bayar,floatToNilai(line.nilai_bayar),line.nu]);
					}
				} else this.sg2.clear(1);
				this.sg2.validasi();
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		var strSQL = "select a.no_polis,convert(varchar,a.tanggal,103) as tgl, a.kode_pp+' - '+f.nama as pp, c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,a.kode_curr,a.total,a.n_premi "+ 
		             "from sju_polis_m a "+
					 "                   inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_polis_vendor b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.status='LEADER' "+
					 "                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+					 					 
					 "                   inner join sju_tipe e on a.kode_tipe = e.kode_tipe and a.kode_lokasi=e.kode_lokasi "+
					 "                   inner join pp f on a.kode_pp = f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
					 "                   inner join sju_polis_termin x on a.no_polis=x.no_polis and a.kode_lokasi=x.kode_lokasi and x.nu=0 "+
					 "                   inner join sju_polisbayar_d y on x.no_polis=y.no_polis and y.kode_lokasi=x.kode_lokasi and x.nu=y.nu and x.no_bill=y.no_bill "+
		             "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and getdate() between a.tgl_mulai and a.tgl_selesai ";
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
		if (this.e_nobukti.getText()!= "") filter = " and a.no_dok like '%"+this.e_nobukti.getText()+"%' ";
		if (this.cb_ttg.getText()!= "") filter = filter + " and b.kode_cust = '"+this.cb_ttg.getText()+"' ";
		
		var strSQL = "select a.no_polis,convert(varchar,a.tanggal,103) as tgl, b.kode_pp+' - '+f.nama as pp, c.kode_cust +'-'+c.nama as cust, d.kode_vendor +'-'+d.nama as vendor,e.kode_tipe+'-'+e.nama as tipe,b.kode_curr,b.total,b.n_premi "+ 
		             "from sju_polis_m a inner join sju_quo_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join sju_cust c on b.kode_cust = c.kode_cust and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join sju_vendor d on b.kode_vendor = d.kode_vendor and b.kode_lokasi=d.kode_lokasi "+
					 "                   inner join sju_tipe e on b.kode_tipe = e.kode_tipe and b.kode_lokasi=e.kode_lokasi "+
					 "                   inner join pp f on b.kode_pp = f.kode_pp and b.kode_lokasi=f.kode_lokasi "+
					 "                   inner join sju_polis_termin x on a.no_polis=x.no_polis and a.kode_lokasi=x.kode_lokasi and x.nu=0 "+
					 "                   inner join sju_polisbayar_d y on x.no_polis=y.no_polis and y.kode_lokasi=x.kode_lokasi and x.nu=y.nu and x.no_bill=y.no_bill "+
		             "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and getdate() between a.tgl_mulai and a.tgl_selesai "+ filter;
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
			this.sg.appendData([line.no_polis,line.tgl,line.pp,line.vendor,line.cust,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.tipe]);  
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
							this.nama_report="server_report_saku2_kopeg_sju_rptPiutangJurnal";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_batal='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();   							
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
			this.sg.clear(1);  this.sg2.clear(1); 
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);						
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doNilaiChange2: function(){
		try{
			var nkembali = nkas = 0;
			if (this.sg2.getRowValidCount() > 0){
				for (var i = 0; i < this.sg2.rows.getLength();i++){																					
					if (this.sg2.cells(5,i)!="0") nkas += nilaiToFloat(this.sg2.cells(5,i));				
					//if (this.sg2.cells(6,i)!="0") nkembali += nilaiToFloat(this.sg2.cells(6,i));				
				}
			}
			this.e_totBayar.setText(floatToNilai(nkas));						
			//this.e_totKembali.setText(floatToNilai(nkembali));							
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell2: function(sender, col, row){						
		try {		    			
			if (col == 6) {							
				if (this.sg2.cells(6,row) != "") {				
					this.sg2.validasi();
				}
			}
		}
		catch(e) {
			alert(e);
		}
	}
});