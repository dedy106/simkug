window.app_saku3_transaksi_tm_fTerimaBareg = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_tm_fTerimaBareg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fTerimaBareg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Terima Penyelesaian Piutang Region", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.pc1 = new pageControl(this,{bound:[10,18,1000,470], childPage:["Daftar Kirim","Penerimaan","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["No Bukti","Status","Tanggal","Deskripsi","Nilai","No Terima","Lok. Asal","Tgl Input"],
					colWidth:[[7,6,5,4,3,2,1,0],[110,60,100,100,300,70,80,100]],
					readOnly:true,colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});			
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,230,20],caption:"No Terima", readOnly:true});								
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,230,20],caption:"No Kirim", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Deskripsi", readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,230,20],caption:"Tgl Bukti", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,200,20],caption:"Nilai TAK", readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.sgt = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,300],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					nilaiChange:[this,"doNilaiChange"],readOnly:true,colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgnt = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgt});		
		
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["INPROG","TERIMA"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);			
				
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
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_tm_fTerimaBareg.extend(window.childForm);
window.app_saku3_transaksi_tm_fTerimaBareg.implement({	
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
			if (this.stsProg == "INPROG") this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.stsProg != "INPROG") {
						sql.add("update takterima_m set no_terima=no_dokumen,posted='X' where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update takterima_j set no_terima=no_dokumen where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");						
					}					
					
					sql.add("update takterima_m set nik_setuju='"+this.cb_app.getText()+"',no_terima='"+this.e_nb.getText()+"',posted='F' where no_dokumen ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update takterima_j set no_terima='"+this.e_nb.getText()+"' where no_dokumen ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
														
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
					this.sgt.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbSimpan);
				break;
			case "simpan" :							
			case "ubah" :														
				this.preView = "1";											
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																																			
				if (this.debet != this.kredit) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus Balance.");
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
					sql.add("update takterima_m set no_terima=no_dokumen,posted='X' where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update takterima_j set no_terima=no_dokumen where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.e_nobukti.getText()!="" && this.noTerima == "-") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TPIU"+this.e_periode.getText().substr(2,4)+".","0000"));												
			this.cb_app.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nobukti.setText(this.sg.cells(0,row));								
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_ket.setText(this.sg.cells(3,row));
				this.e_nilai.setText(this.sg.cells(4,row));
				this.kodeLokAsal = this.sg.cells(6,row);				
				this.stsProg = this.sg.cells(1,row);
				this.noTerima = this.sg.cells(5,row);	
				this.e_nb.setText(this.sg.cells(5,row));	
				if (this.stsProg == "INPROG") {
					setTipeButton(tbSimpan); 
					this.doClick();
					
					var strSQL = "select a.no_urut,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_lokasi "+
								 "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
								 "					 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
								 "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
								 "where a.no_dokumen = '"+this.e_nobukti.getText()+"' "+
								 "order by a.no_urut";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgt.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sgt.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sgt.clear(1);
					
				}
				else {
					setTipeButton(tbUbahHapus);
					var data = this.dbLib.getDataProvider("select f.tanggal,f.periode,f.keterangan as memo,f.nik_setuju,a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							   "from takterima_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							   "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							   "                   inner join takterima_m f on a.no_terima=f.no_terima and a.kode_lokasi=f.kode_lokasi "+
							   "                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
							   "where a.no_terima = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgt.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sgt.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
						this.cb_app.setText(line.nik_setuju);
						this.dp_d1.setText(line.tanggal);
						this.e_periode.setText(line.periode);
					} else this.sgt.clear(1);								
				}								
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){																				
		var strSQL = "select a.no_kirim as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,case when a.no_terima=a.no_kirim then '-' else a.no_terima end as no_terima,a.kode_lokkirim,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from takterima_m a "+
					 "where a.no_kirim=a.no_terima and a.posted='X' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul= 'TTAPP' and a.periode<='"+this.e_periode.getText()+"' ";					 		
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
		if (this.c_status2.getText() == "INPROG") filter = " and a.no_kirim=a.no_terima "; 
		if (this.c_status2.getText() == "TERIMA") filter = " and a.no_kirim<>a.no_terima "; 	
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		if (this.c_status2.getText() == "INPROG") {
			var strSQL = "select a.no_kirim as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,case when a.no_terima=a.no_kirim then '-' else a.no_terima end as no_terima,a.kode_lokkirim,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from takterima_m a "+
					     "where a.kode_lokasi='"+this.app._lokasi+"' and a.modul= 'TTAPP' and a.periode<='"+this.e_periode.getText()+"' "+filter;
		}
		if (this.c_status2.getText() == "TERIMA") {
			var strSQL = "select a.no_kirim as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,case when a.no_terima=a.no_kirim then '-' else a.no_terima end as no_terima,a.kode_lokkirim,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from takterima_m a "+
					     "where a.kode_lokasi='"+this.app._lokasi+"' and a.modul= 'TTAPP' and a.periode<='"+this.e_periode.getText()+"' "+filter;
		}				
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
			this.sg.appendData([line.no_bukti,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.no_terima,line.kode_lokkirim,line.tglinput]); 
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
			this.sgt.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	},			
	doNilaiChange: function(){		
		try{
			this.debet = this.kredit = 0;
			for (var i = 0; i < this.sgt.getRowCount();i++){
				if (this.sgt.rowValid(i) && this.sgt.cells(4,i) != ""){
					if (this.sgt.cells(2,i).toUpperCase() == "D") this.debet += nilaiToFloat(this.sgt.cells(4,i));
					if (this.sgt.cells(2,i).toUpperCase() == "C") this.kredit += nilaiToFloat(this.sgt.cells(4,i));
				}
			}			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}	
});

