window.app_saku2_transaksi_kopeg_sju_fInvoice = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_kopeg_sju_fInvoice.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fInvoice";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Surat Tagihan: Input", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.l_tg2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,500,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.bTampil = new button(this,{bound:[828,17,80,18],caption:"Tampil",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,360], childPage:["Data Tagihan","Detail Polis"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
				colTitle:["Kode","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,50,190,60]],
				readOnly:true,
				dblClick:[this,"doDoubleClick"],
				colFormat:[[3,4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[930,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:14,tag:9,
				colTitle:["No Bukti","No Polis","Tgl Inv.","Unit","Penanggung","Tertanggung","Curr","Premi","Brokerage","Disc.","P Cost","PPN","Materai","Total"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,50,150,150,150,70,130,100]],
				readOnly:true,
				colFormat:[[7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		
		this.rearrangeChild(10, 23);
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
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fInvoice.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fInvoice.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					 															
					sql.add("insert into sju_tagih_m (no_tagih,kode_lokasi,tanggal,keterangan,nik_app,periode,nik_user,tgl_input,no_dokumen,due_date,jenis) values "+
							 "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','"+this.dp_d2.getDateString()+"','INPUT')");
															
					sql.add("update a set no_tagih='"+this.e_nb.getText()+"',tgl_bill='"+this.dp_d1.getDateString()+"' "+
							"from sju_polis_termin a "+
							"inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
							"inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
							"inner join pp d on d.kode_pp=c.kode_pp and d.kode_lokasi=c.kode_lokasi "+
							"inner join sju_cust e on e.kode_cust=c.kode_cust and e.kode_lokasi=c.kode_lokasi "+
							"inner join sju_vendor f on f.kode_vendor=c.kode_vendor and f.kode_lokasi=c.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='-' and a.due_date <='"+this.dp_d2.getDateString()+"'");			
					
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);					
					this.doClick();
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
	},	
	doTampil:function(sender){		
		try {			
			uses("server_util_arrayList");				
			var sql = new server_util_arrayList();							
			var strSQL = "select e.kode_cust,e.nama as cust, "+
						 "c.kode_curr,sum(a.premi) as premi,sum(a.fee) as fee,sum(a.diskon) as diskon,sum(a.p_cost) as p_cost,sum(a.ppn) as ppn,sum(a.materai) as materai,sum(a.premi - a.diskon + a.p_cost + a.materai) as total "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
						 "inner join pp d on d.kode_pp=c.kode_pp and d.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=c.kode_cust and e.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_vendor f on f.kode_vendor=c.kode_vendor and f.kode_lokasi=c.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='-' and a.due_date <='"+this.dp_d2.getDateString()+"' group by e.kode_cust,e.nama,c.kode_curr";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[0]);
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
			this.sg.appendData([line.kode_cust,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total)]);
			
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				var strSQL = "select a.no_polis,b.no_dok,convert(varchar,a.tgl_bill,103) as tgl_bill,d.kode_pp+'-'+d.nama as pp,e.kode_cust+'-'+e.nama as cust,f.kode_vendor+'-'+f.nama as vendor, "+
						 "c.kode_curr,a.premi,a.fee,a.diskon,a.p_cost,a.ppn,a.materai,(a.premi - a.diskon + a.p_cost + a.materai) as total "+
						 "from sju_polis_termin a "+
						 "inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' "+
						 "inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+
						 "inner join pp d on d.kode_pp=c.kode_pp and d.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_cust e on e.kode_cust=c.kode_cust and e.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_vendor f on f.kode_vendor=c.kode_vendor and f.kode_lokasi=c.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tagih='-' and a.due_date <='"+this.dp_d2.getDateString()+"' and b.kode_cust='"+this.sg.cells(0,row)+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg1.appendData([line.no_polis,line.no_dok,line.tgl_bill,line.pp,line.vendor,line.cust,line.kode_curr,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.ppn),floatToNilai(line.materai),floatToNilai(line.total)]);
					}
				} else this.sg1.clear(1);										
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) {alert(e);}
	},
	doChange:function(sender){
		if (sender == this.e_periode) this.doClick();
	},	
	doClick:function(sender){				
		if (this.e_periode.getText()!= "") {			
			var AddFormat = "IV/"+this.e_periode.getText().substr(2,4)+"/___%";
			var data = this.dbLib.getDataProvider("select isnull(max(no_tagih),0) as no_tagih from sju_tagih_m where no_tagih like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_tagih == "0") this.e_nb.setText("IV/"+this.e_periode.getText().substr(2,4)+"/001");
					else {
						var idx = parseFloat(line.no_tagih.substr(8,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("IV/"+this.e_periode.getText().substr(2,4)+"/"+nu);						
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
							this.nama_report="server_report_saku2_kopeg_sju_rptPiutangJurnal";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1);this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});
