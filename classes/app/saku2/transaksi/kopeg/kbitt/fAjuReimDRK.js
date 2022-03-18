window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRK = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuReimDRK";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Reimburse IF: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,13,202,20],caption:"Kode Transaksi",items:["HUTIF"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Agenda",maxLength:30,readOnly:true,visible:false});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,12,222,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,13,222,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 								
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});					
		this.bCari = new button(this,{bound:[720,16,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_nilai = new saiLabelEdit(this,{bound:[820,16,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,360], childPage:["Data Pengajuan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:0,
		            colTitle:["Status","No Pengajuan","Tanggal","Akun","DRK","Uraian","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,260,150,150,80,100,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[6],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["REIMBURSE","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
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
						
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join it_if b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.cb_nik.setText(this.app._userLog);
						
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
window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRK.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuReimDRK.implement({	
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
					setTipeButton(tbSimpan);
					this.sg.clear(1);
				break;
			case "simpan" :					
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
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
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			var strSQL = "select d.kode_bidang,a.kode_pp "+
			             "from it_if a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+						 						 
						 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_pp.setText(line.kode_pp);
					this.kodeBidang = line.kode_bidang;
				}
			}
		}
	},	
	doLoad:function(sender){		
		if (this.cb_nik.getText() != "" && this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'INPROG' as status,a.no_bukti,convert(varchar,a.tanggal,103) as tgl,b.kode_akun+' - '+b.nama as akun,c.kode_drk+' - '+c.nama as drk,a.keterangan,a.nilai "+
					   "from it_ifaju_m a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					   "                  inner join it_if_sub x on a.nik=x.nik  and a.kode_lokasi=x.kode_lokasi "+
					   "				  left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+
					   "where a.no_ver <> '-' and a.no_aju='-' and a.kode_lokasi='"+this.app._lokasi+"' and x.nik_if='"+this.cb_nik.getText()+"' and a.periode<='"+this.e_periode.getText()+"'",true);
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
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
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
			setTipeButton(tbSimpan);
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	}
});