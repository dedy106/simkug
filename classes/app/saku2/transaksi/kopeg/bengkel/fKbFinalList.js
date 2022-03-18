window.app_saku2_transaksi_kopeg_bengkel_fKbFinalList = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fKbFinalList.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fKbFinalList";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Final SPK List: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BM","KM"], readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,202,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_akun = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,18,220,20],caption:"Diapprove Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.c_status = new saiCB(this,{bound:[20,22,202,20],caption:"Status",items:["SPK","TUNAI"], readOnly:true,tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[700,22,220,20],caption:"Nilai KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.bTampil = new button(this,{bound:[575,22,80,18],caption:"Tampil Data",click:[this,"doLoad"]});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Invoice","Filter Data"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Invoice","No SPK","Tanggal","Saldo","N Bayar","No Faktur","Customer","No Telpon","Akun Piutang"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,250,100,80,80,70,100,100]],
					columnReadOnly:[true,[0,1,2,3,5,6,7,8],[4]],
					colFormat:[[3,4],[cfNilai,cfNilai]],
					colAlign:[[5],[alCenter]],
					change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		this.e_nofaktur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"No Faktur",tag:9});
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Invoice",tag:9});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Customer",tag:9});
		this.bCari = new button(this.pc1.childPage[1],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.nik,line.nama);
			} else this.cb_app.setText("","");			
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun KB",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNOI') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "AKUNOI") this.akunOI = line.flag;					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fKbFinalList.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fKbFinalList.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBJUAL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBJUAL','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.nilai_bayar != 0){
							sql.add("insert into fri_jualbayar_d(no_bukti,no_jual,kode_lokasi,modul,periode,nik_user,tgl_input,dc,nilai) values "+
							        "('"+this.e_nb.getText()+"','"+line.no_jual+"','"+this.app._lokasi+"','KBJUAL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D',"+line.nilai_bayar+")");					
							var nilai = parseFloat(line.nilai_bayar);		
							var nilaiOI = 0;		
							if (parseFloat(line.saldo) <  parseFloat(line.nilai_bayar)) {
							    nilaiOI = parseFloat(line.nilai_bayar) - parseFloat(line.saldo);
								nilai = parseFloat(line.saldo);
							}
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_piutang+"','"+line.no_jual+"','C',"+nilai+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBJUAL','PIUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
							if (nilaiOI > 0) {
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
									    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunOI+"','"+line.no_jual+"','C',"+nilaiOI+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBJUAL','OI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :							
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar tidak boleh nol atau kurang.");
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
				else 
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); 
		}
	},
	doLoad:function(sender){
		if (this.c_status.getText()!="" && this.e_periode.getText()!="") {
			if (this.c_status.getText() == "SPK") 
			var strSQL = "select a.no_jual,a.no_faktur,b.no_spk,convert(varchar,b.tanggal,103) as tanggal,d.kode_cust+'-'+d.nama as cust,d.alamat,d.no_tel,(a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn - isnull(c.bayar,0)) as saldo,0 as nilai_bayar,a.akun_piutang "+
			             "from fri_jual_m a inner join fri_spk_m b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+			 
						 "inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
						 "                  left join (select no_jual,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
						 "                             from fri_jualbayar_d where kode_lokasi ='"+this.app._lokasi+"' group by no_jual,kode_lokasi) c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
						 "where (a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn)>isnull(c.bayar,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' ";
						 
			else
			var strSQL = "select a.no_jual,a.no_faktur,'-' as no_spk,convert(varchar,a.tanggal,103) as tanggal,d.kode_cust+'-'+d.nama as cust,d.alamat,d.no_tel,(a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn - isnull(c.bayar,0)) as saldo,0 as nilai_bayar,a.akun_piutang "+
			             "from fri_jual_m a "+
						 "inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
			             "                  left join (select no_jual,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
						 "                             from fri_jualbayar_d where kode_lokasi ='"+this.app._lokasi+"' group by no_jual,kode_lokasi) c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_dokumen='-' and (a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn)>isnull(c.bayar,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' ";						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();				
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
	},
	doCari:function(sender){								
		if (this.c_status.getText()!="" && this.e_periode.getText()!="") {
			var filter = "";		
			if (this.c_status.getText() == "SPK") {
				if (this.e_nofaktur.getText()!="") filter = " and a.no_faktur='"+this.e_nofaktur.getText()+"' ";
				if (this.e_nobukti.getText()!="") filter = " and a.no_jual='"+this.e_nobukti.getText()+"' ";
				if (this.e_cust.getText()!="") filter = " and b.cust like '"+this.e_cust.getText()+"%' ";
				var strSQL = "select a.no_jual,a.no_faktur,b.no_spk,convert(varchar,b.tanggal,103) as tanggal,b.cust,b.alamat,b.no_tel,(a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn - isnull(c.bayar,0)) as saldo,0 as nilai_bayar,a.akun_piutang "+
							 "from fri_jual_m a inner join fri_spk_m b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+			        
							 "                  left join (select no_jual,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "                             from fri_jualbayar_d where kode_lokasi ='"+this.app._lokasi+"' group by no_jual,kode_lokasi) c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
							 "where (a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn)>isnull(c.bayar,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+filter;
			}			 
			else {
				if (this.e_nofaktur.getText()!="") filter = " and a.no_faktur='"+this.e_nofaktur.getText()+"' ";
				if (this.e_nobukti.getText()!="") filter = " and a.no_jual='"+this.e_nobukti.getText()+"' ";
				if (this.e_cust.getText()!="") filter = " and a.keterangan like '"+this.e_cust.getText()+"%' ";
				var strSQL = "select a.no_jual,'-' as no_spk,a.no_faktur,convert(varchar,a.tanggal,103) as tanggal,a.keterangan as cust,'TUNAI' as alamat,'-' as no_tel,(a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn - isnull(c.bayar,0)) as saldo,0 as nilai_bayar,a.akun_piutang "+
							 "from fri_jual_m a "+
							 "                  left join (select no_jual,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
							 "                             from fri_jualbayar_d where kode_lokasi ='"+this.app._lokasi+"' group by no_jual,kode_lokasi) c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
							 "where a.catatan='TUNAI' and (a.nilai+a.nilai_service-a.nilai_diskon+a.nilai_ppn)>isnull(c.bayar,0) and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+filter;						 
			}
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
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;		
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];			
			this.sg.appendData([line.no_jual,line.no_spk,line.tanggal,floatToNilai(line.saldo),floatToNilai(line.nilai_bayar),line.no_faktur,line.cust,line.no_tel,line.akun_piutang]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 4) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].nilai_bayar = nilaiToFloat(this.sg.cells(4,row));
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot += parseFloat(line.nilai_bayar);
			}
			this.e_total.setText(floatToNilai(tot));
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});