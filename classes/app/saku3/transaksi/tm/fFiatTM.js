window.app_saku3_transaksi_tm_fFiatTM = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_tm_fFiatTM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fFiatTM";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Fiat SPB: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});				
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,445], childPage:["Daftar SPB","Data SPB","Detail SPB","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:9,
		            colTitle:["No SPB","Status","Tanggal","Due Date","Modul","No Dokumen","Deskripsi","Nilai","Approved","No Fiat","PP User"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,100,150,100,400,100,80,70,70,70,100]],
					colHide:[[9,8],[true,true]],
					readOnly:true,colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,230,20],caption:"Status",items:["APPROVE"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Catatan",tag:9,readOnly:true});
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[520,13,450,80],caption:"Catatan SPB",tag:9,readOnly:true});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,230,20],caption:"No Fiat", readOnly:true});				
		
		this.e_nospb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,230,20],caption:"No SPB", readOnly:true});		
		this.e_tglspb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,230,20],caption:"Tgl SPB", readOnly:true});
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,230,20],caption:"Due Date", readOnly:true});				
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,230,20],caption:"No Bukti", readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"PP/Unit", readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,450,20],caption:"Deskripsi", readOnly:true});						
		this.e_app = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Approved", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,230,20],caption:"Nilai SPB", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:0,
		            colTitle:["Kode Atensi","Nama","Bank","Cabang","No Rekening","Nama Rekening","Nilai","Pajak","Keterangan"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,100,100,150,150,150,80,150,80]],					
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});		
								
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:9});		
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
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
			this.e_memo2.setReadOnly(true);
			this.c_status.setText("");									
						
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_tm_fFiatTM.extend(window.childForm);
window.app_saku3_transaksi_tm_fFiatTM.implement({	
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
								
					if (this.c_status.getText()=="APPROVE") { 
						var prog = "1";																		
					} 				
					if (this.c_status.getText()=="REVISI")  {
						var prog = "K";												
					}					 															
					
					sql.add("update spb_m set progress='"+prog+"',no_fiat='"+this.e_nb.getText()+"' where no_spb='"+this.e_nospb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_nospb.getText()+"' and b.modul='FIAT' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','FIAT','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','FIAT','"+this.e_nospb.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
							
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
					this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("");
					this.e_memo.setText("");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :													
			case "ubah" :													
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);	
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.e_nospb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah dibayar.");
							return false;
						}
					}
				}
				this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.e_nospb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah dibayar.");
							return false;
						}
					}
				}
				var data = this.dbLib.getDataProvider("select progress from inv_spb_surat where no_spb='"+this.e_nospb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah dibayar.");
							return false;
						}
					}
				}				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_nospb.getText()+"' "+
													  "where a.no_appseb='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='FIAT'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						sql.add("delete from app_m where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("delete from app_d where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
				}					
				
				sql.add("update spb_m set progress='0',no_fiat='-' where no_spb='"+this.e_nospb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
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
		if (this.e_nobukti.getText()!="") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-FT"+this.e_periode.getText().substr(2,4)+".","0000"));												
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				this.e_nospb.setText(this.sg.cells(0,row));								
				this.e_tglspb.setText(this.sg.cells(2,row));
				this.e_nobukti.setText(this.sg.cells(5,row));
				this.e_duedate.setText(this.sg.cells(3,row));				
				this.e_pp.setText(this.sg.cells(10,row));
				this.e_ket.setText(this.sg.cells(6,row));				
				this.e_memo.setText(this.sg.cells(6,row));				
				this.e_nilai.setText(this.sg.cells(7,row));
				this.e_app.setText(this.sg.cells(8,row));
				this.stsProg = this.sg.cells(1,row);
				this.modul = this.sg.cells(4,row);
				this.doClick();				
				
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {
					setTipeButton(tbUbahHapus);					
				}
				else {
					setTipeButton(tbSimpan);				
				}				
				
				var strSQL  = "select c.catatan "+
							  "from spb_m a inner join app_d c on a.no_ver=c.no_app and a.kode_lokasi=c.kode_lokasi "+
							  "             inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' and c.status='2' "+
							  "where a.no_spb='"+this.e_nospb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_memo2.setText(line.catatan);													
					}
				}		
				
				if (this.modul == "DROPING") {
					var strSQL3 = "select a.kode_loktuj as kode_vendor,c.nama,b.kode_bank as bank,b.cabang,b.no_rek,b.nama as nama_rek,a.nilai,0 as pajak,a.keterangan "+
								  "from yk_kasdrop_d a inner join bank_rek b on a.kode_rek=b.kode_rek and a.kode_loktuj=b.kode_lokasi "+
								  "                    inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+
								  "where a.no_spb='"+this.e_nospb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				}		
				if (this.modul == "HUTTAK" || this.modul == "HUTGJ" ) {
					var strSQL3 = "select a.kode_vendor,b.nama,b.bank,b.cabang,b.no_rek,b.nama as nama_rek,a.nilai,0 as pajak,a.keterangan "+
								  "from hutang_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
								  "where a.no_spb='"+this.e_nospb.getText()+"'";				
				}	
				
				 		
				 					
				var data = this.dbLib.getDataProvider(strSQL3,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg1.appendData([line.kode_vendor,line.nama_rek,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai),floatToNilai(line.pajak),line.keterangan]);
					}
				} else this.sg1.clear(1);											
				
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){		
		var strSQL = "select a.no_spb,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_bukti as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat "+
		             "from spb_m a inner join karyawan c on a.nik_sah=c.nik "+					 
					 "             inner join pp b on a.kode_ppasal=b.kode_pp and a.kode_lokasi<>'"+this.app._kodeLokasiKonsol+"' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.no_fiat='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('DROPING') "+					 
					
					 "union all "+
					 "select a.no_spb,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_bukti as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat "+
		             "from spb_m a inner join karyawan c on a.nik_sah=c.nik "+					 
					 "             inner join pp b on '"+this.app._kodePP+"'=b.kode_pp and b.kode_lokasi='"+this.app._lokasi+"' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.no_fiat='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('HUTTAK','HUTGJ') "+					 
					
					 " ";
		
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
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'K'  "; 				
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		var strSQL = "select a.no_spb,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_bukti as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat "+
		             "from spb_m a inner join karyawan c on a.nik_sah=c.nik "+
					 "             inner join pp b on a.kode_ppasal=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.modul in ('DROPING') and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" "+		
					 "union all "+
					 
					 "select a.no_spb,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_bukti as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat "+
		             "from spb_m a inner join karyawan c on a.nik_sah=c.nik "+
					 "             inner join pp b on '"+this.app._kodePP+"'=b.kode_pp and '"+this.app._lokasi+"'=b.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.modul in ('HUTTAK','HUTGJ') and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" "+		
					 
					 
					 " ";					 		
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
			this.sg.appendData([line.no_spb,line.status.toUpperCase(),line.tgl,line.tgl2,line.modul.toUpperCase(),line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_fiat,line.pp]); 
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
							if (this.preView == "1") {
								if (this.c_status.getText() == "APPROVE") {								
									this.nama_report="server_report_saku2_kopeg_sju_rptPrQuo";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){
		if (col == 6 && sender.cells(6,row) != "") sender.validasi();
	},
	doNilaiChange: function(){		
		try{
			var totRek = totVer = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != ""){										
					totRek += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}
			for (var i = 0; i < this.sgv.getRowCount();i++){
				if (this.sgv.rowValid(i) && this.sgv.cells(4,i) != ""){
					if (this.sgv.cells(2,i).toUpperCase() == "D") totVer += nilaiToFloat(this.sgv.cells(4,i));
					if (this.sgv.cells(2,i).toUpperCase() == "C") totVer -= nilaiToFloat(this.sgv.cells(4,i));
				}
			}
			this.e_totalRek.setText(floatToNilai(totRek));
			this.e_nilaiVer.setText(floatToNilai(totVer));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}
});

