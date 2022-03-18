window.app_saku3_transaksi_investasi_invest2_fDepoTutupPecah = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fDepoTutupPecah.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fDepoTutupPecah";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penutupan dan Pemecahan Deposito: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.e_nb2 = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[260,12,200,20],caption:"No Bukti AkruBunga",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});												
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,348], childPage:["Data Deposito","Data Baru"]});		
		this.c_jenisdata = new saiCB(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Filter Data",items:["JTHTEMPO","ALL"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_depo = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_tanggal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Tgl Deposito", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Jenis", readOnly:true});
		this.e_status = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status Dana", readOnly:true});								
		this.e_nominal = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_nbaru = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total Baru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,		            
					colTitle:["Keterangan","Nominal"],					
					colWidth:[[1,0],[100,300]],
					colFormat:[[1],[cfNilai]],				
					cellEnter:[this,"doCellEnter"],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
			
		
		setTipeButton(tbAllFalse);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			this.c_jenisdata.setText("JTHTEMPO");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPINV','MANIV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "PPINV") this.kodePP = line.flag;				
					if (line.kode_spro == "MANINV") this.nikMan = line.flag;				
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fDepoTutupPecah.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fDepoTutupPecah.implement({	
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
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_depotutup_m where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_depo2_m set progress='1',ref1='-' where ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depotutup_d where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	
					
					sql.add("update inv_depo2_m set progress='Z',ref1='"+this.e_nb.getText()+"' where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					var nilai = nilaiToFloat(this.e_nominal.getText());
					
					var vPosted = "X";
					var noShop = this.e_nb.getText();					
					
					sql.add("insert into inv_depotutup_m(no_tutup,no_depo,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,modul,nik_buat,nik_setuju,kode_lokasi,periode,akun_doc,nik_user,tgl_input,no_kas,jenis,nilai_pinalti,nilai_adm,posted,nilai_panjang,bcair,bbunga) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilai+",'"+this.kodePP+"','TTPPECAH','"+this.app._userLog+"','"+this.nikMan+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.akunDepo+"','"+this.app._userLog+"',getdate(),'PAREUM','TTPPECAH',0,0,'"+vPosted+"',0,'-','-')");					
					
					sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai,no_app,no_spb,bsumber,  nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,  noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul) "+
							"select '"+this.e_nb.getText()+"',a.periode,a.nik_user,getdate(),a.kode_lokasi,a.tanggal,a.keterangan,a.nik_app,a.tgl_awal,a.tgl_akhir,a.jml_hari,a.jml_bulan,a.progress,a.nilai,a.no_app,a.no_spb,a.bsumber,  a.nodin,a.kepada1,a.dari1,a.lamp1,a.hal1,a.nikttd1,a.jab1,  a.noins,a.nikttd2,a.jab2,a.nikttd3,a.jab3,a.just,a.kode_pp,a.modul "+
							"from inv_shop_m a inner join inv_depo2_m b on a.no_shop=b.no_shop where b.no_depo ='"+this.cb_depo.getText()+"'");
					
					sql.add("insert into inv_shop_rate(no_shop,kode_lokasi,kode_bank,sisa,jml_hari,rate_aju,rate_final,nilai,tanggal,jenis,maks,tgl_rate,satuan,rate1,rate2,basis,jth_tempo,bcair,bbunga,status_dana) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,a.kode_bank,a.sisa,a.jml_hari,a.rate_aju,a.rate_final,a.nilai,a.tanggal,a.jenis,a.maks,a.tgl_rate,a.satuan,a.rate1,a.rate2,a.basis,a.jth_tempo,a.bcair,a.bbunga,a.status_dana "+
							"from inv_shop_rate a inner join inv_shop_m b on a.no_shop=b.no_shop "+
							"inner join inv_depo2_m c on b.no_shop=c.no_shop "+
							"where c.no_depo ='"+this.cb_depo.getText()+"'");
						
					
					var noDepo = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000");
					var formatID = noDepo.substr(0,12);
					var nuAkhir = parseFloat(noDepo.substr(12,3));
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
							    var k = nuAkhir+i;
								var idx = k.toString();
						        if (idx.length == 1) var nu = "00"+idx;
								if (idx.length == 2) var nu = "0"+idx;
								if (idx.length == 3) var nu = idx;
								
								noDepo = formatID + nu;
								
								sql.add("insert into inv_depotutup_d (no_tutup,kode_lokasi,no_depo,nilai_tutup,nilai_panjang,no_shop) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_depo.getText()+"',"+nilai+","+nilaiToFloat(this.sg.cells(1,i))+",'"+noShop+"')");
								
								sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb) "+
										"select '"+noDepo+"',kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,'1',tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,"+nilaiToFloat(this.sg.cells(1,i))+",bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,'"+this.e_nb.getText()+"','-',tgl_hitung,tgl_hitungseb "+
										"from inv_depo2_m where no_depo ='"+this.cb_depo.getText()+"' ");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);					
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;					
					this.sg3.clear(1);
					this.sg.clear(1);
				break;
			case "simpan" :	
			case "ubah" :				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_nominal.getText()) != nilaiToFloat(this.e_nbaru.getText())) {
					system.alert(this,"Nilai tidak valid.","Nilai Deposito Lama dan Baru tidak sama.");
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
					sql.add("delete from inv_depotutup_m where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_depo2_m set progress='1',ref1='-' where ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depotutup_d where no_tutup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shop_rate where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depo2_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
		this.doChange(this.c_jenisdata);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},	
	doChange:function(sender){		
		try {
			if (sender == this.c_jenisdata && this.stsSimpan==1) {
				this.cb_depo.setText("","");
				if (this.c_jenisdata.getText() == "JTHTEMPO") 
					this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where  tgl_selesai<='"+this.dp_d1.getDateString()+"' and progress ='1' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
				else this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where progress ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);		
			}
			
			if (sender == this.cb_depo && this.cb_depo.getText()!="") {
				var strSQL = "select bsumber,bdepo,kode_kelola,bcair,bbunga,convert(varchar,a.tgl_mulai,103)+' - '+convert(varchar,a.tgl_selesai,103) as tgl,jenis,status_dana,a.nilai,a.akun_depo,a.tgl_selesai,a.p_bunga,a.basis "+
							 "from inv_depo2_m a "+
							 "where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.akunDepo = line.akun_depo;
						this.e_tanggal.setText(line.tgl);
						this.e_jenis.setText(line.jenis);
						this.e_status.setText(line.status_dana);
						this.e_nominal.setText(floatToNilai(line.nilai));					
					} 
				}			
			}						
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {
				this.sg3.clear(1);
				this.sg.clear(1);
				this.doChange(this.c_jenisdata);
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depotutup_m","no_tutup",this.app._lokasi+"-DTP"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_ket.setFocus();			
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 0 : 
					if (this.sg.cells(0,row) == ""){
						if (row == 0) this.sg.setCell(0,row,this.cb_depo.rightLabelCaption);
						else this.sg.setCell(0,row,this.sg.cells(0,(row-1)) );
					}
				break;					
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 1 && this.sg.cells(1,row) != "") this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){
					tot += nilaiToFloat(this.sg.cells(1,i));
				}
			}
			this.e_nbaru.setText(floatToNilai(tot));
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
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);					
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			this.sg3.clear(1);
			this.sg.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select a.no_tutup,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_depotutup_m a "+
					 "where a.modul = 'TTPPECAH' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.no_tutup";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_tutup,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;												
				this.e_nb.setText(this.sg3.cells(0,baris));								
													
				var strSQL = "select a.tanggal,a.keterangan,no_depo,nilai_pinalti,nilai_adm,nilai_panjang,bcair,bbunga,jenis "+
							 "from inv_depotutup_m a "+
							 "where a.no_tutup = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.cb_depo.setSQL("select no_depo, keterangan from inv_depo2_m where no_depo='"+line.no_depo+"' and kode_lokasi='"+this.app._lokasi+"' ",["no_depo","keterangan"],false,["No DOC","Keterangan"],"and","Daftar Deposito",true);
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);	
						this.cb_depo.setText(line.no_depo);												
					}
				}
			
								
				var strSQL = "select keterangan,nilai from inv_depo2_m "+
							 "where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_depo";		
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);						
				
			}
		} catch(e) {alert(e);}		
	}	
});