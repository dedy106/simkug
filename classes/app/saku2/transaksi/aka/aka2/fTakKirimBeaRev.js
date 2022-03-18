window.app_saku2_transaksi_aka_aka2_fTakKirimBeaRev = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fTakKirimBeaRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fTakKirimBeaRev";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Kirim: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Lok Tujuan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,200,300,180,80,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2});										
		this.cb_bukti = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"No TAK Bea", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});										
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,325], childPage:["Data Item Jurnal","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPage"]});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.flagGarFree = "0"; this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fTakKirimBeaRev.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fTakKirimBeaRev.implement({	
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
						sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_bukti.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKREV','KIRIM','IDR',1,"+this.nilaiTAK+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");
																					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															           
								sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','TAKREV','JURNAL','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','TAKREV','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
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
					this.sg.clear(1); this.sg3.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.cb_bukti.setSQL("select no_kirim, keterangan from takkirim_m where periode<='"+this.e_periode.getText()+"' and modul='TAKBEA' and kode_lokasi = '"+this.app._lokasi+"' "+
		                     			 "and no_kirim not in (select no_dokumen from takkirim_m where kode_lokasi='"+this.app._lokasi+"' and modul='TAKREV')",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data TAK Beasiswa",true);				
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";						
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				this.sg.validasi();																
				for (var i=0;i < this.sg.getRowCount();i++){
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
					else {
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
							line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg.cells(0,i) && this.sg.cells(7,i) == "-") {		
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
								return false;						
							}
						}
					}
				}				
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				this.dataAkunTAK = {rs:{rows:[]}};
				var akunTAK = false; 
				var k = 0; 
				this.nilaiTAK = 0;
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '016' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunTAK = data;
				} 				
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataAkunTAK.rs.rows.length;i++){
							line = this.dataAkunTAK.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunTAK = true;
								this.nilaiTAK += nilaiToFloat(this.sg.cells(4,j));
							}
						}
					}
				}
				if (!akunTAK) {
					system.alert(this,"Transaksi tidak valid.","Akun Mutasi (Flag Akun 016) tidak ditemukan.");
					return false;						
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
					sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) {
			this.doClick();
			this.cb_bukti.setSQL("select no_kirim, keterangan from takkirim_m where periode<='"+this.e_periode.getText()+"' and modul='TAKBEA' and kode_lokasi = '"+this.app._lokasi+"' "+
		                     "and no_kirim not in (select no_dokumen from takkirim_m where kode_lokasi='"+this.app._lokasi+"' and modul='TAKREV')",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data TAK Beasiswa",true);				
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="" && this.stsSimpan == 1) {
			 var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,case a.dc when 'D' then 'C' else 'D' end as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
						"             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
						"where a.no_kirim = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg.clear(1);
			this.sg.validasi();		
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
				this.cb_bukti.setSQL("select no_kirim, keterangan from takkirim_m where periode<='"+this.e_periode.getText()+"' and modul='TAKBEA' and kode_lokasi = '"+this.app._lokasi+"' "+
		                     "and no_kirim not in (select no_dokumen from takkirim_m where kode_lokasi='"+this.app._lokasi+"' and modul='TAKREV')",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data TAK Beasiswa",true);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_lokasi.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
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
								this.nama_report="server_report_saku3_tm_rptTakKirim";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.cb_bukti.setSQL("select no_kirim, keterangan from takkirim_m where periode<='"+this.e_periode.getText()+"' and modul='TAKBEA' and kode_lokasi = '"+this.app._lokasi+"' "+
		                   	     "and no_kirim not in (select no_dokumen from takkirim_m where kode_lokasi='"+this.app._lokasi+"' and modul='TAKREV')",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data TAK Beasiswa",true);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kirim,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.kode_loktuj+' - '+b.nama as lokasi,a.nilai "+
		             "from takkirim_m a inner join lokasi b on a.kode_loktuj=b.kode_lokasi "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'TAKREV' and a.posted ='F' and a.no_terima='-' and progress='0' ";		
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
			this.sg3.appendData([line.no_kirim,line.tgl,line.no_dokumen,line.keterangan,line.lokasi,floatToNilai(line.nilai)]); 
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
								
				var strSQL = "select keterangan,no_dokumen,tanggal,kode_loktuj,ref1 "+
							 "from takkirim_m "+							 
							 "where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.cb_bukti.setSQL("select no_kirim, keterangan from takkirim_m where no_kirim='"+line.no_dokumen+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Data TAK Beasiswa",true);				
		                     			
						this.dp_d1.setText(line.tanggal);
						this.cb_bukti.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.cb_lokasi.setText(line.kode_loktuj);												
					}
				}								
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							"                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
							"where a.no_kirim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg.clear(1);			
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode1,1,4) "+
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);			
			}									
		} catch(e) {alert(e);}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-" && this.sg.cells(7,i)!= "-"){
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j) && this.sg.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	}
});