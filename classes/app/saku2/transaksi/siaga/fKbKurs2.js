window.app_saku2_transaksi_siaga_fKbKurs = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKbKurs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKbKurs";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Selisih Kurs Multi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["MC"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_curr = new saiCB(this,{bound:[20,20,160,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this,{bound:[190,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});				
		this.e_sls = new saiLabelEdit(this,{bound:[590,20,210,20],caption:"Selisih (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[388,20,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,780,255], childPage:["Data KasBank Curr"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Saldo Curr","Saldo IDR","Sls (IDR-Curr)"],
					colWidth:[[4,3,2,1,0],[100,100,100,300,100]],					
					columnReadOnly:[true,[1,2,3,4],[0]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],checkItem:true,
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});

		
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.dataAkun = this.app._masakun;
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("MC");
						
			this.cb_cabang.setSQL("select kode_cabang, nama from gr_cabang where kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			this.cb_bank.setText("KAS");
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr where kode_curr <> 'IDR'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("USD");
			
			this.flagAkunKB = "0"; this.flagGarFree = "0"; this.flagDokFree = "0"; 
			this.akunLKurs = ""; this.akunRKurs = "";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LKURS','RKURS','JUAKUNKB','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "JUAKUNKB") this.flagAkunKB = line.flag;
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "LKURS") this.akunLKurs = line.flag;			
					if (line.kode_spro == "RKURS") this.akunRKurs = line.flag;			
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKbKurs.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKbKurs.implement({
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
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBMC','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"','"+nilaiToFloat(this.e_kurs.getText())+"',"+nilaiToFloat(this.e_sls.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_bank.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								if (nilaiToFloat(this.sg.cells(4,i))<0) {
									var DCkb = "D";
									var DCsk = "C";
									var akunSK = this.akunLKurs;
								}
								else {
									var DCkb = "C";
									var DCsk = "D";
									var akunSK = this.akunRKurs;
								}								
								var n_sls = Math.abs(nilaiToFloat(this.sg.cells(4,i)));
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.e_ket.getText()+"','"+DCkb+"',"+n_sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBMC','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',0)");
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+akunSK+"','"+this.e_ket.getText()+"','"+DCsk+"',"+n_sls+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBMC','SLSKURS','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',0)");
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
					this.sg.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.c_curr.setText("IDR");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();																			
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
		this.doClick();
		this.doChange(this.c_curr);
	},
	doChange:function(sender){
		if (sender == this.c_jenis || sender == this.cb_cabang || sender == this.cb_bank) {
			this.doClick();				
		}						
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.clear(1);	
			}
			else {
				var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
					else this.e_kurs.setText("0");					
				}				
				this.e_kurs.setReadOnly(false);  this.sg.clear(1);	
			}		
		}
		if (sender == this.e_kurs) {
			this.sg.clear(1);						
		}
	},
	doClick:function(sender){
		if (this.c_jenis.getText()!= "" && this.cb_cabang.getText()!= "" && this.cb_bank.getText()!= "") {						
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText()+"/";			
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kas,3,20)),0) as no_kas from kas_m where no_kas like '_____"+AddFormat+"%"+this.cb_bank.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText()+"001"+AddFormat+this.cb_bank.getText());
					else {
						var idx = parseFloat(line.no_kas.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText()+nu+AddFormat+this.cb_bank.getText());
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
			//sls = rupiah - curr
			var strSQL = "select c.kode_akun,c.nama,"+					 
					 "round(a.so_akhir_curr + isnull(b.mutasi_curr,0),2) as sak_curr, "+					 
					 "round(a.so_akhir + isnull(b.mutasi,0),0)  as sak, "+
					 "round((a.so_akhir + isnull(b.mutasi,0)) - ("+nilaiToFloat(this.e_kurs.getText())+" * (a.so_akhir_curr + isnull(b.mutasi_curr,0))) ,0) as sls "+
					 "from glma a inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "            inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
					 "left join ( "+
					 "select kode_akun,kode_lokasi, "+
					 "sum(case dc when 'D' then nilai_curr else -nilai_curr end) as mutasi_curr, "+
					 "sum(case dc when 'D' then nilai else -nilai end) as mutasi "+
					 "from kas_j where periode <= '"+this.e_periode.getText()+"' "+
					 "group by kode_akun,kode_lokasi "+
					 ") b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode = '"+this.e_periode.getText().substr(0,4)+"01' and c.kode_curr='"+this.c_curr.getText()+"' and d.kode_flag in ('001','009')";		
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_akun,line1.nama,floatToNilai(line1.sak_curr),floatToNilai(line1.sak),floatToNilai(line1.sls)]);
				}
			} else this.sg.clear(1);										
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(4,i));					
				}
			}						
			this.e_sls.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku2_siaga_rptBuktiBank";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
			this.c_curr.setText("IDR");
		} catch(e) {
			alert(e);
		}
	}
});