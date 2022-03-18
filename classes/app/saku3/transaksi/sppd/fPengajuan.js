window.app_saku3_transaksi_sppd_fPengajuan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fPengajuan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fPengajuan";
		this.itemsValue = new portalui_arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Surat Perintah SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,470], childPage:["Data Surat Perintah","List Surat Perintah"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No. Surat Perintah","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[300,100,100]],				
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		


		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"PP",tag:7, readOnly:true});   
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true, tag:2});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	

		this.e_tempat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,550,20],caption:"Tempat", maxLength:150});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,550,20],caption:"Maksud / Tujuan", maxLength:150});						
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,550,20],caption:"Dasar Perj. Dinas", maxLength:150});				
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Pembuat",tag:7, readOnly:true});
 		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"NIK Perintah", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_jab = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,400,20],caption:"Jabatan", maxLength:150});	

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,40,995,253], childPage:["Detail PD"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:1,
				    colTitle:["PP / Unit", "Nama PP","NIK Petugas", "Nama Petugas","Jumlah Orang"],
					colWidth:[[4,3,2,1,0],[100,310,100,310,100]],
					colFormat:[[4],[cfNilai]],				
					columnReadOnly:[true,[3,1]],
					buttonStyle:[[2, 0],[bsEllips, bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
				
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		setTipeButton(tbSimpan);
		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
	
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik = b.nik and a.kode_lokasi = b.kode_lokasi and b.kode_pp = '"+this.app._kodePP+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_pp.setText(this.app._kodePP);
			this.cb_buat.setText(this.app._userLog);
			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'");						
			sql.add("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1'");						
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fPengajuan.extend(window.portalui_childForm);
window.app_saku3_transaksi_sppd_fPengajuan.implement({	
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
						sql.add("delete from sp_pdaju_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from sp_pdaju_d where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}
					
					sql.add("insert into sp_pdaju_m (no_spj,tanggal,kode_lokasi,kode_akun,kode_drk,keterangan,nik_buat,periode,tgl_input,progress,no_app,dasar,nik_app,jabatan, kode_pp, tempat, no_st) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','-','-','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.e_periode.getText()+"',getdate(),'0','-','"+this.e_dasar.getText()+"','"+this.cb_app.getText()+"','"+this.e_jab.getText()+"', '"+this.app._kodePP+"', '"+this.e_tempat.getText()+"', '-')");

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into sp_pdaju_d (no_spj,kode_lokasi,kode_pp,nik,jumlah) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+")");
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
					this.sg.clear(1);
					this.sg3.clear(1);
					this.stsSimpan = 1;
				break;
			case "simpan" :									
			case "ubah" :
				this.preView = "1";
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

				sql.add("delete from sp_pdaju_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from sp_pdaju_d where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						
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
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_pdaju_m","no_spj",this.app._lokasi+"-SPR"+this.e_periode.getText().substr(2,4)+".","0000"));	
		this.e_tempat.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){	
		if (sender == this.cb_app && this.cb_app.getText()!="") {
			var strSQL = "select jabatan from sp_pdaju_m where no_spj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				var line3 = dataS.rs.rows[0];
				this.e_jab.setText(line3.jabatan);
			}
			else {
				var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_app.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jab.setText(line2.jabatan);
				} 
				else this.e_jab.setText("");	
			}			
		}
	},		
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    				
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var nik = this.dataNik.get(sender.cells(2,row));
				if (nik) sender.cells(3,row,nik);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"NIK "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipseClick: function(sender, col, row){
		try{		
			if (sender == this.sg) {
                if (col == 0){
                    this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
                            "select kode_pp,nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            "select count(*) from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            ["kode_pp","nama"],"and",["Kode","Nama"],false);				
                }		

                if (col == 2){
                    if(this.sg.cells(0, row) != ""){
                        this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
                            "select nik, nama from karyawan where kode_pp='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            "select count(*) from karyawan where kode_pp='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            ["nik","nama"],"and",["NIK","Nama"],false);	
                    }else{
                        system.alert(this,"Pilih Kode PP Terlebih Dahulu", "");
                        return false;
                    }	
                }	
            }	
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							if(this.preView = "1"){
								this.nama_report="server_report_saku3_spj_rptPdFormTu";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
							}else{
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");		
								this.clearLayar();
							}						
						}else system.info(this,result,"");
	    			break;		
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();
							this.dataNik = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}					
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataNik.set(line.nik, line.nama);										
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
			this.sg.clear(1);this.sg3.clear(1);
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){		
		var strSQL = "select a.no_spj, convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.nilai "+
					 "from sp_pdaju_m a "+
					 "where a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' order by a.no_spj";
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
			this.sg3.appendData([line.no_spj,line.tgl,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var data = this.dbLib.getDataProvider("select * from sp_pdaju_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.dp_d1.setText(line.tanggal);						
						this.cb_buat.setText(line.nik_buat);	
						this.cb_app.setText(line.nik_app);						
						this.e_jab.setText(line.jabatan);	
						this.e_ket.setText(line.keterangan);								
						this.e_dasar.setText(line.dasar);																
						this.e_tempat.setText(line.tempat);				
					} 
				}				
				
				var strSQL = "select a.kode_pp, b.nama, a.nik, c.nama as karyawan, a.jumlah "+
							 "from sp_pdaju_d a "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_pp,line.nama,line.nik,line.karyawan,floatToNilai(line.jumlah)]);
					}
				} else this.sg.clear(1);				
				this.sg.validasi();					
			}						
		} catch(e) {alert(e);}
	}
});