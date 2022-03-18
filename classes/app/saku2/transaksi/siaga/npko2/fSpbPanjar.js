window.app_saku2_transaksi_siaga_npko2_fSpbPanjar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_npko2_fSpbPanjar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_npko2_fSpbPanjar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input SPB via Panjar: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SPB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Untuk Pembayaran", maxLength:150});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Bayar", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"Unit Kerja", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_panjar = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Panjar", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_nik = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kepada", readOnly:true});						
		this.c_curr = new saiLabelEdit(this,{bound:[20,19,155,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR"});								
		this.e_kurs = new saiLabelEdit(this,{bound:[180,19,40,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1"});								
		this.e_total = new saiLabelEdit(this,{bound:[700,19,220,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,260], childPage:["Daftar Item Panjar","Jurnal Tambahan","Data Pendukung"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","DC","Keterangan","Nilai","Nilai Original"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,150,50,150,80,150,80,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					colFormat:[[8,9],[cfNilai,cfNilai,cfNilai]],					
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,150,80,100,100,200,50,150,80]],					
					columnReadOnly:[true,[1,5,7,9],[0,2,3,4,6,8]],
					buttonStyle:[[0,2,6,8],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter2"],ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.e_po = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,250,20],caption:"No PO", maxLength:50});		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[20,11,100,18],caption:"Tanggal PO", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,11,100,18]}); 		
		this.l_tgl4 = new portalui_label(this.pc1.childPage[2],{bound:[20,12,100,18],caption:"Tanggal BA/Log TR", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,12,100,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,250,20],caption:"No Dokumen", maxLength:50});		
		this.e_ref = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,250,20],caption:"No Ref Dokumen", maxLength:50});		
		this.l_tgl5 = new portalui_label(this.pc1.childPage[2],{bound:[20,15,100,18],caption:"Tanggal Dokumen", underline:true});
		this.dp_d5 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,15,100,18]}); 		
		
		this.rearrangeChild(10, 23);
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
					
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_npko2_fSpbPanjar.extend(window.childForm);
window.app_saku2_transaksi_siaga_npko2_fSpbPanjar.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into gr_spb_m(no_spb,kode_lokasi,no_npko,no_dokumen,tanggal,due_date,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,nik_gar,nik_kas,kode_vendor,kode_pp,modul,jenis,nilai,periode,nik_user,tgl_input,no_ver,no_kaslist,no_kas,  no_po,tgl_po,tgl_ba,no_dok,no_ref,tgl_dok) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_panjar.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','-','"+this.cb_nik.getText()+"','"+this.cb_pp.getText()+"','SPB','PANJAR',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PASS','PASS','-',  '"+this.e_po.getText()+"','"+this.dp_d3.getDateString()+"','"+this.dp_d4.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ref.getText()+"','"+this.dp_d5.getDateString()+"')");
										
					sql.add("update gr_panjar_m set no_spb='"+this.e_nb.getText()+"' where no_panjar='"+this.cb_panjar.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into gr_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nilai_curr,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_panjar.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(6,i)+"',"+parseNilai(this.sg.cells(8,i))+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.app._lokasi+"','SPB','PANJAR','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(9,i))+",'"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");																	 															
							}						
						}
					}									
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								var j = i+99;										                 
								sql.add("insert into gr_spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nilai_curr,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_panjar.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg2.cells(5,i))+",'"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','"+this.app._lokasi+"','SPB','TAMBAH','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.c_curr.setText("IDR"); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai SPB tidak boleh nol atau kurang.");
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
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			if (this.e_periode.getText()!="") {
				var strSQL = "select no_panjar,keterangan from gr_panjar_m where no_spb='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				this.cb_panjar.setSQL(strSQL,["no_panjar","keterangan"],false,["No Panjar","Deskripsi"],"and","Data Panjar",true);			
			}
		}
		if (sender == this.cb_panjar && this.cb_panjar.getText()!="") {
			var strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,a.nilai,a.nilai_curr,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.periode,a.dc,a.keterangan,f.nik,f.nama as nama_kar,a.kode_curr,a.kurs "+
					     "from  gr_panjar_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "				      inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						 "                    inner join gr_panjar_m e on a.no_panjar=e.no_panjar and a.kode_lokasi=e.kode_lokasi "+
						 "                    inner join karyawan f on f.nik=e.nik_buat and e.kode_lokasi=f.kode_lokasi "+
						 "where a.no_panjar='"+this.cb_panjar.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.dc,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.nilai_curr)]);
				}				
				this.periodePJ = line.periode;
				this.cb_nik.setText(line.nik,line.nama_kar);
				this.c_curr.setText(line.kode_curr);
				this.e_kurs.setText(floatToNilai(line.kurs));				
			} else this.sg.clear(1);
		}				
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},	
	doNilaiChange: function(){
		try{			
			var totIDR=tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					if (this.sg.cells(6,i) == "D") tot += nilaiToFloat(this.sg.cells(9,i));
					else tot -= nilaiToFloat(this.sg.cells(9,i));
				}
			}
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg2.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg2.cells(4,i)))));					
					if (this.sg2.cells(2,i).toUpperCase() == "D") {
						tot += nilaiToFloat(this.sg2.cells(4,i));						
					}
					if (this.sg2.cells(2,i).toUpperCase() == "C") {
						tot -= nilaiToFloat(this.sg2.cells(4,i));						
					}									
				}
			}
			this.e_total.setText(floatToNilai(tot));
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_siaga_rptSpbPanjar";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}							
						}else throw result;
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc1.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			this.c_curr.setText("IDR"); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
		} catch(e) {
			alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg2.cells(2,row) != "" && this.sg2.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg2.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg2.cells(4,row))));
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var drk = this.dataDRK.get(sender.cells(8,row));
				if (drk) sender.cells(9,row,drk);
				else {
					if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode DRK "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");
					sender.cells(8,row,"");
					sender.cells(9,row,"");
				}
			}
		}
		sender.onChange.set(this,"doChangeCell2");			
	},		
	doCellEnter2: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg2.cells(2,row,"C");
			case 3 : 
					if (this.sg2.cells(3,row) == ""){
						if (row == 0) this.sg2.setCell(3,row,this.e_ket.getText());
						else this.sg2.setCell(3,row,this.sg2.cells(3,(row-1)) );
					}
				break;			
			case 6 : 
					if ((this.sg2.cells(6,row) == "") && (row > 0)) {
						this.sg2.setCell(6,row,this.sg2.cells(6,(row-1)));
						this.sg2.setCell(7,row,this.sg2.cells(7,(row-1)));
					}
					else {
						this.sg2.setCell(6,row,this.cb_pp.getText());
						this.sg2.setCell(7,row,this.cb_pp.rightLabelCaption);
					}
				break;
		}
	},		
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk, nama  from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  "select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});