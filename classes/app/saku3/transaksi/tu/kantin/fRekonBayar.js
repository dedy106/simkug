window.app_saku3_transaksi_tu_kantin_fRekonBayar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fRekonBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fRekonBayar";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Piutang Non Tunai", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"], visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Rekon","Daftar Rekon"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["No. Bukti","Deskripsi","Nilai","Pilih"],
					colWidth:[[3,2,1,0],[70,100,300,100]],
					colFormat:[[2,3],[cfNilai,cfButton]],
					readOnly:true,
					click:[this,"doSgBtnClick1"], colAlign:[[3],[alCenter]],													 
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad1"]});

		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50, tag:1});		
		this.cb_kb = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"Akun KasBank", maxLength:50, tag:1, multiSelection:false});			
		this.cb_adm = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Akun Adm", tag:2, readOnly:true});					
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,16,200,20],caption:"Total Rekon", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});			
		this.cb_kantin = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Kantin",  multiSelection:false, tag:1,change:[this,"doChange"]});	
		this.e_adm = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,14,200,20],caption:"Tot Selisih", maxLength:50, tag:1,tipeText:ttNilai,text:"0",change:[this,"doChange"],readOnly:true});			
		this.cb_jenis = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis Bayar",  multiSelection:false, tag:1,change:[this,"doChange"]});	
		this.e_kas = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Nilai KasBank", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,15,995,259], childPage:["Saldo Non Tunai"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:1,
		            colTitle:["ID Bayar","Nama Jenis","Akun","No Load","Tgl Upload","Kasir","Saldo","Nilai KasBank","Ni Selisih"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,250,80,120,60,150,70]],
					colHide:[[0,1,2],[true,true,true]],
					columnReadOnly:[true,[0,1,2,3,8]],					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		

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

			this.cb_adm.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun",true);
			this.cb_kb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun",true);
			this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);													
			this.cb_jenis.setSQL("select kode_bayar, ket from ktu_jbayar where kode_lokasi = '"+this.app._lokasi+"'",["kode_bayar","ket"],false,["Kode","Nama"],"and","Data Bayar",true);													

			var data = this.dbLib.getDataProvider("select kode_param,flag from kantin_param where kode_param in ('ADMNON','DRKBEBAN','PDPKTN','DRKPDPT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_param == "ADMNON") this.akunAdm = line.flag;
					if (line.kode_param == "DRKBEBAN") this.DRKBeban = line.flag;	
					if (line.kode_param == "PDPKTN") this.akunPdpt = line.flag;								
					if (line.kode_param == "DRKPDPT") this.DRKPdpt = line.flag;																									
				}
			}
			this.cb_adm.setText(this.akunAdm);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kantin_fRekonBayar.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fRekonBayar.implement({
	doLoad: function() {		
		var strSQL2 = "select a.kode_bayar,a.ket,a.kb,b.no_load,b.tgl,b.nik_kasir,b.piutang-isnull(c.rekon,0) as saldo "+
					  "from ktu_jbayar a "+					  

					  "inner join ( "+				
					  "select a.no_load,b.nik_kasir+'|'+c.nama as nik_kasir,convert(varchar,b.tanggal,103) as tgl,a.kode_bayar,sum(a.nilai) as piutang "+
					  "from kantin_bayar a "+
					  "inner join kantin_load b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi "+
					  "inner join ktu_user c on b.nik_kasir=c.nik and c.kode_lokasi=b.kode_lokasi "+
					  "where a.kode_bayar <> 'TUNAI' and a.kode_lokasi='"+this.app._lokasi+"' and b.periode<='"+this.e_periode.getText()+"' "+
					  "and b.kode_kantin='"+this.cb_kantin.getText()+"' "+
					  "group by a.no_load,b.nik_kasir+'|'+c.nama,convert(varchar,b.tanggal,103),a.kode_bayar "+					
					  ") b on a.kode_bayar=b.kode_bayar  "+ 
					
					  //beban adm dalam format minus, +=pendapatan lebih bayar
					  "left join "+
					  "( "+
					  "select kode_bayar,no_load,sum(case dc when 'D' then nilai-adm else -(nilai-adm) end) as rekon "+
					  "from kantin_bayar_rekon  "+
					  "where kode_lokasi ='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' "+
					  "group by kode_bayar,no_load "+
					  ") c on a.kode_bayar=c.kode_bayar and b.kode_bayar=c.kode_bayar and b.no_load=c.no_load "+

					  "where a.kode_bayar='"+this.cb_jenis.getText()+"' and b.piutang-isnull(c.rekon,0)>0 "+
					  "order by a.kode_bayar, b.no_load";				   

		var data2 = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data2 == "object"){
			this.sg4.clear();						
			if (data2.rs.rows[0] != undefined){
				for(var i=0;i<data2.rs.rows.length;i++){
					var line2 = data2.rs.rows[i];	
					this.sg4.appendData([line2.kode_bayar,line2.ket,line2.kb,line2.no_load,line2.tgl,line2.nik_kasir,floatToNilai(line2.saldo),"0","0"]); 
				}
			}
		}	
		else this.sg4.clear(1);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if(this.stsSimpan == 0){
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kantin_bayar_rekon where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}		
												
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.cb_adm.getText()+"','"+this.cb_kb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','REKBAYAR','KANTIN','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_kas.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_kantin.getText()+"','"+this.cb_jenis.getText()+"')");

					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',99,'"+this.cb_kb.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_kas.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','REKBAYAR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");

					var tot = 0;		
					for (var i=0; i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)) {								
							if (this.sg4.cells(7,i) != "0" || this.sg4.cells(8,i) != "0") {

								if (nilaiToFloat(this.sg4.cells(8,i)) < 0 ) tot = nilaiToFloat(this.sg4.cells(7,i)) + Math.abs(nilaiToFloat(this.sg4.cells(8,i)));
								else tot = nilaiToFloat(this.sg4.cells(6,i));
								
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(2,i)+"','"+this.e_ket.getText()+"','C',"+tot+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','REKBAYAR','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								
								if (nilaiToFloat(this.sg4.cells(8,i)) < 0) {
									var j=i+101;								
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.cb_adm.getText()+"','"+this.e_ket.getText()+"','D',"+Math.abs(nilaiToFloat(this.sg4.cells(8,i)))+",'"+this.app._kodePP+"','"+this.DRKBeban+"','-','-','"+this.app._lokasi+"','REKBAYAR','ADM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");								
								}
								else {
									if (nilaiToFloat(this.sg4.cells(8,i)) > 0) {
										var j=i+101;								
										sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
												"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPdpt+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg4.cells(8,i))+",'"+this.app._kodePP+"','"+this.DRKPdpt+"','-','-','"+this.app._lokasi+"','REKBAYAR','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");								
									}
								}

								sql.add("insert into kantin_bayar_rekon (no_bukti,kode_lokasi,tanggal,keterangan,periode,nik_user,tgl_input,kode_bayar,nilai,adm,dc,no_load) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(7,i))+","+nilaiToFloat(this.sg4.cells(8,i))+",'D','"+this.sg4.cells(3,i)+"')");
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);			
					
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);	
				this.sg4.clear(1);					
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);	
				this.sg4.validasi();
				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
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
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kantin_bayar_rekon where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.e_total.setText("0");
				this.e_adm.setText("0");
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;				
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		
	},		
	doChange:function(sender){
		if ((sender == this.cb_kantin || sender == this.cb_jenis) && this.cb_kantin.getText()!="" && this.cb_jenis.getText()!="" && this.stsSimpan==1) {
			this.doLoad();
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 7) {
			var adm = nilaiToFloat(this.sg4.cells(7,row)) - nilaiToFloat(this.sg4.cells(6,row));
			this.sg4.cells(8,row,adm);
		}
		if (col == 8) {						
			this.sg4.validasi();
		}
	},	
	doNilaiChange: function(){
		var kas = adm = tot = 0;
		for (var i=0; i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i)) {	
				if (this.sg4.cells(7,i) != "") kas += nilaiToFloat(this.sg4.cells(7,i));
				if (this.sg4.cells(8,i) != "") adm += nilaiToFloat(this.sg4.cells(8,i));

				if (nilaiToFloat(this.sg4.cells(7,i))> 0) {
					if (nilaiToFloat(this.sg4.cells(8,i)) < 0 ) tot += nilaiToFloat(this.sg4.cells(7,i)) + Math.abs(nilaiToFloat(this.sg4.cells(8,i)))
					else tot += nilaiToFloat(this.sg4.cells(6,i));
				}
			}					
		}				
		
		this.e_total.setText(floatToNilai(tot));			
		this.e_kas.setText(floatToNilai(kas));			
		this.e_adm.setText(floatToNilai(adm));			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {		
								this.nama_report="server_report_saku3_tu_kantin_rptJurnalRekon";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";							
								// this.nama_report="server_report_saku3_tu_kantin_rptTcash";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.stsSimpan=1;
			this.doClick(this.i_gen);						
			this.sg1.clear(1);	
			this.sg4.clear(1);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																									
		var strSQL = "select a.no_kas,a.keterangan,a.nilai "+
			         "from kas_m a "+
					 "where a.modul = 'REKBAYAR' and a.posted='F' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_kas desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg1.clear();
			this.dataJU3 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);	
		} else this.sg1.clear(1);					
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg1.appendData([line.no_kas,line.keterangan,floatToNilai(line.nilai),"Pilih"]);
		}
		this.sg1.setNoUrut(start);	
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col == 3) this.doDoubleClick1(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},

	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));
				
				var strSQL = "select * from kas_m where no_kas ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ket.setText(line.keterangan);	
						this.cb_kb.setText(line.akun_kb);
						this.cb_adm.setText(line.no_bg);	
						this.cb_kantin.setText(line.ref1);
						this.cb_jenis.setText(line.kode_bank);							
					}
				}
				//colTitle:["ID Bayar","Nama Jenis","Akun","No Load","Tanggal","Kasir","Saldo","Nilai KasBank","Nilai Adm"],
				var strSQL2 = "select a.kode_bayar,a.ket,a.kb,b.no_load,b.tgl,b.nik_kasir,b.piutang-isnull(c.rekon,0) as saldo,d.nilai,d.adm "+
							"from ktu_jbayar a "+	
							
							"inner join kantin_bayar_rekon d on a.kode_bayar=d.kode_bayar and d.no_bukti='"+this.e_nb.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' "+
	  
							"inner join ( "+				
							"select a.no_load,b.nik_kasir+'|'+c.nama as nik_kasir,convert(varchar,b.tanggal,103) as tgl,a.kode_bayar,sum(a.nilai) as piutang "+
							"from kantin_bayar a "+
							"inner join kantin_load b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi "+
							"inner join ktu_user c on b.nik_kasir=c.nik and c.kode_lokasi=b.kode_lokasi "+
							"where a.kode_bayar <> 'TUNAI' and a.kode_lokasi='"+this.app._lokasi+"' and b.periode<='"+this.e_periode.getText()+"' "+
							"and b.kode_kantin='"+this.cb_kantin.getText()+"' "+
							"group by a.no_load,b.nik_kasir+'|'+c.nama,convert(varchar,b.tanggal,103),a.kode_bayar "+					
							") b on a.kode_bayar=b.kode_bayar and  b.no_load=d.no_load "+ 
						  
							"left join "+
							"( "+
							"select kode_bayar,no_load,sum(case dc when 'D' then nilai+adm else -(nilai+adm) end) as rekon "+
							"from kantin_bayar_rekon  "+
							"where kode_lokasi ='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and no_bukti <> '"+this.e_nb.getText()+"' "+
							"group by kode_bayar,no_load "+
							") c on a.kode_bayar=c.kode_bayar and b.kode_bayar=c.kode_bayar and b.no_load=c.no_load "+

							"order by a.kode_bayar, b.no_load";	
						
				var data2 = this.dbLib.getDataProvider(strSQL2,true);
				if (typeof data2 == "object"){
					this.sg4.clear();						
					if (data2.rs.rows[0] != undefined){
						for(var i=0;i<data2.rs.rows.length;i++){
							var line2 = data2.rs.rows[i];								
							this.sg4.appendData([line2.kode_bayar,line2.ket,line2.kb,line2.no_load,line2.tgl,line2.nik_kasir,floatToNilai(line2.saldo),floatToNilai(line2.nilai),floatToNilai(line2.adm)]); 
						}
					}
				}	
				
			}
		} catch(e) {alert(e);}
	}
});
