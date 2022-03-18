window.app_saku3_transaksi_tu_aka_fJurnalBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_aka_fJurnalBill.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tu_aka_fJurnalBill";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Billing", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bill", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_total = new saiLabelEdit(this,{bound:[820,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[720,15,80,18],caption:"Hitung Bill",click:[this,"doTampil"]});			
		this.c_tahunaka = new saiCB(this,{bound:[20,15,200,20],caption:"Tahun Akademik",readOnly:true,tag:2,change:[this,"doChange"]}); 
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,360], childPage:["Filter","Rekap Billing"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-10],colCount:3,tag:9,
					colTitle:["Status","No Load","Deskripsi"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});

		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["Kd Param","Nama Parameter","Nilai"],						
				colWidth:[[2,1,0],[100,400,100]],		
				colFormat:[[2],[cfNilai]],
				autoAppend:false,readOnly:true, defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1});		
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();

		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbSimpan);				
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		this.c_tahunaka.items.clear();
		var data = this.dbLib.getDataProvider("select distinct tahunaka as tahunaka from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"' order by tahunaka desc ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.c_tahunaka.addItem(i,line.tahunaka);
			}
		}
		this.c_tahunaka.setText("");
		var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode= substring(convert(varchar,getdate(),112),1,6) and  kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){											
				this.c_tahunaka.setText(line.tahunaka);				
			}
		}
				
	}
};
window.app_saku3_transaksi_tu_aka_fJurnalBill.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_aka_fJurnalBill.implement({	
	doChange: function(sender) {
		try {
			if (sender == this.e_periode && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select tahunaka from aka_tahunaka where periode= '"+this.e_periode.getText()+"' and  kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.c_tahunaka.setText(line.tahunaka);				
					}
				}
			}

			if (sender == this.c_tahunaka && this.c_tahunaka.getText()!="") {				
				var data = this.dbLib.getDataProvider(
					"select distinct b.no_load,b.keterangan from aka_load_d a inner join aka_load_m b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_bill='-' and a.tahunaka = '"+this.c_tahunaka.getText()+"' and a.flag_status='AKTIF'  and a.kode_lokasi = '"+this.app._lokasi+"' "+
					"order by b.no_load",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						var vStatus = "PROSES";
						this.sg.appendData([vStatus,line.no_load,line.keterangan]);
					}
				} else this.sg.clear(1);
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doTampil: function(sender){
		this.kodeparam = ""; 
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES") {
				this.kodeparam += ",'"+this.sg.cells(1,i)+"'";
			}			
		}
		this.kodeparam = this.kodeparam.substr(1);			
		if (this.kodeparam == "") this.kodeparam = "''";
		
		var total = 0;
		var strSQL = "select  a.kode_produk,c.nama, sum(nilai) as nilai "+
					"from aka_load_d a "+
					"inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi= b.kode_lokasi "+
					"inner join (select distinct kode_produk,nama,kode_lokasi from aka_produk where kode_lokasi ='"+this.app._lokasi+"') c on a.kode_produk =c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
					"where a.no_load in ("+this.kodeparam+") and a.no_bill='-' and a.tahunaka = '"+this.c_tahunaka.getText()+"' and a.flag_status='AKTIF' and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by a.kode_produk, c.nama ";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				if (parseFloat(line.nilai) > 0) {																				
					this.sg1.appendData([line.kode_produk,line.nama,floatToNilai(line.nilai)]);
					total += parseFloat(line.nilai);
				}
			}
		} else this.sg1.clear(1);
		
		this.e_total.setText(floatToNilai(total));
		
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','-','BLOAD','F','"+this.app._userLog+"',getdate())");
										
					sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,kode_jalur,tahunaka,modul,kode_drk,flag_status,sts_tagih,no_tak) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,a.periode,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,a.periode_susut,a.periode_sisih,a.kode_pp,a.dc,a.kode_akt,a.kode_jalur,a.tahunaka,'BILLOAD',a.kode_drk,a.flag_status,'-','-' "+
						    "from aka_load_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_load in ("+this.kodeparam+") and a.no_bill='-' and a.flag_status='AKTIF' and a.tahunaka='"+this.c_tahunaka.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'");
					
					sql.add("update aka_load_d set no_bill='"+this.e_nb.getText()+"' where no_load in ("+this.kodeparam+") and no_bill='-' and flag_status='AKTIF' and tahunaka='"+this.c_tahunaka.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");


					//------- jurnal -------
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
						"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',0,a.akun_piutang,'"+this.e_ket.getText()+"','D',sum(a.nilai),b.kode_jur,'-','BLOAD',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
						"from aka_bill_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi  "+									
						"where a.kode_produk in ('UP3','SDP2','BPPP','BPPNP','SKS','PERPUS','DENDA','USTATUS','ASUR','ASRAMA') and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"group by a.kode_lokasi,a.akun_piutang,a.kode_produk,b.kode_jur");
				
					//pp pdpt masing2 jurusan	
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
						"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,kode_drk,'BLOAD',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
						"from aka_bill_d "+
						"where kode_produk in ('UP3','SDP2','SKS','DENDA','USTATUS','ASRAMA') and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by kode_lokasi,akun_pdpt,kode_produk,kode_pp,kode_drk");
						
					//pp pdpt sesuai pp di produk (fixed)	
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
						"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.dp_d1.getDateString()+"',1,a.akun_pdpt,'"+this.e_ket.getText()+"','C',sum(a.nilai),c.kode_pp,a.kode_drk,'BLOAD',a.kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
						"from aka_bill_d a "+
						"inner join (select distinct kode_produk,kode_lokasi,kode_pp from aka_produk where kode_produk in ('PERPUS','ASUR')) c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						"where a.kode_produk in ('PERPUS','ASUR') and a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"group by a.kode_lokasi,a.akun_pdpt,a.kode_produk,c.kode_pp,a.kode_drk");
													
					//jurnal bpp masuk ke pdd	
					sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) "+
						"select '"+this.e_nb.getText()+"',kode_lokasi,'"+this.dp_d1.getDateString()+"',3,akun_pdd,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,'-','BLOAD',kode_produk,'"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate() "+
						"from aka_bill_d "+
						"where kode_produk in ('BPPP','BPPNP') and no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by kode_lokasi,akun_pdd,kode_produk,kode_pp");
											

					//------ anggaran ------	
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
						"select no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
						"from aka_bill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by no_bill,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");

					setTipeButton(tbAllFalse);					
					this.status = "SIMPAN";
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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :	
				this.stsSimpan = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);										
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");

		var strSQL = "select '20'+substring(tahunaka,1,2) as akt_maba from aka_tahunaka where periode = '"+this.e_periode.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){							
				this.AktMABA = 	line.akt_maba;		
			}
		}
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_ket.setFocus();
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.status == "SIMPAN") {
							if (this.stsSimpan=="1") {							
								// this.nama_report="server_report_saku2_kopeg_aka_rptAkBillJurnal";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
						}
					}else
						system.info(this, result,"");											
				break;
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
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.status = "";
		} catch(e) {
			alert(e);
		}
	}
});
