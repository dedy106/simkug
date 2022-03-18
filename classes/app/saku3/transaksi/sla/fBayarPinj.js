window.app_saku3_transaksi_sla_fBayarPinj = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_sla_fBayarPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fBayarPinj";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Pinjaman", 0);	
						
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pelunasan","List Pelunasan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Periode","Deskripsi"],
					colWidth:[[3,2,1,0],[400,80,80,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_cocd = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Data CoCd",tag:2, multiSelection:false , change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});										
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[785,18,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.bTampil = new button(this.pc2.childPage[0],{bound:[678,18,80,18],caption:"Tampil",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,305], childPage:["Data SLA"]});							
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10, tag:0,
				colTitle:["Status","No SLA","No Dokumen","Mitra","JthTempo","Curr","Ci. Bunga","Ci. Pokok","Total","ID"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,100,100,100,60,80,180,150,100,70]],
				readOnly:true, 
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],checkItem:true,
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]], 
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:false}); 
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");											
			this.stsSimpan = 1;						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_cocd.setSQL("select cocd,company_name from mysym_company_code",["cocd","company_name"],false,["Kode","Nama"],"and","Data CoCd",true);									
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fBayarPinj.extend(window.childForm);
window.app_saku3_transaksi_sla_fBayarPinj.implement({				
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_bayar_m","no_bukti",this.cb_cocd.getText()+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));								
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					 															
					if (this.stsSimpan == 0) {
						sql.add("delete from sla_bayar_m where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
						sql.add("delete from sla_bayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
						sql.add("update sla_kkp_d set no_bayar='-', kurs=0 where no_bayar='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
					}															
									
					sql.add("insert into sla_bayar_m (no_bukti,tanggal,keterangan,kode_curr,kurs,nik_app,nilai,periode,nik_user,tgl_input,posted,no_dokumen,jenis,modul,kode_cocd) values "+
							 "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',0,'"+this.app._userLog+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'X','-','-','INPUT','"+this.cb_cocd.getText()+"')");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i) == "BAYAR") {									
									sql.add("update sla_kkp_d set no_bayar='"+this.e_nb.getText()+"' "+
											"where kode_cocd='"+this.cb_cocd.getText()+"' and no_sla='"+this.sg.cells(1,i)+"' and nu="+this.sg.cells(9,i)+" ");								
									
									var tgl = this.sg.cells(4,i).substr(6,4) +"-"+ this.sg.cells(4,i).substr(3,2) +"-"+ this.sg.cells(4,i).substr(0,2);
									sql.add("insert into sla_bayar_d (no_bukti,no_sla,kode_cocd,nu,tgl_tempo,kode_curr,ci_bunga,ci_pokok,ci_total, tgl_bayar) values "+
											"('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.cb_cocd.getText()+"',"+this.sg.cells(9,i)+",'"+tgl+"','"+this.sg.cells(5,i)+"',"+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+",'"+this.dp_d1.getDateString()+"')");								
								}
							}
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
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";											
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Pelunasan tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :															
					this.preView = "0";
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sla_bayar_m where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
					sql.add("delete from sla_bayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
					sql.add("update sla_kkp_d set no_bayar='-', kurs=0 where no_bayar='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);									
				break								
		}
	},		
	doSelectDate: function(sender, y,m,d){		
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}															
			this.dataJU = {rs:{rows:[]}};			
			this.sg.clear(1);											
		}
		catch(e) {
			alert(e);
		}
	},	
	doTampil:function(sender){		
		if (this.e_periode.getText() != "" && this.cb_cocd.getText() != "") {
			uses("server_util_arrayList");				
			var sql = new server_util_arrayList();				
			this.dataJU = {rs:{rows:[]}};			
						
			var strSQL = "select a.nu,a.no_sla,b.no_dok,c.kode_mitra+' - '+c.nama as mitra,CONVERT(varchar,a.tgl_tempo,105) as tgl,b.kode_curr,a.ci_bunga,a.ci_pokok,a.ci_total "+
						 "from sla_kkp_d a "+
						 "inner join sla_kkp_m b on a.no_sla=b.no_sla and a.kode_cocd=b.kode_cocd "+
						 "inner join sla_mitra c on b.kode_mitra=c.kode_mitra "+
						 "where a.no_bayar='-' and b.kode_cocd='"+this.cb_cocd.getText()+"' and a.periode <= '"+this.e_periode.getText()+"' and b.kode_curr='"+this.c_curr.getText()+"' "+
						 "order by a.no_sla,a.nu"; 						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.sg.clear();
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];												
					this.sg.appendData(["BAYAR",line.no_sla,line.no_dok,line.mitra,line.tgl,line.kode_curr,floatToNilai(line.ci_bunga),floatToNilai(line.ci_pokok),floatToNilai(line.ci_total),line.nu]);
				}				
			} else this.sg.clear(1);	
			this.sg.validasi();						
			this.pc1.setActivePage(this.pc1.childPage[1]);			
		}
		else system.alert(this,"Data CoCd tidak valid.","Pilih data CoCd dari daftar.");
	},	
	doChangeCell: function(sender, col , row) {
		if (col == 0) {						
			this.sg.validasi();
		}
	},				
	doChange:function(sender){		
		if ((sender == this.e_periode) && this.stsSimpan == 1) this.doClick();
	},	
	doClick:function(sender){				
		if (this.e_periode.getText() != "" && this.cb_cocd.getText() != "") {		
			this.stsSimpan = 1;
			this.bTampil.setVisible(true);
			this.sg.clear(1); 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_bayar_m","no_bukti",this.cb_cocd.getText()+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));								
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doNilaiChange: function(){
		try{		
			var tot = 0;	
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != "" && this.sg.cells(0,i) == "BAYAR"){
					tot += nilaiToFloat(this.sg.cells(8,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	   		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {								
								// this.nama_report="server_report_saku2_kopeg_sju_rptKbRincianAkru";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_akru='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);
			this.e_nilai.setText("0");
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);			
			this.doLoad3();
			this.stsSimpan = 1;			
			this.dataJU = {rs:{rows:[]}};			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,105) as tgl,a.periode,a.keterangan "+
		             "from sla_bayar_m a "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' and a.modul='INPUT' and a.posted ='X'";					 
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.periode,line.keterangan]); 
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
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));				
				
				var strSQL = "select * from sla_bayar_m where no_bukti = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);											
						this.c_curr.setText(line.kode_curr);						
					}
				}	
				
				var strSQL = "select a.nu,a.no_sla,b.no_dok,c.kode_mitra+' - '+c.nama as mitra,CONVERT(varchar,a.tgl_tempo,105) as tgl,b.kode_curr,a.ci_bunga,a.ci_pokok,a.ci_total "+
						 "from sla_kkp_d a "+
						 "inner join sla_kkp_m b on a.no_sla=b.no_sla and a.kode_cocd=b.kode_cocd "+
						 "inner join sla_mitra c on b.kode_mitra=c.kode_mitra "+
						 "where  a.no_bayar = '"+this.e_nb.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' "+
						 "order by a.no_sla,a.nu"; 						 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BAYAR",line.no_sla,line.no_dok,line.mitra,line.tgl,line.kode_curr,floatToNilai(line.ci_bunga),floatToNilai(line.ci_pokok),floatToNilai(line.ci_total),line.nu]);
					}
				} else this.sg.clear(1);	
				
			}			
		} catch(e) {alert(e);}
	}
});
