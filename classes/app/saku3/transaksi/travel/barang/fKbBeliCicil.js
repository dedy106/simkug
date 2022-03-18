window.app_saku3_transaksi_travel_barang_fKbBeliCicil = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_barang_fKbBeliCicil.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_barang_fKbBeliCicil";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Hutang Pembelian [Cicil]", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,300,80,100]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jenis",items:["BK","MI"], readOnly:true,tag:2,change:[this,"doChange"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});									
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.bLoad = new button(this.pc2.childPage[0],{bound:[640,19,80,18],caption:"Tampil  Data",click:[this,"doLoad"]});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Total Pembayaran", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,281], childPage:["Data Pembelian"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
				colTitle:["No Referensi","Tanggal","Keterangan","Kode PP","Akun Hutang","Tagihan","Nilai Bayar"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,80,80,300,80,150]],
				columnReadOnly:[true,[0,1,2,3,4,5],[6]],				
				colFormat:[[5,6],[cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],dblClick:[this,"doDoubleClick1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_barang_fKbBeliCicil.extend(window.childForm);
window.app_saku3_transaksi_travel_barang_fKbBeliCicil.implement({
	doLoad : function() {
		this.pc2.setActivePage(this.pc2.childPage[0]);	
		this.pc1.setActivePage(this.pc1.childPage[0]);																		
		if (this.stsSimpan==1 && this.cb_vendor.getText()!="") {				
			var strSQL = "select a.no_beli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,a.akun_hutang,a.nilai-isnull(b.bayar,0) as saldo  "+						  
						 "from brg_belihut_d a "+

						 "     left join ("+
						 "          select no_beli,sum(case dc when 'D' then nilai else -nilai end) as bayar  "+
						 "          from brg_belibayar_d where kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "			group by no_beli "+
						 ") b on a.no_beli=b.no_beli "+
						 
						 "where a.kode_vendor='"+this.cb_vendor.getText()+"' and (a.nilai-isnull(b.bayar,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_beli";						 

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_beli,line.tgl,line.keterangan,line.kode_pp,line.akun_hutang,floatToNilai(line.saldo),"0"]);					
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
		}	
		else system.alert(this,"Vendor harus diisi.","");
	},
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
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from brg_belibayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.modul+"','KBBELICCL','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_akun.getText()+"','"+this.cb_vendor.getText()+"','"+this.c_jenis.getText()+"')");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",0,'"+this.e_ket.getText()+"','"+
							this.modul+"','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && nilaiToFloat(this.sg1.cells(6,i)) > 0){							
							sql.add("insert into brg_belibayar_d(no_bukti,kode_lokasi,no_beli,kode_vendor,periode,dc,modul,nilai,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.cb_vendor.getText()+"', '"+this.e_periode.getText()+"','D','KBBELICCL',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.app._userLog+"',getdate())");
					
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(4,i)+"','D',"+nilaiToFloat(this.sg1.cells(6,i))+","+
									nilaiToFloat(this.sg1.cells(6,i))+",'Pembayaran atas "+this.cb_vendor.rightLabelCaption+" No Ref "+this.sg1.cells(0,i)+"','"+this.modul+"','HUTANG','IDR',1,'"+this.sg1.cells(3,i)+"','-','-','"+this.cb_vendor.getText()+"','-','"+this.sg1.cells(0,i)+"','-','-','-')");
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
					this.sg1.clear(1); this.sg.clear(1); 					
					setTipeButton(tbSimpan);
					this.stsSimpan=1;
					this.bLoad.show();
					this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);						
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";							
				this.sg1.validasi();	
				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){							
						if (nilaiToFloat(this.sg1.cells(6,i)) > nilaiToFloat(this.sg1.cells(5,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Pembayaran melebihi Saldo. (Baris "+k+")");
							return false;						
						}								
					}
				}
				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Pembayaran melebihi Saldo Tagihan.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pembayaran tidak boleh nol atau kurang.");
					return false;						
				}

				if (this.standarLib.doCekPeriode(this.dbLib,this.modul,this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					 system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,this.modul,this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid ("+this.modul+" - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}		
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from brg_belibayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);						
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){		
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan==1) {
			this.doClick();
			
			if (this.c_jenis.getText() == "BK") {
				this.modul = "KB";
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",
									["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			}
			else {
				this.modul = "MI";
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('034') and a.kode_lokasi='"+this.app._lokasi+"'",
									["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);									
			}
		}							
		if (sender == this.c_jenis && this.stsSimpan==1) {			
			this.doClick();				
		}																					
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="" && this.stsSimpan==1) {
			this.sg1.clear(1);
		}	
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);				
				this.bLoad.show();
			}
			this.stsSimpan = 1;			
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.c_jenis.getText()+'/'+this.e_periode.getText().substr(2,4)+"/","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var saldo = total = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "" && this.sg1.cells(6,i) != "") {
					saldo += nilaiToFloat(this.sg1.cells(5,i));		
					total += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}			
			this.e_saldo.setText(floatToNilai(Math.round(saldo * 100)/100));			
			this.e_total.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[]"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 6) {				
			this.sg1.validasi();
		}
	},		
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(6,row) == "0") this.sg1.cells(6,row,this.sg1.cells(5,row));
		else this.sg1.cells(6,row,"0");
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sju16_rptKbRincianHutangPremi";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);			
			this.stsSimpan=1;		
			this.bLoad.show();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
		             "from trans_m a "+
					 "inner join karyawan_pp q on a.kode_pp=q.kode_pp and a.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBBELICCL' and a.posted ='F' order by a.no_bukti";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan,nilaiToFloat(line.nilai1)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;	
				this.bLoad.hide();			
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.modul = line.modul;		
						this.dp_d1.setText(line.tanggal);						
						this.c_jenis.setText(line.param3);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.param1);				
						this.cb_vendor.setText(line.param2);										
						this.e_total.setText(floatToNilai(line.nilai1));
						this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_vendor='"+line.param2+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);				
						this.cb_vendor.setText(line.param2);										
					}
				}				
				
				var strSQL = "select a.no_beli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,a.akun_hutang,a.nilai-isnull(b.bayar,0) as saldo,c.nilai as nilai_bayar  "+						  
							 "from brg_belihut_d a "+

							 "     inner join brg_belibayar_d c on a.no_beli=c.no_beli and c.kode_lokasi='"+this.app._lokasi+"' "+
							 "     left join ("+
							 "          select no_beli,sum(case dc when 'D' then nilai else -nilai end) as bayar  "+
							 "          from brg_belibayar_d "+
							 "			where no_bukti <> '"+this.e_nb.getText()+"' and kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "			group by no_beli "+
							 ") b on a.no_beli=b.no_beli "+
							
							 "where c.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_beli";						 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_beli,line.tgl,line.keterangan,line.kode_pp,line.akun_hutang,floatToNilai(line.saldo),floatToNilai(line.nilai_bayar)]);					
					}
				} else this.sg1.clear(1);
			}						
		} catch(e) {alert(e);}
	}
});