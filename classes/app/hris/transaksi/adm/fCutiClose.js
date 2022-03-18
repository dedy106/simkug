window.app_hris_transaksi_adm_fCutiClose = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fCutiClose.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fCutiClose";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Cuti: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Close",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_cuti = new saiCBBL(this,{bound:[20,13,200,20],caption:"Jenis Cuti", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.p1 = new panel(this,{bound:[10,23,460,400],caption:"Daftar Tanggal Cuti",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:2,tag:0,
		            colTitle:["NIK","Sisa Thn Lalu"],
					colWidth:[[1,0],[100,100]],															
					autoAppend:false,defaultRow:1});		
		this.cb1 = new portalui_checkBox(this,{bound:[420,24,100,25],caption:"Preview",selected:true});
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
			this.cb_cuti.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Jenis Cuti",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fCutiClose.extend(window.childForm);
window.app_hris_transaksi_adm_fCutiClose.implement({
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
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(1,i)) != 0){
							var bukti = this.e_nb.getText().substr(0,10) + '-' + this.sg.cells(0,i);
							sql.add("insert into gr_cuti(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,kode_loker,alamat,alasan,nik_buat,nik_app,progress,tgl_input,nik_user,lama,sisa,lama_lalu,sisa_lalu) values "+
									"('"+bukti+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','CLOSE"+this.e_periode.getText()+"','CLOSE','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+"','2',getdate(),'"+this.app._userLog+"',0,0,"+parseNilai(this.sg.cells(1,i))+","+parseNilai(this.sg.cells(1,i))+")");							
						}
					}
					//setTipeButton(tbAllFalse);					
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
				this.simpan();
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){	
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doSelectDate2: function(sender, y,m,d){			
		this.e_lama.setText("0");
		this.sg.clear(1);
	},	
	doChange:function(sender){
		if (sender == this.cb_cuti && this.cb_cuti.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.nik,a.lalu-isnull(b.pakai_lalu,0) as sisa_lalu "+
			"from  "+
			"( "+
			"select nik,kode_lokasi,sum(tambah) as lalu "+
			"from gr_cuti_karyawan  "+
			"where sts_cuti = '"+this.cb_cuti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik,kode_lokasi "+
			") a  "+
			"left join  "+ 
			"( "+
			"select nik_buat as nik,kode_lokasi, sum(lama_lalu) as pakai_lalu from gr_cuti "+
			"where sts_cuti='"+this.cb_cuti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and periode like '"+this.e_periode.getText().substr(0,4)+"%'  "+
			"group by nik_buat,kode_lokasi "+
			") b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+			
			"where a.kode_lokasi='"+this.app._lokasi+"' ",true);
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,floatToNilai(line.sisa_lalu)]);
				}
			} else this.sg.clear(1);			
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti","no_cuti",this.app._lokasi+"-CLS"+this.e_periode.getText().substr(2,4)+".","0"));
			this.cb_cuti.setFocus();
		}			
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							/*
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptCuti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_cuti='"+this.e_nb.getText()+"' ";
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
							*/
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							//}
						}else system.info(this,result,"");
	    			break;
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