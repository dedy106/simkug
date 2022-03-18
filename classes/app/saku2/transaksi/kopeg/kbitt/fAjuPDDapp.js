window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDapp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDapp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuPDDapp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Pengeluaran PDD - Verifikasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Data","Transaksi"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:0,
					colTitle:["Pilih","No Bukti","Status","Tanggal","PP","Deskripsi","Nilai","Pembuat","No Ver","Tgl Input"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[110,100,150,100,200,150,70,80,100,70]],                    
					readOnly:true,colFormat:[[0,6],[cfButton,cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_catat = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,550,20],caption:"Catatan",maxLength:200});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[520,12,200,20],caption:"No App",readOnly:true,visible:false});			
		this.e_nobukti = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Agenda",readOnly:true});		
		this.e_tgl = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,146,200,20],caption:"Tanggal",readOnly:true});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,550,20],caption:"Uraian",readOnly:true});				
		this.c_jenis = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[780,16,200,20],caption:"Jenis",readOnly:true,tag:2});
		this.e_file = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,450,20],caption:"File", readOnly:true, tag:9});		
		this.bLihat = new button(this.pc2.childPage[1],{bound:[480,15,80,18],caption:"Lihat File",click:[this,"doLihat"]});			
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[1],{bound:[780,15,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		

		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,12,996,235], childPage:["Daftar Pengajuan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,				
				colTitle:["NIM","Nama","Tagihan","Potongan","Beasiswa","Tot Tagihan","Tot Bayar","Lebih Bayar","No Rek","Bank","Nama Rek","Keterangan","Thn Akademik","No Duplikasi"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,150,150,100,100,100,100,100,100,100,200,100]],
				readOnly:true,
				colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],																
				autoPaging:true,rowPerPage:1000, defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
				
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
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a "+ //inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' 
			 				  "where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			
			this.doLoad();	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDapp.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuPDDapp.implement({	
	doLihat: function() {
		window.open("server/media/"+this.e_file.getText());
	},
	doLoad: function(sender){				
		strSQL = "select a.no_aju as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,b.kode_pp+' - '+b.nama as pp,a.keterangan,a.nilai,a.nik_user as pembuat,a.no_ajukeg as no_ver1,convert(varchar,a.tgl_input,120) as tglinput "+
				 "from it_aju_m a "+
				 "		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+				 
				 "where a.progress='J' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_aju";   				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData(["Pilih",line.no_bukti,line.status.toUpperCase(),line.tgl,line.pp,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_ver1,line.tglinput]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick(this.sg1,1,row);
			}
		}catch(e){
			alert(e);
		}
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {			
			this.pc2.setActivePage(this.pc2.childPage[1]);											
			this.e_nobukti.setText(this.sg.cells(1,row));
			var data = this.dbLib.getDataProvider(
						"select a.no_ref1,a.nik_app,a.progress,a.modul,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.nilai as bruto,a.kode_pp,a.kode_akun, a.user_input,isnull(c.no_gambar,'') as no_gambar   "+
						"from it_aju_m a "+
						"left join it_aju_dok c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+					   
						"where a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_ref1 IN ('MALA','MABA') ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.e_tgl.setText(line.tanggal);
					this.c_jenis.setText(line.no_ref1);
					this.cb_pp.setText(line.kode_pp);									
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.bruto));																
					this.e_file.setText(line.no_gambar);
					this.fileBfr = line.no_gambar;				
				} 
			}			
			
			var strSQL = "select * from aka_pddout_d where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg1.appendData([line.nim,line.nama,floatToNilai(line.tagihan),floatToNilai(line.beasiswa),floatToNilai(line.potongan),floatToNilai(line.tot_tagih),floatToNilai(line.tot_bayar),floatToNilai(line.lebih_bayar),line.no_rek,line.bank,line.nama_rek,line.jenis_bea,line.tahun_aka,line.no_duplikat]);
				}
			} else this.sg1.clear(1);				
		}		
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update it_pdd_app set no_ref='"+this.e_nb.getText()+"' where no_ref='-' and no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("insert into it_pdd_app(no_bukti,kode_lokasi,periode,tanggal,no_aju,status,nik_user,tgl_input,no_ref,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nobukti.getText()+"','"+this.c_status.getText()+"','"+this.app._userLog+"',getdate(),'-','"+this.e_catat.getText()+"')");					

					if (this.c_status.getText() == "APPROVE") var vProgress = "A";
					else var vProgress = "L";		

					sql.add("update it_aju_m set progress='"+vProgress+"', no_ajukeg='"+this.e_nb.getText()+"' where no_aju='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and progress='J' ");

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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);										
					this.sg1.clear(1);											
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);											
					this.doLoad();	
					setTipeButton(tbSimpan);							
				break;
			case "simpan" :				
				this.preView = "1";																
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
		this.e_periode.setText(y+""+m);		
		this.doClick();					
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_pdd_app","no_bukti",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+"PDD.","00000"));							
	},	
	doNilaiChange: function(){
		try{			
			var totB = 0;			
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(5,i) != "") {
					totB += nilaiToFloat(this.sg1.cells(7,i));					
				}
			}									
			this.e_nilai.setText(floatToNilai(totB));			
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
								// this.nama_report="server_report_saku2_kopeg_kbitt_rptAjuPDD";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);												
			this.pc2.setActivePage(this.pc2.childPage[0]);					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.sg1.clear(1);
			this.doLoad();	
			setTipeButton(tbSimpan);		
		} catch(e) {
			alert(e);
		}
	}
});