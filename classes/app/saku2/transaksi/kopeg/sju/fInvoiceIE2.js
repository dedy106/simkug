window.app_saku2_transaksi_kopeg_sju_fInvoiceIE2 = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_kopeg_sju_fInvoiceIE2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fInvoiceIE2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Tagihan: Input/Edit", 0);	
						
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Tagihan","Data Tagihan"]});		
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Tagihan","Tanggal","Periode","Deskripsi","Approval"],
					colWidth:[[4,3,2,1,0],[200,400,80,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});
		
		this.l_tg2 = new portalui_label(this.pc2.childPage[1],{bound:[20,12,100,18],caption:"Jth Tempo s.d", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,12,100,18]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,500,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this.pc2.childPage[1],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		
		this.cb_cust = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:2});		
		this.bTampil = new button(this.pc2.childPage[1],{bound:[868,17,80,18],caption:"Tampil",click:[this,"doTampil"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[1],{bound:[968,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doAppAll"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,20,985,278], childPage:["Data Tagihan","Detail Polis"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:0,
				colTitle:["Status","Kode","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,50,190,60,70]],
				readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],
				colFormat:[[4,5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:15,tag:9,
				colTitle:["No Register","No Polis | Sertifikat","Tgl Inv.","Unit","Penanggung","Status","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total"],
				colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,50,150,60,150,150,70,200,80]],
				readOnly:true,
				colFormat:[[8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fInvoiceIE2.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fInvoiceIE2.implement({	
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
					if (this.stsSimpan == 0) {
						sql.add("delete from sju_tagih_m where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_tagih_d where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_polis_termin set no_tagih='-' where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					else {
						var AddFormat = this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/___%";
						var data = this.dbLib.getDataProvider("select isnull(max(no_tagih),0) as no_tagih from sju_tagih_m where no_tagih like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								if (line.no_tagih == "0") this.e_nb.setText(this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/001");
								else {
									var idx = parseFloat(line.no_tagih.substr(11,3)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "00"+idx;
									if (idx.length == 2) var nu = "0"+idx;
									if (idx.length == 3) var nu = idx;
									this.e_nb.setText(this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/"+nu);						
								}
							} 
						}
					}
					sql.add("insert into sju_tagih_m (no_tagih,kode_lokasi,tanggal,keterangan,nik_app,periode,nik_user,tgl_input,no_dokumen,due_date,jenis) values "+
							 "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','"+this.dp_d2.getDateString()+"','INPUT')");
															
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("update a set no_tagih='"+this.e_nb.getText()+"',tgl_bill='"+this.dp_d1.getDateString()+"' "+
									"from sju_polis_termin a "+
									"inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+									
									"where b.kode_cust='"+line.kode_cust+"' and b.kode_curr='"+line.kode_curr+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='-' and a.due_date <='"+this.dp_d2.getDateString()+"'");			
						}
					}					
					sql.add("insert into sju_tagih_d(no_tagih,no_polis,nu,tgl_input,kode_lokasi) select no_tagih,no_polis,nu,getdate(),kode_lokasi from sju_polis_termin where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
					this.sg.clear(1);this.sg1.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doLoad2();
				break;
			case "simpan" :					
			case "ubah" :				
				var stsApp = 0; 
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (line.status.toUpperCase() == "APP") stsApp = 1; 									
				}
				if (stsApp == 0) {
					system.alert(this,"Transaksi tidak valid.","Harus ada status APP.");
					return false;						
				}
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_tagih_m where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_tagih_d where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_polis_termin set no_tagih='-' where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break								
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doLoad2();
		this.sg.clear(1);
		this.sg1.clear(1);
		this.pc2.setActivePage(this.pc2.childPage[0]);
	},	
	doAppAll:function(sender){		
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			this.dataJU.rs.rows[i].status = "APP";
		}
		this.doTampilData(this.page);
	},
	doTampil:function(sender){		
		try {			
			if (this.cb_cust.getText() != "") {
				uses("server_util_arrayList");				
				var sql = new server_util_arrayList();							
				var strSQL = "select 'INPROG' as status,e.kode_cust,e.nama as cust,b.kode_curr,"+
							 "round(sum(a.premi),2) as premi,round(sum(a.fee),2) as fee,round(sum(a.diskon),2) as diskon,round(sum(a.p_cost),2) as p_cost,round(sum(a.ppn),2) as ppn,round(sum(a.materai),2) as materai,round(sum(a.premi - a.diskon + a.p_cost + a.materai),2) as total "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+
							 "where b.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='-' and a.due_date <='"+this.dp_d2.getDateString()+"' "+
							 "group by e.kode_cust,e.nama,b.kode_curr";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);										
				this.pc1.setActivePage(this.pc1.childPage[0]);
			}
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.status.toUpperCase(),line.kode_cust,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total)]);
			
		}		
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {		
				if (this.stsSimpan == 0) var noTagih = this.e_nb.getText(); else var noTagih = "-";
				var strSQL = "select a.no_polis,b.no_dok+' | '+b.no_dok2 as no_dok,convert(varchar,a.due_date,103) as due_date,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
						 "b.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,round((a.premi - a.diskon + a.p_cost + a.materai),2) as total,a.nu,ff.status "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "inner join pp d on d.kode_pp=b.kode_pp and d.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+						 
						 "inner join sju_vendor f on f.kode_vendor=a.kode_vendor and f.kode_lokasi=a.kode_lokasi "+
						 "inner join sju_polis_vendor ff on ff.kode_vendor=a.kode_vendor and ff.kode_lokasi=a.kode_lokasi and a.no_polis=ff.no_polis "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='"+noTagih+"' and a.due_date <='"+this.dp_d2.getDateString()+"' and b.kode_cust='"+this.sg.cells(1,row)+"' order by a.no_polis,a.nu";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg1.appendData([line.no_polis,line.no_dok,line.due_date,line.pp,line.vendor,line.status,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);										
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) {alert(e);}
	},	
	doClick:function(sender){				
		if (this.e_periode.getText()!= "") {			
			this.stsSimpan = 1;
			this.sg.clear(1); this.sg1.clear(1);			
			this.bTampil.setVisible(true);
			this.i_appAll.setVisible(true);
			var AddFormat = this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/___%";
			var data = this.dbLib.getDataProvider("select isnull(max(no_tagih),0) as no_tagih from sju_tagih_m where no_tagih like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_tagih == "0") this.e_nb.setText(this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/001");
					else {
						var idx = parseFloat(line.no_tagih.substr(11,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.app._lokasi+"-IV/"+this.e_periode.getText().substr(2,4)+"/"+nu);						
					}
				} 
			}						
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
								this.nama_report="server_report_saku2_kopeg_sju_rptPrTagihan";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1);this.sg1.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doLoad2();
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},	
	doLoad2:function(sender){												
		//jika sudah billtidak boleh di koreksi
		var strSQL = "select a.no_tagih,convert(varchar,a.tanggal,103) as tgl,a.periode,a.keterangan,a.nik_app+' - '+b.nama as nik_app "+
		             "from sju_tagih_m a "+
					 "inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "  left join (select distinct no_tagih,kode_lokasi from sju_polis_termin where no_bill<>'-' and kode_lokasi='"+this.app._lokasi+"') c on a.no_tagih=c.no_tagih and a.kode_lokasi=c.kode_lokasi "+
					 "where c.no_tagih is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='INPUT' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU2 = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData2(1);
		} else this.sg2.clear(1);			
	},
	doTampilData2: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU2.rs.rows[i];													
			this.sg2.appendData([line.no_tagih,line.tgl,line.periode,line.keterangan,line.nik_app]); 
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},	
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.bTampil.setVisible(false);
				this.i_appAll.setVisible(false);
				this.e_nb.setText(this.sg2.cells(0,row));				
				
				var strSQL = "select no_tagih,due_date,keterangan,nik_app "+
							 "from sju_tagih_m "+							 
							 "where no_tagih = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d2.setText(line.due_date);					
						this.e_ket.setText(line.keterangan);					
						this.cb_app.setText(line.nik_app);
					}
				}				
				var strSQL = "select 'APP' as status,e.kode_cust,e.nama as cust,b.kode_curr,"+
							 "sum(a.premi) as premi,sum(a.fee) as fee,sum(a.diskon) as diskon,sum(a.p_cost) as p_cost,sum(a.ppn) as ppn,sum(a.materai) as materai,round(sum(a.premi - a.diskon + a.p_cost + a.materai),2) as total "+
							 "from sju_polis_termin a "+
							 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							 "inner join sju_cust e on e.kode_cust=b.kode_cust and e.kode_lokasi=b.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='"+this.e_nb.getText()+"' group by e.kode_cust,e.nama,b.kode_curr";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					var line = this.dataJU.rs.rows[0];													
					this.cb_cust.setText(line.kode_cust);
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);														
				this.pc1.setActivePage(this.pc1.childPage[0]);				
			}			
		} catch(e) {alert(e);}
	}
});
