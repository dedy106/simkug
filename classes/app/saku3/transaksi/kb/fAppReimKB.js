window.app_saku3_transaksi_kb_fAppReimKB = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kb_fAppReimKB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kb_fAppReimKB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Reimburse KasBank : Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.pc1 = new pageControl(this,{bound:[10,18,1000,470], childPage:["Daftar Bukti","Approval","Detail KasBank","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:0,
		            colTitle:["No Bukti","Status","Tanggal","Deskripsi","Rekening","Nilai","No App"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,300,200,70,80,100]],
					readOnly:true,colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,60],caption:"Catatan",tag:9,readOnly:true});
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"],visible:false});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Approve", readOnly:true});				
		
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Reimburse", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tgl Reimburse", readOnly:true});
		this.e_rek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Rekening", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Nilai Reimburse", readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,250],colCount:9,tag:0,
		            colTitle:["No Bukti","No Dokumen","Tanggal","Keterangan","Kode Rek","Nilai","Modul","DC","Index"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,60,80,100,80,250,80,120,120]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
					colFormat:[[5],[cfNilai]],					
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Kode CF","Nama CF","Rekening"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[200,150,80,150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,202,20],caption:"Status",items:["INPROG","APPROVE","REVISI"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
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
			this.c_status.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kb_fAppReimKB.extend(window.childForm);
window.app_saku3_transaksi_kb_fAppReimKB.implement({	
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
						var prog = "R";																		
					}					 										
					
					sql.add("update yk_kasaju_m set progress='"+prog+"',no_app='"+this.e_nb.getText()+"' where no_kasaju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					var modul = 'REIM_APP';
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_noaju.getText()+"' and b.modul='"+modul+"' and b.kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+modul+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','"+modul+"','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
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
					this.sg1.clear(1); this.sg2.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("");
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				var data = this.dbLib.getDataProvider("select progress from yk_kasaju_m where no_kasaju='"+this.e_noaju.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress != "1" && line.progress != "R") {
							system.alert(this,"Transaksi tidak valid.","No Pengajuan sudah diprogress lain.");
							return false;
						}
					}
				}								
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("update yk_kasaju_m set progress='0',no_app='-' where no_kasaju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
				
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
													  "where a.no_appseb='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='REIM_APP'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						sql.add("delete from app_m where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("delete from app_d where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
				}													
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
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
		if (this.e_noaju.getText()!="") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","0000"));									
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_noaju.setText(this.sg.cells(0,row));								
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_rek.setText(this.sg.cells(4,row));
				this.e_ket.setText(this.sg.cells(3,row));
				this.e_nilai.setText(this.sg.cells(5,row));
				this.stsProg = this.sg.cells(1,row);				
				
				this.doClick();				
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				else {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}								
				var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai,a.modul,a.kode_bank,a.dc,a.no_urut "+
							 "from kas_j a "+
							 "             inner join yk_kasaju_d b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.no_urut=b.nu and a.kode_bank=b.kode_bank "+
							 "where  b.no_kasaju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_kas ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU1 = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData1(1);
				} else this.sg1.clear(1);		
				this.doNilaiChange1();
			}
		} catch(e) {alert(e);}
	},		
	doTampilData1: function(page) {
		this.sg1.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];							
			this.sg1.appendData([line.no_kas,line.no_dokumen,line.tanggal,line.keterangan,line.kode_bank,floatToNilai(line.nilai),line.modul,line.dc,line.no_urut]);			
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doNilaiChange1: function(){
		try{
			var tot = 0;			
			var line;			
			for (var i=0;i < this.dataJU1.rs.rows.length;i++){
				line = this.dataJU1.rs.rows[i];
				if (line.nilai != ""){					
					if (line.dc == "C" ) tot += Math.round(line.nilai);
					if (line.dc == "D" ) tot -= Math.round(line.nilai);
				}						
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) != "") {
			this.sg2.clear();			
			var strSQL = "select a.kode_pp,b.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,a.dc,a.keterangan,a.kode_cf,isnull(e.nama,'-') as nama_cf,a.kode_bank+' - '+isnull(x.nama,'-') as rek "+
						 "from kas_j a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "			   inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "			   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						 "			   left join neracacf e on a.kode_cf=e.kode_cf and a.kode_lokasi=e.kode_lokasi "+
						 "             left join bank_rek x on a.kode_bank=x.kode_rek and a.kode_lokasi=x.kode_lokasi "+
						 "where a.no_kas = '"+this.sg1.cells(0,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc desc ";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.kode_cf,line.nama_cf,line.rek]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},
	doLoad:function(sender){														
		if (this.app._userStatus == "A") var nikApp = ""; else var nikApp = " a.nik_setuju = '"+this.app._userLog+"' and "; 				
		var strSQL = "select a.no_kasaju,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_banktuj+' - '+b.nama as rek,a.no_app "+
		             "from yk_kasaju_m a inner join bank_rek b on a.kode_banktuj=b.kode_rek and a.kode_lokasi=b.kode_lokasi "+
					 "where "+nikApp+" a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' ";					 
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
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '0' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'R'  "; 				
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
						
		if (this.app._userStatus == "A") var nikApp = ""; else var nikApp = " a.nik_setuju = '"+this.app._userLog+"' and "; 
		var strSQL = "select a.no_kasaju,"+
		             "case when a.progress = '0' then 'INPROG' "+
					 "     when a.progress = '1' then 'APPROVE' "+
					 "     when a.progress = 'R' then 'REVISI' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_banktuj+' - '+b.nama as rek,a.no_app "+
		             "from yk_kasaju_m a inner join bank_rek b on a.kode_banktuj=b.kode_rek and a.kode_lokasi=b.kode_lokasi "+					 
					 "where "+nikApp+" a.kode_lokasi='"+this.app._lokasi+"' "+filter+" ";					 
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
			this.sg.appendData([line.no_kasaju,line.status.toUpperCase(),line.tgl,line.keterangan,line.rek,floatToNilai(line.nilai),line.no_app]); 
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
									this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
									this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
									this.filter2 = "";
									this.viewer.prepare();
									this.viewer.setVisible(true);
									this.app._mainForm.pButton.setVisible(false);
									this.app._mainForm.reportNavigator.setVisible(true);
									this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
									this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
									this.app._mainForm.reportNavigator.rearrange();
									this.showFilter = undefined;
									this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
									this.page = 1;
									this.allBtn = false;
									this.pc1.hide();
								}
								else {
									system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
									this.clearLayar();
								}
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
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
			this.sg1.clear(1); this.sg2.clear(1);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});