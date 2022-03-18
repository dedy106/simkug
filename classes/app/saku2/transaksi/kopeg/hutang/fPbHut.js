window.app_saku2_transaksi_kopeg_hutang_fPbHut = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_hutang_fPbHut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_hutang_fPbHut";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Bayar: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No PB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,17,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_vendor = new saiCBBL(this,{bound:[20,18,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.cb_hutang = new saiCBBL(this,{bound:[20,19,220,20],caption:"No Hutang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_saldo = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Saldo Hutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,21,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, text:"0"});
				
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
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
						
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);													
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_hutang_fPbHut.extend(window.childForm);
window.app_saku2_transaksi_kopeg_hutang_fPbHut.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {
			this.cb_hutang.setSQL("select a.no_hutang,a.keterangan from hutang_m a left join "+
								  "      (select no_hutang,kode_lokasi,sum(nilai) as nilai_pb from pb_m where kode_vendor ='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi) b "+
								  "      on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
			                      "where a.kode_vendor='"+this.cb_vendor.getText()+"' and (a.nilai+a.nilai_ppn-isnull(b.nilai_pb,0)) > 0 and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_hutang","a.keterangan"],false,["No Bukti","Keterangan"],"and","Data Hutang",true);													
		}
		if (sender == this.cb_hutang && this.cb_hutang.getText()!="") {
			var data = this.dbLib.getDataProvider("select (a.nilai+a.nilai_ppn-isnull(b.nilai_pb,0)) as saldo from hutang_m a left join "+
								  "      (select no_hutang,kode_lokasi,sum(nilai) as nilai_pb from pb_m where no_hutang ='"+this.cb_hutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_hutang,kode_lokasi) b "+
								  "      on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
			                      "where a.no_hutang='"+this.cb_hutang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_saldo.setText(floatToNilai(line.saldo));					
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});