window.app_saku2_transaksi_kopeg_hutang_fPbHutE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_hutang_fPbHutE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_hutang_fPbHutE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar: Edit", 0);	
		
		uses("saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No PB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,17,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_vendor = new saiCBBL(this,{bound:[20,18,220,20],caption:"Vendor", readOnly:true});						
		this.cb_hutang = new saiCBBL(this,{bound:[20,19,220,20],caption:"No Hutang", readOnly:true});				
		this.e_saldo = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Saldo Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0"});
		
		this.e_nover = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"No Verifikasi", tag:9, readOnly:true});										
		this.e_memo = new saiMemo(this,{bound:[20,12,450,80],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
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
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);																
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_hutang_fPbHutE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_hutang_fPbHutE.implement({
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
					sql.add("delete from pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into pb_m (no_pb,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_tahu,kode_vendor,no_hutang,no_spb,nilai,progress,no_ver) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_hutang.getText()+"','-',"+nilaiToFloat(this.e_nilai.getText())+",'0','-')");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :					
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0 || (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText()))) {
					system.alert(this,"Transaksi tidak valid.","Nilai PB tidak boleh nol atau kurang atau melebihi saldo.");
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
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (sender == this.e_periode && this.e_periode.getText()!= "") {			
			this.e_nb.setSQL("select no_pb, keterangan from pb_m where progress in ('0','R') and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar PB",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!= "") {
			var data = this.dbLib.getDataProvider("select a.tanggal,a.due_date,a.periode,a.keterangan,a.nik_buat,a.nik_tahu,a.kode_vendor,b.nama as nama_vendor,a.no_hutang,c.keterangan as ket_hutang, "+	
				       "isnull(x.no_ver,'-') as no_ver,isnull(x.catatan,'-') as catatan "+			
					   "from pb_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					   "            inner join hutang_m c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+					   
					   "			left join ver_d x on a.no_pb=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   
					   "where a.no_pb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.dp_d2.setText(line.due_date);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.cb_tahu.setText(line.nik_tahu);
					this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
					this.cb_hutang.setText(line.no_hutang,line.ket_hutang);
					this.e_nover.setText(line.no_ver);
					this.e_memo.setText(line.catatan);					
				} 
			}			
			var data = this.dbLib.getDataProvider("select a.nilai,(aa.nilai+aa.nilai_ppn-isnull(b.nilai_pb,0)) as saldo from pb_m a "+
					   "      inner join hutang_m aa on a.no_hutang=aa.no_hutang and a.kode_lokasi=aa.kode_lokasi "+
					   "      left join (select no_hutang,kode_lokasi,sum(nilai) as nilai_pb from pb_m where no_pb <> '"+this.e_nb.getText()+"' and no_hutang ='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi) b "+ 
					   "      on aa.no_hutang=b.no_hutang and aa.kode_lokasi=b.kode_lokasi "+
					   "where a.no_pb='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.e_saldo.setText(floatToNilai(line.saldo));
					this.e_nilai.setText(floatToNilai(line.nilai));					
				} 
			}			
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku2_kopeg_hutang_rptHutangPb";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});