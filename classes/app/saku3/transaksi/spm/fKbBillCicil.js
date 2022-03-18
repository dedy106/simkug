window.app_saku3_transaksi_spm_fKbBillCicil = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fKbBillCicil.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fKbBillCicil";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Invoice [Bersaldo]", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,16,210,20],caption:"Status",items:["BM"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,300,20],caption:"No Dokumen", maxLength:50});						
		this.e_ppkb = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"PP Akun KB", readOnly:true});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});											
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,290], childPage:["Data Invoice"]});		
		this.cb_bill = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});								
		this.e_dokbill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,300,20],caption:"No Dokumen", readOnly:true});							
		this.e_ketbill = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,500,20],caption:"Keterangan", readOnly:true});							
		this.e_akunpiu = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Akun Piutang", readOnly:true});							
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Cabang", readOnly:true});							
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Saldo Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Nilai KasBank", tag:1, tipeText:ttNilai, text:"0"});	

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fKbBillCicil.extend(window.childForm);
window.app_saku3_transaksi_spm_fKbBillCicil.implement({
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
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_billbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBBILLCCL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_cust.getText()+"','"+this.cb_bill.getText()+"','-')");
															
					var kasIDR = nilaiToFloat(this.e_nilai.getText());
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+kasIDR+",'"+this.e_ppkb.getText()+"','-','-','"+this.cb_cust.getText()+"','"+this.app._lokasi+"','KBBILLCCL','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilai.getText())+")");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_bill.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.e_akunpiu.getText()+"','Pelunasan atas invoice "+this.cb_bill.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','-','-','-','"+this.app._lokasi+"','KBBILLCCL','AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_nilai.getText())+")");													

					sql.add("insert into spm_billbayar_d(no_bukti,kode_lokasi,no_piutang,akun_piutang,nilai_kas,nilai_lain,periode,dc,modul,kode_cust)  values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bill.getText()+"','"+this.e_akunpiu.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",0,'"+this.e_periode.getText()+"','D','KB','"+this.cb_cust.getText()+"')");							

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
					this.sg3.clear(1); 				
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0 || nilaiToFloat(this.e_saldo.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank/Total Tagihan tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank melebihi Tagihan.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_billbayar_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1 ) {	
			var strSQL = "select a.no_piutang,a.keterangan "+
			             "from ( "+						 
						 "select a.kode_cust,a.no_piutang,a.no_dokumen,a.keterangan,a.akun_piutang,a.kode_lokasi, "+
						 "sum(a.nilai+a.nilai_ppn-a.nilai_pph) as total,b.kode_pp+' - '+b.nama as pp,b.kode_pp "+ 
						 "from spm_piutang_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and a.nilai+a.nilai_ppn > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "group by a.kode_cust,a.no_piutang,a.no_dokumen,a.keterangan,a.akun_piutang,a.kode_lokasi,b.kode_pp,b.nama "+
						 ")a  "+						 
						 "left join ( "+
						 "    select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai_kas else -nilai_kas end) as bayar  "+
						 "    from spm_billbayar_d where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_piutang,kode_lokasi) b "+
						 "on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"'";
			this.cb_bill.setSQL(strSQL,["no_piutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Tagihan",true);			
		}
			
		if (sender == this.cb_bill && this.cb_bill.getText()!="" ) {	
			var strSQL = "select a.no_piutang,a.no_dokumen,a.akun_piutang,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.pp,a.kode_pp "+
						 "from ( "+		
						 				 
						 "		select a.kode_cust,a.no_piutang,a.no_dokumen,a.keterangan,a.akun_piutang,a.kode_lokasi, "+
						 "		sum(a.nilai+a.nilai_ppn-a.nilai_pph) as total,b.kode_pp+' - '+b.nama as pp,b.kode_pp "+ 
						 "		from spm_piutang_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "		where a.modul='BILL' and a.kode_cust='"+this.cb_cust.getText()+"' and a.nilai+a.nilai_ppn > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "		group by a.kode_cust,a.no_piutang,a.no_dokumen,a.keterangan,a.akun_piutang,a.kode_lokasi,b.kode_pp,b.nama "+
						 "		)a  "+			

						 "	left join ( "+
						 "    	select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai_kas else -nilai_kas end) as bayar  "+
						 "    	from spm_billbayar_d "+
						 "	  	where no_bukti <> '"+this.e_nb.getText()+"' and kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "		group by no_piutang,kode_lokasi) b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+						 

						 "where a.no_piutang = '"+this.cb_bill.getText()+"' and a.kode_cust='"+this.cb_cust.getText()+"' and a.total>isnull(b.bayar,0) and a.kode_lokasi ='"+this.app._lokasi+"'";			

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];		
				this.e_dokbill.setText(line.no_dokumen);
				this.e_ketbill.setText(line.keterangan);
				this.e_akunpiu.setText(line.akun_piutang);
				this.e_cabang.setText(line.pp);
				this.kodePP = line.kode_pp;
				this.e_saldo.setText(floatToNilai(line.saldo));	
			} 			
		}		
		if (sender == this.c_jenis && this.stsSimpan==1) {
			this.doClick();				
		}																						
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {			
			var strSQL = "select kode_pp from relakun_pp2 where kode_akun = '"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";									
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_ppkb.setText(line.kode_pp);
				}
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1);				
			}
			this.stsSimpan = 1;			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tm_rptPiutangKasJurnalPry";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1); 				
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},			
	doLoad3:function(sender){																
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from kas_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBBILLCCL' and a.posted ='F'";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan]); 
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
								
				var strSQL = "select * from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis);					
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.akun_kb);				
						this.e_nilai.setText(floatToNilai(line.nilai));				
						this.cb_cust.setSQL("select kode_cust, nama from cust where kode_cust='"+line.no_link+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);									
						this.cb_cust.setText(line.no_link);																
						this.cb_bill.setSQL("select no_piutang, keterangan from spm_piutang_m where no_piutang='"+line.ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_piutang","keterangan"],false,["No Bukti","Nama"],"and","Data Tagihan",true);									
						this.cb_bill.setText(line.ref1);
					}
				}										
			}						
		} catch(e) {alert(e);}
	}
});