window.app_saku3_transaksi_spm_fFiat = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_spm_fFiat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fFiat";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Fiat", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar SPB","Data SPB","Detail Dokumen","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:0,
		            colTitle:["No SPB","Status","Tanggal","Due Date","Nama","Alamat","Uraian","Nilai","Pembuat","No Flag","Tgl Input"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[110,100,150,100,200,100,150,70,70,80,100]],					
					readOnly:true,colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Fiat", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No SPB", readOnly:true});
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,220,20],caption:"Tanggal SPB", readOnly:true});						
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Pembuat", readOnly:true});
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,15,220,20],caption:"Due Date", readOnly:true});				
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Nama", readOnly:true});		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Alamat", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Uraian", readOnly:true});						
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,18,220,20],caption:"Nilai SPB", readOnly:true, tipeText:ttNilai, text:"0"});				
				
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,16,this.pc1.width-5,210],colCount:7,tag:9,
				colTitle:["Bank","Cabang","No Rekening","Nama Rekening","Bruto","Potongan","Netto"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,150,100,200,150]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],				
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
				
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
				colTitle:["No Bukti","Deskripsi","Tanggal","Modul","PP","Nilai","No Ver"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,200,60,80,200,100]],
				readOnly:true,colFormat:[[5],[cfNilai]],													
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
				
		this.cb_nb = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"No SPB", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.c_modul2.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_spm_fFiat.extend(window.childForm);
window.app_saku3_transaksi_spm_fFiat.implement({	
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
						sql.add("delete from app_m where no_app='"+this.noFiatLama+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from app_d where no_app='"+this.noFiatLama+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("update spm_spb_m set no_fiat='-',progress='0' where no_spb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','FIAT','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','1','FIAT','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");																				
					sql.add("update spm_spb_m set no_fiat='"+this.e_nb.getText()+"',progress='1' where no_spb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {				
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
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
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from app_m where no_app='"+this.noFiatLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from app_d where no_app='"+this.noFiatLama+"' and kode_lokasi='"+this.app._lokasi+"'");												
				sql.add("update spm_spb_m set no_fiat='-',progress='0' where no_spb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad();
	},	
	doChange:function(sender){								
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {			
			var strSQL = "select a.due_date,a.no_spb,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.nama,a.alamat,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from spm_spb_m a inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_spb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						 	 			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);														
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-FIA"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				this.e_nobukti.setText(this.sg.cells(0,row));								
				this.e_tanggal.setText(this.sg.cells(2,row));
				this.e_duedate.setText(this.sg.cells(3,row));				
				this.e_nama.setText(this.sg.cells(4,row));										
				this.e_alamat.setText(this.sg.cells(5,row));														
				this.e_ket.setText(this.sg.cells(6,row));
				this.e_total.setText(this.sg.cells(7,row));				
				this.e_buat.setText(this.sg.cells(8,row));										
				this.noFiatLama = this.sg.cells(9,row);						
				this.e_memo.setText(this.sg.cells(6,row));				
				
				this.doLoadRek();
				this.doLoadBukti();
				
				if (this.noFiatLama == "-") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoadRek:function(){
		var strSQL = "select a.bank,a.cabang,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai "+
		             "from spm_rek a inner join spm_spb_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
					 "where b.no_spb='"+this.e_nobukti.getText()+"' and b.kode_lokasi ='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai)]);
			}
		} else this.sg2.clear(1);											
	},
	doLoadBukti:function(){
		var strSQL = "select a.no_if as no_bukti,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,'IFAJU' as modul,b.kode_pp+' - '+b.nama as pp,xx.nilai_ver as nilai,a.no_ver "+
					 "from spm_if_m a "+								 
					 "inner join ("+
					 "           select no_bukti,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_ver "+
					 "           from app_j where kode_lokasi='"+this.app._lokasi+"' group by no_bukti,kode_lokasi "+
					 "           ) xx on a.no_if=xx.no_bukti and a.kode_lokasi=xx.kode_lokasi "+						 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.no_spb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "union all "+
					 "select a.no_reim as no_bukti,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,xx.nilai_ver as nilai,a.no_ver "+
					 "from spm_ifreim_m a "+								 
					 "inner join ("+
					 "           select no_bukti,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_ver "+
					 "           from app_j where kode_lokasi='"+this.app._lokasi+"' group by no_bukti,kode_lokasi "+
					 "           ) xx on a.no_reim=xx.no_bukti and a.kode_lokasi=xx.kode_lokasi "+						 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.no_spb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "union all "+
					 "select a.no_pb as no_bukti,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,xx.nilai_ver as nilai,a.no_ver "+
					 "from yk_pb_m a "+								 
					 "inner join ("+
					 "           select no_bukti,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as nilai_ver "+
					 "           from app_j where kode_lokasi='"+this.app._lokasi+"' group by no_bukti,kode_lokasi "+
					 "           ) xx on a.no_pb=xx.no_bukti and a.kode_lokasi=xx.kode_lokasi "+						 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.no_spb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 " "; 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg1.appendData([line.no_bukti,line.keterangan,line.tanggal,line.modul.toUpperCase(),line.pp,floatToNilai(line.nilai),line.no_ver]);
			}
		} else this.sg1.clear(1);									
	},
	doLoad:function(sender){																
		this.cb_nb.setSQL("select no_spb, keterangan from spm_spb_m where progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Daftar SPB",true);		
		var strSQL = "select a.due_date,a.no_spb,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.nama,a.alamat,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_fiat,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from spm_spb_m a inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
					 "order by a.no_spb";					 					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																						
			this.sg.appendData([line.no_spb,line.status.toUpperCase(),line.tgl,line.tgl2,line.nama,line.alamat,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_fiat,line.tglinput]); 
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
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg1.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

