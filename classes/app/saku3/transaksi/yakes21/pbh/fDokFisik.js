window.app_saku3_transaksi_yakes21_pbh_fDokFisik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_pbh_fDokFisik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_pbh_fDokFisik";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Serah-Terima Dokumen Fisik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Fisik",maxLength:30,readOnly:true,visible:false});				
		this.e_noaju = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"No Bukti",multiSelection:false,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb = new portalui_checkBox(this,{bound:[225,17,100,25],caption:"Verified",selected:false});

		this.e_modul = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Modul", readOnly:true});							
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Tgl Pengajuan", readOnly:true});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"Deskripsi", readOnly:true});							
		this.cb_terima = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"NIK Penerima",tag:2,multiSelection:false});			
		this.e_serah = new saiLabelEdit(this,{bound:[20,19,550,20],caption:"Diserahkan Oleh", maxLength:100});							
		this.e_catat = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Catatan", maxLength:200});							
		
		this.pc2 = new pageControl(this,{bound:[5,18,991,285], childPage:["Rekening","CheckList Dok","Item Jurnal"]});			
		this.sgRek = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
		            colTitle:["Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Netto"],					
					colWidth:[[6,5,4,3,2,1,0],[100,80,100,250,100,150,170]],										
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgRek,pager:[this,"doPager1"]});					
				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9, 
					colTitle:["Status","Catatan","Kd Dokumen","Deskripsi","File Dok","Download"],
					colWidth:[[5,4,3,2,1,0],[70,100,200,80,300,80]],					
					columnReadOnly:[true,[0,2,3,4,5],[1]],	
					buttonStyle:[[0],[bsAuto]], 
					colFormat:[[5],[cfButton]], colAlign:[[5],[alCenter]],
					dblClick:[this,"doDoubleClick3"],
					click:[this,"doSg4BtnClick"],
					picklist:[[0],[new portalui_arrayMap({items:["CHECK","UNCHECK"]})]],				
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});		

		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:0, //harus muncul jurnal
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,
					colFormat:[[4],[cfNilai]], 					
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});					

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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

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

			this.gridDokumen();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_pbh_fDokFisik.extend(window.childForm);
window.app_saku3_transaksi_yakes21_pbh_fDokFisik.implement({	
	gridDokumen: function() {
		var data = this.dbLib.getDataProvider("select kode_jenis,nama from pbh_dok_ver order by idx",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg4.appendData(["UNCHECK","-",line.kode_jenis,line.nama,"-","Download"]);				
			}
		} else this.sg4.clear(1);
	},		
	isiCBnoaju: function() {
		this.e_noaju.setSQL("select no_pb, keterangan from pbh_pb_m where periode<='"+this.e_periode.getText()+"' and progress='0' ",["no_pb","keterangan"],false,["No PB","Nama"],"and","Data Permintaan Bayar",true);
	},
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
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','1','"+this.e_modul.getText()+"','VERFISIK','"+this.e_noaju.getText()+"','"+this.e_catat.getText()+"','-','"+this.cb_terima.getText()+"','X','"+this.e_serah.getText()+"')");
                    		
					if (this.e_modul.getText() == "IFCLOSE" || this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "PBDAKEM") {						
						//IFCLOSE -->langsung ke penerimaan kas (tanpa SPB-sah-fiat) 
						//IFREIM dan PBDAKEM ke SPB (non verif)
					
						if (this.e_modul.getText() == "IFCLOSE") var vStatus = "8"; 
						else var vStatus = "2"; 

						sql.add("update pbh_pb_m set no_fisik='"+this.e_nb.getText()+"',no_ver='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_noaju.getText()+"' ");							 

						//verifikasi injek
						sql.add("update pbh_ver_m set no_flag='"+this.e_nb.getText()+"/V' where no_bukti='"+this.e_noaju.getText()+"' and no_flag='-' and form='VERPB' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
                           		 "('"+this.e_nb.getText()+"/V','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','VERPB','"+this.e_noaju.getText()+"','"+this.e_catat.getText()+"','-','X','X')");				    	
					}
					else sql.add("update pbh_pb_m set progress='1', no_fisik='"+this.e_nb.getText()+"' where no_pb='"+this.e_noaju.getText()+"' ");	
										
					//dokumen						
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)) {
								sql.add("insert into pbh_verdok_d (no_ver,no_bukti,kode_lokasi,kode_jenis,status,catatan) values "+
										"('"+this.e_nb.getText()+"','"+this.e_noaju.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"')");	
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
					setTipeButton(tbSimpan);
					this.sgRek.clear(1);
					this.sg3.clear(1);
					this.isiCBnoaju();
					this.gridDokumen();
					this.cb.setSelected(false);
				break;
			case "simpan" :		
				if (!this.cb.isSelected()) {
					system.alert(this,"Transaksi tidak valid.","Nominal harus di verifikasi.");
					return false;											
				}
				else this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.isiCBnoaju();
		this.doClick();
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-FIS"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_noaju.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		if (sender==this.e_noaju) {			
			if (this.e_noaju.getText() != "") {
				var strSQL = "select a.nilai,a.modul,a.keterangan,convert(varchar,a.tanggal,103) as tgl "+
							 "from pbh_pb_m a "+
							 "where a.no_pb = '"+this.e_noaju.getText()+"' and a.progress='0' ";								
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_modul.setText(line.modul);
					this.e_tanggal.setText(line.tgl);									
					this.e_ket.setText(line.keterangan);	
					this.doLoadRek();	
					this.doLoadJurnal();
					this.doLoadDok();			
					
					//if (line.modul == "PBHKES") {
						//cek jika dari RESTITUSI TREANSFER ---> tidak perlu verifikasi

					//}

				}
				else {				
					this.e_noaju.setText("");	
					this.e_nilai.setText("0");		
					system.alert(this,"No Pengajuan dan Nominal tidak valid.","Data tidak ditemukan.");															
					this.e_ket.setText("");				
					this.e_tanggal.setText("");	
					this.e_modul.setText("");	
					this.sgRek.clear(1);								
					this.sg3.clear(1);								
				}
			}
		}
	},
	doLoadRek:function(){
		var strSQL1 = "select bank,nama,no_rek,nama_rek,bruto,pajak,bruto-pajak as netto "+
					  "from pbh_rek where no_bukti ='"+this.e_noaju.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgRek.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sgRek.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.netto)]);
			}
		} else this.sgRek.clear(1);	
		this.sgRek.validasi();												
	},	
	doLoadJurnal:function(){		
		if (this.e_modul.getText() == "PBBMHD" || this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "IFCLOSE" || 
		    this.e_modul.getText() == "PJAJU" || this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PBDAKEM" || this.e_modul.getText() == "PBSPJ" || 
			this.e_modul.getText() == "PINBUK" || this.e_modul.getText() == "PBHKES" || this.e_modul.getText() == "PBSDM" || this.e_modul.getText() == "PBBPJS" || 
			this.e_modul.getText() == "PBBAST" || this.e_modul.getText() == "PBADK" || this.e_modul.getText() == "OBLIBELI" || this.e_modul.getText() == "SHMBELI" || 
			this.e_modul.getText() == "RDBELI" || this.e_modul.getText() == "SPBELI" || this.e_modul.getText() == "DEPOSWA" || this.e_modul.getText() == "MIFEE" || 
			this.e_modul.getText() == "PBAKRU") {			  

			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi<>'00' "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.no_pb = '"+this.e_noaju.getText()+"' and a.jenis in ('BEBAN','PAJAK','TAMBAH','AKUNIF','PANJAR','TUJUAN','SUMBER','PEGAWAI','PENSIUN') ";		
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
	doLoadDok:function(){
		var data = this.dbLib.getDataProvider("select kode_jenis,no_gambar from pbh_dok where no_bukti = '"+this.e_noaju.getText()+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;					
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				for (var j=0;j < this.sg4.getRowCount();j++){
					if (line.kode_jenis==this.sg4.cells(2,j)) {
						this.sg4.cells(4,j,line.no_gambar);
					}
				}
			}
		}
	},
	doSg4BtnClick: function(sender, col, row){
		try{
			if (col === 5) window.open("server/media/"+this.sg4.getCell(4,row));
		}catch(e){
			alert(e);
		}
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
			this.sgRek.clear(1);
			this.sg3.clear(1);
			this.isiCBnoaju();
			this.gridDokumen();
			this.cb.setSelected(false);
			this.pc2.setActivePage(this.pc2.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});