window.app_saku3_transaksi_spm_simlog_fPesan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_simlog_fPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_simlog_fPesan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Request", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Request","List Request"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No Request","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,22,202,20],caption:"Jenis",items:["PROYEK","UMUM"], readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Request",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,360], childPage:["Deskripsi","Detail Barang"]});			
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,300,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:200});		
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Alamat Penerima", maxLength:200});		
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Cabang / PP", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.cb_proyek = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});						
		this.cb_aju = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Pengaju", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,
		            colTitle:["Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,60,180,180,180,180]],															
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[6],[0,1,2,3,4,5]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_aju.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
						
			this.cb_pp.setText(this.app._kodePP);
			this.cb_aju.setText(this.app._userLog);
			this.c_jenis.setText("PROYEK");	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_simlog_fPesan.extend(window.childForm);
window.app_saku3_transaksi_spm_simlog_fPesan.implement({		
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into log_pesan_m(no_pesan,kode_lokasi,tgl_input,nik_user,periode,jenis,kode_proyek,tanggal,no_dokumen,keterangan,kode_pp,nilai,nik_buat,alamat) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_proyek.getText()+"', '"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.cb_aju.getText()+"','"+this.e_alamat.getText()+"')"); 							

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into log_pesan_d(no_pesan,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,harga,no_po,jum_po,harga_po) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+",'-',0,0)");
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
					this.sg.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);															
					this.stsSimpan = 1;
					this.doClick();
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
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
				sql.add("delete from log_pesan_m where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){		
		if (this.stsSimpan == 0) {					
			this.sg.clear(1); this.sg3.clear(1); 
			this.e_nilai.setText("0");							
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_pesan_m","no_pesan",this.app._lokasi+"-RQ"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);
			
	},	
	doChangeCell: function(sender, col, row){
		if (col == 4 || col == 5 ) {
			if (this.sg.cells(4,row) != "" && this.sg.cells(5,row) != "") {
				this.sg.cells(6,row,floatToNilai(nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row))));
				this.sg.validasi();		
			}
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doChange: function(sender){						
		if (sender == this.cb_pp || sender == this.c_jenis) {	
			if (this.stsSimpan==1) this.cb_proyek.setText("","");
			if (this.cb_pp.getText()!="" && this.c_jenis.getText()!="") {
				if (this.c_jenis.getText() == "PROYEK") {
					this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where kode_pp='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
					this.cb_proyek.setReadOnly(false);
				}
				else {
					this.cb_proyek.setSQL("select '-' as kode_proyek,'-' as nama",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);
					this.cb_proyek.setText("-","-");
					this.cb_proyek.setReadOnly(true);
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
								this.nama_report="server_report_saku3_logistik_rptPesan";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pesan='"+this.e_nb.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Request : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
					 "from log_pesan_m a "+
					 "		left join (  "+
					 
					 "		select distinct no_pesan,kode_lokasi "+
					 "		from log_pesan_d "+
					 "		where no_po<>'-' and kode_lokasi='"+this.app._lokasi+"' "+

					 "		) b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where b.no_pesan is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];																
			this.sg3.appendData([line.no_pesan,line.tgl,line.jenis,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.* from log_pesan_m a where a.no_pesan = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);	
						this.e_alamat.setText(line.alamat);												
						this.cb_pp.setText(line.kode_pp);												
						this.cb_aju.setText(line.nik_buat);	

						if (this.c_jenis.getText() == "PROYEK") this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where kode_proyek='"+line.kode_proyek+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
						this.cb_proyek.setText(line.kode_proyek);																		
					}
				}													
				var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,harga,jumlah*harga as total from log_pesan_d where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg.appendData([line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total)]);
					}
				} else this.sg.clear(1);				
			}									
		} catch(e) {alert(e);}
	}
});