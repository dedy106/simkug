window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgM2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgM2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuPtgM2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar Operasional DRK: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,11,202,20],caption:"Kode Transaksi",items:["PJPTG"], readOnly:true,tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"NIK Pemegang",multiSelection:false,change:[this,"doChange"]});
		this.cb_panjar = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"No Panjar",multiSelection:false,change:[this,"doChange"]});
		this.e_nilaipj = new saiLabelEdit(this,{bound:[20,18,202,20],caption:"Nilai Panjar", tipeText:ttNilai, text:"0", readOnly:true});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"MTA",readOnly:true});		
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_total = new saiLabelEdit(this,{bound:[820,16,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});
		this.e_user = new saiLabelEdit(this,{bound:[20,17,550,20],caption:"User input", maxLength:50});								
		this.e_nilaikb = new saiLabelEdit(this,{bound:[820,17,202,20],caption:"Kas Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,277], childPage:["Item Pertanggungan","Data Anggaran"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:0,
		            colTitle:["Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai"],
					colWidth:[[4,3,2,1,0],[100,250,100,250,100]],					
					columnReadOnly:[true,[0,1,2,3],[4]],
					//buttonStyle:[[0,2],[bsEllips,bsEllips]], 					
					colFormat:[[4],[cfNilai]],checkItem: true,
					//cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
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
			/*
			if (this.app._userStatus == "A") this.cb_nik.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);												
			else {
				this.cb_nik.setSQL("select a.nik,a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang ='"+this.app._kodeBidang+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
				this.cb_nik.setText(this.app._userLog);
			}			
			*/
			
			this.cb_nik.setSQL("select distinct a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			                   "where a.sts_pj='1' and b.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															
			this.cb_nik.setText(this.app._userLog);
			
			this.e_user.setText(this.app._namaUser);			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp d on a.nik = d.nik and a.kode_lokasi=d.kode_lokasi "+
							   "where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgM2.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuPtgM2.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update it_aju_m set progress='4', no_ptg='"+this.e_nb.getText()+"' where no_aju='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_bukti,'R-KBAJUDRK',kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,case dc when 'D' then 'C' else 'D' end,0,nilai "+
							"from angg_r where no_bukti='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,sts_pajak,npajak,form,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.app._kodePP+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.cb_nik.getText()+"','"+this.cb_panjar.getText()+"','"+this.e_user.getText()+"','NON',0,'PTGMULTI','"+this.cb_app.getText()+"')");					
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								                           
								sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.periodeAju+"','"+this.cb_akun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'BEBAN')");
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
										"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.periodeAju+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
							}
						}
					}
					
					var netto = nilaiToFloat(this.e_nilaikb.getText());
					sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','-',"+netto+",'-')");
							
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
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				if (nilaiToFloat(this.e_nilaikb.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pertanggungan melebihi nilai panjar.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				this.sg1.validasi();		
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}	
				
				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}					
					else {
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
							line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.cb_akun.getText() && this.sg1.cells(2,i) == "-") {		
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Akun Anggaran Harus diisi DRK.[Baris : "+k+"]");
								return false;						
							}
						}
					}
				}			
				
				//nonceksaldobudget
				this.dataAkunNonCek = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '053' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunNonCek = data;
				}

				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){		
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							
							var temu = false;
							for (var j=0;j<this.dataAkunNonCek.rs.rows.length;j++){
								line = this.dataAkunNonCek.rs.rows[j];							
								if (line.kode_akun == this.sg2.cells(0,i)) {		
									temu = true;
								}
							}
							
							if (!temu) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}

						}					
					}
				}				
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_nik.setFocus();
		setTipeButton(tbSimpan);
	},
	doChange:function(sender){
		try {
			if (sender == this.cb_nik && this.cb_nik.getText()!="") {			
				this.cb_panjar.setSQL("select no_aju,keterangan from it_aju_m where form='PMULTI' and progress='3' and nik_panjar ='"+this.cb_nik.getText()+"' and modul = 'PANJAR' and no_ptg='-' and kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Panjar",true);
			}
			if (sender == this.cb_panjar && this.cb_panjar.getText()!="") {
				var data = this.dbLib.getDataProvider("select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj,c.kode_akun,c.periode1 "+
						   "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						   "                inner join angg_r c on b.no_aju=c.no_bukti and b.kode_lokasi=c.kode_lokasi and c.modul='ITKBAJUDRK' "+
						   "where a.no_aju='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' group by c.kode_akun,c.kode_drk,c.periode1",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.periodeAju = line.periode1;
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));					
						this.kodeAkun = line.kode_akun;						
						this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_akun='"+this.kodeAkun+"' and kode_lokasi='"+this.app._lokasi+"' union select '-' as kode_akun,'-' as nama",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);																									
						this.cb_akun.setText(line.kode_akun);										
						this.e_ket.setText(this.cb_panjar.rightLabelCaption);
															
					} 
				}
				var data = this.dbLib.getDataProvider("select b.kode_pp,b.nama as nama_pp,a.kode_drk,isnull(c.nama,'-') as nama_drk,a.nilai "+
													  "from it_aju_multi a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+														  
													  "                    left join drk c on a.kode_drk=c.kode_drk and c.tahun=substring(a.periode,1,4) "+
													  "where a.no_aju = '"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai)]);
					}
				} else this.sg1.clear(1);											
				this.sg1.validasi();
			}			
			if (sender == this.e_nilaipj || sender == this.e_total) {
				if (this.e_nilaipj.getText()!="" && this.e_total.getText()!="") {
					this.e_nilaikb.setText(floatToNilai(nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_total.getText())));
				}
			}			
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptPtgFormTu";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1);
			this.sg2.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i) != "-" && this.sg1.cells(2,i)!= "-"){
				nilai = nilaiToFloat(this.sg1.cells(4,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.cb_akun.getText() == this.sg2.cells(0,j) && this.sg1.cells(0,i) == this.sg2.cells(2,j) && this.sg1.cells(2,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.cb_akun.getText(),this.cb_akun.rightLabelCaption,this.sg1.cells(0,i),this.sg1.cells(1,i),this.sg1.cells(2,i),this.sg1.cells(3,i),"0",floatToNilai(nilai),"0"]);
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
			var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.periodeAju+"','"+this.cb_panjar.getText()+"') as gar ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 4) && (sender.cells(4,row) != "")) sender.validasi();		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					totD += nilaiToFloat(this.sg1.cells(4,i));					
				}
			}						
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}
});