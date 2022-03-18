window.app_saku3_transaksi_sppd_fPengajuan2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fPengajuan2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fPengajuan2";
		this.itemsValue = new portalui_arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pengajuan PD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pengajuan","List Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["No. Agenda","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[100,100,300]],				
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		


		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});		
		
		this.cb_buat = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Pembuat",tag:2,multiSelection:false});         				
		this.cb_spj = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK SPPD",tag:1,multiSelection:false});   
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,550,20],caption:"Uraian", maxLength:150});	


		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,40,990,280], childPage:["Detail PD"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:1,
				    colTitle:["PP / Unit", "Keterangan","NIK","Jumlah"],
					colWidth:[[3,2,1,0],[100,100,300,100]],
					colFormat:[[3],[cfNilai]],				
					columnReadOnly:[true,[1]],
					buttonStyle:[[2, 0],[bsEllips, bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],
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

			this.doLoad3();

			this.cb_spj.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);				
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);						
			this.cb_buat.setText(this.app._userLog);

            this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_pdaju_m","no_spj",this.app._lokasi+"-SPJ"+".","0000"));	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fPengajuan2.extend(window.portalui_childForm);
window.app_saku3_transaksi_sppd_fPengajuan2.implement({	
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
					
					sql.add("insert into sp_pdaju_m (no_spj,tanggal,kode_lokasi,kode_akun,kode_drk,keterangan,nik_buat,nik_spj,periode,tgl_input,progress,no_app) values "+
					        "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','-','-','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_spj.getText()+"','"+this.e_periode.getText()+"',getdate(),'0','-')");

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into sp_pdaju_d (no_spj,kode_lokasi,kode_pp,nama,nik,jumlah) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+")");
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
				// if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
				// 	system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
				// 	return false;
				// }
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sp_pdaju_m","no_spj",this.app._lokasi+"-PD"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){	
		
	},	
	doNilaiChange1: function(){
		try{
			var tot  = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
				  tot += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			// this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 3) && (this.sg.cells(3,row) != "" && this.sg.cells(2,row) != "")) {
			var total = nilaiToFloat(this.sg.cells(2,row)) * nilaiToFloat(this.sg.cells(3,row));
			this.sg.cells(4,row,total);	
			this.sg.validasi();
		}
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var param = this.dataParam.get(sender.cells(0,row));				
				if (param) sender.cells(1,row,param);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}			
		sender.onChange.set(this,"doChangeCell1");		
	},
	doEllipseClick: function(sender, col, row){
		try{		
			if (sender == this.sg) {
                if (col == 0){
                    this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
                            "select kode_pp,nama from pp where kode_lokasi='"+this.app._lokasi+"'",
                            "select count(*) from pp where kode_lokasi='"+this.app._lokasi+"'",
                            ["kode_pp","nama"],"and",["Kode","Nama"],false);				
                }		

                if (col == 2){
                    if(this.sg.cells(0, row) != ""){
                        this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
                            "select nik, nama from karyawan where kode_pp='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"'",
                            "select count(*) from karyawan where kode_pp='"+this.sg.cells(0, row)+"' and kode_lokasi='"+this.app._lokasi+"'",
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
						}else system.info(this,result,"");
	    			break;		
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataParam.set(line.kode_param);										
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
		//sp_pdaju_m (no_spj,tanggal,kode_lokasi,kode_pp,kode_akun,kode_drk,keterangan,nik_buat,nik_spj,periode,tgl_input,progress,no_app) values "+														
		var strSQL = "select a.no_spj, convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.nilai "+
					 "from sp_pdaju_m a "+
					 "where a.progress in ('0') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; //b.kode_pp='"+this.cb_pp.getText()+"'
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
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);						
						this.cb_buat.setText(line.nik_buat);	
						this.cb_spj.setText(line.nik_spj);	
						this.e_ket.setText(line.keterangan);						
					} 
				}				
				
				var strSQL = "select kode_pp, nama, nik, jumlah from sp_pdaju_d a "+
							 "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_pp,line.nama,line.nik,floatToNilai(line.jumlah)]);
					}
				} else this.sg.clear(1);
				
				this.sg.validasi();
					
			}						
		} catch(e) {alert(e);}
	}
});