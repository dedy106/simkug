window.app_saku2_transaksi_distro_transaksi_fKbDO = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_distro_transaksi_fKbDO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_distro_transaksi_fKbDO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank DO: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});						
		this.e_saldo = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Saldo", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.cb_akun = new saiCBBL(this,{bound:[20,16,200,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});							
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.cb_vendor = new saiCBBL(this,{bound:[20,19,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});							
		this.e_beban = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Beban", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
				
		this.p1 = new portalui_panel(this,{bound:[20,18,900,344],caption:"Data DO"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:7,tag:9,
				colTitle:["No Bukti","No DO","Keterangan","Akun Hutang","Saldo","Nilai KB","Nilai Beban"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,80,220,150,150]],
				columnReadOnly:[true,[0,1,2,3,4],[5,6]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],				
				change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg1});
		this.cb1 = new portalui_checkBox(this.sgn1,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
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
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_klpvendor='SUPPLIER' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_distro_transaksi_fKbDO.extend(window.childForm);
window.app_saku2_transaksi_distro_transaksi_fKbDO.implement({
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
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','KBDO','BK','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_vendor.getText()+"','"+this.cb_vendor.rightLabelCaption+"','-')");
				
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','KBDO','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "0"){														
							var nilai = nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(6,i));												
							sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(3,i)+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBDO','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
							if (nilaiToFloat(this.sg1.cells(6,i)) > 0) nilaiLain = nilaiToFloat(this.sg1.cells(6,i));
							sql.add("insert into ds_dobayar_d(no_bukti,kode_lokasi,no_do,akun_hutang,nilai_kas,nilai_lain,periode,dc,modul) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"',"+parseNilai(this.sg1.cells(5,i))+","+parseNilai(this.sg1.cells(6,i))+",'"+this.e_periode.getText()+"','D','KB')");
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
					this.sg1.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();														
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai KasBank tidak boleh nol atau kurang.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);							
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
		this.doClick();
	},
	doChange:function(sender){																							
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {						
			var strSQL = "select a.no_do,a.no_dokumen,a.keterangan,a.akun_hutang,a.total-isnull(c.bayar,0) as saldo "+
			             "from ds_do_m a "+
						 "     inner join ds_po_m b on a.no_do=b.no_do and a.kode_lokasi=b.kode_lokasi "+
						 "     left join (select no_do,kode_lokasi,sum(case dc when 'D' then (nilai_kas+nilai_lain) else -(nilai_kas+nilai_lain) end) as bayar from ds_dobayar_d group by no_do,kode_lokasi ) c on a.no_do=c.no_do and a.kode_lokasi=c.kode_lokasi "+
						 "where b.kode_vendor='"+this.cb_vendor.getText()+"' and a.total>isnull(c.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_do,line.no_dokumen,line.keterangan,line.akun_hutang,floatToNilai(line.saldo),"0","0"]);
				}
			} else this.sg1.clear(1);			
			this.sg1.validasi();			
		}				
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();		
	},
	doNilaiChange1: function(){
		try{						
			var beban = nilai = saldo = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i)!="" && this.sg1.cells(5,i)!="" && this.sg1.cells(6,i)!="") {					
					if (nilaiToFloat(this.sg1.cells(5,i)) > 0) {
						saldo += nilaiToFloat(this.sg1.cells(4,i));					
						nilai += nilaiToFloat(this.sg1.cells(5,i));					
						beban += nilaiToFloat(this.sg1.cells(6,i));										
					}
				}
			}			
			this.e_saldo.setText(floatToNilai(saldo));
			this.e_total.setText(floatToNilai(nilai));						
			this.e_beban.setText(floatToNilai(beban));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},					
	doChangeCell1: function(sender, col, row){		
		if (col == 5 || col == 6) {	
			this.sg1.validasi();
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
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); 
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}
});