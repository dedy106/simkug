window.app_saku3_transaksi_tu_kb_fAjuKBTitipMRek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kb_fAjuKBTitipMRek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kb_fAjuKBTitipMRek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Kas Operasional Multi Transfer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Usulan","Data Titipan","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		             colTitle:["No Bukti","No Agenda","Tanggal","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,80,150,150]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,11,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2,visible:false});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});	
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false}); 		
		this.cb_kb = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"No BuktiKas",tag:1,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"MTA",tag:1,readOnly:true});         				
				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Saldo Titipan", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Penyelesaian", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,550,20],caption:"Uraian", maxLength:150});								
		
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"No KasBank",maxLength:20,tag:9});	
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"No Agenda",maxLength:20,tag:9});	
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Uraian", maxLength:150, tag:9});	
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-250],colCount:5,tag:0,
			colTitle:["Status", "Nama Rek","No Rek","Bank-Cabang","Nilai"],
			colWidth:[[4,3,2,1,0],[100,250,250,250,80]],					
			colFormat:[[4],[cfNilai]],checkItem: true,
			columnReadOnly:[true,[0,4],[1,2,3]],
			//readOnly:true,
			change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick"],
			buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],			
			autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		

		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		this.preView = "1";
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			
			this.doLoad();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kb_fAjuKBTitipMRek.extend(window.childForm);
window.app_saku3_transaksi_tu_kb_fAjuKBTitipMRek.implement({	
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
					
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._userLog+"','TITIP','NON',0)");					
					sql.add("insert into kas_titip_d (no_aju,no_kas,kode_lokasi,akun_titip,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','AJU','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','-')");
										
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){	
							sql.add("update it_aju_rek set keterangan='"+this.e_nb.getText()+"' where no_aju='"+this.cb_kb.getText()+"' and bank+no_rek='"+this.sg.cells(3,i)+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");															
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','-',"+nilaiToFloat(this.sg.cells(4,i))+",'-')");																						
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_titip_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_aju_rek set keterangan='-' where keterangan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	


					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.app._userLog+"','TITIP','NON',0)");					
					sql.add("insert into kas_titip_d (no_aju,no_kas,kode_lokasi,akun_titip,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor) values  "+
							"('"+this.e_nb.getText()+"','"+this.cb_kb.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','AJU','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'D','-')");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){	
							sql.add("update it_aju_rek set keterangan='"+this.e_nb.getText()+"' where no_aju='"+this.cb_kb.getText()+"' and bank+no_rek='"+this.sg.cells(3,i)+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");															
							sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','-',"+nilaiToFloat(this.sg.cells(4,i))+",'-')");																						
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_titip_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update it_aju_rek set keterangan='-' where keterangan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.sg.clear(1);
					this.doLoad();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai melebih saldo.");
					return false;
				}
				
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
			case "ubah" :	
				this.preView = "1";
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
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
		this.cb_akun.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if (sender == this.cb_kb && this.cb_kb.getText() != "") {
			var strSQL =  "select c.kode_akun,c.nama,a.nilai-isnull(b.pakai,0) as saldo "+
						  "from kas_titip a "+
						  "    inner join masakun c on a.akun_titip=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						  "    left join "+
						  "       (select no_kas,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as pakai "+
						  "        from kas_titip_d where kode_lokasi='"+this.app._lokasi+"' and no_aju<>'"+this.e_nb.getText()+"' group by no_kas,kode_lokasi "+
						  "       ) b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
						  "where a.no_kas='"+this.cb_kb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.cb_akun.setText(line.kode_akun,line.nama);											
					this.e_saldo.setText(floatToNilai(line.saldo));												
				}
			}

			if (this.stsSimpan == 1) 
				var data = this.dbLib.getDataProvider("select * from it_aju_rek where keterangan='-' and no_aju='"+this.cb_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);			
			else {				
				var data = this.dbLib.getDataProvider("select * from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);			
			}

			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.nama_rek,line.no_rek,line.bank,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.sg.validasi();				
		}
		
	},	
	doChangeCell: function(sender, col, row){						
		if (col == 0) {				
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP" && this.sg.cells(4,i) != "") {
					total += nilaiToFloat(this.sg.cells(4,i));					
				}
			}			
			this.e_nilai.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[]"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "NONAPP") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"NONAPP");
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {																
								this.nama_report="server_report_saku2_kopeg_kbitt_rptTitipanFormTu2";
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
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(1,row) == "-") {		
				this.stsSimpan = 1;	
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.cb_kb.setText(this.sg1.cells(0,row),this.sg1.cells(3,row));					
				this.e_ket.setText(this.sg1.cells(2,row));
			}
			if (this.sg1.cells(1,row) != "-") {			
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg1.cells(1,row));
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.cb_kb.setText(this.sg1.cells(0,row),this.sg1.cells(3,row));	
				this.e_ket.setText(this.sg1.cells(2,row));				
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.e_kode2.getText() != "") var filter = filter+" and d.no_aju = '"+this.e_kode2.getText()+"' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and d.keterangan like '%"+this.e_ket2.getText()+"%' ";
			var strSQL = "select a.no_kas,convert(varchar,c.tanggal,103) as tgl,a.keterangan,d.nilai,d.no_aju as no_aju "+
		             "from kas_titip a "+
					 "inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
					 "inner join kas_titip_d d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_kas ";	
			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){	
		var strSQL = "select a.no_kas,convert(varchar,c.tanggal,103) as tgl,a.keterangan,a.nilai-isnull(d.bayar,0) as nilai,'-' as no_aju "+
		             "from kas_titip a "+
					 "inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi "+
					 "left join ( "+
					 
					 "			select no_kas,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar "+
					 "			from  kas_titip_d "+
					 "			where kode_lokasi='"+this.app._lokasi+"' group by no_kas,kode_lokasi "+

					 ") d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.nilai > isnull(d.bayar,0) order by a.no_kas ";				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_kas,line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
				this.pc1.setActivePage(this.pc1.childPage[0]);				
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
			this.sg.clear(1);
			this.doLoad();
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});


