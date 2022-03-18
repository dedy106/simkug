window.app_saku3_transaksi_spm_fSuperPD = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fSuperPD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fSuperPD";
		this.itemsValue = new portalui_arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_pp = new saiCBBL(this,{bound:[20,10,220,20],caption:"PP / Cabang",tag:7, readOnly:true,change:[this,"doChange"]});   					
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["No. Surat Perintah","Tanggal","Maksud/Tujuan"],
					colWidth:[[2,1,0],[300,100,200]],									
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,240,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true, tag:2});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[265,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});			
		this.e_tujuan = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,500,20],caption:"Tujuan", maxLength:150});						
		this.e_dasar = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,500,20],caption:"Dasar / Alasan", maxLength:150});								
		this.e_kota = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,500,20],caption:"Kota Tujuan", maxLength:150});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,14,100,18],caption:"Tgl Mulai - Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[240,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[350,14,170,20],labelWidth:80, caption:"Lama Hari",readOnly:true, tag:1, tipeText:ttNilai, text:"0"});						
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Jenis PD",items:["DN","LN"], readOnly:true,tag:2});
		this.e_trans = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Sarana Transport", maxLength:50});								
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Pos Beban/Akun", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
 		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,40,995,213], childPage:["Detail","Otorisasi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:1,
				    colTitle:["NIK", "Nama","Band", "PP-Unit / Cabang","Jabatan","Kode PP"],
					colWidth:[[5,4,3,2,1,0],[80,200,250,80,200,80]],
					columnReadOnly:[true,[1,2,3,4,5],[0]],					
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab1 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,400,20],caption:"Jabatan", maxLength:150,tag:2});	
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_jab2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,400,20],caption:"Jabatan", maxLength:150,tag:2});	

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
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
			this.doSelectDate2(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '055' where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun SPPD",true);			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a "+							   
							    "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);							   
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+							   
							   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_pp.setText(this.app._kodePP);	
			this.cb_buat.setText(this.app._userLog);	
			
			var sql = new server_util_arrayList();
			sql.add("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fSuperPD.extend(window.portalui_childForm);
window.app_saku3_transaksi_spm_fSuperPD.implement({		
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
						sql.add("delete from pd_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from pd_aju_nik where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					}
					
					sql.add("insert into pd_aju_m (no_aju,kode_lokasi,nik_user,tgl_input,kode_pp,tanggal,periode,tujuan,dasar,kota,tgl_awal,tgl_akhir,lama,jenis,kode_param,kode_akun,nik_buat,nik_app,jab1,jab2,transport) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_tujuan.getText()+"','"+this.e_dasar.getText()+"','"+this.e_kota.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml.getText())+",'"+this.c_jenis.getText()+"','-','"+this.cb_akun.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_jab1.getText()+"','"+this.e_jab2.getText()+"','"+this.e_trans.getText()+"')");

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into pd_aju_nik (no_aju,kode_lokasi, nik,kode_band,kode_pp,jabatan,no_spj,progress,no_app1,no_app2) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(4,i)+"','-','0','-','-')");
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
					this.sg.clear(1); this.sg3.clear(1);
					this.stsSimpan = 1;
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);																		
				break;
			case "simpan" :									
			case "ubah" :
				this.preView = "1";				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi NIK untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}

				/*
				var strSQL = "select datediff(day,getdate(),'"+this.dp_d2.getDateString()+"') as selisih ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						if (parseInt(line.selisih)<0) {
							system.alert(this," Transaksi tidak valid.","Tgl mulai kurang dari tanggal sistem hari ini.");
							return false;
						}
					}					
				}
				*/

				if (nilaiToFloat(this.e_jml.getText()) <= 0) {
					system.alert(this," Transaksi tidak valid.","Jumlah hari tidak valid. (Tidak boleh kurang dari nol)");
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

				sql.add("delete from pd_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from pd_aju_nik where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																

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
	doSelectDate2: function(sender, y,m,d){
		var data2 = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') + 1 as jumlah ",true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2 = data2.rs.rows[0];
			this.e_jml.setText(line2.jumlah);
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1);					
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		
		//nomor reset setahun (2018 mulai dari bulan mei)
		//var AddFormat = "____/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4)+"%";

		if (this.e_periode.getText().substr(0,4) == "2018") var vPeriode = " and periode > '201804' ";
		else var vPeriode = " ";

		var AddFormat = "____/SYPUMA-"+this.app._kodePP+"/__/"+this.e_periode.getText().substr(0,4)+"%";
		var data = this.dbLib.getDataProvider("select isnull(max(no_aju),0) as no_bukti from pd_aju_m where no_aju like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"' "+vPeriode,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				if (line.no_bukti == "0") this.e_nb.setText("0001/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4));
				else {
					var idx = parseFloat(line.no_bukti.substr(0,4)) + 1;
					idx = idx.toString();
					if (idx.length == 1) var nu = "000"+idx;
					if (idx.length == 2) var nu = "00"+idx;
					if (idx.length == 3) var nu = "0"+idx;
					if (idx.length == 4) var nu = idx;
					this.e_nb.setText(nu+"/SYPUMA-"+this.app._kodePP+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4));						
				}
			} 
		}
		this.e_tujuan.setFocus();
		setTipeButton(tbSimpan);
	},		
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!="" && this.stsSimpan==1 ) {
			var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jab1.setText(line.jabatan);
				} 
			}	
		}
		if (sender == this.cb_app && this.cb_app.getText()!="" && this.stsSimpan==1 ) {
			var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_app.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_jab2.setText(line.jabatan);
				} 
			}	
		}		
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    				
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var nik = this.dataNIK.get(sender.cells(0,row));
				if (nik) {
					sender.cells(1,row,nik);
					var data = this.dbLib.getDataProvider("select a.grade,a.kode_pp,b.nama as pp, a.jabatan from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
													      "where a.nik='"+sender.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							sender.cells(2,row,line.grade);					
							sender.cells(3,row,line.pp);
							sender.cells(4,row,line.jabatan);
							sender.cells(5,row,line.kode_pp);										
						} 
					}	
				}
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"NIK "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNIK");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
					sender.cells(5,row,"");
				}				
			}
		}					
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipseClick: function(sender, col, row){
		try{		
			if (sender == this.sg) {
                if (col == 0){
                    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
                            "select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            "select count(*) from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
                            ["nik","nama"],"and",["NIK","Nama"],false);				
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
								this.nama_report="server_report_saku3_spm_rptSppdAju";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");		
								this.clearLayar();
							}						
						}else system.info(this,result,"");
	    			break;		
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNIK = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNIK.set(line.nik, line.nama);										
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
			this.sg.clear(1); this.sg3.clear(1);
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doClick();																	
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){		
		var strSQL = "select a.no_aju, convert(varchar,a.tanggal,103) as tgl, a.tujuan  "+
					 "from pd_aju_m a  "+
					 "left join ( "+
					 "			select distinct no_aju "+
					 "			from pd_aju_nik "+
					 "			where kode_lokasi='"+this.app._lokasi+"' and progress<>'0' "+
					 "			) b on a.no_aju=b.no_aju "+
					 "where b.no_aju is null and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_aju";
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
			this.sg3.appendData([line.no_aju,line.tgl,line.tujuan]); 
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
								
				var data = this.dbLib.getDataProvider("select * from pd_aju_m a where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.dp_d1.setText(line.tanggal);							
						this.e_tujuan.setText(line.tujuan);								
						this.e_dasar.setText(line.dasar);																
						this.e_kota.setText(line.kota);		
						this.dp_d2.setText(line.tgl_awal);		
						this.dp_d3.setText(line.tgl_akhir);						
						this.e_jml.setText(line.lama);
						this.c_jenis.setText(line.jenis);						
						this.e_trans.setText(line.transport);
						this.cb_akun.setText(line.kode_akun);	
						
						this.cb_buat.setText(line.nik_buat);						
						this.cb_app.setText(line.nik_app);						
						this.e_jab1.setText(line.jab1);	
						this.e_jab2.setText(line.jab2);													
					} 
				}				
				
				var strSQL = "select a.nik,c.nama,a.kode_band,b.nama as pp,a.jabatan,a.kode_pp "+
							 "from pd_aju_nik a "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nik,line.nama,line.kode_band,line.pp,line.jabatan,line.kode_pp]);
					}
				} else this.sg.clear(1);				
				
			}						
		} catch(e) {alert(e);}
	}
});