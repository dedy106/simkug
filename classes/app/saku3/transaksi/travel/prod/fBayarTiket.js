window.app_saku3_transaksi_travel_prod_fBayarTiket = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fBayarTiket.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fBayarTiket";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Tiket", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Bayar","List Bayar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No KasBank","Tanggal","No Tagihan","Deskripsi","Mitra","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,200,250,150,80,100]],
					readOnly:true,
					colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Mitra Vendor", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Currency",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,19,200,22],caption:"Kurs", tag:2,readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Total Pembayaran", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[680,19,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,267], childPage:["Data PNR"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:11,tag:0,
				colTitle:["ID PNR","Deskripsi","Jadwal","No Closing","BDD / Hutang","Curr","Kurs Closing","Total Tiket","Total Bayar","Saldo","Nilai Pembayaran"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,80,80,80,100,80,230,80]],
				colHide:[[3,6],[true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10]],				
				colFormat:[[6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
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
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr where kode_curr in ('IDR','USD')",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}			
			this.c_curr.setText("IDR");		
			this.doChange(this.c_curr);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "LKURS") this.lKurs = line.flag;
					if (line.kode_spro == "RKURS") this.rKurs = line.flag;
				}
			}	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fBayarTiket.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fBayarTiket.implement({
	doLoadData: function() {
		if (this.cb_vendor.getText()!="" && this.c_curr.getText()!="") {			
			var strSQL = "select a.kode_tiket,a.nama,a.no_closing,a.kode_curr,a.kurs,a.nilai,convert(varchar,tgl_berangkat,103) as jadwal, "+
						 "case when a.no_closing='-' then c.akun_bdd else c.akun_hutang end as kode_akun, "+
						 "isnull(b.tot_bayar,0) as tot_bayar,a.nilai - isnull(b.tot_bayar,0) as saldo "+
						 "from dgw_tiket a inner join dgw_jenis_tiket c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+

						 "		left join ("+
						 "			select kode_tiket,sum(case dc when 'D' then nilai else -nilai end) as tot_bayar "+
						 "			from dgw_tiket_bayar "+
						 "			where kode_lokasi='"+this.app._lokasi+"' "+
						 "			group by kode_tiket "+						 
						 "		) b on a.kode_tiket=b.kode_tiket "+

						 "where a.kode_vendor='"+this.cb_vendor.getText()+"' and a.kode_curr='"+this.c_curr.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_tiket,line.nama,line.jadwal,line.no_closing,line.kode_akun,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai),floatToNilai(line.tot_bayar),floatToNilai(line.saldo),"0"]);
				}
			} 
			else this.sg1.clear(1);
		}
		else system.alert(this,"Mitra dan Currency harus dipilih.","");
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
						sql.add("delete from dgw_tiket_bayar where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					} 
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KBTIKET','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_vendor.getText()+"','"+this.cb_akun.getText()+"','BK')");
							
					var bayarIDR = nilaiToFloat(this.e_total.getText()) * nilaiToFloat(this.e_kurs.getText());		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','C',"+bayarIDR+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','KB','KB','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");					
											
					var akumDebet = 0;	//-----> selisih kurs (utk yg berbasis closing) hitung dari total saja diakumulasi di akumDebet
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(10,i) != "0"){
							var j=i+1000;							
							//jika blm closing ='-' ---> BDDidr adalah sesuai kurs bayar
							//else  ---> pelunasan hutang memakai kurs saat closing, selisihnya jurnal labarugi kurs
							if (this.sg1.cells(3,i) == "-") {
								var nilaiBayarIDR = Math.round(nilaiToFloat(this.sg1.cells(10,i)) * nilaiToFloat(this.e_kurs.getText()));	
								var jenis = "BDD";				
								var kurs = nilaiToFloat(this.e_kurs.getText());
							}
							else {								
								var nilaiBayarIDR = Math.round(nilaiToFloat(this.sg1.cells(10,i)) * nilaiToFloat(this.sg1.cells(6,i)));
								var jenis = "HUTANG";
								var kurs = nilaiToFloat(this.sg1.cells(6,i));
							}
							akumDebet += nilaiBayarIDR; 
							
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg1.cells(4,i)+"','D',"+nilaiBayarIDR+","+
									nilaiToFloat(this.sg1.cells(10,i))+",'"+this.e_ket.getText()+"','KB','"+jenis+"','"+this.c_curr.getText()+"',"+kurs+",'"+this.app._kodePP+"','-','-','"+this.cb_vendor.getText()+"','-','-','"+this.sg1.cells(0,i)+"','-','-')");											

							sql.add("insert into dgw_tiket_bayar(no_bukti,kode_tiket,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,dc,kode_curr,kurs,nilai,no_closing) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"','KBTIKET','"+jenis+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'D','"+this.c_curr.getText()+"',"+kurs+","+nilaiToFloat(this.sg1.cells(10,i))+",'"+this.sg1.cells(3,i)+"')");
						}
					}		

					var selisih = bayarIDR - akumDebet;					
					if (selisih > 0) {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',777,'"+this.rKurs+"','D',"+selisih+","+
								selisih+",'Selisih Kurs','KB','SKURS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
					}
					if (selisih < 0) {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',777,'"+this.lKurs+"','C',"+Math.abs(selisih)+","+
								Math.abs(selisih)+",'Selisih Kurs','KB','SKURS','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");										
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
				this.sg1.validasi();	

				for (var i=0;i < this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(10,i) != "0"){											
						if (nilaiToFloat(this.sg1.cells(10,i)) > nilaiToFloat(this.sg1.cells(9,i))) {
							system.alert(this,"Transaksi tidak valid.","Nilai Pembayaran melebihi Saldo.");
							return false;						
						}
					}
				}											
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else this.simpan();
				break;							
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dgw_tiket_bayar where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="" && this.stsSimpan==1) this.sg1.clear(1);
		if (sender == this.c_curr && this.c_curr.getText() != "" && this.stsSimpan==1){
			this.sg1.clear(1);
			if (this.c_curr.getText() == "IDR") {					
				this.e_kurs.setReadOnly(true);
				this.e_kurs.setText("1");					
			}
			else {
				this.e_kurs.setReadOnly(false);
				var strSQL = "select top 1 kurs from dgw_kurs where kd_curr = 'USD' and kode_lokasi='"+this.app._lokasi+"' order by id desc ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_kurs.setText(floatToNilai(line.kurs));	
					}					
				}
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);		
				this.bTampil.show();		
				this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);
			}
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti","BK/"+this.e_periode.getText().substr(2,4)+"/","0000"));
			this.e_dok.setFocus();				
			setTipeButton(tbSimpan);
		}		
	},	
	doNilaiChange1: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++) {
				if (this.sg1.rowValid(i) && this.sg1.cells(10,i) != "") {
					total += nilaiToFloat(this.sg1.cells(10,i));
				}
			}			
			this.e_total.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){						
		if (col == 10) {				
			this.sg1.validasi();
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbRincianHutangPremi";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.kode_vendor+' - '+ b.nama as vendor, a.nilai1 "+
		             "from trans_m a "+
					 "inner join vendor b on a.param1=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'KBTIKET' and a.posted ='F'";
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,line.vendor,floatToNilai(line.nilai1)]); 
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
				this.bTampil.hide();
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from trans_m "+
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_akun.setText(line.param2);				
						this.e_total.setText(floatToNilai(line.nilai));				
						this.cb_vendor.setText(line.param1);				
						this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_vendor='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Mitra",true);									
					}
				}
				
				//whre a.no_closing=d.no_closing
				//jika ada perbedaan data no_closing nya (antara no_closing di master -tiket- dan transaksi bayar)
				//maka data tidak dapat dikoreksi
				var strSQL = "select a.kode_tiket,a.nama,a.no_closing,a.kode_curr,a.kurs,a.nilai,convert(varchar,tgl_berangkat,103) as jadwal, "+
							 "case when a.no_closing='-' then c.akun_bdd else c.akun_hutang end as kode_akun, "+
							 "isnull(b.tot_bayar,0) as tot_bayar, a.nilai-isnull(b.tot_bayar,0) as saldo, d.bayar "+
							 "from dgw_tiket a inner join dgw_jenis_tiket c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+

							 "		inner join ("+
							 "			select kode_tiket,no_closing,nilai as bayar "+
							 "			from dgw_tiket_bayar "+
							 "			where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+							 
							 "		) d on a.kode_tiket=d.kode_tiket "+

							 "		left join ("+
							 "			select kode_tiket,sum(case dc when 'D' then nilai else -nilai end) as tot_bayar "+
							 "			from dgw_tiket_bayar "+
							 "			where no_bukti <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "			group by kode_tiket "+
							 "		) b on a.kode_tiket=b.kode_tiket "+

							 "where a.no_closing=d.no_closing and a.kode_lokasi='"+this.app._lokasi+"' ";
							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_tiket,line.nama,line.jadwal,line.no_closing,line.kode_akun,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai),floatToNilai(line.tot_bayar),floatToNilai(line.saldo),floatToNilai(line.bayar)]);
					}
				} 
				else this.sg1.clear(1);
				
			}						
		} catch(e) {alert(e);}
	}
});