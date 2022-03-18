window.app_saku2_transaksi_kopeg_sju_fQuoApp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fQuoApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fQuoApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Quotation : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.pc1 = new pageControl(this,{bound:[10,18,1000,470], childPage:["Daftar Quotation","Data Quotation","Data Draft","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:19,tag:9,
		            colTitle:["No Quotation","Status","Tanggal","Tertanggung","Unit","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Draft","User Input"],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,80,60,60,200,200,200,70,70,80,80,80,60,80,100,200,70,80,150]],
					readOnly:true,colFormat:[[7,8,9,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Catatan",tag:9,readOnly:true});
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,12,220,20],caption:"No Approve", readOnly:true});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Tgl Quotation", readOnly:true});
	
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Quotation", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Unit", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Occup. of Risk", readOnly:true});					
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Acc Exec", readOnly:true});		
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Loc. of Risk", readOnly:true});		
		this.e_tglmulai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Period of Insurance", readOnly:true});
		this.e_tglselesai = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,17,100,20],labelWidth:0, caption:"", readOnly:true});				
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Object of Risk", readOnly:true});		
		this.e_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency", readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Jenis Quotation", readOnly:true});		
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[20,10,450,150],colCount:2,tag:0,
		            colTitle:["Penanggung","Nama"],
					colWidth:[[1,0],[250,100]],										
					readOnly:true,autoAppend:false,defaultRow:1});
					
		this.cb_draft = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,10,202,20],caption:"No Draft",tag:9,readOnly:true}); 
		
		this.mDesk = new tinymceCtrl(this.pc1.childPage[2],{bound:[10,13,980,400], withForm:false});
		//this.mDesk.setReadOnly(true);
		
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,202,20],caption:"Status",items:["QUOTATION","APPQUOT","APPREVISI","ALL"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_draft.setSQL("select no_draft, nama from sju_draft where kode_lokasi='"+this.app._lokasi+"'",["no_draft","nama"],false,["Kode","Nama"],"and","Data Draft",false);
			this.cb_cust2.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			this.cb_vendor2.setSQL("select kode_vendor, nama from sju_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Penanggung",true);
			this.c_status.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fQuoApp.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fQuoApp.implement({	
	mainButtonClick: function(sender, desk){
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																			
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";												
					 										
					sql.add("update sju_quo_m set progress='"+prog+"',no_app='"+this.e_nb.getText()+"',no_quoapp='"+this.e_nb.getText()+"' where no_quo='"+this.e_noquo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from sju_app_m a inner join sju_app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_noquo.getText()+"' and b.modul='APROVAL' and b.kode_lokasi='"+this.app._lokasi+"'");
												
					sql.add("insert into sju_app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','APROVAL','-')");
					sql.add("insert into sju_app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','APROVAL','"+this.e_noquo.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
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
					this.sg3.clear(1);  
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
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
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.e_noquo.getText()!="") {						
			var AddFormat = "AP/"+this.e_periode.getText().substr(2,4)+"/___QT";			
			var data = this.dbLib.getDataProvider("select isnull(max(no_app),0) as no_app from sju_app_m where no_app like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"' and modul='APROVAL'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_app == "0") {
						this.e_nb.setText("AP/"+this.e_periode.getText().substr(2,4)+"/001QT");						
					}
					else {
						var idx = parseFloat(line.no_app.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("AP/"+this.e_periode.getText().substr(2,4)+"/"+nu+"QT");						
					}
				} 
			}			
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_draft.setText(this.sg.cells(17,row));
				this.e_noquo.setText(this.sg.cells(0,row));
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_cust.setText(this.sg.cells(3,row));
				this.e_pp.setText(this.sg.cells(4,row));				
				this.e_pic.setText(this.sg.cells(5,row));
				this.e_tglmulai.setText(this.sg.cells(10,row));
				this.e_tglselesai.setText(this.sg.cells(11,row));
				this.e_curr.setText(this.sg.cells(6,row));
				this.e_total.setText(this.sg.cells(7,row));
				this.e_npremi.setText(this.sg.cells(8,row));
				this.e_nfee.setText(this.sg.cells(9,row));
				this.e_ppremi.setText(this.sg.cells(15,row));
				this.e_pfee.setText(this.sg.cells(16,row));				
				this.doClick();
				
				var strSQL = "select a.jenis,a.slip,a.lokasi,a.occup,a.objek from sju_quo_m a where a.no_quo='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			//a.nilai_deduc,a.cover,
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.mDesk.setCode(urldecode(line.slip));	
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);																
						this.e_jenis.setText(line.jenis);																
					}
				}								
				var data = this.dbLib.getDataProvider("select b.kode_vendor,b.nama from sju_quo_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_quo = '"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg3.appendData([line.kode_vendor, line.nama]);
					}
				} else this.sg3.clear(1);						
				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){										
		var strSQL = "select a.no_quo,"+
		             "case a.progress when '0' then 'QUOTATION' "+
					 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,case when a.no_draft ='' then '-' else a.no_draft end as no_draft,e.nik+' | '+e.nama as user_input "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "inner join karyawan e on a.nik_user=e.nik and a.kode_lokasi=e.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_quo ";
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
		if (this.c_status2.getText() == "QUOTATION") filter = " and a.progress = '0' "; 
		if (this.c_status2.getText() == "APPQUOT") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "APPREVISI") filter = " and a.progress = 'R'  "; 
		if (this.c_status2.getText() == "ALL") filter = " and a.progress in ('0','1','R') "; 
		
		if (this.cb_cust2.getText()!="") filter = " and a.kode_cust='"+this.cb_cust2.getText()+"' ";		
		var strSQL = "select a.no_quo,"+
		             "case a.progress when '0' then 'QUOTATION' "+
					 "                when '1' then 'APPQUOT' "+
					 "                when 'R' then 'APPREVISI' "+
					 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,no_draft,e.nik+' | '+e.nama as user_input  "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "inner join karyawan e on a.nik_user=e.nik and a.kode_lokasi=e.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter;					
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
			this.sg.appendData([line.no_quo,line.status.toUpperCase(),line.tanggal,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_draft,line.user_input]); 
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
							if (this.c_status.getText() == "APPROVE") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptPrQuo";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_quo='"+this.e_noquo.getText()+"' ";
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
			this.sg.clear(1); 
			this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});