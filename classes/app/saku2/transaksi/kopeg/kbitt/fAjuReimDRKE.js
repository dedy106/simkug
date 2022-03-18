window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRKE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRKE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuReimDRKE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse IF: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No Agenda", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new saiCB(this,{bound:[20,11,202,20],caption:"Kode Transaksi",items:["HUTIF"], readOnly:true,tag:2, visible:false});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});							
		this.e_nilai = new saiLabelEdit(this,{bound:[820,16,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,360], childPage:["Data Pengajuan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:0,
		            colTitle:["Status","No Pengajuan","Tanggal","Akun","DRK","Uraian","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,260,150,150,80,100,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					colFormat:[[6],[cfNilai]],					
					nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_pp.setText(this.app._kodePP);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'ITHUTIF' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.akunHutIF = line.flag;								
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRKE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRKE.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					for (var i = 0; i < this.sg.rows.getLength();i++){						
						sql.add("delete from angg_r where modul = 'R-AJUREIM' and no_bukti ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");						
						var data = this.dbLib.getDataProvider("select distinct no_ver as no_ver from it_ifaju_m where no_bukti='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;							
							line = data.rs.rows[i];																	
							sql.add("delete from angg_r where modul = 'R-AJUREIM' and no_bukti ='"+line.no_ver+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}					
					sql.add("delete from it_ifreim_j where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_ifaju_m set no_aju='-' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_ifver_m set no_aju='-' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','"+this.cb_nik.getText()+"','-','"+this.app._namaUser+"','HUTIF')");															
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REIMBURSE"){
							sql.add("update it_ifaju_m set no_aju='"+this.e_nb.getText()+"' where no_bukti ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
					sql.add("update a set a.no_aju='"+this.e_nb.getText()+"' "+
							"from it_ifver_m a inner join it_ifaju_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_aju ='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into it_ifreim_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) "+
							"select '"+this.e_nb.getText()+"',no_bukti,kode_lokasi,'"+this.dp_d1.getDateString()+"',998,'"+this.e_periode.getText()+"',kode_akun,kode_pp,kode_drk,'D',keterangan,nilai,'BEBANIF' "+
							"from it_ifaju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into it_ifreim_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) "+
							"select '"+this.e_nb.getText()+"',a.no_ver,a.kode_lokasi,'"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"',a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.keterangan,a.nilai,'VERIF' "+
							"from it_ifver_j a inner join it_ifver_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");		
							
					//reverse gar saat pengajuan
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select a.no_bukti,'R-AJUREIM',a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.periode1,a.periode2,case a.dc when 'D' then 'C' else 'D' end,0,a.nilai "+
							"from angg_r a inner join it_ifaju_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'IFSUB'");		
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select a.no_bukti,'R-AJUREIM',a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.periode1,a.periode2,case a.dc when 'D' then 'C' else 'D' end,0,a.nilai "+
							"from angg_r a inner join it_ifver_j b on a.no_bukti=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk "+
							"              inner join it_ifver_m c on c.no_ver=b.no_ver and c.kode_lokasi=b.kode_lokasi "+
							"where c.no_aju='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'IFSUBVER'");		
							
					//gar baru utk reim pengajuan --> di fiat yg diliat no aju-nya utk anggaran
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select '"+this.e_nb.getText()+"','ITKBAJUDRK',a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.periode1,a.periode2,a.dc,a.saldo,a.nilai "+
							"from angg_r a inner join it_ifaju_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_aju='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'IFSUB'");									
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select '"+this.e_nb.getText()+"','ITKBAJUDRK',a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.periode1,a.periode2,a.dc,a.saldo,a.nilai "+
							"from angg_r a inner join it_ifver_j b on a.no_bukti=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk "+
							"              inner join it_ifver_m c on c.no_ver=b.no_ver and c.kode_lokasi=b.kode_lokasi "+
							"where c.no_aju='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'IFSUBVER'");									
							
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
					setTipeButton(tbUbahHapus);
					this.sg.clear(1);
				break;
			case "ubah" :					
				this.sg.validasi();				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					this.viewLap = false;				
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					for (var i = 0; i < this.sg.rows.getLength();i++){						
						sql.add("delete from angg_r where modul = 'R-AJUREIM' and no_bukti ='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");						
						var data = this.dbLib.getDataProvider("select distinct no_ver as no_ver from it_ifaju_m where no_bukti='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;							
							line = data.rs.rows[i];																	
							sql.add("delete from angg_r where modul = 'R-AJUREIM' and no_bukti ='"+line.no_ver+"' and kode_lokasi='"+this.app._lokasi+"'");							
						}
					}
					sql.add("delete from it_ifreim_j where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_ifaju_m set no_aju='-' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_ifver_m set no_aju='-' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
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
	},		
	doChange:function(sender){
		try {
			if (sender == this.e_periode && this.e_periode.getText()!="") {										
				this.e_nb.setSQL("select a.no_aju, a.keterangan from it_aju_m a  where a.nik_panjar='"+this.app._userLog+"' and a.form = 'HUTIF' and a.modul='HUTIF' and a.progress in ('A','K','R','0') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);		
			}
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {
				this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join it_if b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			}			
			if (sender == this.e_nb && this.e_nb.getText()!="") {				
				var data = this.dbLib.getDataProvider("select kode_pp,nik_panjar,keterangan,periode,tanggal,modul "+
						   "from it_aju_m  "+ 
						   "where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.e_ket.setText(line.keterangan);					
						this.cb_pp.setText(line.kode_pp);
						this.cb_nik.setText(line.nik_panjar);					
					} 
				}
				this.doLoad();
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){		
		if (this.cb_pp.getText() != "" && this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'REIMBURSE' as status,a.no_bukti,convert(varchar,a.tanggal,103) as tgl,b.kode_akun+' - '+b.nama as akun,c.kode_drk+' - '+c.nama as drk,a.keterangan,a.nilai "+
					   "from it_ifaju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "				  left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+
					   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.periode<='"+this.e_periode.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.tgl,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);									
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "REIMBURSE"){
					tot += nilaiToFloat(this.sg.cells(6,i));					
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
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
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
			setTipeButton(tbUbahHapus);
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	}
});