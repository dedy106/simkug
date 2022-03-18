window.app_saku2_transaksi_kopeg_sju_fRenewel = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fRenewel.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fRenewel";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Renewel Polis: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Renewel","List Renewel"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["No Nota","Deskripsi"],
					colWidth:[[1,0],[480,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});												
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});	
		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Tertanggung",tag:1,multiSelection:false, tag:9}); 		
		this.cb_tipe = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"COB",tag:2,multiSelection:false, tag:9}); 
		this.cb_pic = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Acc Exec",tag:2,multiSelection:false, tag:9}); 	
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,12,100,18],caption:"Tanggal Awal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,12,100,18]}); 		
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Akhir", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,100,18]}); 				
		this.i_load = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Tampil Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});								
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,270], childPage:["Data Polis","Detail"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:14,tag:0,
				colTitle:["Status","No Bukti","No Polis","Tgl Mulai","Tgl Akhir","Tertanggung","Penanggung","Curr","Sum Insured","Premi","Occup. of Risk","Loc. of Risk","Obj. of Loss","Coverage"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,150,150,150,80,80, 50,150,200,70,70,150,100,60]],
				readOnly:true,
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				colFormat:[[8,9],[cfNilai,cfNilai]],								
				dblClick:[this,"doDoubleClick1"],change:[this,"doChangeCell1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
   	    this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"No Polis", readOnly:true ,tag:9});						
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Placing", readOnly:true ,tag:9});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,11,430,20],caption:"Tgl Placing", readOnly:true,tag:9});				
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Quotation", readOnly:true,tag:9});
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,16,430,20],caption:"Penanggung", readOnly:true,tag:9});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true,tag:9});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,12,430,20],caption:"Unit", readOnly:true,tag:9});
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Occup. of Risk", readOnly:true,tag:9});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,13,430,20],caption:"Loc. of Risk", readOnly:true,tag:9});
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Object of Risk", readOnly:true,tag:9});
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[500,14,430,20],caption:"Acc Exec", readOnly:true ,tag:9});		
		this.e_cover = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Coverage", readOnly:true ,tag:9});				
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency",readOnly:true,tag:9});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:9, tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:9, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:9, tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);							
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);					
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);
			this.cb_pic.setSQL("select kode_pic, nama from sju_pic where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pic","nama"],false,["Kode","Nama"],"and","Data Acc Exec",true);						

			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fRenewel.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fRenewel.implement({
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
						sql.add("delete from sju_renew_m where no_renew='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_renew_d where no_renew='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}					
					
					sql.add("insert into sju_renew_m(no_renew,kode_lokasi,periode,tanggal,keterangan,nik_buat,nik_app,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"')");
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into sju_renew_d(no_renew,no_polis,status,kode_lokasi,periode) values "+
									"	('"+this.e_nb.getText()+"','"+line.no_polis+"','"+line.status.toUpperCase()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");							
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sju_renew_m where no_renew='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_renew_d where no_renew='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);
			this.sg3.clear(1);
			this.i_load.show();
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_renew_m","no_renew",this.app._lokasi+"-NOTA"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();		
		setTipeButton(tbSimpan);
	},	
	doLoad:function(sender){	
		var filter = "";
		if (this.cb_cust.getText() != "") var filter = filter+" and a.kode_cust = '"+this.cb_cust.getText()+"' ";
		if (this.cb_tipe.getText() != "") var filter = filter+" and a.kode_tipe = '"+this.cb_tipe.getText()+"' ";
		if (this.cb_pic.getText() != "") var filter = filter+" and a.kode_pic = '"+this.cb_pic.getText()+"' ";
		var strSQL = "select 'INPROG' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.kode_cust+' - '+b.nama as cust,c.kode_vendor+' - '+c.nama as vendor,a.kode_curr,a.total,a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr "+
		             "from sju_polis_m a "+					 
		             "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' "+
					 "inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi "+
					 "left join sju_renew_d d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi "+
					 "where a.flag_aktif='1' and d.no_polis is null and a.tgl_selesai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+
					 "order by a.kode_cust,a.tgl_selesai ";									 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.status.toUpperCase(),line.no_polis,line.no_dok,line.tgl_mulai,line.tgl_selesai,line.cust,line.vendor,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),line.occup,line.lokasi,line.objek,line.cover]); 
		}
		this.sg1.setNoUrut(start);		 	
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptPrRenewal";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_renew='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1);
			this.sg3.clear(1);			
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);		
			this.doClick();			
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell1: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg1.cells(0,row);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				var strSQL = "select b.no_placing,c.no_quo,d.kode_pp+' - '+d.nama as pp,c.no_quo, e.kode_pic+' - '+e.nama as pic,a.p_premi "+
							 "from sju_polis_m a "+
							 "inner join sju_placing_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi "+					 
							 "inner join sju_quo_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi "+					 							 
							 "inner join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi "+							 							 
							 "inner join sju_pic e on c.kode_pic=e.kode_pic and c.kode_lokasi=e.kode_lokasi "+							 							 
							 "where a.no_polis='"+this.sg1.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";							 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_noplacing.setText(line.no_placing);
						this.e_noquo.setText(line.no_quo);
						this.e_pic.setText(line.pic);
						this.e_ppremi.setText(floatToNilai(line.p_premi));
						this.e_pp.setText(line.pp);
					} 
				}				
				this.e_dok.setText(this.sg1.cells(2,row));				
				this.e_tgl.setText(this.sg1.cells(3,row) + " - " +this.sg1.cells(4,row));				
				this.e_vendor.setText(this.sg1.cells(6,row));
				this.e_cust.setText(this.sg1.cells(5,row));				
				this.e_occup.setText(this.sg1.cells(10,row));
				this.e_lokasi.setText(this.sg1.cells(11,row));
				this.e_objek.setText(this.sg1.cells(12,row));				
				this.e_cover.setText(this.sg1.cells(13,row));
				this.c_curr.setText(this.sg1.cells(7,row));
				this.e_total.setText(this.sg1.cells(8,row));				
				this.e_npremi.setText(this.sg1.cells(9,row));
			}
		} catch(e) {alert(e);}
	},
	
	doLoad3:function(sender){																
		var strSQL = "select a.no_renew,a.keterangan "+
		             "from sju_renew_m a "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
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
			this.sg3.appendData([line.no_renew,line.keterangan]); 
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
								
				var strSQL = "select * from sju_renew_m where no_renew= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);					
						this.cb_buat.setText(line.nik_buat);					
						this.cb_app.setText(line.nik_app);					
		
					}
				}				
				var strSQL = "select 'APP' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.kode_cust+' - '+b.nama as cust,c.kode_vendor+' - '+c.nama as vendor,a.kode_curr,a.total,a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr "+
							 "from sju_polis_m a "+					 
							 "inner join sju_renew_d xx on xx.no_polis=a.no_polis and xx.kode_lokasi=a.kode_lokasi "+
							 "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							 "inner join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+							 
							 "where xx.no_renew = '"+this.e_nb.getText()+"' and xx.kode_lokasi='"+this.app._lokasi+"'";									 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);			
			}						
		} catch(e) {alert(e);}
	}
});