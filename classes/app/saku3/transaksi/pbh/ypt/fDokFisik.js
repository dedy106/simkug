window.app_saku3_transaksi_pbh_ypt_fDokFisik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_pbh_ypt_fDokFisik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_pbh_ypt_fDokFisik";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Serah-Terima Dokumen Fisik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.e_noaju = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_modul = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Modul", readOnly:true});							
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Tgl Pengajuan", readOnly:true});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"Deskripsi", readOnly:true});							
		this.cb_terima = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"NIK Penerima",tag:2,multiSelection:false});			
		this.e_serah = new saiLabelEdit(this,{bound:[20,19,300,20],caption:"Diserahkan Oleh", maxLength:100});							
		this.e_catat = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Catatan", maxLength:200});							
		
		this.pc2 = new pageControl(this,{bound:[5,18,991,252], childPage:["Rekening","Item Jurnal"]});			
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,150,150,150,150]],										
					colFormat:[[4,5],[cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,
					colFormat:[[4],[cfNilai]], 					
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});					

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
			
			this.cb_terima.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro in ('NIK_DOK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.cb_terima.setText(line.flag);									
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_pbh_ypt_fDokFisik.extend(window.childForm);
window.app_saku3_transaksi_pbh_ypt_fDokFisik.implement({	
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-FIS"+this.e_periode.getText().substr(2,4)+".","0000"));												
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat,ref1) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','S','"+this.e_modul.getText()+"','VERFISIK','"+this.e_noaju.getText()+"','"+this.e_catat.getText()+"','-','"+this.cb_terima.getText()+"','X','"+this.e_serah.getText()+"')");
                    		
					sql.add("update pbh_pb_m set progress='S', no_fisik='"+this.e_nb.getText()+"' where no_pb='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doClick();
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-FIS"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_noaju.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		if (sender==this.e_noaju || sender==this.e_nilai) {			
			if (this.e_noaju.getText() != "" && this.e_nilai.getText() != "0") {
				var strSQL = "select a.modul,a.keterangan,convert(varchar,a.tanggal,103) as tgl "+
							 "from pbh_pb_m a "+
							 "where a.no_pb = '"+this.e_noaju.getText()+"' and a.nilai="+nilaiToFloat(this.e_nilai.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' ";								
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.e_modul.setText(line.modul);
					this.e_tanggal.setText(line.tgl);				
					this.e_ket.setText(line.keterangan);	
					this.doLoadRek();	
					this.doLoadJurnal();							
				}
				else {				
					this.e_noaju.setText("");	
					this.e_nilai.setText("0");		
					system.alert(this,"No Pengajuan dan Nominal tidak valid.","Data tidak ditemukan.");															
					this.e_ket.setText("");				
					this.e_tanggal.setText("");	
					this.e_modul.setText("");	
					this.sg1.clear(1);								
					this.sg3.clear(1);								
				}
			}
		}
	},
	doLoadRek:function(){
		var strSQL1 = "select bank,nama,no_rek,nama_rek,bruto,pajak,'"+this.e_ket.getText()+"' as keterangan "+
					  "from pbh_rek where no_bukti ='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),line.keterangan.toUpperCase()]);
			}
		} else this.sg1.clear(1);	
		this.sg1.validasi();												
	},	
	doLoadJurnal:function(){		
		if (this.e_modul.getText() == "PBBAU" || this.e_modul.getText() == "PBBMHD") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.no_pb = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "IFCLOSE") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from hutang_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_hutang = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "PJAJU") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjar_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_pj = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "PJPTG") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from ptg_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);	
		this.sg3.validasi();		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormDok";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_noaju.getText()+"' ";
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
				this.pc2.show();		
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
			this.sg1.clear(1);
			this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	}
});