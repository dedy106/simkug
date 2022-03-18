window.app_saku3_transaksi_uin_fDokFisik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fDokFisik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fDokFisik";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Serah Terima Dokumen Fisik", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		
		this.e_noaju = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Agenda",maxLength:30,change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Net Pengajuan", tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.cb_terima = new portalui_saiCBBL(this,{bound:[20,18,220,20],caption:"NIK Penerima",tag:2,multiSelection:false});				
		this.e_serah = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"Diserahkan Oleh", tag:1,maxLength:50});	
		this.e_tglaju = new saiLabelEdit(this,{bound:[20,11,200,20],caption:"Tanggal Pengajuan", readOnly:true});	
		this.e_ket = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"Deskripsi", readOnly:true});	
		this.e_pp = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Fak/Unit", readOnly:true});			

		this.pc2 = new pageControl(this,{bound:[5,23,995,285], childPage:["Detail Agenda"]});						
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:0,
				colTitle:["KdTrm","Nama Penerima","Deskripsi","IDItem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,60,60,80,60,60,60,60,200,200,80]],					
				colHide:[[0,3],[true,true]],
				readOnly:true,				
				colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				nilaiChange:[this,"doNilaiChange1"],					
				autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});		
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fDokFisik.extend(window.childForm);
window.app_saku3_transaksi_uin_fDokFisik.implement({	
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

					sql.add("insert into uin_stdok_m (no_fisik,kode_lokasi,tanggal,periode,tgl_input,nik_user,nik_terima,nama_serah,no_aju,no_seb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_terima.getText()+"','"+this.e_serah.getText()+"','"+this.e_noaju.getText()+"','-')");	
					sql.add("update uin_aju_m set progress='1', no_fisik='"+this.e_nb.getText()+"' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_stdok_m","no_fisik",this.app._lokasi+"-DF"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.e_noaju.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){		
		try {
			if (sender==this.e_noaju || sender==this.e_nilai) {			
				if (this.e_noaju.getText() != "" && this.e_nilai.getText() != "0") {
					var strSQL = "select a.keterangan,convert(varchar,a.tanggal,103) as tgl,a.kode_pp+' | '+b.nama as pp "+
								"from uin_aju_m a "+
								"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+							 
								"where a.no_aju = '"+this.e_noaju.getText()+"' and a.nilai-a.ppn-a.pph = "+nilaiToFloat(this.e_nilai.getText())+" and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','V') ";								
					var data = this.dbLib.getDataProvider(strSQL,true);	
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];					
						this.e_ket.setText(line.keterangan);				
						this.e_pp.setText(line.pp);				
						this.e_tglaju.setText(line.tgl);	
						
						var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto, a.idbukti+cast(a.nu as varchar) as iditem "+
									"from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
									"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg1.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
							}					
						} else this.sg1.clear(1);	
					}
					else {				
						this.e_noaju.setText("");	
						this.e_nilai.setText("0");							
						this.e_ket.setText("");				
						this.e_pp.setText("");				
						this.e_tglaju.setText("");		
						this.sg1.clear(1);
						system.alert(this,"No Agenda dan Net Pengajuan tidak valid.","Data tidak ditemukan.");																						
					}
				}
			}
		}
		catch(e) {
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
			this.sg1.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});