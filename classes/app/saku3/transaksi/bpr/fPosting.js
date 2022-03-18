window.app_saku3_transaksi_bpr_fPosting = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fPosting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fPosting";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this,{bound:[830,17,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		this.bPost = new button(this,{bound:[930,17,80,18],caption:"Posting All",click:[this,"doClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,370], childPage:["Modul","Data Transaksi Modul","Detail Transaksi","Filter Data","Pesan Error"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,				
				colTitle:["Status","Modul","Deskripsi","Periode 1","Periode 2"],
				colWidth:[[4,3,2,1,0],[80,80,300,100,80]],
				columnReadOnly:[true,[1,2,3,4],[0]],	
				dblClick:[this,"doDoubleClick1"],			
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["TRUE","FALSE"]})]],checkItem:true,
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Form"],
					colWidth:[[5,4,3,2,1,0],[100,300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:19,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Curr","Kurs","Nilai Curr","Nilai IDR",
					         "Jenis","No Dokumen","No Ref","Kode PP","Kode DRK","Kode Cust","Kode Vendor","No FA",
							 "Ref1","Ref2","Ref3"],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,  80,80,80,80,80,150,150,80  ,100,100,60,60,200,50,150,80]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.c_modul = new saiCB(this.pc1.childPage[3],{bound:[20,11,202,20],caption:"Modul", readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this.pc1.childPage[3],{bound:[20,22,220,20],caption:"Cari Bukti",readOnly:true,multiSelection:false,rightLabelVisible:false,tag:9,change:[this,"doChange"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[5,10,590,330],labelWidth:0,tag:9,readOnly:true});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
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
			
			if (this.app._userStatus == "U") {
				var strSQL = "select modul,keterangan,per_awal1 as per1,per_akhir1 as per2 from periode_aktif where kode_lokasi='"+this.app._lokasi+"' order by modul";							
				this.batasPeriode = " between b.per_awal1 and b.per_akhir1 ";	
			}
			else {
				var strSQL = "select modul,keterangan,per_awal2 as per1,per_akhir2 as per2 from periode_aktif where kode_lokasi='"+this.app._lokasi+"' order by modul";				
				this.batasPeriode = " between b.per_awal2 and b.per_akhir2 ";
			}
		
			this.c_modul.items.clear();
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg1.appendData(["TRUE",line.modul.toUpperCase(),line.keterangan,line.per1,line.per2]);
					this.c_modul.addItem(i,line.modul);
				}
			} else this.sg1.clear(1);

			this.c_modul.setText("");
			this.dataJU = {rs:{rows:[]}};

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fPosting.extend(window.childForm);
window.app_saku3_transaksi_bpr_fPosting.implement({	
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
			this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gldt where no_bukti in ("+this.nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "POSTING"){
							sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) values "+
									"	('"+this.e_nb.getText()+"','"+line.form.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
							sql.add("call sp_post_bukti ('"+this.app._lokasi+"','"+line.no_bukti+"')");
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
					this.c_modul.setText("");
					this.cb_bukti.setText("","");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				var msg  = "";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				var isAda = false;
				this.nobukti = "";
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "POSTING") {
						isAda = true;
						this.nobukti += ",'"+this.dataJU.rs.rows[i].no_bukti+"'";
					}
				}							
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status POSTING.");
					return false;
				}				
				this.nobukti = this.nobukti.substr(1);											
				var strSQL = "select no_bukti+' - '+periode as bukper from ( "+						
							 "select a.no_bukti,a.periode,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "from trans_j a inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
							 "where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti,a.periode "+							
							 ") x where x.total <> 0 ";						 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;			
					for (var i in data.rs.rows){						
						line = data.rs.rows[i];													
						msg+= "Data Bukti Tidak Balance.(Bukti - Periode : "+line.bukper+")\n";
					}
				}				
				this.e_memo.setText(msg);
				if (msg != "") {
					system.alert(this,"Posting tidak valid.","Terdapat Bukti Jurnal tidak Balanace Lihat Pesan Error.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-PT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bPost) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "POSTING";
			}
			this.doTampilData(this.page);
		}	
	},
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "TRUE") this.sg1.cells(0,row,"FALSE");
		else this.sg1.cells(0,row,"TRUE");
	},
	doLoad:function(sender){
		var modul = "";
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="TRUE") {
				modul += ",'"+this.sg1.cells(1,i)+"'";														
			}	
		}
		modul = modul.substr(1);
		if (modul == "") modul = "''";	
		var strSQL = "select 'INPROG' as status,a.no_bukti as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.form "+
				 	 "from trans_m a inner join periode_aktif b on a.modul=b.modul and a.kode_lokasi=b.kode_lokasi "+
					 "where a.modul in ("+modul+") and a.posted='F' and a.periode "+this.batasPeriode+" and a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},	
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.form.toUpperCase()]);
		}
		this.sg.setNoUrut(start);		
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			var strSQL = "select a.kode_akun,b.nama,a.dc,a.keterangan,a.kode_curr,a.kurs,a.nilai_curr,a.nilai,"+
						 "a.jenis,a.no_dokumen,a.no_selesai,a.kode_pp,a.kode_drk,a.kode_cust,a.kode_vendor,a.no_fa, "+
						 "a.no_ref1,a.no_ref2,a.no_ref3 "+
						 "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					
						 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.dc desc";								
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama,line.dc,line.keterangan,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai_curr),floatToNilai(line.nilai),
								         line.jenis,line.no_dokumen,line.no_selesai,line.kode_pp,line.kode_drk,line.kode_cust,line.kode_vendor,line.no_fa,
										 line.no_ref1,line.no_ref2,line.no_ref3]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.c_jenis) this.doClick(this.i_gen);
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}		
		if (sender == this.c_modul && this.c_modul.getText()!="") {			
			this.cb_bukti.setSQL("select a.no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.form "+
								 "from trans_m a inner join periode_aktif b on a.modul=b.modul and a.kode_lokasi=b.kode_lokasi "+
								 "where a.posted='F' and a.periode "+this.batasPeriode+" and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='"+this.c_modul.getText()+"'",
								 ["no_bukti","no_dokumen","tanggal","keterangan","form"],false,["No Bukti","No Dokumen","Tanggal","Keterangan","Form"],"and","Data Bukti",true);						
		}		
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			try {
				this.dataJU.rs.rows = [];
				this.dataJU.rs.rows[0] = {status:"INPROG",no_bukti:this.cb_bukti.dataFromList[0],no_dokumen:this.cb_bukti.dataFromList[1],tanggal:this.cb_bukti.dataFromList[2],keterangan:this.cb_bukti.dataFromList[3],form:this.cb_bukti.dataFromList[4].toUpperCase()}; 
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[1]);								
			}
			catch(e) {alert(e);}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							//this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.c_modul.setText("");
			this.cb_bukti.setText("","");
			this.sg.setTag("0");
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
