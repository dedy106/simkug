window.app_saku2_transaksi_gaji_fKbGaji = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fKbGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fKbGaji";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Gaji: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["BM","KM"], readOnly:true,tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,225,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.cb_akun = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,19,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.cb_gaji = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Gaji", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this,{bound:[710,17,200,20],caption:"Total KasBank", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Item Jurnal Pelunasan"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,250,40,150,80]],					
					readOnly:true,					
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
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
															
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approve",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GAJIPPH') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GAJIPPH") this.akunTpph = line.flag;													
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fKbGaji.extend(window.childForm);
window.app_saku2_transaksi_gaji_fKbGaji.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update hr_gaji_m set no_kas='"+this.e_nb.getText()+"' where no_gaji='"+this.cb_gaji.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBGAJI','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_gaji.getText()+"','-','-')");					
					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGAJI','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBGAJI','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
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
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
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
		this.e_nb.setText("");
		this.cb_gaji.setSQL("select no_gaji, keterangan from hr_gaji_m where periode <='"+this.e_periode.getText()+"' and no_tak <>'-' and no_kas='-' and kode_lokasi='"+this.app._lokasi+"'",["no_gaji","keterangan"],false,["No Gaji","Keterangan"],"and","Data Gaji",true);		
	},
	doChange:function(sender){				
		if (sender == this.cb_gaji && this.cb_gaji.getText()!= "") {
			var strSQL = "select kode_akun from hr_gaji_param where kode_param ='PPPH' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.akunPPH = line.kode_akun;
				}				
			}
			var strSQL = "select a.kode_akun,d.nama,'D' as dc,a.keterangan,round(a.nilai,0) as nilai "+
			             "from hr_gaji_j a inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						 "where a.nilai<> 0 and a.jenis = 'HUTADM' and a.dc ='C' and a.no_gaji='"+this.cb_gaji.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "union all "+
						 "select '"+this.akunTpph+"',d.nama,'C' as dc,a.keterangan,round(a.nilai,0) as nilai "+
			             "from hr_gaji_j a inner join masakun d on '"+this.akunTpph+"'=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						 "where a.kode_akun = '"+this.akunPPH+"' and a.nilai<> 0 and a.dc ='C' and a.no_gaji='"+this.cb_gaji.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),"-","-"]);
				}
			} else this.sg.clear(1);			
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){										
					if (this.sg.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.cells(4,i));
					else tot -= nilaiToFloat(this.sg.cells(4,i));									
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}
});