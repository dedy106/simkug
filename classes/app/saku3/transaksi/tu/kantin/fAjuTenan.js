window.app_saku3_transaksi_tu_kantin_fAjuTenan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fAjuTenan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fAjuTenan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Agenda Tenan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,13,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,14,222,20],caption:"Unit / PP",tag:2,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});					
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         						
		this.e_total = new saiLabelEdit(this,{bound:[820,14,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.bTampil = new button(this,{bound:[650,14,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.i_bAll = new portalui_imageButton(this,{bound:[740,14,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doApp"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,307], childPage:["Detail Tenan"]});		
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
					colTitle:["Status","No. Rekon","Tanggal","Tenan","Nilai","Bank","Rekening","Pemilik","Akun BMHD"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,100,200,200,100,300,80,100,80]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8]],					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick4"],
					colFormat:[[4],[cfNilai]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		
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
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a "+
								"inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+
								"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);													

			this.cb_app.setSQL("select a.nik, a.nama from karyawan a  "+
							   "where a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			

			this.cb_pp.setText(this.app._kodePP);				   
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kantin_fAjuTenan.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fAjuTenan.implement({		
	doCari:function(sender){								
		try {
			var strSQL = "select 'APP' as status, d.akun_bymhd, c.kode_tenan, a.no_rekon,convert(varchar,b.tanggal,103) as tanggal,c.kode_tenan+' | '+c.nama as tenan,a.hasil_tenan,c.bank+' | '+c.cabang as bank,c.norek+' | '+c.namarek as rek,c.pemilik, c.norek,c.namarek "+
						 "from ktu_rekon_d a "+
						 "inner join trans_m b on a.no_rekon=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+ 
						 "inner join ktu_tenan c on a.kode_tenan=c.kode_tenan and a.kode_lokasi=c.kode_lokasi "+	
						 "inner join ktu_kantin d on c.kode_kantin=d.kode_kantin and a.kode_lokasi=d.kode_lokasi "+						
						 "where a.no_kas = '-' and a.kode_lokasi='"+this.app._lokasi+"'";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU4 = data;
				this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn4.rearrange();
				this.doTampilData4(1);
			} else this.sg4.clear(1);
		}	 		
		catch(e) {
			alert(e);
		}
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];																 
			this.sg4.appendData([line2.status.toUpperCase(),line2.no_rekon,line2.tanggal,line2.tenan,floatToNilai(line2.hasil_tenan),line2.bank,line2.rek,line2.pemilik, line2.akun_bymhd]);
		}
		this.sg4.setNoUrut(start);
		this.akunHut = line2.akun_bymhd;
	},
	doChangeCell: function(sender, col, row){		
		if (col == 0 ){
			this.dataJU4.rs.rows[((this.page-1)*20) + row].status = this.sg4.cells(0,row);
			this.sg4.validasi();			
		}
	},
	doDoubleClick4: function(sender, col , row) {
		if(this.sg4.cells(0,row) == "NON") this.sg4.cells(0,row,"APP");
		else this.sg4.cells(0,row,"NON");
	},
	doNilaiChange: function(){
		var tot = 0;		
		for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
			var line = this.dataJU4.rs.rows[i];
			if (line.status.toUpperCase() == "APP"){			
				tot += parseFloat(line.hasil_tenan);	
			}
		}			
		this.e_total.setText(floatToNilai(tot));			
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
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.akunHut+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._namaUser+"','KANTIN','NON',0,'"+this.cb_app.getText()+"')");					
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
						line = this.dataJU4.rs.rows[i];
						if (line.status.toUpperCase()=="APP"){
							sql.add("update ktu_rekon_d set no_kas='"+this.e_nb.getText()+"' where kode_tenan='"+line.kode_tenan+"' and no_rekon = '"+line.no_rekon+"' and kode_lokasi='"+this.app._lokasi+"' ");
							
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.bank+"','"+line.norek+"','"+line.namarek+"','-',"+parseFloat(line.hasil_tenan)+",'"+line.pemilik+"')");							
						}
					}

					sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+							
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.e_periode.getText()+"','"+this.akunHut+"','"+this.cb_pp.getText()+"','-','D','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'BEBAN')");

							 
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.sg4.clear(1);
				break;
			case "simpan" :					
							
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);			
	},				
	doApp : function(sender){
		for (var i = 0;i < this.dataJU4.rs.rows.length;i++){
			this.dataJU4.rs.rows[i].stsapp = "NON";		
			this.sg4.cells(0,i,"NON");		
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.sg4.clear(1);			
		} catch(e) {
			alert(e);
		}
	}
});